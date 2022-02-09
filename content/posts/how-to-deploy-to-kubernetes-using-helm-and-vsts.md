+++
author = "jldeen"
categories = ["aks", "ci/cd", "devops", "helm", "k8s", "pipeline", "vsts"]
date = 2018-03-13T06:52:54Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-03-08-at-19.57.01_mxv56u.png"
slug = "how-to-deploy-to-kubernetes-using-helm-and-vsts"
tags = ["aks", "ci/cd", "devops", "helm", "k8s", "pipeline", "vsts"]
title = "How to Deploy to Kubernetes using Helm and VSTS"

+++


I cannot even express how excited I am for this post. As most of you know, I blog/speak pretty extensively about all things Linux and Open Source, however, today, I get to do that and also tie in some Visual Studio Team Services (VSTS). One of the questions I have been frequently asked is, “How do I deploy to Kuberentes (K8s) via VSTS if I also want to use Helm?” Previously, I didn’t have an answer I could or would stand behind, but today I do.

First, some points to clarify:

- This is still a preview feature. It’s not perfect.
- There are tools that do certain things easier when it comes to Kubernetes and Helm
- I am working with everyone I can to ensure the experience for K8s and Helm deployments via VSTS is the same positive (if not better) experience one would get via Jenkins, Codefresh, Codeship, Travis CI, etc.

Now, let’s get started… some assumptions:

- You already have a Kubernetes Cluster available
- You have [helm](http://helm.sh/?wt.mc_id=vsts-helm-blog-jessde) installed on your K8s cluster
- You have a VSTS collection/account. If you don’t have one, you can [click here](https://www.visualstudio.com/team-services/?wt.mc_id=vsts-helm-blog-jessde) to create one for free.

From within your VSTS account, you will need to create a new project for your deployment.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.20.04_fu7oeh.png)

Next, you’re going to need to grab some code. If you want to play along with this post, I have a helm chart demo on my GitHub you can use [here](https://github.com/jldeen/croc-hunter/?wt.mc_id=vsts-helm-blog-jessde). It’s the same repo I use with other CI/CD tools. I chose to import rather than use my existing public repo since VSTS gives me unlimited private repos for free.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.22.26_l7furk.png)

Now that I have my code imported, I’m going to setup my build.

**<span style="text-decoration: underline;">Build – Continuous Integration</span>**

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.24.35_nluyir.png)

I will opt to start with an empty process.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.25.48_q9llvt.png)

And the first thing I will do is update my Agent Queue to use the Hosted Linux Preview agent. All the hosted agents available under Agent Queue are machines hosted for you by VSTS in Azure and they are ready for you to use.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.27.18_iiwhfz.png)

Next, I will get sources and choose my VSTS Git repo, leaving it using the master branch for now. (Future blog post will walk through DevOps best practices with multiple branches and PRs)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.28.31_k9uu67.png)

I will then add my tasks. During the build process, I’m really just going to build my image and push it to my private repo. For this blog post, I will use Azure Container Registry, but in other public demos, I have also used private registries like JFrog’s Artifactory, Docker Hub, and Codefresh. I will add 3 tasks – 1 docker task to build, 1 docker task to push, and 1 publish artifact task to copy my artifact files for release (I.E my helm charts).

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.34.40_soaoht.png)

You’ll notice my Dockerfile is simply in my root directory. If you are using a repo other than my demo one, you’ll have to select the location of your Dockerfile. Also, in both my build and push steps, I am telling it to tag the image using the BuildId and the latest tag. The BuildId is unique and will increment with each new build; this will allow helm to identify new releases by a change in the image name.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.34.57_ifyeca.png)

In my final step, Publish Artifact, I am providing the location of my chart files and naming the artifact “charts.” I am also opting to publish directly to VSTS (as opposed to a file share). The publishing artifacts task allows me to “handoff,” so to speak, files I want to use in my release stage.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.39.16_rce1gn.png)

That’s it – you can save it now. Let’s move on to Releases – hit the Releases tab at the top.

**<span style="text-decoration: underline;">Release – Continuous Deployment</span>**

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.41.54_rxxt2s.png)

We will start by creating a new definition.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.43.30_xp3esw.png)

And again chose “Empty Process.”

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.44.13_uxt6vy.png)

Next, we will name our environment. I have named mine “dev” – note the lowercase alphanumeric characters – this is intentional and I advise you to do the same since we will use an environment variable using this data in a future blog post. Speaking of, my next post will deep dive into DevOps best practices on VSTS and Helm. In that demo we will pull in the name of the environment you’re deploying to and use it for a full dev > qa > prod pipeline. Helm, as a standard, cannot use capital letters in the release names – you can only use alphanumeric characters, hyphens or periods, also, do not use spaces as a single space is how Helm separates each new argument.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.46.05_zoxg2e.png)

Now we have to add our build artifact – so click add on the left-hand side under Artifacts. The source type should default to “build” (leave it), and under source (build definition), let’s select the build definition we created earlier and hit add. If you see a red message at the top like in my screenshot, that’s okay, it’s just saying a build doesn’t exist yet because we haven’t triggered a build. Had we of triggered a build, we wouldn’t see this message and our release would have connected our artifact automatically. I want to walk through how to do things manually, just to be thorough.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.48.29_ibqsqw.png)

Let’s also add a continuous deployment trigger.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.51.45_cow1rw.png)![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.51.54_vll3xw.png)

And now let’s configure our dev environment’s tasks.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.54.34_u5ff0a.png)

