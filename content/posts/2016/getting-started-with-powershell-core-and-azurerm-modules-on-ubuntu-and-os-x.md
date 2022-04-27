+++
author = "jldeen"
date = 2016-08-23T17:49:08Z
description = ""
draft = false
image = "../../images/mlovesl_h6qohf.jpg"
slug = "getting-started-with-powershell-core-and-azurerm-modules-on-ubuntu-and-os-x"
title = "Getting started with PowerShell Core and AzureRM Modules on Ubuntu and OS X"
aliases = ["/getting-started-with-powershell-core-and-azurerm-modules-on-ubuntu-and-os-x/"]
layout = "post"

+++


Last week, [Microsoft announced PowerShell is now open sourced and available on Linux and OS X](https://channel9.msdn.com/Blogs/hybrid-it-management/PowerShell-on-Linux-and-Open-Source). I wrote a [blog post on how to get PowerShell installed](https:/jessicadeen.com/tech/microsoft/powershell-is-now-open-sourced-and-available-on-os-x-10-11-and-linux/) on Ubuntu 14.04, 16.04, and Mac OS X 10.11.6 if you want to check it out since this post will focus mainly on how to install the AzureRM modules and use them to manage your Azure subscription.

If you do not currently have an Azure subscription and are interested in playing around with it, you can sign up [here](https://azure.microsoft.com/free) and get a $200 credit with a 30 day free trial!

From here on down, I will assume you have PowerShell installed on your Ubuntu 14.04, 16.04, and/or OS X 10.11.6 machine.

As of the time of this writing you may have noticed that you cannot use the “Install-Module AzureRM” command as you will receive errors. This is partially due to [Issue 1618](https://github.com/PowerShell/PowerShell/issues/1618), which is currently being tracked and can be followed at the provided link. Also, there are new Modules, AzureRM.NetCore.Preview, AzureRM.Profile.NetCore.Preview, and AzureRM.Resources.NetCore.Preview, created for PowerShell Core, so the workaround to install will be:

Install-Package -Name AzureRM.NetCore.Preview -Source https://www.powershellgallery.com/api/v2 -ProviderName NuGet -ExcludeVersion -Destination <Folder you want this to be installed>

You can see a demo using these modules [here](https://github.com/PowerShell/PowerShell/blob/master/demos/Azure/Azure-Demo.ps1). **Note: The above Install-Package command is an old method. You can now use the *Install-Module AzureRM.NetCore.Preview* command as found in the install scripts in [this updated blog post](https:/jessicadeen.com/tech/updated-powershell-core-and-azurerm-netcore-preview-module-install-scripts-for-ubuntu-and-os-x/).**

You can select a folder of your choosing, or use one of the following:

– /Users/[username]/.local/share/powershell/Modules (OS X 10.11.6)  
 – /usr/local/microsoft/powershell/6.0.0-alpha.9/Modules (OS X 10.11.6)  
 – /home/[username]/.local/share/powershell/Modules (Ubuntu 14.04 and 16.04)  
 – /opt/microsoft/powershell/6.0.0-alpha.9/Modules (Ubuntu 14.04 and 16.04)  
 – /usr/local/share/powershell/Modules (Ubuntu and OS X)

**NOTE: If you select a folder other than one listed above, you will need to update the $ENV:PSMODULEPATH with the location you select.**

To add locations to the $ENV:PSMODULEPATH use the following command: **NOTE: If you simply type the following command at the command line, this will only be a temporary value.**

To add a permanent one, you will want to add the command to your user profile (~/.config/powershell/profile.ps1) or default profile ($PSHOME/profile.ps1).

$env:PSModulePath = $env:PSModulePath + ":path-goes-here"

**For Mac OS X 10.11.6 users <span style="text-decoration: underline;">specifically</span>**, as mentioned in [issue 1874](https://github.com/PowerShell/PowerShell/issues/1874) and [issue 1994](https://github.com/PowerShell/PowerShell/issues/1994) the PowerShell package for OS X is missing .NET Core pre-requisite components. This known [and reported] issue impacts some of the PowerShell cmdlets, including a lack of PowerShell Package Providers by default, and other commands such as Invoke-RestMethod as mentioned in [issue 1919](https://github.com/PowerShell/PowerShell/issues/1919#issuecomment-241569279). With that in mind, the workaround at the time of this writing is to install [.NET Core for Mac OS X](https://www.microsoft.com/net/core#macos). Until you do so, the Install-Package command will not work on OS X 10.11.6 El Capitan.

After you run the above command, you then will type:

Import-Module AzureRM.NetCore.Preview

The above command will then import the module into your PowerShell environment so you can begin to use AzureRM commands. After the import completes, you can test your newly installed and imported module by typing:

Login-AzureRMAccount

The above should then prompt you to head on over to https://aka.ms/devicelogin to enter the provided code.

That’s it! Feel free to comment below with any questions / feedback.

