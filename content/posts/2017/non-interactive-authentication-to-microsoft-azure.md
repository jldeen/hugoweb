+++
author = "jldeen"
date = 2017-03-10T09:42:47Z
description = ""
draft = false
image = "../../images/Screen-Shot-2017-03-10-at-09.41.06_stranh.png"
slug = "non-interactive-authentication-to-microsoft-azure"
title = "Non-interactive authentication to Microsoft Azure"
layout = "post"

+++


I recently got to work on a project with [Codeship](https://codeship.com/), a hosted continuous integration (CI) and continuous deployment (CD) solutions provider that empowers software builds and test automation. Codeship Pro, the tool I worked closely with, uses Docker to define your CI/CD environment and run your build pipeline.

At the start of the project, Codeship was unable to support Microsoft Azure due to Azure’s authentication method requiring some sort of interaction even from command line. The solution I wrote alleviates that issue through the use of a service principal name (SPN). The best part about this code is it is highly scalable and can be used with any CI/CD tool (even Jenkins!) because it simply uses [Azure CLI](https://docs.microsoft.com/en-us/azure/xplat-cli-install). The open source code can be found on my GitHub [here](https://github.com/jldeen/azurespn).

First, I have created a script to help you get started with the creation of your SPN. The important data is as follows:

spn=service_principal_name password=service_principal_password tenant=azure_tenant_id

You can get the spn, password, and tenant ID from running the [Service Principal Creation Script](https://raw.githubusercontent.com/jldeen/azurespn/master/create_serviceprincipal.sh) on your local machine with Azure-Cli installed; upon creation, all three will be automatically exported as environment variables. (Note: This script was written for Linux machines and as such will export the necessary environment variables for Linux. You will need to manually create environment variables for Windows if you wish to scale this script for a Windows environment.)

It is highly recommended you [click here](https://github.com/jldeen/azurespn/blob/master/README.md) to learn how to use the service principal creation script.

Next, to use the above in conjunction with a non-interactive login session you will simply use the following code:

azure login -u $spn -p $password --tenant $tenant --service-principal

There you go! You will automatically be logged in without any pop-up windows or interaction required on your end. You can even add this into .sh scripts to fire off as part of your CI/CD pipleine, or simply execute the above line of code.

For more information about how using an SPN allowed Codeship to add support for Microsoft Azure, or for information on how to use Codeship Pro with Microsoft Azure, checkout [the official documentation here](https://documentation.codeship.com/pro/continuous-deployment/azure/) and the [official Github repo here](https://github.com/Codeship-library/azure-deployment).

