+++
author = "jldeen"
date = 2016-08-29T15:47:52Z
description = ""
draft = false
image = "../../images/Screen-Shot-2016-08-29-at-15.42.44_lvgi1w.png"
slug = "aws-tools-for-powershell-core-on-linux-and-os-x"
title = "AWS Tools for PowerShell Core on Linux and OS X"
layout = "post"

+++


My [last post](https:/jessicadeen.com/tech/microsoft/getting-started-with-powershell-core-and-azurerm-modules-on-ubuntu-and-os-x/) focused on how to use PowerShell Core on Ubuntu 14.04, 16.04, and OS X 10.11.6 to connect to and manage your Azure subscription. Today’s post will focus on how to use PowerShell Core to connect to your AWS account.

Notably, the AWSPowerShell.NetCore module is built on top of the .NET Core version of the AWS SDK for .NET, which is currently in beta. More on the specific details can be read in Amazon’s blog post.

As of the time of this writing, you will use the following command to install the AWSPowerShell.NetCore package, however after GitHub Issue 202 is resolved, you will be able to install the module using the `Install-Module` cmdlet since the module is available on the [PowerShell Gallery](https://www.powershellgallery.com/).

Install-Package -Name AWSPowerShell.NetCore -Source https://www.powershellgallery.com/api/v2/ -ProviderName NuGet -ExcludeVersion -Destination destfolder

Again, for reference, the destination folders you can choose by default are:

– /Users/[username]/.local/share/powershell/Modules (OS X 10.11.6)  
 – /usr/local/microsoft/powershell/6.0.0-alpha.9/Modules (OS X 10.11.6)  
 – /home/[username]/.local/share/powershell/Modules (Ubuntu 14.04 and 16.04)  
 – /opt/microsoft/powershell/6.0.0-alpha.9/Modules (Ubuntu 14.04 and 16.04)  
 – /usr/local/share/powershell/Modules (Ubuntu and OS X)

If you wish to use a folder other than the ones listed below, you will need to update the [$ENV:PSMODULEPATH](https:/jessicadeen.com/tech/microsoft/getting-started-with-powershell-core-and-azurerm-modules-on-ubuntu-and-os-x/).

After you run the above command to install the package, you will then use the `Import-Module` cmdlet to import the AWSPowerShell.NetCore module. The full command would be:

Import-Module AWSPowerShell.NetCore

That’s it!

