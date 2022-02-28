+++
author = "jldeen"
date = 2018-03-29T16:27:36Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-03-29-at-15.28.21_olxsal.png"
slug = "codefreshazure-devops-kubernetes-helm-webinar"
title = "Codefresh+Azure: DevOps, Kubernetes, Helm Webinar"
layout = "post"

+++


![](https://cdn.jessicadeen.com/content/images/Codefresh-horizontal-color-trans_dwmqai.png)

Hello everyone! Today’s post will recap on our Codefresh+Azure webinar we had earlier today. Mainly, I want to help others who wish to quickly get up and running with the same demo I used during the live stream. Click [here](https://codefresh.io/devops-azure-kubernetes-helm-lp/) to watch the full webinar.

First, you can head on over to [codefresh.io](https://codefresh.io/) to create an account and get started. You can also head [here](https://azure.microsoft.com/free/) to get started on Azure for free. Once you have accounts at both places, the rest of the blog post should be relatively easy to follow.

The GitHub repo I used can be found [here](https://github.com/jldeen/croc-hunter) – feel free to fork it so you can use it with your own Codefresh instance. Also, the funny basic container orchestration video can be relived as many times as you want via [this link](https://twitter.com/listonb/status/938804911671795713).

**AKS Creation**

Next, let’s create an AKS cluster in Azure. If you already have one, you can move on to the next step. The following commands via [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) from your local system will create a resource group in your Azure subscription, create your AKS cluster in that resource group, and then grab the kube context needed to communicate with your Kubernetes cluster. You can also run the optional command to install kubectl onto your local system.

az group create -n <resource-group-name> -l eastus az aks create -g <resource-group-name> -n <cluster-name> --generate-ssh-keys az aks get-credentials -n <cluster-name> -g <resource-group-name> ** optional: az aks install-cli

After you have your K8s (Kubernetes) cluster setup in Azure, you can add it into Codefresh under Account Settings > Integration > Kubernetes, or [this link](https://g.codefresh.io/account/integration/kubernetes) should take you to the correct page. From there, you would choose your provider, Microsoft Azure in this instance, and enter the necessary information. Codefresh provides a how-to link for how to get those credentials, but you can also [click here](https://codefresh.io/docs/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) for convenience.

**Helm Install**

Next, we need to install Helm on your local system so we can get Tiller (in cluster service for Helm) setup on your cluster. If you’re using a Mac and homebrew, simply run `brew install kubernetes-helm`  from your Terminal and helm should be installed on your CLI. Next, run `helm init` and tiller should deploy out to your K8s cluster.

![](https://cdn.jessicadeen.com/content/images/Picture1_rxsf73.png)

**Cool add-ons**

In my demo I was using two different helm charts to handle the networking part of my croc-hunter web app. The two charts I use are [kube-lego](https://github.com/kubernetes/charts/tree/master/stable/kube-lego) and [nginx-ingress](https://github.com/kubernetes/charts/tree/master/stable/nginx-ingress). Kube-lego uses let’s encrypt to create SSL certificates for my nginx-ingress. I then simply define my ingress hostname in my croc-hunter values.yaml file. When deployed, my croc-hunter app will actually use the nginx-ingress controller, which will send a request to my kube-lego pod, which will then produce an SSL certificate via let’s encrypt. Pretty neat. To get started with both of those charts, simply run the following two commands:

helm install stable/kube-lego --set config.LEGO_EMAIL=<valid-email>,config.LEGO_URL=https://acme-v01.api.letsencrypt.org/directory *wait about 5 minutes for the deployment to complete* helm install stable/nginx-ingress

You will need to get the external IP address for the nginx-ingress-controller service. To do so, from your local command line run, `kubectl get svc` and hit enter. Once an External IP has been created for the service, you’ll see it under the external-ip column.

You will then need to add a DNS entry with your registrar provider and point it to the external ip of the ingress. You can hard code it or use a wildcard (more on wildcard entries in a future blog post).

A record: blah.test.com A record: *.test.com

In your codefresh.yml, (I have my example on GitHub), you will then want to update the custom_ingress_hostname with the DNS name you created.

The last thing you’ll want to do is create a namespace and secret for your release. You can automate this piece, but I think it will be best to show you how to do it manually as a learning objective.

You will need to get your username and password for your Codefresh registry. You can learn more about your Codefresh registry [here](https://codefresh.io/docs/docs/docker-registries/codefresh-registry/). To start, go to Account Setttings > Integration > Docker Registry > Codefresh Registry to get your username and access token. Your “docker-server” as seen in the command below, should be `r.cfcr.io`. Rrun the below commands from your local command line.

kubectl create namespace codefresh kubectl create secret docker-registry codefresh-secrets --docker-server=$DOCKER_SERVER --docker-username=$DOCKER_USERNAME --docker-password=$DOCKER_PASSWORD --docker-email=$DOCKER_EMAIL --namespace=codefresh

**Codefresh setup**

Finally, you can import your forked version of my croc-hunter repo (which I just forked from Lachie Evenson [shoutout!]) and go from there. From the Codefresh dashboard, starting in Repositories, hit “add new” and then find your forked repo. Select it, hit next, and then hit the option that your repo has a codefresh.yml in it (because I added it). You might have to update things like the image name, kubecontext, custom_image, and  custom_ingress_hostname on both dev and master steps, but my example template should help you get started. You can also update all that information manually in crochunter-repo/charts/croc-hunter/values.yaml. (I use this repo for VSTS, Codefresh and Jenkins simultaneously, which is why I love that Codefresh allows me to override my values.yaml using their build and helm steps.)

```
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: oscon18/crochunter
    working_directory: ./
    dockerfile: Dockerfile
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    build_arguments:
      - VCS_REF=${{CF_SHORT_REVISION}}
  PushingDockerImage:
    title: Promote to Artifactory
    type: push
    candidate: ${{BuildingDockerImage}}
    image_name: oscon18/crochunter
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    registry: jfrog-jd-art
  PackageHelmChart:
      image = devth/helm
      commands:
        - cf_export PACKAGE=$(helm package ./charts/croc-hunter | cut -d " " -f 8)
  Deploy_with_Helm:
    image = codefresh/cfstep-helm:2.9.0
    when:
      branch:
        only:
          - master
    environment:
      - custom_imageTag=${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}
      - custom_commit_sha=${{CF_SHORT_REVISION}}
      - custom_imagePullSecrets_username=${{REPO_USER}}
      - custom_imagePullSecrets_password=${{REPO_PASS}}
      - custom_imagePullSecrets_repository=${{REPOSITORY}}
      - custom_imagePullSecrets_email=${{REPO_EMAIL}}
      - custom_image=jfrogjd-crochunter.jfrog.io/oscon18/crochunter
      - custom_ingress_hostname=${{INGRESS_HOSTNAME}}
    on_success:
      metadata:
        set:
          - '${{BuildingDockerImage.imageId}}':
            - DEPLOYED_TO_AZURE_AKS: true    
```
When your codefresh.yml is setup with the information that’s specific to YOUR environment, you will have a full CI/CD dev/master branch pipeline for Codefresh, Azure (AKS), Kubernetes, and Helm. If you also followed the kube-lego and nginx-ingress controller steps earlier, your croc-hunter helm release should auto release into your pre-determined DNS A record with an SSL certificate to boot!

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-29-at-16.16.53_invjdt.png)

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-03-29-at-16.17.55_jwvykp.png)

Finally, you can also schedule a 1:1 with Codefresh by clicking [here](https://codefresh.io/request-a-demo1/?wt.mc_id=codefresh-blogpost-blog-jessde) and you can learn more about Azure AKS on our new docs page [here](https://docs.microsoft.com/azure/aks/?wt.mc_id=codefresh-blogpost-blog-jessde).

