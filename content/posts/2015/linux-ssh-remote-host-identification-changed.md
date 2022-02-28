+++
author = "jldeen"
date = 2015-08-21T10:31:44Z
description = ""
draft = false
image = "../../images/ssh_b7fplb.png"
slug = "linux-ssh-remote-host-identification-changed"
title = "Linux: SSH Remote host identification has changed"
layout = "post"

+++


If you encountered the ever so terrifying following error, this post will quickly address how to correct it.

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY! Someone could be eavesdropping on you right now (man-in-the-middle attack)! It is also possible that a host key has just been changed. The fingerprint for the ECDSA key sent by the remote host is [...]. Please contact your system administrator. Add correct host key in /Users/USER/.ssh/known_hosts to get rid of this message. Offending ECDSA key in /Users/USER/.ssh/known_hosts:52 ECDSA host key for [IP Address] has changed and you have requested strict checking. Host key verification failed.

First, it’s important to know how and why this error occurs. Maybe you manually updated the key, or maybe you just reinstalled Linux on the server you are now trying to SSH. Either way, there’s a quick and simple way to update the key.

Type:

ssh-keyscan -t rsa server_ip

Grab the text output, including the IP address, if you please. Next, use your favorite text editor to edit your known_hosts file. In this example, I will use vim:

sudo vim ~/.ssh/known_hosts

Search for the IP address of the known host, remove the existing key and then paste what you copied.

Tip: Make sure the IP address is only present once

Save the file (type: ‘*wq*‘ for write / quit in vim) and then you’ll be able to SSH again!

