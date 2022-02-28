+++
author = "jldeen"
date = 2018-08-29T15:51:37Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-08-29-at-13.55.01_rudoob.png"
slug = "down-the-rabbit-hole-toggle-visibility-for-date-time-in-macos-menu-bar"
title = "Down the rabbit hole: Toggle Visibility for Date/Time in macOS menu bar"
layout = "post"

+++


Where do I even start? I record a lot of content for Channel 9 and YouTube and I always turn off the date and time in my menu bar when recording (makes for cleaner editing). I have a dedicated demo system, but every now and then, I have to use my workhorse for demos and content creation, which means turning the date and time on/off. Though it’s a relatively easy task (System Preferences > Date & Time > checkbox), it annoys me because **#noclickyclicky**! So, I set out to write a function to toggle it on and off and I assumed it would be easy. *laughs*

Apple has made quite a bit of changes to macOS with Sierra (System Integrity Protection being one of them) and I am running High Sierra; a lot of the old hacks I Googled didn’t work for me. So I wrote my own…

I have made modifications to my System Preferences in the past using defaults and thought, “No problem, I’m sure there’s a .plist I can tap into and write a true/false one-liner.” *laughs*

I ran **`defaults read com.apple.menuextra.clock`**, but there is no working visibility boolean or string I can access. So my next step was to check out **`defaults read com.apple.systemuiserver menuExtras`**, which let me find the ‘Clock.menu’ entry I was searching for; but then simply removing that line from the .plist file did not successfully remove the clock (even with killing the sytemuiserver). So the rabbit hole just continued spiraling and my curious ass couldn’t help but fall deeper and deeper into the abyss.

The first working attempt at a show_clock/no_clock set of function commands for my badass terminal dotfiles was less than ideal for what will be obvious reasons if you choose to test it out:

function noclock () { defaults write com.apple.systemuiserver menuExtras '( "/System/Library/CoreServices/Menu Extras/Battery.menu", "/System/Library/CoreServices/Menu Extras/AirPort.menu", "/System/Library/CoreServices/Menu Extras/Volume.menu" )' && killall SystemUIServer } function showclock () { defaults write com.apple.systemuiserver menuExtras '( "/System/Library/CoreServices/Menu Extras/Clock.menu", "/System/Library/CoreServices/Menu Extras/Battery.menu", "/System/Library/CoreServices/Menu Extras/AirPort.menu", "/System/Library/CoreServices/Menu Extras/Volume.menu" )' && killall SystemUIServer }

Not only was the comand slow, I didn’t like that I was now copying multiple menu extra items back and forth with my “toggle.” However, this was leading me somewhere.

I then stumbled upon PlistBuddy and decided to get creative there. I also opted to turn the function into a toggle rather than separating it out:

function toggleClock () { /usr/libexec/PlistBuddy -c "Print :menuExtras:" ~/Library/Preferences/com.apple.systemuiserver.plist | grep "Clock.menu" > /dev/null 2>&1 if [[ $? -eq 0 ]]; then defaults write com.apple.systemuiserver "NSStatusItem Visible com.apple.menuextra.clock" -bool FALSE /usr/libexec/PlistBuddy -c "Delete :menuExtras:4" ~/Library/Preferences/com.apple.systemuiserver.plist killall SystemUIServer else defaults write com.apple.systemuiserver "NSStatusItem Visible com.apple.menuextra.clock" -bool TRUE defaults write com.apple.systemuiserver menuExtras -array-add "/System/Library/CoreServices/Menu Extras/Clock.menu" killall SystemUIServer fi }

This was definitely cleaner than my previous attempt, but still slow in actual use. I couldn’t understand why such a simple checkbox was requiring so much code to automate.

Final thought! Abandon the bash shell and use AppleScript like we did back in the 90’s! Going retro with my rabbit hole. I knew if I could get Apple Script to work I would solve the slow issue I created by running **`killall SystemUIServer`**.

#!/usr/bin/env osascript tell application "System Preferences" set current pane to pane id "com.apple.preference.datetime" tell application "System Events" to tell process "System Preferences" delay 0.5 click checkbox "Show Date and Time in menu bar" of tab group 1 of window 1 end tell end tell quit application "System Preferences"

Well, I got it to work in Script Editor and thought, “No problem, I’ll add it into a var or function and run it as a command.” I use an Apple Script to also get my Spotify information in my tmux so my plan was to just repeat that logic. Wrong. Since I call System Events in this script, I would get the following error indicating I need to allow assistive access.

/Users/jessicadeen/Git/dotfiles/bin/toggleClock.sh:269:343: execution error: System Events got an error: osascript is not allowed assistive access. (-1719)

Now, I set out on this mission so I wouldn’t have to do any manual steps – **#noclickyclicky**! So I figured, yet again, no problem! I’ll just run a command to allow the necessary access. Again wrong, and here’s where SIP, or [System Integrity Protection](https://support.apple.com/en-us/HT204899), comes in. I found [this blog post](https://jacobsalmela.com/2014/07/26/os-x-yosemite-osascript-enabling-access-assistive-devices/) which looked promising – I could simply use sqlite3 or tccutil to make a one-line change (**`brew install tccutil; sudo tccutil --insert /usr/bin/osascript`**) to the database! Only – that method stopped working in 10.12 Sierra and still doesn’t work in 10.13 High Sierra due to the addition of SIP. There’s an article [here](https://applehelpwriter.com/2016/09/20/dropbox-hack-blocked-by-apple-in-sierra/) where Dropbox actually had run into this issue too.

There’s an open issue in tccutil’s repo [here](https://github.com/jacobsalmela/tccutil/issues/18) and from the sound it the issue will be resolved in 10.14 Mojave. Hallelujah! There is a workaround I have not tried in this open issue [here](https://github.com/univ-of-utah-marriott-library-apple/privacy_services_manager/issues/51), but it involves a series of restarts to enable/disable SIP and I can’t automate that very well since it uses the recovery console.

So, for the time being, my final function looks like this:

function toggleClock () { ~/Git/dotfiles/bin/toggleClock.sh }

And the toggleClock.sh is the previously mentioned applescript. Upon first launch, I do need to allow whatever program (terminal in VS Code or iTerm) is running that function acccessibilty access manually through System Preferences. The good news is I only have to do this ONCE, from then on, the function and code works great.

While it’s not 100% automated (and therefore is still in major alpha for public use of badass terminal), it’s MUCH better than me having to open System Preferences, click Date & Time, check a box, and close a Window. That would take 10 seconds each time, which how often I’ve done it (and will continue to have to do it), who knows how much time I just saved by spending 8+ hours going down this rabbit hole! *sarcasm* Hahaha! But I love it, I love these kinds of hacks and learning more and more about backend under-the-hood shit.

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-08-29-at-13.55.01_rudoob.png)

