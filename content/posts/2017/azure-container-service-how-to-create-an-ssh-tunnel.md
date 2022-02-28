+++
author = "jldeen"
categories = ["ACS", "Azure", "Azure Container Service", "Docker", "linux", "ssh"]
date = 2017-03-17T08:00:08Z
description = ""
draft = false
image = "../../images/15603_Microsoft-Azure-Container-Service_m6s48o.jpg"
slug = "azure-container-service-how-to-create-an-ssh-tunnel"
tags = ["ACS", "Azure", "Azure Container Service", "Docker", "linux", "ssh"]
title = "Azure Container Service: How to create an SSH Tunnel"
layout = "post"

+++


In my [last post](https:/jessicadeen.com/tech/updated-azure-container-service-how-to-communicate-between-two-docker-swarm-containers/), I spoke about linking containers together in Docker and, specifically, Docker Swarm in Azure Container Service. One of the points I touched on was the need to create an SSH tunnel to connect to your Docker Swarm cluster in ACS. Today’s post, video really, will go in depth on creating the SSH tunnel on Linux, Mac, and Windows.

To learn more, [head on over on Channel 9](https://channel9.msdn.com/Shows/Azure-Container-Service/Azure-Container-Service-How-to-create-an-SSH-Tunnel) and let me know your thoughts! Please let me know if you have any questions, get stuck, just want to say hi, or you have other ideas for content. I’d love to hear from you!

In this video we review the following:

– Review SSH tunnels and how they work  
 – SSH tunnel creation on Linux / Mac  
 – SSH tunnel creation on Windows via PuTTY

**Primary ssh tunnel code (Linux and Mac) used in this video is:**

ssh -fNL 2375:localhost:2375 -p 2200 azureuser@[dnsprefix]mgmt.[location].cloudapp.azure.com

**ACS resource links mentioned in the video:**

– [Make a remote connection to a Kuburnetes, DC/OS, or Docker Swarm cluster](https://docs.microsoft.com/en-us/azure/container-service/container-service-connect "Make a remote connection to a Kuburnetes, DC/OS, or Docker Swarm cluster")

