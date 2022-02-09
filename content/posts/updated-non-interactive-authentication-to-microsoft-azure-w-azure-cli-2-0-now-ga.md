+++
author = "jldeen"
categories = ["automation", "Azure", "Codeship", "IaC", "linux"]
date = 2017-03-24T16:07:51Z
description = ""
draft = false
image = "../../images/Screen-Shot-2017-03-24-at-15.22.02_svqu4r.png"
slug = "updated-non-interactive-authentication-to-microsoft-azure-w-azure-cli-2-0-now-ga"
tags = ["automation", "Azure", "Codeship", "IaC", "linux"]
title = "Updated! Non-interactive authentication to Microsoft Azure w/ Azure CLI 2.0 - now GA!"

+++


In a [previous post](https:/jessicadeen.com/tech/non-interactive-authentication-to-microsoft-azure/), I wrote about a method to initiate a non-interactive authenticated session to Microsoft Azure through the use of a service principal. Today’s post is similar, but I have updated the script to be used with Azure CLI 2.0 [now that it is GA](https://azure.microsoft.com/blog/announcing-general-availability-of-vm-storage-and-network-azure-cli-2-0/).

You will notice I have updated the script and we no longer use positional parameters. Also, the script now supports multiple subscriptions – if you have more than one subscription, the script will pull a list and prompt you to select which one you wish to use for SPN creation.

The important data is still as follows:

spn=service_principal_name password=service_principal_password tenant=azure_tenant_id

You will get the spn, password, and tenant ID from running the updated [Service Principal Creation Script](https://github.com/jldeen/azurespn/blob/master/azcli2.0/create_serviceprincipal.sh) on your local machine with [Azure-Cli 2.0](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed; upon creation, all three will be automatically exported as environment variables to ~/.bashrc. (Note: This script was written for Linux machines and as such will export the necessary environment variables for Linux enivronments. You will need to manually create environment variables for Windows if you wish to scale this script for a Windows environment.)

It is highly recommended you [click here](https://github.com/jldeen/azurespn/blob/master/azcli2.0/create_serviceprincipal.md) to learn how to use the service principal creation script.

Note: If you are using this method independent of the deployment script we talk about in [Azure CLI 2.0 – Azure Container Service for Docker Swarm Deployment Script (Part 1)](https:/jessicadeen.com/tech/azure-cli-2-0-azure-container-service-for-docker-swarm-deployment-script-part-1/), you will need to reload your bashrc profile first by sourcing it:

source ~/.bashrc or . ~/.bashrc

Next, to use the above in conjunction with a non-interactive login session you will simply use the following code:

<div>az login \         --service-principal \         -u $spn \         -p $password \         --tenant $tenant

</div>There you go! You will automatically be logged in without any pop-up windows or interaction required on your end. Just like before, you can add this into .sh scripts to fire off as part of your CI/CD pipeline, or simply execute the above line of code.

For more information about how using an SPN allowed [Codeship](https://codeship.com/) to add support for Microsoft Azure, or for information on how to use Codeship Pro with Microsoft Azure, checkout [the official documentation here](https://documentation.codeship.com/pro/continuous-deployment/azure/) and the [official Github repo here](https://github.com/Codeship-library/azure-deployment).

