+++
author = "jldeen"
date = 2015-07-20T22:14:46Z
description = ""
draft = false
image = "../../images/Screen-Shot-2015-07-20-at-20.04.26_zgmdf1.png"
slug = "setup-nest-bootstrap-control-panel"
title = "How to setup: Nest Bootstrap Control Panel"
layout = "post"

+++


If you haven’t yet read the parent post for this how to, please do so first by following [this link](http://wp.me/p47QZW-tV).

The instructions from the [Nest Bootstrap Control Panel Git Hub repo](https://github.com/f0rkz/Bootstrap-Nest-Administration-Tool) are pretty good, but there are a few things I wanted to add.

First, you need the following before you can proceed:

- php5-json
- php5-mcrypt

And while the install guide doesn’t specify it, you will need mysql installed.

To get both of these type the following:

sudo apt-get install php5-json sudo apt-get install php5-mcrypt

If you have trouble with mcrypt later on like I did (or if you’re using Ubuntu 14), you will want to type the following:

php5enmod mcrypt service apache2 restart

To install mysql, do the following:

sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql

Activate mysql with this command:

sudo mysql_install_db

After you do the above, you an follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu) to finish configuring mysql.

After you have the pre-requisites installed, you will want to clone the repo into your web directory. In my case, mine is located in /var/www

git clone https://github.com/f0rkz/Bootstrap-Nest-Administration-Tool

I also renamed my Bootstrap-Nest-Administration-Tool by typing:

mv Bootstrap-Nest-Administration-Tool Nest_Admin

Next, you will want to access mysql. To do this, type:

mysql -u root -p

You should be prompted for a password. This is the root password you created for your mysql installation.

After you’re in, you should see something like the following:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2015-07-20-at-19.52.46_vvkxft.png)If so, you will want to type:

create database nest_stats; grant all privileges on nest_stats.* to nest_stats@localhost identified by 'some-password';

After the above completes successfully, you will want to type quit to exit mysql and return to your shell.

From your shell, you will type:

mysql -unest_stats -p nest_stats < dbsetup.sq

The next step included calls for an edit to your vhosts file, but I didn’t do that since I’m not using a vhosts file in my environment. I went right into the next step:

cp ./includes/nest.conf.php_EXAMPLE nest.conf.php

Note: **Make sure the copied file is copied into the includes directory**, or you will experience an error later on. After the file is copied, you will edit it with the necessary information and configure your crontab by typing:

crontab -e

Finally, you can copy and paste the following, but be sure to update the paths to the location where you cloned this repo.

*/5 * * * * /bin/rm -f /tmp/nest_php_* ; cd /home/f0rkz/nest.f0rkznet.net/includes/scripts/; /usr/bin/php /home/f0rkz/nest.f0rkznet.net/includes/scripts/collect-nest-data.php > /dev/null

After the above is all done, the remainder of your configuration will be done by accessing the web GUI interface. If everything was setup correctly, you should see the following:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2015-07-20-at-20.01.29_lwsbt7.png)Go ahead and register a new user account. This can be whatever you want. The ultimate final step you will want to do is click on Settings at the top and enter your Nest.com login information, as well as your zip code. Click submit and run your cronjob by pasting the following (be sure to update the links to your environment) in to your shell:

/bin/rm -f /tmp/nest_php_* ; cd /var/www/Nest_Admin/includes/scripts/; /usr/bin/php /var/www/Nest_Admin/includes/scripts/collect-nest-data.php > /dev/null

Assuming everything completed successfully, you should see data under the graphs tab like this:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2015-07-20-at-20.04.26_zgmdf1.png)

