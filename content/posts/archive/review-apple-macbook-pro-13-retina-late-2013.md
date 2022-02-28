+++
author = "jldeen"
date = 2013-12-24T18:46:13Z
description = ""
draft = false
image = "../../images/rMBP_Late_2013_pmkhj3.jpg"
slug = "review-apple-macbook-pro-13-retina-late-2013"
title = "Review: New Apple MacBook Pro 13\" Retina (Late 2013)"
layout = "post"

+++


Every 3 years or so I make it a point to upgrade my systems in an effort to keep both up-to-date and best serve my clients. My previous Apple MacBook was the Early 2011 model with the base configuration at the time: 2.3GHz, 4GB DDR3 RAM, 320GB HDD. Since I’m a certified Apple Technician (ACMT, MIB, ACSP, and ASP) I typically perform all hardware upgrades myself so my previous Early 2011 model was no different. I started small since the cost for SSD storage was so high 3 years ago. I went with a Samsung 830 256GB at first and an upgrade to 8GB DDR3 1600MHz RAM. A year or so later, I upgraded to 16GB DDR3 1600MHz Corsair Vengeance RAM. 6 months after that upgrade, I removed the super drive and added in a second SSD – a Samsung 840 SSD 250GB. Despite the fact that my previous MacBook was barely 3 years old, it was fully maxed out with a combined storage capacity of 512GB of solid state storage and 16GB of RAM.

I recently traveled to Redmond, Washington and then to Ft. Lauderdale, FL. It was during that trip that I realized how cumbersome my current MacBook actually was. In comparison to new PCs and new devices, it was heavy was lacking on the CPU / Graphics side of the coin; as a result, I made the decision to upgrade to a new 13″ MacBook pro with Retina display (late 2013).

I spent weeks researching configuration options and decided I didn’t need 512GBs worth of SSD storage since I started keeping a majority of my data in the cloud (SkyDrive Pro is awesome – that will be another review, at another time). The new Apple MacBooks with Retina display prevent you from adding in additional RAM and SSD storage space since everything is soldered on-board now so I went with the mid-range 13″ rMBP which boasted the following configuration: 2.4GHz Haswell Processor, 16GB DDR3 RAM, and a 256GB SSD.

It took a few weeks for the CTO to be built and subsequently arrive but when it did, I was quite excited. The new MacBook was very sleek and was much lighter than my previous MacBook 13″. I fired it up and immediately used the integrated migration assistant to move the data from my previous system to my new and improved system. My previous system was running a Developer version of Mavericks OS but, nonetheless, was still fully up-to-date.

Since I was moving over 100GB worth of data via USB 2.0, the migration process took a few hours but to my dismay, when it completed, I couldn’t do ANYTHING. I mean anything. The system would boot up and arrive at the login screen where I have to enter my username and password but neither the track pad or keyboard would move / input data. It was quite disheartening. I booted into the 10.9 recovery partition and, lo and behold, the track pad and keyboard works there. So, I then tried a USB keyboard and mouse and booted back into 10.9 Mavericks that the MacBook Pro shipped with – nope. Still nothing. So, I pulled out a Bluetooth keyboard and my Apple Magic mouse – nope. Nothing.

I tried everything from SMC reset, PRAM reset, closing the lid for any length of time, turning the system off for any length of time, reinstalling the OS, installed ALL updates (I even have tried the Developer version of 10.9.1 plus updates that aren’t yet released), connecting USB 1.1 and 2.0 devices in every possible configuration, bluetooth keyboard / mouse and, needless to say, the problem persisted. I even succumbed and disassembled the machine to disconnect the battery and reconnect. (I do not advise this as a standard course of action for anyone who is not an ACMT and is not currently employed by an AASP.) No avail.

I ran Apple Service Diagnostics (ASD) on the system which reported zero errors and interestingly enough, the trackpad and keyboard work outside of the Mavericks install in the recovery partition and diagnostics tool.

I called AppleCare and reported my issue, which they defined as DOA. (I can check since I am still an AASP partner and have access to GSX). I tried a few more things, including a clean install and slow importing of just user data, followed up by applications. This worked for about a week.

One day, my computer died when I was out in the field. I got home, plugged it in and went to check on it the next day for work. Again! The keyboard and track pad were unresponsive. This was the last straw. I called AppleCare again and spoke to several people before working with Brian Bragg. He arranged a Genius Bar appointment and a replacement, supposedly. I went into the store on the scheduled day at the scheduled time and even paid for valet parking so that I could be efficient. My appointment was two days after Christmas so the mall was a mess. When I first walked in I was told to go talk to the guy in a red shirt with a green iPad. I did so but the guy could not find my appointment Brian created so he called Ed, the manager, over. I explained the situation, provided my serial number and told him to check the notes. Several arguments later, lots of confusion and his advice of “just return the system”, he checked the system in and said they would call if Apple agreed to replace it. (Note: Supposedly they already had but because I purchased this through the Employee Purchase Program — EPP — I wouldn’t qualify. That was his perspective, at least.)

Well, Ed was wrong. A week later, my new system arrived and I picked it up. In fact, it was earlier today when I picked it up. I fired it up, ran migration assistant and lo and behold – THE SAME ISSUE PERSISTED!

Now, I had performed a great deal of research when this first began.

[Here is the Apple Discussions thread](https://discussions.apple.com/message/24361962?ac_cid=tw123456#24361962) that everyone should be aware of. For the record, there are almost 250k views, 178 pages and over 2,500 replies. This is not an issue to dismiss and it needs to be escalated ASAP.

**Note: **The system works “fine” (keyboard and trackpad operate) on a clean install but will not allow the keyboard / trackpad to function as desired after I use migration assistant. I have also tried to boot from known good external drives and the system will not mount the root device. I have tried these same 10.9.1 (Build 13B3116) OS external hard drives with Late 2011, Late 2012 and Mid 2013 systems and all of them will boot up fine. It is only the late 2013 rMBP with Haswell that seems to be an issue.

I checked my console log and this is the same error that other users are seeing and I am seeing ON A CLEAN INSTALL as well. I see this error listed SEVERAL times.

**1/3/14 10:32:04.000 PM kernel[0]: The USB device Apple Internal Keyboard / Trackpad (Port 5 of Hub at 0x14000000) may have caused a wake by issuing a remote wakeup (2)**

I can get it to work, kind of, by jerry rigging it but it is not a full proof solution. I had to create a new profile, on a new install and import data, which is cumbersome to say the least. Again, my hard drives (current and fully up-to-date OS X 10.9.1) and time machine backups work on EVERY OTHER SYSTEM except the 13″ Late 2013 rMBP.

At this point, I’m not sure if it is best to wipe the system and return it seeing as Apple clearly doesn’t want to accept responsibility of this catastrophic failure and properly address it to offer a fix or if I should allow Brian from AppleCare to contact his engineers as previously discussed. I would hate to keep the system and discover that a fix will never be released which results in an expensive paperweight. I fully expect this to be a result of both hardware and software and the way the software addresses said hardware considering the system works outside of 10.9.1 Mavericks. **This is now considered a known and common issue and is clearly related to an incompatibility between Mavericks and the 13″ rMBP late 2013. In 5 years of being a certified Apple tech I have never seen anything quite like this. I would have to end my “review” with a very sour taste in my mouth and strongly advise users to steer clear from this model until Apple addresses it via update or publicly.**

Feel free to chime in below if you too are experiencing this issue and what course of action you took.

