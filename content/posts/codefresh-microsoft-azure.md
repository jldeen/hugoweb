+++
author = "jldeen"
date = 2017-10-10T11:04:33Z
description = ""
draft = false
image = "../../images/Codefresh_MSFT_h56n3q.jpg"
slug = "codefresh-microsoft-azure"
title = "Automate Deployment to Docker Swarm and Kubernetes on Azure using Codefresh"
layout = "post"

+++


I’m so excited to write this blog post so without further ado, let’s jump right in: Codefresh and Microsoft.

Codefresh is a Docker-native CI/CD platform that allows you to instantly build, test, and deploy Docker images to both Swarm and Kubernetes clusters. Through its unique platform, Codefresh offers continuous unit, integration, and UI testing, as well as effortless and streamlined deployment to any cloud provider.

Today’s post is going to walk through a few ways you can use Codefresh in conjunction with Docker Swarm, Docker Swarm Mode, and Kubernetes on Microsoft Azure. This past summer, I had the honor and privilege of working with Codefresh to bring support for Azure to their offering. Throughout the collaboration, I learned so much more about Azure and how our systems work, so I want to cover a few key details prior to jumping into the “how-to” deploy with Codefresh part.

First, there are three ways you can run a Docker Swarm cluster on Microsoft Azure:

1. [Docker Swarm via Azure Container Service](https://docs.microsoft.com/en-us/azure/container-service/dcos-swarm/container-service-swarm-walkthrough)
2. [Docker Swarm Mode via ACS Engine GitHub QuickStart 101 Template](https://github.com/Azure/azure-quickstart-templates/tree/master/101-acsengine-swarmmode)
3. [DockerCE (Preview) via Azure Container Service (requires AZ CLI 2.0)](https://docs.microsoft.com/en-us/azure/container-service/dcos-swarm/container-service-swarm-mode-walkthrough)

The first way, which is the currently available production method as of the date of this post, is legacy Docker Swarm (pre version 1.12), which means Swarm Mode isn’t supported, and therefore ‘docker stack deploy’ does not work. You can, however, do normal docker commands like:

`docker run -d --name ${{CONTAINER_NAME}} -p 80:80 ${{IMAGE_NAME}}`

If you do have a Docker Swarm Mode cluster you deployed through either the GitHub QuickStart 101 ACS Engine Template or DockerCE (Preview), Swarm Mode is supported and you can do things like ‘docker stack deploy’.

Luckily, Codefresh has made connecting to and deploying in all three scenarios really easy for us by creating an image we can use in our pipeline so we don’t have to make our own, nor do we have to write any code to handle the [SSH tunnel](https:/jessicadeen.com/tech/azure-container-service-how-to-create-an-ssh-tunnel/) to our Swarm clusters. All we have to do is specify the ‘ncodefresh/remote-docker:azure’ image in our codefresh.yml files and then specify the necessary environment variables. I have the documentation written for both scenarios below:

[Legacy Docker Swarm (Pre version 1.12)](https://github.com/jldeen/codefresh/blob/master/Swarm.md)  
[Docker Swarm Mode (Version 1.12+)](https://github.com/jldeen/codefresh/blob/master/Swarm-mode.md)

#### Swarm

For Legacy Swarm (Pre 1.12), your deployment scenario would look similar to this:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2017-09-29-at-17.34.55_o3ke5m.png)

I also created a demo ‘codefreshswarm’ repo with a generic codefresh.yml file you can use [here](https://github.com/jldeen/codefreshswarm/blob/master/codefresh.yml).

#### Swarm Mode

Your Codefresh Swarm Mode deployment would look similar, only you will specify a STACK_NAME instead of a CONTAINER_NAME, or IMAGE_NAME. **(This assumes you are doing a ‘*docker stack deploy’* as opposed to just running a single image in a single container.)**

docker stack deploy --compose-file docker-stack.yml ${{STACK_NAME}}

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2017-10-06-at-22.16.23_bsa0je.png)

A demo codefresh.yml file for a swarm mode deployment can be found [here](https://github.com/jldeen/cfswarmmode).

Now, one thing I want to reiterate is how you <span style="text-decoration: underline;">do not</span> have to create an ssh tunnel to connect to your Docker Swarm Cluster on Azure like you do with other CI/CD tools I’ve written about. Codefresh has taken the challenging parts and automated them for you so all you have to do is fill in the blanks. Throughout this process, as I learned more about the intricacies of Azure, I also learned how scalable Codefresh is and yet simultaneously simple, powerful and robust.

Finally, my favorite part of CI/CD with Codefresh is their new, currently in Beta, Kubernetes integration. This stuff is really cool and the best part is it works with Kubernetes on Azure, too!

To document how deployment to Kubernetes in Azure with Codefresh works, I actually recorded a short video.

<center>[embedyt] https://www.youtube.com/watch?v=zuH9BkGh4nQ[/embedyt]</center>

