+++
author = "jldeen"
date = 2016-07-14T18:27:17Z
description = ""
draft = false
image = "../../images/sources_aseud4.png"
slug = "microsoft-azure-how-to-change-a-repository-in-a-linux-ubuntu-vm"
title = "Microsoft Azure: How to change a repository in a Linux Ubuntu VM"
layout = "post"

+++


If you have a particular repository you want to use for your Linux VM from within Azure to install packages from, simply follow the below instructions. For our example, we will update the repository for installing Nginx.

First, sudo su to elevate to root.

Next, vim /etc/apt/sources.list (you may use your favorite text editor)

Add the following lines to the file:

##Nginx Test Fix deb http://nginx.org/packages/ubuntu/ trusty nginx deb-src http://nginx.org/packages/ubuntu/ trusty nginx

*taken from [this page here](http://nginx.org/en/linux_packages.html).

Save the file.

cd to /etc/apt/

Run:

wget http://nginx.org/keys/nginx_signing.key

to download the necessary key to authenticate the repository signature, which is necessary for Debian/Ubuntu.

To add the downloaded key to the apt program keyring, type the following command:

apt-key add nginx_signing.key

Then to complete the install from the new repo, type the following:

apt-get update apt-get install nginx

And that’s it! You should see your install pull from the newly specified repository instead of the default one specified in your sources.list file.

