+++
author = "jldeen"
categories = ["Networking", "Windows 7"]
date = 2010-02-20T02:03:09Z
description = ""
draft = false
slug = "part-2-why-migrate"
tags = ["Networking", "Windows 7"]
title = "Part 2. Why migrate?"

+++


I realize, first off, that I need to get better about updating this. Which, I promise any readers I still have – I will do.

 

As promised, part 2 will focus on a deeper segment into the Networking and Security available through the use of Windows 7.

For the average consumer and home user we have already touched upon the simplicity and usability of Windows 7 Homegroups. What about the networking capabilities of enterprises? Or even a simple task of networking a printer?

Example 1: Connecting a network printer in Win 7

We all remember how hard it was and how long it took to connect a network printer to a Windows XP machine. I hate doing it to this day and will intentionally bring my Win 7 computer along with me to every client’s location so that I don’t need to guess their IP address. It’s annoying and a complete waste of time to fiddle around for 20 minutes just to find out a 6 to 8 number address.

Sigh. I digress. Well let’s take a look at the improvements of Windows 7 (which, I’ll admit, did exist – to an extent—in Windows Vista)

![](http://pro.jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig18.png)w

First we click on Devices and Printers

![](http://pro.jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig21.png)

And then, “Add a printer”

![](http://pro.jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig31.png)

We are now presented with two very simple and clearly explained options.

1. Is the printer local? (IE. Connected directly to the computer through USB)
2. Is the printer a network / wireless / Bluetooth printer (Simply put – connected otherwise (NOT LOCALLY)

Obviously this demonstration is to go through the simple steps of network printer so we will click the second option.

![](http://pro.jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig41.png)

 

Now we are presented with a window where Windows 7 itself will search for the available printers and assuming it is not a share – an IP address will show up under the “Address” section.

We would simply click the printer we desire and press “next.”

- No more configuring a port and setting up a TCP / IP port, ect., ect.,

![](http://pro.jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig51.png)

Windows 7 will then search for the drivers (which more than likely it will find) and present you with the above screen.

 

Wow. That takes 2 minutes! Not 20? I think I’ll go to Starbucks with the remaining 18 minutes!

Okay. That was simple. Gearing away from the average home user – what about enterprises wishing to connect a Windows 7 machine to a Domain?

Still simple.

 

You can now click on start and simply type what you wish to do: “Join a domain”

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig611.png)

 

Click it.

The semi familiar (Despite the GUI) screen appears

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig711.png)

Select Network ID

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig811.png)

For enterprises we will obviously select the first option and choose to proceed click: “next”

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig911.png)

We are still going to choose the first option as we are focusing on connecting this Windows 7 machine to a network with a domain. We click “next”

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig1011.png)

Windows 7 gives you a helpful screen of the credentials you will need

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig1111.png)

And we simply fill in the information. Username, password and the domain name. Then we simply click “next.” Again. Wow this is easy.

Once verified you will be connected to the domain, restart and Volla!

I, unfortunately, am not in a location at the moment where I can test connect my laptop to a DC at the moment but I assure you the steps are very straight forward.

Perhaps the most amount of testing you will have to perform is ensuring that your network settings are correct. For example, you may need to set your IP Address, Subnet Mask and Default gateway if you are running static as opposed to automatic DHCP. Also, you will have to change your DNS settings if your Domain Controller (DC) is configured to be a DNS server as well.

![](https:/jessicadeen.com/wp-content/uploads/2010/02/022010_0201_part2whymig1211.png)

I have not entered any manual addresses as I run automatic DHCP but this is the screen where you would enter the information. (Of course it depends on if you use TCP/IPv4 or TCP/IPv6…but for those of you connecting to a domain – you probably get the idea.

That’s it for today folks. For my next segment I will focus on security. What other topics would you like to read? All ideas are welcome!

