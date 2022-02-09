+++
author = "jldeen"
date = 2015-08-28T14:12:08Z
description = ""
draft = false
image = "static_c9a6jl.png"
slug = "assign-static-ip-ubuntu-14-04"
title = "How to assign a static IP in Ubuntu 14.04"

+++


Here’s a quick post on how to statically assign an IP address in Ubuntu / Xubuntu 14.04 since it’s a little different than other Debian versions.

First, use your favorite text editor to edit the following file:

sudo vim /etc/network/interfaces

You’ll want to add the following lines.

**This is assuming your network is setup with the following 192.168.x.x configuration. You will want to adjust the IPs accordingly.

auto eth0 iface eth0 inet static address 192.168.1.xx netmask 255.255.255.0 network 192.168.1.0 broadcast 192.168.1.255 gateway 192.168.1.1

After you assign the static IPs, you will need to specify DNS. Here’s how:

sudo vim /etc/resovlconf/resolv.conf.d/base

nameserver 208.67.222.222 nameserver 208.67.220.220

Save the file.

Run:

sudo resolvconf -u

Followed by:

/etc/init.d/networking restart

