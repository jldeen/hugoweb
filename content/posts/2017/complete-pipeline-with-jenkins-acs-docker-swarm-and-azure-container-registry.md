+++
author = "jldeen"
date = 2017-08-24T10:28:05Z
description = ""
draft = false
image = "../../images/Screen-Shot-2017-08-23-at-20.40.37_todmei.png"
slug = "complete-pipeline-with-jenkins-acs-docker-swarm-and-azure-container-registry"
title = "Complete pipeline with Jenkins, ACS (Docker Swarm), and Azure Container Registry"
layout = "post"

+++


In this blog post, we will walk through a demonstration of a complete pipeline of a deployment to Docker Swarm on Azure Container Service (ACS) using Jenkins (hosted on Azure) and Azure Container Registry (ACR).

You can grab the demo file used on my GitHub [here](https://github.com/jldeen/jenkinsacr).

Pro tip! If you’re using BitBucket and you have your access credentials I recommend storing said creds in your credentials store through the [Credentials Plugin](https://wiki.jenkins.io/display/JENKINS/Credentials+Plugin). After you have stored your credentials, you can simply call them using the following code:

git branch: 'test', credentialsId: 'bb-login', url: 'https://bitbucket.org/[name-goes-here]/[sample].git'

If you have one stage for pulling code into your Jenkins build server, your full stage code would look like this:

// Mark the code checkout 'stage'.... stage('Checkout From BitBucket') { git branch: 'develop', credentialsId: 'bb-login', url: 'https://bitbucket.org/[name-goes-here]/[sample].git' }

In the demo I have on GitHub, I’ve used a previous GitHub repo to keep this simple. Just as a sampling, my stage for pulling code from a **<span style="text-decoration: underline;">public</span>** Git repo looks like this.

stage('Checkout from GitHub') { git url: 'https://github.com/jldeen/swampup2017' }

The next and perhaps most important step we want to focus on is creating credentials for our Azure Container Registry.

Microsoft does have instructions on how to do this [here](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication), but we will walk through it as well. Essentially we want to create an SPN (service principal), assign it to our registry, and use it for basic Docker authentication. For security reasons, I wouldn’t recommend using the registry admin account in your Jenkinsfile. As I have blogged about in [previous posts](https:/jessicadeen.com/tech/updated-non-interactive-authentication-to-microsoft-azure-w-azure-cli-2-0-now-ga/), we can use an SPN creation script to handle this process for us. I have updated my previous script to streamline this process in conjunction with ACR. The **NEW** ACR SPN creation script can be found [here](https://raw.githubusercontent.com/jldeen/jenkinsacr/master/create_acr_spn.sh). As always, please read any script thoroughly BEFORE running it on your local system.

After you run the script, create a new credentials entry in Jenkins with the output (username and password) the script provides.

We can now use our Docker pipeline plugin to access our newly defined registry with the credentials we just created. To do this we use the “*docker.withRegistry”*‘ variable. Our Jenkinsfile for ACR login with the new ACR SPN credentials will then look something like this:

docker.withRegistry('https://acrjdtest.azurecr.io', 'acr_credentials')

For a list of all Docker global variables, as well as brief descriptions, you can access the pipeline syntax from any pipeline job page and click “Global Variables Reference.”

Now, we can start piecing these sections together. In short, we are going to have 4 stages for our pipeline:

1. Checkout code from public or private repo (GitHub / BitBucket in my demos)
2. Build and push to Azure Container Registry
3. SSH Tunnel to Azure Container Service Docker Swarm Cluster
4. ACS Docker pull (from ACR) and run

We have already gone through our first stage. Our second stage will be simple enough now that we have stored our ACR credentials.

// Build and Deploy to ACR 'stage'... stage('Build and Push to Azure Container Registry') { app = docker.build('acrjdtest.azurecr.io/node-demo') docker.withRegistry('https://acrjdtest.azurecr.io', 'acr_credentials') { app.push("${env.BUILD_NUMBER}") app.push('latest') } }

As you can see, we create a variable entitled *“app”* for our image with the docker.build command and specify the name of our image. We set our credentials for ACR by using “*docker.withRegistry*” and follow up with app.push to push two versions of our image to our ACR;  one is tagged with the build number and the second is tagged as the latest version.

Our 3rd stage is our SSH tunnel to our ACS Docker Swarm cluster. I’ve [blogged on this](https:/jessicadeen.com/tech/azure-container-service-how-to-create-an-ssh-tunnel/) before so I’m not going to deep dive into this section again.

Our 4th stage is pulling/running our newly built and previously pushed app from our private Docker repo in ACR.

// Pull, Run, and Test on ACS 'stage'... stage('ACS Docker Pull and Run') { app = docker.image('acrjdtest.azurecr.io/node-demo:latest') docker.withRegistry('https://acrjdtest.azurecr.io', 'acr_credentials') { app.pull() app.run('--name node-demo -p 80:8000')

We define our image name again in our “*app*” variable and include the latest tag. We then login to ACR, again, using *“docker.*withRegistry*“. *We need to do this again because this time we are logging into our ACR from our Docker Swarm cluster and not our Jenkins build server. Finally, we pull our image using app.pull() and run it in a detached container by using *“app.run(‘–name node-demo -p 80:8000’)”*. In the parenthesis of *app.run* we add any additional args needed for our app. My node app uses port 8000, but you will want to update these ports to suit your environment.

That’s it for today! Comment below with any tips or feedback! I’d love to hear from you.

