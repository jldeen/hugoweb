+++
author = "jldeen"
date = 2016-06-24T18:11:23Z
description = ""
draft = false
slug = "how-to-clone-a-linux-azure-vm"
title = "How to: Clone a Linux Azure VM"

+++


<span style="font-size: small;">In this post we are going to cover how to clone a Linux VM using the Microsoft Azure ARM portal and Azure CLI. In the next post we will use the JSON template and VHD we capture from today’s post to deploy a second VM, and then in a future post, we will cover tying everything together and creating an availability set. </span>

<span style="font-size: small;">First, you will want to ensure you have Azure CLI installed. You can download it for free </span>[<span style="font-size: small;">here</span>](https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/)<span style="font-size: small;">. To start, launch Windows PowerShell, or whichever shell you prefer, and set your configuration mode to ARM. To do so, type:</span>

azure config mode arm

<span style="font-size: small;">Next, to login to your Azure account via CLI type:</span>

azure login

<span style="font-size: small;">You can then verify subscriptions available by typing:</span>

azure account list

<span style="font-size: small;">Now, you will want to ssh over to the VM you wish to capture. Note: Capturing the VM will require deprovisioning it, generalizing it, and then retiring it. You will not be able to reuse the VM once it has been deprovisioned and generalized. Once you are tunneled into the vm, type the following command to deprovision: </span>

sudo waagent –deprovision+user

<span style="font-size: small;">Next, you can use the following script to quickly capture the image and save a JSON template file to a local folder of your choice. Simply fill in the variables with the desired information and run the script after.</span>

#-----fill in these variables $rgName = "LVMTest" $template = "Template1.json" # local file path specified $vmName = ”LVMTest” $vhdName = "CoolVHDTest" #-----stop the vm azure vm deallocate -g $rgName -n $vmName #-----generalize the image azure vm generalize $rgName -n $vmName #-----capture the image azure vm capture $rgName $vmName $vhdName -t $template

