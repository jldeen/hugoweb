+++
author = "jldeen"
date = 2016-11-16T16:20:04Z
description = ""
draft = false
image = "../../images/basic-powershell-commands-intro-840x420_hfqmhu.png"
slug = "powershell-core-and-azurerm-netcore-preview-module-install-scripts-for-ubuntu-and-os-x"
title = "PowerShell Core and AzureRM.NetCore.Preview Module Install Scripts for Ubuntu and OS X"

+++


![](https://cdn.jessicadeen.com/content/images/basic-powershell-commands-intro-840x420_hfqmhu.png)

**Note: This post is now old. Please use [my latest installer from this blog post](https:/jessicadeen.com/linux/powershell-core-master/). **

Quick update today – I wrote a few new install scripts for PowerShell Core with the AzureRM.NetCore.Preview module and optional install of Azure CLI. You can access the scripts using the below links. Each script will install:

- NET Core 1.1 ([Released today!](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-1-1/))
- PowerShell Core Alpha 11
- AzureRM.NetCore.Preview Module
- Optional install of Azure CLI

[Linux Ubuntu 14.04](https://raw.githubusercontent.com/jldeen/SVCC-AzureMgmtxplat/master/install/14.04/ps6.11_14.04_install.sh)  
[Linux Ubuntu 16.04](https://raw.githubusercontent.com/jldeen/SVCC-AzureMgmtxplat/master/install/16.04/ps6.11_16.04_install.sh)  
[Mac OS X 10.11 and 10.12](https://raw.githubusercontent.com/jldeen/SVCC-AzureMgmtxplat/master/install/osx_10.11/ps6.11_osx_install.sh)

Note: As of the date of this writing (11/16/2016), it is recommended to use PowerShell Core alpha 11 because [PackageManagement is currently broken in alpha 12](https://github.com/PowerShell/PowerShell/issues/2664); this is because [OneGet is broken](https://github.com/OneGet/oneget/issues/239). I will update this post and the install scripts once the issue has been resolved.

