+++
author = "jldeen"
date = 2018-01-08T15:57:50Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-01-06-at-11.01.56_ow7tb8.png"
slug = "kubectl-get-nodes-error-unable-to-connect-to-the-server-dial-tcp-i-o-timeout"
title = "Kubectl get nodes error! Unable to connect to the server: dial tcp i/o timeout"
aliases = ["/kubectl-get-nodes-error-unable-to-connect-to-the-server-dial-tcp-i-o-timeout/"]
layout = "post"

+++


I recently had an issue with an Azure Container Service Kubernetes cluster. When I would try to run commands directly from the master, or from another system, I would receive a ‘dial tcp i/o timeout’ error. This post will run through the rabbit hole I traveled down to fix it.

![](/generated/full/Screen-Shot-2018-01-06-at-11.01.56_ow7tb8.webp)

Here you can see the error I was receiving: “Unable to connect to the server: dial tcp i/o timeout. If you look at my second command, I attempted to ping another agent node and I was getting a “Destination Host Unreachable” error.

Then I decided to see if I can ssh to the agent, just in case ping was turned off. As you can see, I got a new error: “ssh: connect to host port 22 No route to host”

![](/generated/full/Screen-Shot-2018-01-06-at-11.02.12_spcwzn.webp)

I also checked if I could see my pods and services, which I could, so this led me to believe the issue was networking related.

![](/generated/full/Screen-Shot-2018-01-06-at-11.02.36_un5xne.webp)

I checked to see if systemd-networkd-wait-online.service was active and discovered it was infact inactive (dead). I tried to restart it and then found another clue: “A dependency job for systemd-networkd-wait-online.service failed. See ‘journalctl -xe’ for details.

![](/generated/full/Screen-Shot-2018-01-06-at-15.20.02_gocg2e.webp)

When I ran the journalctl -xe command, I found the Network Service wasn’t active at all and, again, all attempts to restart it were also unsuccessful.

![](/generated/full/Screen-Shot-2018-01-06-at-14.58.20_operro.webp)

While I’m not quite sure what caused the systemd-networkd to fail, I found [this Stack Overflow post](https://unix.stackexchange.com/questions/321659/systemctl-status-systemd-networkd-showing-up-as-dead), which helped. To summarize, run the following commands:

sudo systemctl start systemd-resolved sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf sudo systemctl enable systemd-networkd systemd-resolved sudo systemctl status systemd-networkd

*Reboot*

You’ll notice the status will likely report “inactive” until you reboot, but after, you should be almost good to go.

![](/generated/full/Screen-Shot-2018-01-06-at-15.00.19_mgwj60.webp)

I said almost because I then found that while the systemd-networkd service was finally reporting as active and could process requests once again, the network service was still having trouble resolving its own hostname.

So the final part of this rabbit hole is to edit your hosts file (/etc/hosts) and ensure you have the hostname found in /etc/hostname also available under 127.0.1.1. I.E. if you type:

cat /etc/hostname:

You should get the output of your hostname back. Example:

jesisawesome

You should also see the same hostname in your hosts file:

127.0.0.1   localhost 127.0.1.1   jesisawesome # The following lines are desirable for IPv6 capable hosts ::1     localhost ip6-localhost ip6-loopback ff02::1 ip6-allnodes ff02::2 ip6-allrouters

If you do not see it, you will have to add it. After adding it, restart systemd-networkd again:

sudo systemctl restart systemd-networkd

The “sudo*: unable to resolve host [host-name]*” error message should be gone!

![](/generated/full/Screen-Shot-2018-01-06-at-15.06.02_vrbmzv.webp)

You can then restart kubelet and etcd, which should successfully restart now as it couldn’t before with the hostname missing/mismatch. Then, if you run your “kubeclt get nodes” command, you should properly get your list of nodes.

Hope this helps someone else!

