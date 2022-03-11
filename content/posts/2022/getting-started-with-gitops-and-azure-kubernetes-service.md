+++
author = "jldeen"
date = 2022-02-01T00:04:14Z
description = ""
image = "/images/2022_argo_success_sync_big.png"
draft = false
slug = "getting-started-with-gitops-argo-and-azure-kubernetes-service"
title = "Getting started with GitOps, Argo, and Azure Kubernetes Service"
layout = "post"

+++

## What is GitOps?
First, what is GitOps? Is it the same as DevOps? I'm so glad you asked. Let's begin with a refresher on what DevOps is:

> DevOps is the union of people, process, and products to enable the continuous delivery of value to our end users. ~ [Donovan Brown](https://twitter.com/donovanbrown)

Donvoan puts it best - DevOps is a combination of several key factors: people, process, and products - but it starts with people. Getting started with DevOps involves a cultural shift, which means it's so much more than buzz words like _agile_, _continuous integration_, _continuous deployment_, _automation_, etc. While those buzz words have their place and are needed, truly embracing DevOps means creating a DevOps culture between your engineering teams - this includes developers, operations, and security.

GitOps is different than DevOps because it focuses **specifically** on practices designed to improve infrastructure and application configuration management using Git. If you're new to cloud native and the development space, Git is an open source distributed version control system using what is called repositories. A repository is the `.git/` folder inside of your project. This repository will track all changes made to your project, thus creating a history as the project grows.

To summarize, the TL;DR of DevOps vs. GitOps - one is about a culture shift among your engineering teams and includes practices and products you can use to help further this shift, the other is about practices you can put in place when using Git for your development.

## What is Argo?

Second, what is Argo? Again, I'm so glad you asked. Simply put, Argo is a declarative GitOps continuous delivery tool specifically designed for Kubernetes. Argo relies on Git to be the "source of truth" for defining everything you want for your application state; essentially, you are declaring the state of the world you want for your application, and Argo will either ensure it is that way, or alert you if it is not that way (I.E. out of sync).

## How do I get started with Argo and Kubernetes?
Third, how hard is it to get started with Argo and Kubernetes in Azure? Yet again, I'm so glad you asked! You have great questions! As it turns out, it's quite easy. If you already have an Azure Kubernetes (AKS) cluster, you can just go about deploying argo to a namespace in your existing Kubernetes cluster; if you don't have an existing AKS cluster, you can create one by following the documentation [here](https://docs.microsoft.com/azure/aks/kubernetes-walkthrough?WT.mc_id=opensource-52942-jessde).

### Pre-Requisites
You will need the following command line tools installed to proceed with getting started:
- [Kubernetes binary (kubectl)](https://kubernetes.io/docs/tasks/tools/)
- [Argocd binary (argo)](https://argo-cd.readthedocs.io/en/stable/cli_installation/)
- [Azure CLI (optional, but recommended)](https://docs.microsoft.com/cli/azure/install-azure-cli?WT.mc_id=opensource-52942-jessde)
- [Access to your AKS cluster](https://docs.microsoft.com/azure/aks/kubernetes-walkthrough?WT.mc_id=opensource-52942-jessde#connect-to-the-cluster)

#### Installing Argo and configuring a connection

Once you have your command line environment setup with access to your Azure Kubernetes cluster, you will want to use `kubectl` to create a namespace. The following command demonstrates creating a namespace named, `argocd`, but you may name it as you like:

`kubectl create namespace argocd`

After you have your namespace created, you will want to run the following command. If you used an alternate namespace name, you will want to update the following command with that name. The following example demonstrates how to install argocd into the `argocd` namespace:

`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`

The above command will create several custom resource definitions (CRDs), service accounts, network policies, configmaps, and other Kubernetes objects in the specified namespace. 

If you'd like to check the resources created, you can run the following command. Again, be sure to use the namespace name you created:

`kubectl get all -n argocd`

The Argo CD API server service is not exposed by default; this means it is configured with a Cluster IP and not a Load Balancer. To access the API server you will have to do one of the following:

1. Configure a Load Balancer 
   - A quick an easy fix would be to simply patch the argocd-server service and change the service type to LoadBalancer. If you'd wish to follow this route, run the following command:
   
   `kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'`

   **Note:** The above command is for demonstration purposes only. Realistically, you should define your deployment, including service type (NodePort, ClusterIP, or LoadBalancer) during deployment. Patching services is great for learning, but should not be relied upon beyond that.

   To connect to your Argo server service using this method, you will need to get the external IP for the newly created load balancer. To get the external IP, run the following command:

   `kubectl get services --namespace argocd argocd-server --output jsonpath='{.status.loadBalancer.ingress[0].ip}'`

2. [Setup an Ingress Controller](https://docs.microsoft.com/azure/aks/ingress-basic?tabs=azure-cli&WT.mc_id=opensource-52942-jessde) 
   - If you'd like to setup an Ingress controller, you can follow the documentation provide in the above link.

   To connect to your Argo server service using this method, you will need to use the ingress IP address or FQDN for your newly created ingress. This method is more advanced and requires a basic understanding of networking and routing to configure. 

3. Use Port Forwarding 
   - Finally, you can use port forwarding to simply connect to the `argocd-server` service in your kubernetes cluster. The following command demonstrates how you would use the kubectl to port forward to said service in the `argocd` namespace using a local port of 8080 and a container port of 443. 
   
   `kubectl port-forward svc/argocd-server -n argocd 8080:443`

   To connect to your Argo server service using this method, assuming you have kept the local port of `8080`, you will use the following address: `http://localhost:8080`

   **Note:** Using the port-forwarding method creates a "streaming" connection from your computer to the Argo service running in your Kubernetes cluster. You will need to keep this connection open in your terminal or command line instance. Below is an example of what this looks like:

   ![Argo Port Forward Example](/images/2022_argo_blog_1.png) 

#### Logging into Argo
Once you have configured how you will connect to the argo server service running in AKS, the next step will be to login. 

The default username is `admin` and the password is auto generated and stored as clear text. You can retrieve this password using the following command:

`kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo`

You can login one of two ways to Argo: 

1. From the CLI
   - From your terminal, assuming you have already installed the pre-requisite argocd binary, you can simply type: `argocd login 127.0.0.1:8080`, enter the default username `admin` and the password you retrieved in the previous command.

2. From the Web
   - From your preferred browser, navigate to `http:localhost:8080` and enter the username `admin` as well as the password you retrieved in the previous command.

#### Creating (Deploying) your first Argo Application

Once you have logged into Argo, you will want to create an application from a git repository. In the context of Argo, the word `create` really means `deploy`.

For visualization purposes, I have included an example of the screen you will see when you login from the web:

![Argo Create an App](/images/2022_argo_create_app.png)

There is an example repository containing a guestbook application available on Argo's GitHub page. This is a simple app to demonstrate how Argo CD actually works.

You can create the app one of two ways - either via CLI or UI. If you wish to create the app via the command line using the argo binary, you would run the following command:

##### CLI
`argocd app create guestbook --repo https://github.com/argoproj/argocd-example-apps.git --path guestbook --dest-server https://kubernetes.default.svc --dest-namespace default`

Once you have configured the sample application within argo, you will need to sync the application. In the context of Argo, syncing will deploy the application within your Kubernetes cluster. 

`argocd app get guestbook`

`argocd app sync guestbook`

##### Web Browser

From within your preferred web browser, after you have logged into Argo, you will click the "+ New App" button. An example is included below:

![New App Example](/images/2022_new_app_argo.png)

Next, you will name your application `guestbook` and use the default project. For now, you can leave the sync policy as `manual`. Again, an example of this screen is below:

![app ui information](/images/2022_app_ui_information.png)

Next, you will connect the example repo (https://github.com/argoproj/argocd-example-apps.git) to Argo by setting the repository URL to the GitHub repo URL. You can leave the revision as `HEAD`, and set the path to simply, `guestbook`.

![](/images/2022_connect_repo.png)

For `Destination`, you will select the `https://kubernetes.default.svc` option from the dropdown list and set the namespace to `default`.

Finally, you can click the create button at the very top of the screen to create your application in Argo.

![](/images/2022_create_guestbook_ui.png)

You have now created your first application in Argo!

#### Sync (Deploy) the Application

Once your applicatoin ins created, you can view the status via the CLI or web. 

- To view the status via the CLI, you can type, `argocd app get guestbook`. 
  
- To view the status via the Web, you should just see the app on your screen under the management tab. Here is an example:
  ![manage guest book status](/images/2022_ui_guestbook_status.png)

Initally, you will notice your application sync status is `OutOfSync` and your health status is `Missing`. These status display this way because while you created the application within Argo, you have yet to actually tell Argo to *deploy* the Guestbook application, thus, no Kubernetes resources have been created.

To sync (aka deploy) the Guestbook application you can run `argocd app sync guestbook` from the command line, or you can click the sync button under your application page in your web browswer. 

![](/images/2022_sync_app_ui.png)

The sync command in Argo will retrieve the sample Kubernetes manifest from the Guestbook repository. Once the Kubernetes manifest is retrieved, Argo will run a `kubectl apply` command behind the scenes. The guestbook app should now be running in your AKS cluster, and you should be able to view its resource components, logs, evets, and even health status via the CLI or web brower.

![](/images/2022_argo_success_sync_small.png)

![](/images/2022_argo_success_sync_big.png)
