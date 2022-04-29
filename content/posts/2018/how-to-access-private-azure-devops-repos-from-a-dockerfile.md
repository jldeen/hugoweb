+++
author = "jldeen"
date = 2018-09-13T17:27:33Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-09-13-at-16.52.21_vhvd0i.png"
slug = "how-to-access-private-azure-devops-repos-from-a-dockerfile"
title = "How to access private Azure DevOps repos from a Dockerfile!"
aliases = ["/how-to-access-private-azure-devops-repos-from-a-dockerfile/"]
layout = "post"

+++


I recently got pinged on Twitter about how to access a private repo in [Azure DevOps](https://azure.microsoft.com/en-us/blog/introducing-azure-devops/) when building a container. I thought this was a great question because there is very little documentation on the subject. The use case for this is if using a PAT isn’t an option (and I don’t recommend it from a security practice), you can access Azure DevOps repos via SSH and that’s what I’m going to recommend for your containers.

If you don’t know how to get your ssh command line link, you can just click on “clone” as you normally would and hit SSH instead of HTTPS.

![](/generated/full/Screen-Shot-2018-09-13-at-17.17.00_yamr0d.webp)

You can then click “Manage SSH keys” to add your public key to your organization.

Now, for your Docker image build you will want to stick to multi-stage builds because of the way layers works. In a single stage build you might export an ARG to capture the private key file and then delete it but the contents of that file will remain in a layer and is therefore insecure. Best practice is multi-stage builds so we’ll demo that here. It’s also smaller and lighter. ?

You can see in the below file I first define one build as “intermediate” and install Git. I also setup the environment to access the private repo. In the second build, I copy the project I cloned from the intermediate build.

```Dockerfile
# this is our first build stage, it will not persist in the final image 
FROM ubuntu as intermediate 

# install git 
RUN apt-get update 
RUN apt-get install -y git 

# add credentials on build 
ARG SSH_PRIVATE_KEY

RUN mkdir /root/.ssh/ 
RUN echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa 
RUN chmod 600 ~/.ssh/id_rsa 

# make sure your domain is accepted 
RUN touch /root/.ssh/known_hosts 
RUN ssh-keyscan vs-ssh.visualstudio.com >> /root/.ssh/known_hosts 
RUN git clone [azure-devops-account-name]@vs-ssh.visualstudio.com:v3/[azure-devops-account-name]/[project-name]/[project-name] 

FROM ubuntu 

# copy the repository form the previous image 
COPY --from=intermediate /[project-name] /srv/[project-name]
```

Note, I did borrow parts of the above Dockerfile from [here](https://vsupalov.com/build-docker-image-clone-private-repo-ssh-key/), but I updated it accordingly for Azure DevOps (formerly VSTS).

You can test that locally by running: 

```bash
export SSH_PRIVATE_KEY=$(cat ~/.ssh/private-key-here) 

docker build --build-arg SSH_PRIVATE_KEY=$SSH_PRIVATE_KEY . -t repo-name/image-name
```

Then you can run that container and see your project in the /srv dir.

The above image is a good start, but it’s not the best we can do. Currently, our Ubuntu image is 88.3mb. We can get that smaller if we use Alpine instead.

```Dockerfile
# this is our first build stage, it will not persist in the final image 
FROM alpine as intermediate

# install git RUN apk update 
RUN apk add git openssh 

# add credentials on build 
ARG SSH_PRIVATE_KEY 

RUN mkdir /root/.ssh/ 
RUN echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa 
RUN chmod 600 ~/.ssh/id_rsa 

# make sure your domain is accepted 
RUN touch /root/.ssh/known_hosts 
RUN ssh-keyscan vs-ssh.visualstudio.com >> /root/.ssh/known_hosts 
RUN git clone [azure-devops-account-name]@vs-ssh.visualstudio.com:v3/[azure-devops-account-name]/[project-name]/[project-name] 

FROM alpine 
# copy the repository form the previous image 
COPY --from=intermediate /k8-jldeen /srv/k8-jldeen
```

![](/generated/full/Screen-Shot-2018-09-13-at-17.14.55_r5sa1l.webp)

Now our image is **only 8.56mb**. We have a **smaller**<span style="text-decoration: underline;">more secure</span> image by just making one small modification.

Of course, for your Azure Pipeline you will need to add in a variable to your pipeline for your `SSH_PRIVATE_KEY` ARG you defined in your Dockerfile.

![](/generated/full/Screen-Shot-2018-09-13-at-17.20.49_kkjcza.webp)

You will then need to reference the build argument in your Docker build task just as you did from command line.

![](/generated/full/Screen-Shot-2018-09-13-at-17.21.19_vzqmzt.webp)

And that should be it! Comment below with any questions or suggestions! Also, if you’re going to Microsoft Ignite, be sure to check out my sessions on Containers and DevOps!
