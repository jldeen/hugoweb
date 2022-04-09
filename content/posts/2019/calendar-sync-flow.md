+++
author = "jldeen"
categories = ["calendars", "flow", "automation"]
date = 2019-01-08T23:17:00Z
description = ""
draft = false
image = "../../images/Screen-Shot-2019-01-08-at-14.45.51.png"
slug = "calendar-sync-flow"
tags = ["calendars", "flow", "automation"]
title = "How I set up a public Google Calendar and enabled auto-sync to an Office365 calendar in 3 steps"
layout = "post"

+++


Do you have multiple calendars for work, personal, family, etc? Me too! I have been wanting to clean up my calendar situation for awhile. This post details how I accomplished a big part of messy calendars.

First, your situation and needs may be different than mine. You may need to determine _your_ calendar needs and use the below as a guide. 

Questions you can ask yourself:

- What is important to you? 
- Do you want your calendar publicly available? 
- Do you want to embed a public calendar in a webpage?
- Do you just need to share it with your significant other or a handful of people?
- Are you all Windows/Exchange? 

Once you know what your needs are you can begin to figure out what works for you.

I travel and speak _a lot_. It's no secret really. I flew just shy of 136,000 miles last year and I already have speaking requests coming in for a year out. I confess, I began to get overwhelmed because of my lack of calendar organization. I also burned myself out last year because I was on stage for months at a time, which isn't sustainable long term. 

For me, my need was to have a public calendar I could add to my website and also copy to my work calendar. First and foremost, I wanted a visual endpoint where everyone could easily see my travel availability, one where I could not only put dates I was already traveling, but also dates I was not willing to travel. After hours of research and tinkering, I settled on Google Calendar because it suited _my_ needs.

### 1. Google Calendar to host information

I already use Google Calendar to share events, dates, and vacations with my girlfriend so setting up a second calendar for travel availability seemed simple enough.

The easiest and fastest way to get started is to create an __empty__ calendar in your Google account. Next, create an __empty__ calendar in your Office365 account. 

That's it. Move on to step 2. 

### 2. Microsoft Flow to enable one-way sync

Next, now that you have your __empty__ Goolge Calendar and your __empty__ Office365 calendar created you can create a [Microsoft Flow](https://flow.microsoft.com/) to __one-way__ sync your data from your Google Calendar to your Office365 calendar. My need was specific - I wanted whatever I put in the Google calendar to also sync to my work calendar so colleagues could see when I was out of the office/on the road. If you're not familiar with Microsoft Flow, it's pretty simple; it allows you to automate processes and tasks with simple logic. It's like the Microsoft version of IFTTT. The best part is there are already hundreds of [pre-made templates](https://flow.microsoft.com/templates/) to chose from. I used [this one](https://flow.microsoft.com/en-us/galleries/public/templates/a4aedc20a03611e6b35049b86faf1f1c/google-calendar-to-office-365-calendar-and-get-a-notification/).

When you use the template, it's pretty straight forward. You just authenticate to both accounts (Gmail and Office365 in my case), select the calendars you created in step 1, and click 'Create Flow'. 

![Screen-Shot-2019-01-08-at-14.11.46](/generated/full/Screen-Shot-2019-01-08-at-14.11.46.webp)

That's it. Move on to step 3.

### 3. Create calendar entries

Now you are ready to begin creating calendar entries. I use [Fantastical2](https://flexibits.com/fantastical) for my calendar management on my Mac and iPhone because it's simple to use with multiple accounts (iCloud, Gmail, Office365/Exchange). From within Fantastical, I began creating calendar entries in my Google calendar knowing the Microsoft Flow I created would run in the background and copy the contents to my Office365 calendar. 

That's it. 

One thing I did discover is the copy wasn't always immediate. There was an occasional delay, but within 5-15 minutes the data copied over without issue.

![Screen-Shot-2019-01-08-at-14.27.04](/generated/full/Screen-Shot-2019-01-08-at-14.27.04.webp)

I also want to explicitly point out the flow I setup is a one-way sync from Google > Office365. This is intentional on my end for a variety of reasons, but the most significant is my employer (Microsoft) has a corporate policy in place preventing me from using Flow on my work calendar as a source so it would not be compatible with a two-way sync automation. You are welcome to play around with the various Flow templates as your situation dictates. 

Also, since Google Calendar has an app for iPhone I can easily see my Travel Availability without having to fumble around multiple calendar accounts. 

![IMG_3560](/generated/full/IMG_3560_o.webp)

All that said, I now have a publicly available (and website embedded calendar) that is auto-synced to my work calendar. You can access my public calendar [here](https://jessicadeen.com/availability/).
