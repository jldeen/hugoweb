+++
author = "jldeen"
categories = ["aks", "helm", "azure devops", "Azure", "ci/cd", "bash"]
date = 2019-11-12T12:00:00Z
description = ""
draft = false
image = "../../images/image002.png"
slug = "using-helm-3-with-azure-devops"
tags = ["aks", "helm", "azure devops", "Azure", "ci/cd", "bash"]
title = "Using Helm 3 with Azure DevOps"

+++


I received an email last week asking if I had tried to use Helm 3 in an Azure DevOps pipeline; the truth is, I hadn't. I have done quite a few Helm 3 demos and workshops, but it was easier to use a CI/CD tool that would support a container based pipeline since I already have a container with Helm 3 setup. 

I decided I'd give Helm 3 + Azure Pipelines a shot and here's what I learned...

As of the writing of this post, Helm 3 is not natively supported __yet__ with Azure DevOps. Right now, if you were to use the HelmInstall task with the latest Helm 3 RC release you would get an error like this:

![Screen%20Shot%202019-11-11%20at%2021.54.28](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-11-11%20at%2021.54.28.png)

This is because of how the HelmInstall task is written. In case you didn't know, [Azure Pipelines tasks are open source and available on GitHub](https://github.com/microsoft/azure-pipelines-tasks). With a quick search in the repo, I found [the problem](https://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/HelmInstallerV1/src/helmtoolinstaller.ts#L25-L26) almost immediately: `init` and `--client-only` are hard coded as arguments in a `verifyHelm` async function.

I have since [opened a PR](https://github.com/microsoft/azure-pipelines-tasks/pull/11735), which hopefully will get accepted rather quickly, but in the meantime if you want to use Helm 3 with Azure Pipelines you have two options:

1. You can simply opt to "continue on error" since the task does install Helm 3, it just also fails its own verification.

![continue-on-error](https://cdn.jessicadeen.com/content/images/size/600/continue-on-error.png)

The downside of this is you will not have a pretty green pipeline. Instead, your install task will be yellow with a "Partially Succeed" notification and "1 error" next to the install task.

![Screen%20Shot%202019-11-11%20at%2022.00.29](https://cdn.jessicadeen.com/content/images/size/600/Screen%20Shot%202019-11-11%20at%2022.00.29.png)

![Screen%20Shot%202019-11-11%20at%2022.00.59](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202019-11-11%20at%2022.00.59.png)

This doesn't look very good so I came up with a second, less than ideal, but much more green alternative.


2. You can use the following script as an inline bash task with an Ubuntu hosted (or private) agent:

```
set -eou pipefail
 
#set helm version
helmVersion=helm-v3.0.0-rc.3-linux-amd64.tar.gz
 
#download helm version
wget https://get.helm.sh/$helmVersion
tar xvzf $helmVersion
sudo mv linux-amd64/helm /usr/bin/helm
 
```
Now, this works fine and installs Helm 3 without errors.
![image002](https://cdn.jessicadeen.com/content/images/image002.png)

However, you will need to add an additional task for Helm 3 to actually work; this is because of the removal of tiller. Helm 3 removes the `init` command since there is no more tiller and as such authentication to your Kubernetes cluster also changes; or rather, __how__ you authenticate changes. Helm 3 communicates directly with the Kubernetes API, which is significantly better for security (no more clusterolebindings and tiller serviceaccounts with Godmode flying around). 

From a local client system, this isn't an issue since we all tend to have Kubernetes contexts with the appropriate permissions added. With that in mind, when it comes to your build server, you will now have to consider **how** you securely pass the Kubernetes context/config over. The HelmInstall task handles the config/context handoff for you by selecting your cluster as part of the task, but since this 2nd green option is just a script you have to put a kubectl task right before it. In my testing I just selected the `kubectl` task and manually typed version. This also helps me have a record of my cluster version in my logs, though in truth, I don't know how necessary the version log component really is. 

By placing a `kubectl` task right before my helmInstall-bash-inline-script-task, the hosted or private build agent would now have access to my cluster for both Kubernetes and Helm 3. Here's an example of my tested pipeline with this 2nd option.

![image001](https://cdn.jessicadeen.com/content/images/image001.png)

Another reminder about changes in Helm 3 - releases are now per namespace. You can view all releases (as you previously would in Helm 2) by adding the `--all-namespaces` flag to the end of your `helm ls` and this will list ALL releases you have on your cluster.

There are quite a bit more changes, updates, and new functionality in Helm 3 that are out of scope for this blog post. If you're curious and you haven't seen Helm 3 in action yet, I did a [webinar with Codefresh](https://codefresh.io/events/helm-3-navigating-distant-shores/), a Kubernetes native and dedicated CI/CD platform (also container based), about a month ago. I promise it's not pitchy.

Comment below if this helps you and I'll be sure to update it once the PR is merged.



