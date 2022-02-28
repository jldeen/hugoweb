+++
author = "jldeen"
date = 2019-01-11T17:57:00Z
description = ""
draft = false
image = "../../images/Screen-Shot-2019-01-10-at-22.41.00.png"
slug = "embedding-a-google-calendar-without-iframe-using-tockify"
title = "Embedding a Google Calendar without iframe using Tockify"
layout = "post"

+++


I [previously wrote about how I setup a public Google Calendar and synced it to my Office 365 account using Microsoft Flow](https://jessicadeen.com/calendar-sync-flow/), but one thing I didn't like about the Google Calendar and the way it embeds on a webpage is: iframe. 

![eye-roll](https://media.giphy.com/media/54PaD9dWT0go/giphy.gif) 

The embed code Google provides right out the box uses iframe with a fixed width and height, not to mention the entire layout looks like it's from the 80's.

I set out on a mission to find a way to embed my Google Calendar to my website, but with better style choices, especially for mobile. Google Calendar iframe with mobile is pretty awful, which is unacceptable to me in this mobile first, cloud first world. 

I then tried every single Calendar service I could find before finally settling on Tockify. 

**Disclaimer:** Tockify's Google Sync feature is part of their premium service and is a **paid for** feature, but one I feel is _well_ worth it. Read below to find out more. Note: I am not paid by them or endorsed/sponsored. I am recommending them because it's what I use (and pay for).

[Tockify](https://tockify.com/) offers "modern attractive Website Calendars" that are fully customizable. They have a free basic plan, that gives you some essential features, but the premium plan is what interested me since it supports sync with Google Calendar. Premium is $8 per month or $80 a year and honestly, it's worth $80 to me to have a nice looking calendar that is responsive from any device. Tockify also boasts support for some pretty big web platforms like Squarespace, WordPress, and Weebly. 

Their platform is pretty simple - you sign up, you get a 14 day trial of premium (and you don't have to enter a credit card), then you enter your calendar inforamtion and you're off! 

![Screen-Shot-2019-01-10-at-17.17.35](https://cdn.jessicadeen.com/content/images/Screen-Shot-2019-01-10-at-17.17.35.png)

You can then custom tailor your calendar - colors, fonts, style (agenda, pinboard, monthly), etc., acorrding to your needs.

![Screen-Shot-2019-01-10-at-17.33.05](https://cdn.jessicadeen.com/content/images/Screen-Shot-2019-01-10-at-17.33.05.png)

After you're done designing how you want your calendar to look, you can grab the universal embed code by clicking, "Add to your site." From there, if you're using Ghost like I am, you just use the HTML object to paste in the Tockify embed code.

![Screen-Shot-2019-01-10-at-17.21.43-edit](https://cdn.jessicadeen.com/content/images/Screen-Shot-2019-01-10-at-17.21.43-edit.png)

When I first pasted the code over into a new page using the HTML option I couldn't see my calendar. As I said, I use the open source blogging software, [Ghost](https://github.com/TryGhost/Ghost), and the widely popular Casper theme with a few tweaks (disqus for comments, DeenOfDevOps branding, etc), which will all come into play here shortly...

I played with it a bit, but decided to contact Tokify support. Shoutout to Robert Dunne from Tockify! He has been awesome. He's answered all my questions and gone back and forth with me for the past 24 hours. We discovered there is a current bug in the Tockify embed script that conflicts with the CSS code in Casper for Ghost. Robert helped me write a work around and I'm sharing that with you here:

### 1. Inject into the Code Injection part of Ghost 
```
<style type="text/css">
.post-content.tock-fix {
    display: block;
    width: 100%;
}
</style>
```

### 2. Wrap the Tockify embed code in a div
```
<div class="post-content tock-fix">

<add with tockify embed code here>

</div>
``` 

That's it, you should now have a beautiful looking calendar you can customize according to your site's needs! 

Robert from Tockify did confirm they are working on a fix so the above woudln't even be necessary, but until then, here's a viable work around that looks great on both desktop and mobile.

And now, I have a beautiful [availability calendar](https://jessicadeen.com/availability) that works on any device.

![yes](https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif)



