+++
author = "jldeen"
categories = ["azure devops", "Azure", "devops"]
date = 2019-09-07T19:30:00Z
description = ""
draft = false
image = "../../images/Screen%20Shot%202019-09-04%20at%2011.50.47%20PM.png"
slug = "how-to-setup-an-end-to-end-azure-devops-pipeline-from-the-azure-portal"
tags = ["azure devops", "Azure", "devops"]
title = "How to setup an end-to-end Azure DevOps pipeline from an Azure Web App"

+++


I know what you're thinking, "I already know about the [DevOps Project in Azure](https://docs.microsoft.com/en-us/azure/devops-project/) - that's awesome!" Maybe you do (and maybe you don't) but this post is not about the Azure DevOps project - it's a post about how easy it is to get started with DevOps when all you have is your code.

## Preface

I recently set out on a mission to optimize images when using Ghost + Azure Storage since Ghost, as of the date of this post, does not support image optimization with 3rd party storage adapters. I do have an update coming to my [npm Ghost-Azurestorage adpater](https://www.npmjs.com/package/ghost-storage-azure) to solve this probblem as part of the adapter itself, but in my research I came across an ASP.NET (not .NET Core) Image Resizer that was awesome... only I run this blog in a linux container within an Azure Web App. I thought about running the Image Resizer as an Azure Function but as of Azure Functions 2.0 only .NET Core is supported. My next thought was to test the Image Resizer as a Windows Web App using the free service plan. This post is _not_ about the Image Resizer itself (that will be a future post), but I will use the [Image Resizer code](https://github.com/jldeen/image-resize-server) as demo code for this post.

## Getting started

Once I have your app ready to be deployed (I just updated the `web.confg` file with my `Azure Storage Connection String` on a private repo version of our demo code and in a future post will walk through using Azure Keyvault instead), you'll head on over to the Azure Portal to setup a Windows Web App.

From within the portal, you'll click the "+" sign in the top left corner, typed, `web app`, and hit `enter`. You should see the Azure Web App creation page pop up, and when you do, hit `create`.

![Screen%20Shot%202019-09-04%20at%2011.35.43%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.35.43%20PM.png)

From there, you'll just need to fill in a few key details - your resource group, app name, runtime stack, location, for your AppServicePlan, you can select the `F1 Free Sku` just as I did in the below example. From there, hit `Review and Create`. 

![Screen%20Shot%202019-09-04%20at%2011.38.36%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.38.36%20PM.png)

You'll get a brief summary page and then you can confirm your new Web App settings and create your app by clicking the official Create button. Here's an example:

![Screen%20Shot%202019-09-04%20at%2011.41.20%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.41.20%20PM.png)

Your deployment will take a few minutes (mine took as long as writing this sentence did) and then after, you'll have a shiny new empty Windows Web App. Simply navigate to the resource by clicking the Go to resource button.

![Screen%20Shot%202019-09-04%20at%2011.45.18%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.45.18%20PM.png)

## The DevOps Part (in 3 Steps)

First, I hope Lynyrd Skynyrd's song, "Gimme Three Steps" popped into your head too... 

Anyway, after you opted to view your newly created resource, you'll see a dashboard for it. On the left hand side of the dashboard you should see a `Deployment` section with 3 options: 

* Quickstart
* Deployment Slots
* Deployment Center

![Screen%20Shot%202019-09-04%20at%2011.45.59%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.45.59%20PM.png)

Click on Deployment Center and you'll notice this is no "Right click, publish" (Damian Brady says friends don't let friends do that), nor is this a "Deploy from Git directly to this Web App" (That's the same as right click, publish in my book). The first thing we have to do is select where our code lives and 8 options are available (Azure Repos, GitHub, BitBucket, Local Git, OneDrive, Dropbox, External Git and FTP). 

![Screen%20Shot%202019-09-04%20at%2011.50.47%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.50.47%20PM.png)

 I chose GitHub since that's where _all_ my code lives and then I hit "Continue."

Note: You may have to authorize a connection to GitHub if you have not done so previously.

The next screen (Step 2) gives you two options for "Build Provider": App Service build service and Azure Pipelines. Select Azure Piplines and hit "Continue."

![Screen%20Shot%202019-09-04%20at%2011.54.09%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-04%20at%2011.54.09%20PM.png)

Step 3's screen has you select options relevant to your code and Azure Pipelines. You'll have to select your GitHub organization, repository, and branch, as well as your Azure Pipelines organization, project and web application framework. 

Note: If you don't have an Azure Pipelines organization, you can create one from this step, too. 

![Screen%20Shot%202019-09-05%20at%2012.01.19%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.01.19%20AM.png)

Click "Continue" to see the final summary page where you just have to click "Finish" to create your pipeline.

![Screen%20Shot%202019-09-05%20at%2012.02.20%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.02.20%20AM.png)

This will take a few minutes (mine took aout 5 minutes with a page refresh thrown in) so now might be a good time to grab coffee/tea/water/whiskey/etc. Stay hydrated, folks! 

![drink up](https://media.giphy.com/media/YPuz1mpVja6Na/giphy.gif)

Once your deployment completes you'll see a summary page with deep links over to your build, release and successful Azure Pipelines and Deployment.

![Screen%20Shot%202019-09-05%20at%2012.15.58%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.15.58%20AM.png)

When you click those links, you'll see your completed pipeline with tasks that make sense for the runtime stack and deployment location. 

For example, when I clicked the build link, I was able to see my Azure Pipelines CI page with a successful build. 

![Screen%20Shot%202019-09-05%20at%2012.20.25%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.20.25%20AM.png)

And when I clicked edit, I saw the tasks that were preselected and preconfigured for my app.

![Screen%20Shot%202019-09-05%20at%2012.19.08%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.19.08%20AM.png)

My first build was successful (whew) and here's an example of what that looks like:

![buildExample](https://cdn.jessicadeen.com/content/images/size/600/buildExample.png)


My release pipeline looks the same - configured with tasks (one task) that made sense for my scenario.

![Screen%20Shot%202019-09-05%20at%2012.22.51%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.22.51%20AM.png)

And, again "whew", my release pipeline was successful.

![Screen%20Shot%202019-09-05%20at%2012.22.19%20AM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-09-05%20at%2012.22.19%20AM.png)

Finally, my image resizer was up and running without any manual work done by me to create the pipeline. Now, off course the pipeline created is just a framework - it's by no means ready for production (even though the release stage is labeled `production`) and it **will** need to be modified... but it's a great start with low barrier to entry. 

Here's an example of the Image Resizer in action:

[![imageresize.gif](https://s3.gifyu.com/images/imageresize.gif)](https://gifyu.com/image/hFxr)

Oh and did I mention the web site created even comes with an SSL certificate? 

## And now, jam time

<iframe src="//coub.com/embed/xjeyp?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen frameborder="0" width="412" height="360" allow="autoplay"></iframe>









