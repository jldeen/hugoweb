+++
author = "jldeen"
date = 2017-02-22T09:00:12Z
description = ""
draft = false
image = "download_dqtonj.png"
slug = "updated-azure-container-service-how-to-communicate-between-two-docker-swarm-containers"
title = "Updated! Azure Container Service: How to communicate between two Docker Swarm containers"

+++


Today’s blog post will focus on how to link two Docker Swarm [**<span style="text-decoration: underline;">not</span>** swarm-mode] containers together. There are a few different ways one can accomplish this and some parts can be a little hard to explain via text. I recorded a Channel 9 video to help explain it in a visual sense, but I also wanted to simplify it in a blog post. One thing to point out is Azure Container service, or ACS, is just an orchestrator. This means the same way you would facilitate communication between containers on a Docker Swarm instance hosted anywhere else will, for the most part, be the same on ACS.

Some pre-requisites to all 3 of the following steps:

– Export environment variables for DOCKER_HOST (**important!**) and the examples used in the steps below (or name them accordingly)

export DOCKER_HOST=:2375 export ROOT_PASSWORD=[password-here] export WORDPRESS_PASSWORD=[password-here]

It is also vital to note there are two public DNS addresses created automatically when you create your ACS resource group. One DNS is for the management Load Balancer, the other is for the agents Load Balancer.

By default, the Agents Load Balancer has ports 80, 8080 and 443 open. If you want to connect on another port you will need to open that port on the Azure Load Balancer for the Agent Pool. More on this can be found in the official ACS documentation [here](https://docs.microsoft.com/en-us/azure/container-service/container-service-docker-swarm). **You will use the public DNS for the <span style="text-decoration: underline;">Swarm agent Load Balancer</span> to access your applications. **

[DNSPREFIX]mgmt.[REGION].cloudapp.azure.com [DNSPREFIX]agents.[REGION].cloudapp.azure.com

To proceed further, you will need to create/open a tunnel via SSH to your Docker Swarm endpoint so you can run Docker commands against the ACS Swarm cluster. More on connecting to an Azure Container Service Docker Swarm cluster can be found in the official ACS documentation [here](https://docs.microsoft.com/en-us/azure/container-service/container-service-connect#connect-to-a-dcos-or-swarm-cluster). In short, you will use the following from the command line:

ssh -fNL 2375:localhost:2375 -p 2200 [USERNAME]@[DNSPREFIX]mgmt.[REGION].cloudapp.azure.com

The remaining section will be performed from your **<span style="text-decoration: underline;">local machine</span>** using the [Docker CLI](https://docs.docker.com/engine/installation/https://docs.docker.com/engine/installation/) after a tunnel to your Docker Swarm endpoint has been opened.

**Legacy Container Links**  
[Official Docker Resource](https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/)

As stated in the official Docker documentation, this is a deprecated feature and may eventually be removed. Only the default Docker0 bridge network supports the use of both port mapping (not covered today) and docker run –link. Using this method is prone to error and it would be recommended to setup your own User-defined network instead. (**Note**: “If you want to communicate with container names in [the] default bridge network, you must connect the containers via the legacy `<code class="highlighter-rouge">docker run --link` option.” – [Docker documentation here](https://docs.docker.com/engine/userguide/networking/))

To use the docker run –link command, you would do something like this:

docker run --detach \ --name mysql \ --env MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD \ --env MYSQL_USER=wordpress \ --env MYSQL_PASSWORD=$WORDPRESS_PASSWORD \ --env MYSQL_DATABASE=wordpress \ mysql docker run --detach \ --publish 80:80 \ --name wordpress \ --link mysql:mysql \ --env WORDPRESS_DB_USER=wordpress \ --env WORDPRESS_DB_PASSWORD=$WORDPRESS_PASSWORD \ wordpress

As you can see, you first create one container for your db app, in this case, we use mysql. Then, after successful creation of the first, you create a second container for your web app, in this case, we use wordpress. The key component here is we use the –link switch (line 12) to link our wordpress container to our mysql container via container name.

**User-defined Network (Bridge)**  
[Official Docker Resource](https://docs.docker.com/engine/userguide/networking/)

To use two containers within a user-defined network, you first have to create your network. To do so, you would do something like this:

docker network create --driver bridge jdnw

If you notice, I am creating a bridge network named jdnw in this example; a bridge network is the easiest network to create.

You can then inspect the newly created network by typing something like this:

docker network inspect jdnw

If you wish to view all available networks, you would type:

docker network ls

Now that your network is created, you will create your database and app containers individually, similarly to how you did using container links. Below is an example:

docker run --detach \ --name mysql \ --network=jdnw \ --env MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD \ --env MYSQL_USER=wordpress \ --env MYSQL_PASSWORD=$WORDPRESS_PASSWORD \ --env MYSQL_DATABASE=wordpress \ mysql docker run --detach \ --publish 80:80 \ --name wordpress \ --network=jdnw \ --env WORDPRESS_DB_HOST=mysql:3306 \ --env WORDPRESS_DB_USER=wordpress \ --env WORDPRESS_DB_PASSWORD=$WORDPRESS_PASSWORD \ wordpress

If you notice in this example, instead of using the –link command, I am using the –network command (line 3 and line 13) to define the network I created in the previous step.

**Docker Compose.yml**  
[Official Docker Resource](https://docs.docker.com/compose/networking/)

Using a Docker Compose file is a similar process as the user-defined network, only you don’t have to do each step manually. Instead, from within a working directory for your app, you create a docker-compose.yml file with the services defined. From there, Docker will be able to use the file to build a network for you, pull any necessary images, and then create each container within the network the .yml file created. **Note:** You could also use the .yaml extension.

Here’s an example of a docker-compose.yml file:

version: '2' services: mysql: image: mysql:latest container_name: mysql volumes: - db_data:/var/lib/mysql restart: always environment: MYSQL_ROOT_PASSWORD: $ROOT_PASSWORD MYSQL_DATABASE: wordpress MYSQL_USER: wordpress MYSQL_PASSWORD: $WORDPRESS_PASSWORD wordpress: depends_on: - mysql image: wordpress:latest container_name: wordpress ports: - "80:80" restart: always environment: WORDPRESS_DB_HOST: mysql:3306 WORDPRESS_DB_USER: wordpress WORDPRESS_DB_PASSWORD: $WORDPRESS_PASSWORD volumes: db_data:

To start the container deployments, type:

docker-compose up -d

There you go! This is a very high-level and introductory overview of Docker Swarm Containers and Networking. Please let me know if you have any questions, get stuck, just want to say hi, or you have other ideas for content. I’d love to hear from you!

