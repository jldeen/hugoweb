+++
author = "jldeen"
date = 2022-02-01T00:04:14Z
description = ""
draft = true
slug = "getting-started-with-gitops-argo-and-azure-kubernetes-service"
title = "Getting started with GitOps, Argo, and Azure Kubernetes Service"
layout = "post"

+++


## What is GitOps?
First, what is GitOps? Is it the same as DevOps? I'm so glad you asked. Let's begin with a refresher on what DevOps is:

> DevOps is the union of people, process, and products to enable the continuous delivery of value to our end users. ~ Donovan Brown

DevOps is a combination of several factors - people, process, and products - but it starts with people. Getting started with DevOps involves a cultural shift, which means it's so much more than buzz words like agile, continuous integration, continuous deployment, automation, etc. While those buzz words have their place and are needed, truly embracing DevOps means creating a DevOps culture between your engineering teams - this includes developers, operations, and even security.

GitOps is different because it focuses specifically on practices designed to improve infrastructure and application configuration management using Git. If you're new to cloud native and the development space, Git is an open source distributed version control system using what is called repositories. A repository is the `.git/` folder inside of your project. This repository will track all changes made to your project, thus creating a history as the project grows.

To summarize, the TL;DR of DevOps vs. GitOps - one is about a culture shift among your engineering teams and includes practices and products you can use to help this shift, the other is about practices you can put in place when using Git for your development.

## What is Argo?

Second, what is Argo? Again, I'm so glad you asked. Simply put, Argo is a declarative GitOps continuous delivery tool specifically designed for Kubernetes. Argo relies on Git to be the "source of truth" for defining everything you want for your application state; essentially, you are declaring the state of the world you want for your application, and Argo will either ensure it is that way, or alert you if it is not that way (out of sync.)

## How do I get started with Argo and Kubernetes?
Third, how hard is it to get started with Argo and Kubernetes in Azure? Yet again, I'm so glad you asked! You have great questions! As it turns out, it's quite easy. If you already have an Azure Kubernetes (AKS) cluster, you can just go about deploying argo to a namespace; if you don't have an AKS cluster, you can create one by following the documentation here.

### Pre-Requisites
You will need the following command line tools installed to proceed with getting started:
- [Kubernetes binary (kubectl)](https://kubernetes.io/docs/tasks/tools/)
- [Argocd binary (argo)](https://argo-cd.readthedocs.io/en/stable/cli_installation/)
- [Azure CLI (optional, but recommended)](https://docs.microsoft.com/cli/azure/install-azure-cli?WT.mc_id=containers-00000-jessde)
- [Access to your AKS cluster](https://docs.microsoft.com/azure/aks/kubernetes-walkthrough?WT.mc_id=containers-00000-jessde#connect-to-the-cluster)

Once you have your command line environment setup with access to your Azure Kubernetes cluster, you will want to use `kubectl` to create a namespace:

`kubectl create namespace argocd`

After you have your namespace created, you will want to run the following command:

`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`

The above command will create several customer resource definitions (CRDs), service accounts, network policies, configmaps, and other objects in the namespace you just created (`argocd` if you're following along). 

If you'd like to check the resources created, you can run the following command:

`kubectl get all -n argocd`

The Argo CD api server service is not exposed by default; this means it is configured with a Cluster IP and not a Load Balancer. To access the API server you will have to do one of the following:

1. Configure a Load Balancer (`kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'`)
2. Setup an Ingress Controller
3. Use Port Forwarding (`kubectl port-forward svc/argocd-server -n argocd 8080:443`)

The next step will be to login. The default username is `admin` and the password is auto generated and stored as clear text. You can retrieve this password using the following command:

`kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo`

#### Logging in from the CLI
`argocd login 127.0.0.1:8080`

#### Logging in from the Web

Once you have logged into Argo, you will want to create an application from a git repository. In the context of Argo, the word `create` really means deploy.

I have setup a sample application, available [here](https://github.com/jldeen/bikesharingapp), for your use if you wish, otherwise, you may choose a microservice applciation of your choice.

You can create the app one of two ways - either via CLI or UI. If you wish to create the app via the command line using the argo binary, you would run the following command:

`argocd app create bikeshare --repo https://github.com/microsoft/mindaro --path samples/BikeSharingApp --dest-server https://kubernetes.default.svc --dest-namespace default`

Once you have configured the sample application within argo, you will need to sync the application. In the context of Argo, syncing will deploy the application within your Kubernetes cluster. 

`argocd app get bikeshare`

`argocd app sync bikeshare`
____ 

You can register this in via the web or the CLI. If you wish to use the cli, you will simply type the following:

`argocd cluster add <context-name-here>` (only necessary when deploying to an external cluster)

Steps:
* Setup Argo
* Configure how you will connect to argo
* Get login information for argo / login
* ### Optional: change password using `argocd account update-password`
* Register AKS cluster to deploy apps to
* argo cluster add <context-name-here>
* connect sample app (or app of your choice)
* sync (deploy) application

Use helm?



