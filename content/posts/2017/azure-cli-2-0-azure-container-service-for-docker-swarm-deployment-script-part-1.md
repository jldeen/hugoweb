+++
author = "jldeen"
categories = ["Azure", "Azure Container Service"]
date = 2017-04-04T14:56:49Z
description = ""
draft = false
slug = "azure-cli-2-0-azure-container-service-for-docker-swarm-deployment-script-part-1"
tags = ["Azure", "Azure Container Service", "Docker", "linux"]
title = "Azure CLI 2.0 - Azure Container Service for Docker Swarm Deployment Script (Part 1)"
aliases = ["/azure-cli-2-0-azure-container-service-for-docker-swarm-deployment-script-part-1/"]
layout = "post"

+++


In today’s post, I’m going to talk a little about a script I wrote that automates the deployment of a Docker Swarm Cluster using Azure Container Service. The script uses [Azure CLI 2.0](https://docs.microsoft.com/cli/azure/install-azure-cli), which is now GA. If you’re not yet using it, stop here, download it, come back. I’ll wait.

Everything for your ACS Docker Swarm deployment can be found on my GitHub [here](https://github.com/jldeen/acs_swarm). This is part 1 of a 3 series post discussing how to use each piece of the repository. Part 1, the post you’re currently reading, will focus on the ACS Swarm Cluster deployment – I.E. the [acs_deploy.sh](https://github.com/jldeen/acs_swarm/blob/master/deployment/acs_deploy.sh) located in the deployment folder.

Note: In order to use this script, as commented out on line 2, you will need to have already created an SPN. See my previous post for more info. Next, you will be asked to set variables for the following:

```bash
Resource= 
Location= 
Servicename= 
Orchestrator=Swarm 
Dnsprefix=
```

Don’t worry, the script itself will set them for you. The script will then log you in with your SPN, create a resource group for you, and proceed with the deployment. To learn more about the ‘az acs create’ command and the switches you can use, check out the Microsoft documentation [here](https://docs.microsoft.com/cli/azure/acs#create).

By default, this script will generate a private and public key pair for you via the –generate-ssh-keys switch. At the end of a successful deployment, you will be presented with an output of important information, including your Master and Agents FQDN using the Dnsprefix you set at the start of the script. While the script can be found on my GitHub provided above, I also included an example of the script below:

```bash
#!/bin/bash
# You need to have already created an SPN to use this script in a non-interactive session. See local_scripts/create_serviceprincipal.md for more info.

echo "Reloading bashrc profile..."
.  ~/.bashrc
echo "Successfully reloaded bashrc profile..."

# Read User Input to capture variables needed for deployment
echo "This script will deploy a Docker Swarm Cluster for Azure Container Service to Microsoft Azure."
echo
echo "Enter a name for your Resource Group and press [ENTER]: "
read Resource
echo "The Resource Group Name you entered is $Resource."
echo "Enter a location for your deployment and press [ENTER]: "
read Location
echo "The Location you entered is $Location."   
echo "Enter a Servicename for your Docker Swarm Cluster and press [ENTER]: "
read Servicename
echo "The service name you entered is $Servicename."
echo "Enter a DNS prefix for your DNS and press [ENTER]: "
read Dnsprefix
echo "The DNS prefix you entered is $Dnsprefix."

echo 
echo "Thank you for your input. Now proceeding with ACS Swarm Deployment..."

#login
    az login \
        --service-principal \
        -u $spn \
        -p $password \
        --tenant $tenant

# Group creation
    az group create \
        -l $Location \
        -n $Resource
    echo "Created Resource Group:" $Resource

    echo "Beginning Azure Container Service creation now. Please note this can take more than 20 minutes to complete."
# ACS Creation for Docker Swarm
    az acs create \
        -g $Resource \
        -n $Servicename \
        -d $Dnsprefix \
        --orchestrator-type Swarm \
        --generate-ssh-keys \
        --verbose

# Space for readabilty
    echo

# Outputs
    # Code to capture ACS master info
        master_fqdn=$(az acs show -n $Servicename -g $Resource | jq -r '.masterProfile | .fqdn')

    # Code to capture ACS agents info
        agents_fqdn=$(az acs show -n $Servicename -g $Resource | jq -r '.agentPoolProfiles[0].fqdn')

    # Set ssh connection string addt'l info
        admin_username=$(az acs show -n $Servicename -g $Resource | jq -r '.linuxProfile.adminUsername')

    # Print results 
        echo "------------------------------------------------------------------"
        echo "Important information:"
        echo 
        echo "SSH Connection String: ssh $admin_username@$master_fqdn -A -p 2200"
        echo "Master FQDN: $master_fqdn"
        echo "Agents FQDN: $agents_fqdn"
        echo "Your web applications can be viewed at $agents_fqdn."
        echo "------------------------------------------------------------------"
```

In my next post (part 2), we will talk about how we can use this deployment with an SSH tunnel as part of a Dockerfile!

