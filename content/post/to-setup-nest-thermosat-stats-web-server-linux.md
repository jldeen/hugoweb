+++
author = "jldeen"
date = 2015-07-20T22:13:48Z
description = ""
draft = false
image = "Screen-Shot-2015-07-20-at-19.52.46_vvkxft.png"
slug = "to-setup-nest-thermosat-stats-web-server-linux"
title = "How to: Setup a Nest Thermosat stats web server on Linux "

+++


A few months back, my AC died. Through a series of unfortunate events, I realized my once comfortable house had become a bonafide sauna. I noticed my PG&E bill had increased dramatically and my Nest report stated my hours of use was triple than it was in previous months, without much cause.

I realized today how valuable it would be if I had my own local server to cache the internal AC temperature, outside AC temperature, inside humidity, outside humidity, etc. I have local web servers I run to monitor nearly everything else technical in my house, but it never occurred to me to configure one for my thermostat. However, had I of had one in place, I could look back at the logs and pinpoint the date and time when the AC unit began to fail.

I immediately thought I couldn’t be the only one who found this functionality useful, and sure enough, I wasn’t! There are about 3 or 4 GitHub projects that create web-based statistic databases for the Nest Thermostat so I set out to configure each one.

My favorite one so far is [Nest Bootstrap Control Panel](https://github.com/f0rkz/Bootstrap-Nest-Administration-Tool) because of the kind of data it captures by default. It also was the easiest to configure. Though, with that said, admittedly it was also the last one I configured and I kind of became a pro at creating the various databases for each web app to store the data. I have included my version of the instructions for this project [here](http://wp.me/p47QZW-tW).

My second favorite is [Nestgraph](https://github.com/chriseng/nestgraph) because of its simplicity, but it’s really barebones. I have included my version of the instructions for this project here. [To be updated]

My least favorite is [Nest-Extended](https://github.com/MattHirschfelt/Nest-Extended) because of the lack of instructions included. I understand there is an expectation for the user to have a bit of knowledge on setting up Linux websites in Apache / PHP / and MySQL, but I felt like I should have been able to configure it with my intermediate knowledge base. I’m not including my version of the instructions for this project just yet because I honestly have yet to finish setting this up. I will update this section if / when I do.

If you’ve used one of these projects and want to comment, do so below! Alternatively, if you know of another project and would like to contribute to this post, post below!

