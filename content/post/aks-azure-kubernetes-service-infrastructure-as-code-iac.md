+++
author = "jldeen"
date = 2018-02-16T15:10:12Z
description = ""
draft = false
image = "k8s_navkej.png"
slug = "aks-azure-kubernetes-service-infrastructure-as-code-iac"
title = "AKS: Azure Kubernetes Service - Infrastructure as Code (IaC)"

+++


I’ve been meaning to write this post for a long time. Here I will outline the two ways you can use ARM templates to deploy a managed Kubernetes cluster in Azure. [Lena Hall](https://twitter.com/lenadroid) has already published files on her Gist a few months ago, but I wanted to write some documentation on how to use these templates.

You can stand up an AKS cluster using one of two methods: the first is to use an SPN (service principal name) and the second is to use Azure Keyvault; the templates change slightly depending on the method used and this post will explain how to use each.

**[SPN AKS Deployment – Jessica Deen’s Gist Files](https://gist.github.com/jldeen/704c5091c6f758f53ae1144ee830fe99)**

When using the Service Principal files, you will want to fill in the value of the following parameter fields:

**dnsNamePrefix**

**sshRSAPublicKey**

**servicePrincipalClientId**

**servicePrincipalClientSecret**

If you don’t have a service principal, you can create one by typing the following from az cli:

az ad sp create-for-rbac

Your servicePrincipalClientId is the appId in the output and your servicePrincipalClientSecret is your password from the output. Example output:

{ "appId": "e1c49273-d128-489c-bb1a-7289b70114aa", "displayName": "azure-cli-2018-02-16-21-28-45", "name": "http://azure-cli-2018-02-16-21-28-45", "password": "77f896e4-c8ad-431c-a9fe-7cc4678871c3", "tenant": "65f988if-86f1-413f-91ab-2d7cd011ui47" }

In the above output, the servicePrincipalClient Id would be: e1c49273-d128-489c-bb1a-7289b70114aa and the servicePrincipalClientSecret would be 77f896e4-c8ad-431c-a9fe-7cc4678871c3. From there, after updating the values file with the necessary data, you would run your deployment command:

 az group deployment create \ --resource-group <resource-group-name> \ --template-file <file-path-to-deployment.json> \ --parameters <file-path-to-parameters.json> --verbose

Remember to create your resource group prior to running the above command. To create a resource group from the Azure command line simply type:

az group create -n <resource-group-name> -l <location>

**[Keyvault AKS Deployment – Lena Hall’s Gist Files](https://gist.github.com/lenadroid/e3d2516ecfa19a4ddd34bd96292133b8)**

When using the Keyvault AKS deployment files, you will want to fill in the value of the following parameter fields:

**dnsNamePrefix**

**sshRSAPublicKey**

**servicePrincipalClientId**

**id (under servicePrincipalClientSecret > reference > keyVault)**

**secretName**

If you don’t have a keyvault configured, you can create one by doing the following from az cli:

az group create -n <resource-group-name> -l <location> az keyvault create -n <keyvault-name> -g <resource-group-name> --enabled-for-template-deployment az keyvault secret set --vault-name <vault-name> --name <key-name> --value <password-here>

**Note:** You do not have to create a new resource group if you don’t want to. You can create your keyvault in an existing resource group if you prefer.

After your key is created by running the above commands, you should see output with your keyvault ID string. If you have trouble locating it, or already have a key you wish to use and want to quickly grab the ID, run this:

az keyvault show -n <keyvault-name> -g <resource-group-name> | jq -r .id

The final command you have to run is one to link your newly created keyvault key to an existing service principal. To do this, you will want to run the following command:

az keyvault set-policy -n <keyvault-name> --spn <service-principal-app-id> --secret-permissions get

As always, feel free to comment below or DM me on Twitter if you have any questions. Oh, and go follow Lena Hall – she’s awesome!

