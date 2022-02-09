+++
author = "jldeen"
categories = ["ARM", "Azure", "Format-Table", "Objects", "powershell", "Running VMS in Azure", "VMs"]
date = 2016-09-16T12:51:14Z
description = ""
draft = false
image = "ObjectARM_d0pj9s.png"
slug = "azurerm-powershell-commands-for-scripting-and-management"
tags = ["ARM", "Azure", "Format-Table", "Objects", "powershell", "Running VMS in Azure", "VMs"]
title = "AzureRm PowerShell Commands for scripting and management"

+++


This post will be short and sweet, but I wanted to write a quick post on some cool commands you can use for your scripts / to manage your Azure subscription. I recently found myself wanting to pull a list of all VMs running in my Azure subscription, but the way to do this using Azure Resource Management is slightly different from Azure Service Management.

**Note: This will <span style="text-decoration: underline;">only</span> pull a list of your Azure RM VMs.**

#Virtual Machine Status in Azure RM $RGs = Get-AzureRMResourceGroup foreach($RG in $RGs) { $VMs = Get-AzureRmVM -ResourceGroupName $RG.ResourceGroupName foreach($VM in $VMs) { $VMDetail = Get-AzureRmVM -ResourceGroupName $RG.ResourceGroupName -Name $VM.Name -Status foreach ($VMStatus in $VMDetail.Statuses) { if($VMStatus.Code -like "PowerState/*") { $VMStatusDetail = $VMStatus.DisplayStatus } } $out = new-object psobject $out | add-member noteproperty 'Virtual Machine Name' $VM.Name $out | add-member noteproperty Status $VMStatusDetail $out | add-member noteproperty 'Resource Group Name' $RG.ResourceGroupName Write-Output $out } }

So, to explain the above, I used variables for the resource groups, the vms and status, and then stored the results in an object. The trick to easily format data in PowerShell is to parse the data into an object. I used the ‘**Write-Host**‘ command to push the output of the created object in table format to the pipeline. I am able to do this easily (especially one with only 3 properties) because of how PowerShell’s **‘Format-Table’** cmdlet works with objects.

Now, you might be wondering why you couldn’t just use the **‘Get-AzureRmVM’** command and then pipe to **‘Select-Object’** and the answer is there is no longer an object for the running status information. Here is a current list of the objects you can use with that command:

Get-AzureRmVM | Select-Object AvailabilitySetReference BootDiagnostics DataDiskNames DiagnosticsProfile Disks Extensions HardwareProfile Id InstanceView LicenseType Location Name NetworkInterfaceIDs NetworkProfile OSProfile Plan PlatformFaultDomain PlatformUpdateDomain ProvisioningState RemoteDesktopThumbprint RequestId ResourceGroupName StatusCode Statuses StorageProfile Tags Type VMAgent

Notably, the **‘Statuses’** and **‘StatusCode’** objects do not display the running status of the VM.

Now, if you want to quickly get a list of your resource groups and other useful information about them you can use the following code:

#Get list of all resource groups, location, and provisioning state Get-AzureRmResourceGroup | Select-Object ResourceGroupName, Location, ProvisioningState

If you have any other commands or code snippets you think others would find helpful, please feel free to leave a comment.

