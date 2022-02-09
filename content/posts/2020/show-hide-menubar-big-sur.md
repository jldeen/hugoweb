+++
author = "jldeen"
categories = ["Apple", "big sur", "automation", "applescript", "script editor", "menu bar"]
date = 2020-10-15T22:04:00Z
description = ""
draft = false
image =  "../../images/Screen%20Shot%202020-10-15%20at%2012.42.47.png"
slug = "show-hide-menubar-big-sur"
tags = ["Apple", "big sur", "automation", "applescript", "script editor", "menu bar"]
title = "How to show/hide the menu bar in macOS 11 Big Sur using AppleScript"
layout = "post"

+++


*** EDIT ***

As of now, the below code no longer works. However, thanks to a few comments from readers, there is a VERY SIMPLE FIX. Huge shoutout to [this Stack Overflow post](https://stackoverflow.com/questions/14433602/hide-menu-bar-and-dock-globally-with-applescript/65366308#65366308), and specifically, Sam Treadway, for the find.

```
tell application "System Events"
    tell dock preferences to set autohide menu bar to not autohide menu bar
end tell
```

*** // End EDIT ***

If you know me, you probably know I'm a huge fan of "no clicky clicky," which pretty much means - I want to click as little as possible on my screen to accomplish simple, or even complex, tasks.

For my day to day workflow I use a Stream Deck and a program called [Keyboard Maestro](https://www.keyboardmaestro.com/main/) to help me accomplish automations that are important to me. One key task I use frequently, especially when recording videos, is the ability to quickly and easily hide my menu bar. After I upgraded to macOS 11 Big Sur, I noticed several of my hotkeys / functions stopped working since Big Sur moved where things like the menu bar enable / disable check box is.

After spending a little bit of time playing with it, I came up with the below AppleScript code that will allow me to quickly and easily show or hide my menu bar.

Full disclosure, I did use [this stackexchange article](https://apple.stackexchange.com/questions/352369/error-system-events-got-an-error-can-t-get-application-process-system-prefer) to figure out the last piece of the puzzle, which ensures the "Main" anchor of the necessary pane is in fact selected, prior to clicking the necessary UI element. Prior to finding this, the code worked well, but would error the first time you ran it (since it didn't have the "Main" anchor selected), and then it would succeed subsequent times as long as System Preferences was open in the background. The revised code, as you'll notice below, keeps System Preferences hidden in the background while the menu bar is toggled, then quits the application once the toggle is complete.   

As an added bonus, I found [this blog post](http://apetronix.com/find-pane-id-for-system-preferences-app/) helpful for determining the pane id for the window you care about.

Now, you may wonder, how do I use this with something like StreamDeck? Easy! I use [this Keyboard Maestro Integration](https://github.com/Corcules/KMlink), create the macro in Keyboard Maestro and reference it in Stream Deck. 

![Screen%20Shot%202020-10-15%20at%2012.34.08](../../images/Screen%20Shot%202020-10-15%20at%2012.34.08.png)

![Screen%20Shot%202020-10-15%20at%2012.33.01](../../images/Screen%20Shot%202020-10-15%20at%2012.33.01.png)

Of course, if you didn't want to use Stream Deck or Keyboard Maestro, you could just save the script, and create a function, and call said function from command line, examples of this are below.

<script src="https://gist.github.com/jldeen/5f070004d1f02825900aa0bb7aa5e6e6.js"></script>



