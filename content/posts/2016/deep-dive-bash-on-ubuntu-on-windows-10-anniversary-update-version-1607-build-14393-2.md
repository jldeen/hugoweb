+++
author = "jldeen"
date = 2016-08-15T16:54:06Z
description = ""
draft = false
image = "../../images/windows-10-ubutnu_axyqj4.png"
slug = "deep-dive-bash-on-ubuntu-on-windows-10-anniversary-update-version-1607-build-14393-2"
title = "Deep Dive: Bash on Ubuntu on Windows 10 Anniversary Update (Version 1607, Build 14393)"
aliases = ["/deep-dive-bash-on-ubuntu-on-windows-10-anniversary-update-version-1607-build-14393-2/"]
layout = "post"

+++


I went to DevOps Days Portland last week and got the awesome opportunity to demo Bash on Ubuntu on Windows 10’s latest Anniversary Update build. Below are some of the deeper questions posed by attendees, ops, enthusiasts and everyone in between. If you have a question I didn’t cover, please add it in the comments!

***Where does the “Windows Subsystem for Linux” (aka the Bash shell) put your home folder? How can I access my Linux folders from Windows?***

A: “c:\users\<your-user-id>\AppData\Local\lxss”

Now, if you want to get really deep, you can go one level down into the folder ‘rootfs’ and you will find your familiar Linux/UNIX directory structure. If you are familiar with Linux/Unix variants, you’ll likely feel right at home (unless you’re using a GUI to view the directory hierarchy). Note: the ‘lxss’ folder is hidden so unless you have ‘View hidden files/folders’ enabled, you’ll have to manually type the folder path. You can simply do this by typing ‘%localappdata%\lxss’ (without quotes). As you’ll see the more you search around, binaries are located in /bin, config files in /etc, and so on and so forth.  
***  
 How do I reset / reinstall the Ubuntu environment on Windows?***

A: The command ‘**lxrun /uninstall /full**‘ will completely remove the Bash environment as a whole, as well as completely wipe your home folder (the one stored in %localappdata%\lxss\home and %localappdata%\lxss\root)

If you want to reinstall you can simply run the “bash” command again, just like you did when you first installed Bash, or you can type ‘**lxrun /install**‘, which is the same command bash.exe calls when you set it up for the first time.

***Can I ssh into my system now that Bash is on Windows? Can I ssh into “Bash on Ubuntu on Windows 10?”***

A: The short answer is yes. However, the below is given with a “use at your own risk” advisory.

First, it’s important to note a few things:

– Just like using OpenSSH on a standard Ubuntu 14.04 system, you can setup password authentication or configure password-less login  
 – The implementation of the Windows Subsystem for Linux doesn’t provide chroot so we will have to allow for that in our configuration  
 – Bash must be running for you to tunnel to it from another system. Also, in my testing, I ran the command ‘sudo service ssh restart’ at boot to ensure there weren’t any hanging connections from previous sessions.

**Guide for configuring Password SSH**

1. Edit /etc/ssh/sshd_config and change the listening port. For this demo I used port 222.  
 2. Change UsePrivilegeSeparation to ‘no’ (because the implementation of the Windows subsystem for Linux doesn’t provide chroot)  
 3. Change PasswordAuthentication to ‘yes’  
 4. Add a firewall rule on the Windows side for SSH to your new listening port  
 5. *sudo ssh-keygen -A*  
 6. Restart the ssh service: sudo service ssh restart (Ignore the message: “initctl: Unable to connect to Upstart: Failed to connect to socket /com/ubuntu/upstart: Connection refused”)  
 7. Test ssh connection locally with verbose mode enabled (verbose mode optional): *ssh localhost -p “your-port-here” -v*  
 8. Test from another system. (All should be working)

**Guide for configuring Password-less SSH**

1. Edit /etc/ssh/sshd_config and change the listening port. For this demo I used 222  
 2. Change the UsePrivilegeSeparation to ‘no’ (because the implementation of the Windows subsystem for Linux doesn’t provide chroot)  
 3. Add a firewall rule on the Windows side for ssh to your new listening port  
 4. *sudo ssh-keygen -A*  
 5. Restart the ssh service: sudo service ssh restart (Ignore the message: “initctl: Unable to connect to Upstart: Failed to connect to socket /com/ubuntu/upstart: Connection refused”)

**Do this from client machine (system tunneling to Bash on Ubuntu on Windows):**

1. cd ~/.ssh  
 2. ssh-keygen -t rsa  
*[Pause to complete step 1 on server side]*  
 3. *scp -P “port-goes-here” ~/.ssh/id_rsa.pub username@server-ip-address:~/.ssh*

* Tip – If you have trouble copying the .pub file to your server, you might want to temporarily enable PasswordAuth on the server (using the above instructions) to complete the scp transfer and then disable PasswordAuth promptly after.

*[Proceed to complete steps 2 – 5 on server side]*

**Do this from server machine (system running Bash on Ubuntu on Windows):  
**

1. mkdir -p ~/.ssh/  
*[Pause to complete step 3 on client side]  
*2. cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys  
 3. chmod 700 .ssh  
 4. chmod 600 .ssh/authorized_keys  
 5. rm .ssh/id_rsa.pub

To connect to your system running Bash on Ubuntu on Windows (server) from your client, run the following:

*ssh username@server-ip-address -p “your-port-here”*

