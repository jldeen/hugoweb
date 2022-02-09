+++
author = "jldeen"
date = 2021-01-05T22:09:41Z
description = ""
draft = true
slug = "untitled-4"
title = "Automatic magic Ghost Blog (with Azure DevOps and GitHub Actions!)"
layout = "post"

+++


If you've played with Ghost at all, you know automatically keeping it updated is a challenge. If you're new, this blog runs on Ghost. Ghost is a headless CMS system that enables you to run a blog easily with just a few commands. I have a getting started video on YouTube here. 

Now, for the past few months, I have been working on a pipeline using Azure DevOps and GitHub actions that will keep my blog fully updated, theme included, and I want to share how it works.

First, if everything were to blow up tomorrow, I could stand up my new blog, all environments (dev, qa, and prod), with a click of a button. This blog runs in Azure, and while I've played with several different ways of hosting it (Kubernetes, Azure Container Instances, and Azure Web Apps), this currently runs in a Linux Container within Azure Web Apps. I have two slots - QA and Prod, that I can use to have zero downtime deployments. For Dev, I use Azure Container Instances Deployment Groups - the group, when my pipeline hits the dev stage, will stand up a MySQL container and Ghost container (with my custom Ghost image), and link everything together.

To create a link between webapp and ACR, we need to use a managed identity. While there isn't much documentation about how to handle managed identity role assignments when using service principals, I did find [this medium post](https://medium.com/microsoftazure/how-to-perform-role-assignments-on-azure-resources-from-an-azure-devops-pipeline-c9f4dc10d0a4) which helped a lot. Note: Option 1 is not secure and not recommended. I went with option 2, which was to use assignee-object-id as the principalId I pulled from the webapp identity command works great with it.