Under Agent Phase, we again will tell our Release to use a Hosted Linux Agent for our Agent queue.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.56.11_iksd62.png)

Finally, we get to add our tasks. We need to add 2 instances of the Microsoft Deploy to Kubernetes task (Namespace and Secret creation) followed by the [Helm Extension created by Don Ebben](https://marketplace.visualstudio.com/items?itemName=debben.vsts-helm-extension/?wt.mc_id=vsts-helm-blog-jessde) (you will have to install this one, it’s free).

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.57.28_hutrfq.png)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-16.59.16_pvdrqg.png)

Now we have to setup our Kubernetes Service Connection. Under the first Kubernetes task, you will see an option for it with a “Manage” link right next to it. Let’s open that in a new tab. ![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.01.47_zit0bf.png)

From there, click “New Service Endpoint” in the top left corner and select Kubernetes.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.02.37_rfrbja.png)

You will then need to put in your Kubernetes cluster information. You can find it in $HOME/.kube/config. ![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.04.53_xo9n51.png)

Hit OK to save it and return to the previous window where we were configuring our K8s and Helm tasks. We should be able to hit the ‘refresh’ icon next to the Kubernetes Service Connection box and find out K8s cluster available. Let’s select it.

Now we will update our “Create Namespace” and “Create Secret” tasks. Both Kubernetes tasks will be “create” tasks because we are creating a namespace for our helm deployment and creating a secret for that namespace to pull our image from our private repo.

Create Namespace Arguments

namespace $(namespace)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.14.35_qxzwdu.png)

Create Secret Arguments – update the bold and underlined text with your own info; you may leave the email as is unless you wish to update it with your own address.

`secret docker-registry vsts-secret --docker-server=<span style="text-decoration: underline;"><strong>server-address-here</strong></span> --docker-username=<span style="text-decoration: underline;"><strong>username-here</strong></span> --docker-password=$(regPass) --docker-email=ServicePrincipal@AzureRM`Example:

secret docker-registry vsts-secret --docker-server=acrjdtest.azurecr.io --docker-username=acrjdtest --docker-password=$(regPass) --docker-email=ServicePrincipal@AzureRM

Under Create Secret, also fill in the Namespace field with:

$(namespace)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.14.18_lyn4ht.png)

Finally, for both tasks, we need to choose “continue on error” under Control Options. This will allow our release to proceed even if the namespace or secret already exists. I know this isn’t ideal, but it is a working deployment method for Helm and VSTS at this time. I am working to refine this part as a whole.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.16.01_kg6crx.png)

Let’s move on to our “helm deploy” task. We will again select our Kubernetes cluster under Kubernetes Service Connection. I am running Helm 2.7.2 on my cluster so I will specify that version of Helm.

Next, the command I want to use for my helm task is the “upgrade” command. **We don’t want to use the “install” command since the release plan will run and deploy a release of the chart the first time, but would fail on subsequent releases as there already is a chart with that name installed.**

The arguments you will want to use are as follows:

$(releaseNameDev) . --install --force --reset-values --namespace $(namespace) --wait --set image=$(image) --set imageTag=$(Build.BuildID) --set imagePullSecrets=$(imageSecret) --set ingress.hostname=$(hostnameDev)

I am using an Nginx ingress controller for my DNS/hostname – that’s a blog post for another time. You’ll notice I’m using the –set flag to override settings in my values. yaml. I’m only choosing to do this for two reasons:

- To show you that it’s possible
- I have another tool using my values.yaml file and didn’t want to change it

Note the “.” (period) in between $(releaseNameDev) and the –install flag. This is intentional as I am specifying my working directory in the field beneath arguments so my helm task will run from my croc-hunter folder and be able to find my Chart.yaml file.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.24.47_bprih1.png)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.23.45_kf8c2t.png)

Now, you will notice I’m using a lot of variables – this is so I can quickly update fields and use vars in multiple environments in the future. To access the variables part of our release, simply click the “Variables” button at the top in between “Tasks” and “Retention.” You will want the following variables when following this demo. Fill them in with the appropriate values.

```
hostnameDev
image
imageTag
namespace
regPass
releaseNameDev
imagesecret
```
![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.29.50_ewudo4.png)

Rename your release definition, be sure to use all lowercase letters, and then save it.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.31.22_kcy5ox.png)

Now, we are ready to go back to our Builds tab and hit “Queue New Build.”

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.33.35_nyahbh.png)

We can watch as our build completes.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-19.44.20_pgq0vg.png)

And now let’s go create a release using our newly completed build.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-19.57.01_mxv56u.png)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-19.57.48_yn7y52.png)

**Some things to note. **

You will not see the release as “green” after the initial release where the namespace and secret are both created. This is due to the “continue on error” flag we set earlier on in both Kubernetes tasks. Instead, you will see an orange color for the release and any errors noted in the Summary section. “Namespace and secret already exist” errors will typically look like this (the below screenshot is from a test build/release, not this demo):

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-08-at-17.48.07_tphbxt.png)

Ideally, I would like the namespace and secret creation options to be individual fields under the helm task and have a “Force update” checkbox where the secret and namespace will automatically be deleted and recreated if found (similar to how the Kubernetes extension task works).

Still, this blog post details a workaround allowing for successful helm deployment to Kubernetes via VSTS.

Final note, I *strongly* recommend creating your own build/release agents (the same agent can handle both tasks), as I found myself waiting as much as 10 minutes for a hosted agent to become available.

