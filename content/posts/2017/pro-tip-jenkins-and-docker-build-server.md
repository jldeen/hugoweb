+++
author = "jldeen"
date = 2017-08-18T18:01:43Z
description = ""
draft = false
image = "../../images/226px-Jenkins_logo.svg__adchzg.png"
slug = "pro-tip-jenkins-and-docker-build-server"
title = "Pro tip: Jenkins and Docker build server"
layout = "post"

+++


I’m currently sitting at a coffee shop with a Microsoft partner and we just spent the last hour banging our head against the table over the following error as part of our Jenkins pipeline project when running our docker.build command:

got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: xxxxx

We finally figured out the issue by looking at my own Jenkins build server history commands (shout out to ‘history | grep usermod’ FTW) and I had to stop and blog about the solution immediately, if for no other reason than my own reference:

sudo usermod -aG docker $USER sudo usermod -aG docker jenkins

As part of Docker’s own [post-install documentation](https://docs.docker.com/engine/installation/linux/linux-postinstall/), we know that we need to run the first command. However, the second command isn’t documented thoroughly enough, especially since it’s NOT the name of whatever your system user is (or Jenkins user for that matter – I.E jenkinsuser or jenkinsadmin or bob), it’s simply “jenkins.”

