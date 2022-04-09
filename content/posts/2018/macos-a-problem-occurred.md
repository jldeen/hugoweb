+++
author = "jldeen"
categories = ["macos", "Apple"]
date = 2018-11-28T15:33:00Z
description = "If you're using macOS 10.14 Mojave and are having trouble with the hotspot redirect for wifi networks, this post is for you! \"A problem occurred. The webpage couldn't be loaded.\" This doesn't give me a lot to go on, but thanks to some digging, I discovered the captive redirect wasn't working right."
draft = false
image = "../../images/Screen-Shot-2018-11-28-at-08.46.31.png"
slug = "macos-a-problem-occurred"
summary = "If you're using macOS 10.14 Mojave and are having trouble with the hotspot redirect for wifi networks, this post is for you! \"A problem occurred. The webpage couldn't be loaded.\" This doesn't give me a lot to go on, but thanks to some digging, I discovered the captive redirect wasn't working right. "
tags = ["macos", "Apple"]
title = "macOS: A Problem Occurred"
layout = "post"

+++


If you're using macOS 10.14 Mojave and are having trouble with the hotspot redirect for wifi networks, this post is for you! At some point after my upgrade to Mojave I began receiving the following message anytime I would connect to a hotspot network:

{{< figure src="/generated/full/Screen-Shot-2018-11-28-at-07.13.46.webp" >}}

"A problem occurred. The webpage couldn't be loaded." This doesn't give me a lot to go on, but thanks to some digging, I discovered the captive redirect wasn't working right. For now, the temporary work around I have found is to click "OK" and then close that window. Next, launch a browser window and navigate to: [http://captive.apple.com/hotspot-detect.html](http://captive.apple.com/hotspot-detect.html)

After, you should be redirected to the wifi hotspot connection portal so you can proceed with your usual authentication. Hope this helps someone else!
