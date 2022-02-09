+++
author = "jldeen"
date = 2016-11-04T13:27:24Z
description = ""
draft = false
image = "../../images/purgeable-6c_sj7nes.png"
slug = "mac-os-x-sierra-purgeable-space"
title = "Mac OS X Sierra - Purgeable Space"

+++


I’m finally getting some time to sit down and catch up on some overdue blog posts. About a month ago, shortly after OS X 10.12 Sierra hit GA, I noticed an enormous amount of “purgeable” space on one of my Macs. I attempted to backup my iPhone 6 128GB iPhone to move to a 256 iPhone 7 Plus but received the dreaded message from iTunes, “Not enough free space to complete this action.” I realized I had about 280GB worth of unnecessary data on my local SSD so I deleted it and emptied the trash. I thought that was it so I attempted the backup and restore again, and yet again, I received the same message. I looked in Finder and confirmed I had 350GB+ worth of “free space.” This was starting to look odd. I restarted my system several times and retried the backup/restore for the 5th time because I wholeheartedly believe in the definition of insanity. Same &@%^@ problem. I begrudgingly called AppleCare and attempted to work with tier 2 and tier 3 tech support in case there was some new feature I was unaware of. Apple’s tech support, in all their genius, suggested I reformat the Mac and try again. This answer was, obviously, unacceptable.

I asked a few of my old tech buddies who work for Apple as well and they too were puzzled. I had gone through and done every logical and obvious step, including reinstalling iTunes. I still couldn’t find how 350GB+ wasn’t enough for my 128GB iPhone to backup. Finally – I made a discovery. I went to System Information and opted to see more information about the storage allocation of my Mac. I noticed there was this grey space called “purgeable” space which equaled the exact amount of free space I cleared by removing unnecessary data. I finally scoured the internet enough to gather that this space may be related to a pending Time Machine backup. <span style="text-decoration: underline;">The suggested solution was to temporarily disable Time Machine and then re-enable it after 10 minutes or so. Lo and behold, the purgeable space was gone, the storage part of System Information was now reporting 350GB+ as free space (no longer purgeable), and iTunes finally successfully backed up.</span> So, if you are struggling with a similar issue, try to disable Time Machine for 10-15 minutes, re-enable, and see if you now have your once-held-hostage free space back.

I did a little more digging into storage and OS X Sierra and discovered Apple attempted to introduce a new feature called, “Optimized Storage.” The only problem with this feature is no one seems to fully understand how it works, or how useful it is. Even when I called AppleCare, one technician suggested the space reported in the Optimized Storage tool was the exact amount of space reported as purgeable space in the storage section of System Information. I had to do math with him to confirm 10GB + 5GB + 5GB worth of whatever this new Sierra feature found does not equal the 280GB of purgeable space I can’t use on my system. If you would like to learn more about Optimized Storage, [this Support KB page](https://support.apple.com/en-us/HT206996) on Apple may or may not be as helpful as the AppleCare Techs I worked with. At any rate, I hope my experience helps someone else who stumbles across this post.

