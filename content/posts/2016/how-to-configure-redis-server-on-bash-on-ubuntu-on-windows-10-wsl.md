+++
author = "jldeen"
date = 2016-12-23T08:00:56Z
description = ""
draft = false
image = "../../images/redis-example_lb0ii1.png"
slug = "how-to-configure-redis-server-on-bash-on-ubuntu-on-windows-10-wsl"
title = "How to configure Redis-Server on Bash on Ubuntu on Windows 10 (WSL)"
aliases = ["/how-to-configure-redis-server-on-bash-on-ubuntu-on-windows-10-wsl/"]
layout = "post"

+++


I recently spoke at SVDevOps’ monthly meetup in the beginning of September and one of the attendees asked if it were possible to configure Redis-Server on WSL. I didn’t have an answer at the time so I put a note in my “Blog Post Ideas” to check it out and see if I could get it going. Good news! I was able to get Redis working on Bash on Ubuntu on Windows (BoUoW) aka, WSL, and this post will show you how you can too.

First you will want to install redis-server by typing the following:

sudo apt-get install redis-server

Next, you will want to edit /etc/redis/redis.conf and change the following line to 0.0.0.0

bind 127.0.0.1

To confirm, the above line should now read:

bind 0.0.0.0

Finally, restart the service by typing:

sudo service redis-server restart

Next you can test your Redis-Server instance by typing the following:

$ redis-cli 127.0.0.1:6379> set boo "ahh" 127.0.0.1:6379> get boo "ahh"

I also wrote a quick little .sh script if you just wanted to run it that way. The script is included below:

sudo apt-get install redis-server -y sudo sed -i -e 's/127.0.0.1/0.0.0.0/g' /etc/redis/redis.conf sudo service redis-server restart

And there you go!

