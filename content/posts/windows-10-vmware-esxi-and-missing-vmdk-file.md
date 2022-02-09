+++
author = "jldeen"
date = 2016-04-28T15:56:50Z
description = ""
draft = false
image = "../../images/anatomy_avm_5_jipier.jpg"
slug = "windows-10-vmware-esxi-and-missing-vmdk-file"
title = "Windows 10, VMware ESXi, and missing VMDK File?"

+++


I have a Windows 10 virtual machine hosted on a VMWare ESXi 5.5 server at home. I use it for simple things like a [Plex](https://plex.tv/) media server, [Calibre](https://calibre-ebook.com/) book server, and I run a Python script from GitHub ([PlexConnect](https://github.com/iBaa/PlexConnect)) to steer all traffic from my Apple TV back to the Plex instance. However, the system wouldn’t boot up this weekend and I noticed I was receiving continuous errors from within vSphere itself. As it turns out, the VMDK file was damaged. I had to recreate it in order to restore the functionality of the Windows 10 system and I thought I’d document the process I went through in case it could help someone else.

Before we begin, it’s important to understand how a VM works with virtual hard disks within VMware.

 

[![anatomy_avm_5](https:/jessicadeen.com/wp-content/uploads/2016/04/anatomy_avm_5_thumb.jpg "anatomy_avm_5")](https:/jessicadeen.com/wp-content/uploads/2016/04/anatomy_avm_5.jpg)

Since the .vmdk file is the disk descriptor, and not the data file itself, we’re in luck. We’ll be able to recreate it and be back up and running in less than 5 minutes.

First, ssh to your ESXi box as root. cd to the location of your virtual machine disk by typing:

cd /vmfs/volumes/vmfsvolumehere/directoryhere

You will need to know the type of SCSI controller your virtual disk is using, which can be found by viewing the .vmx file and looking at the scsi#.virtualDev line. The # will be the controller number and it will reference the controller type such as lsisas1068, which mine was. <u>Note: If yours is also lsisas1068, you will want to take note of it as lsilogic.</u> I’ll explain that later.

Next, take note of the exact size of the –flat file:

ls –l vmdisk0-flat.vmdk

Then create a new virtual disk:

vmkfstools –c [size of disk here] –a lsilogic (do not type lsisas1068) –d thin temp.vmdk

A corresponding temp-flat.vmdk file will be created, too. Type the following to delete it:

rm – temp-flat.vmdk

Rename the temp.vmdk to match the name of your existing flat file:

mv –i temp.vmdk vmname0.vmdk

Edit the .vmdk. I chose vim in this case:

vim temp.vmdk

Edit the Extent Description section and update the -flat.vmdk file reference to match your existing flat file. If necessary, also remove the following line if the original .vmdk was not a thin disk.

ddb.thinProvisioned = “1”

Check the file for consistency:

vmkfstools –e filename.vmdk

If the file is good, you will see: “Disk chain is consistent”

If you’re successful, your VM should now properly boot and you should see something similar to the following:  
[![image](https:/jessicadeen.com/wp-content/uploads/2016/04/image_thumb.png "image")  
](https:/jessicadeen.com/wp-content/uploads/2016/04/image.png)A newly created vmdk file and your pre-existing flat.vmdk file

There is a KB article on VMware’s website [here](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1002511), which explains the above commands a little more in depth, but for the sake of getting back online quickly and efficiently, I just made this quick how-to.

