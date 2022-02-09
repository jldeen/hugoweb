+++
author = "jldeen"
date = 2014-06-10T19:38:34Z
description = ""
draft = false
image = "../../images/1402446966_featured_diglh0.png"
slug = "setting-xubuntu-14-4-run-display-problems"
title = "Setting up XUbuntu 14.4 and run into display problems?"
layout = "post"

+++


I’ve been trying to immerse myself into the Linux world quite a bit more lately and in doing so I accidentally broke my XUbuntu display settings. First, an understating of my environment — I am running Ubuntu 13 in a virtual environment with XUbuntu installed as well. My host is VMWare ESXi 5.1 and video memory is set to 4mb — nothing fancy.

When I attempted to change the resolution for Xubuntu by setting the resolution to the highest possible, I could no longer log into or do much because the graphics were distorted. I took to Google, as most technicians do in a pinch, and couldn’t find much for the latest version of Xubuntu. Every article I ready suggested a modification of the xorg.conf file, which does not exist in the latest releases of Linux Ubuntu and Xubuntu. So, I went digging…

If you did the same thing that I did and messed up the display resolution you can run the following command in terminal to edit the xml file that controls the graphic settings:

nano ~/.config/xfce4/xfconf/xfce-perchannel-xml/displays.xml

(where ‘nano’ can be whatever your favorite text editor is)

You’ll want to modify the line that says:

<property name=“Resolution” type=“string” value=“1200x800”/>

<span style="line-height: 22.4px;">where the value is whatever you set it to that broke. To reset it I simply changed the value back to the default:</span>

“800x600”

I hope this helps!

