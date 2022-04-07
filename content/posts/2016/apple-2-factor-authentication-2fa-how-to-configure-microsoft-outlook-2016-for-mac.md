+++
author = "jldeen"
date = 2016-12-21T08:00:01Z
description = ""
draft = false
image = "../../images/2fa_tpijlj.png"
slug = "apple-2-factor-authentication-2fa-how-to-configure-microsoft-outlook-2016-for-mac"
title = "Apple 2 Factor Authentication (2FA) & How to configure Microsoft Outlook 2016 for Mac"
layout = "post"

+++


As you all know, 2FA / MFA, or 2 Factor Authentication / Multi Factor Authentication is the recommended security protocol for all online accounts. If you’ve been using iCloud, formerly known as Mobile Me, for the past several years, you probably know 2FA is now available. I finally got around to enabling it on my accounts over the weekend and thought I would write a little how-to blog post as I didn’t feel there was enough written guidance on their KB page [here](https://support.apple.com/en-us/HT204915).

First, assuming you are using at least iOS9 or OS X El Capitan, you can enable 2FA for iCloud by performing the following steps.

**On your iPhone, iPad, or iPod touch with iOS 9 or later:**

Go to Settings > iCloud > tap your Apple ID.  
 Tap Password & Security.  
 Tap Turn on Two-Factor Authentication.

**On your Mac with OS X El Capitan or later:**

Go to Apple () menu > System Preferences > iCloud > Account Details.  
 Click Security.  
 Click Turn on Two-Factor Authentication.

After you have enabled 2FA for your devices, you will need to update the authentication for any applications using your iCloud account. In my case, I had to update the authentication for Microsoft Outlook 2016. You will need to generate an “app specific password,” which you can do from your account management portal [here](https://appleid.apple.com/account/home).  
**Note: This will also test and confirm 2FA is working for your iCloud account as you will have to allow access to the web page from one of your devices.**

From there, you will want to navigate to the “Security” section, ensure Two Factor Authentication is on, and then find “Generate Password…” under “App Specific Password.” Once you click that link, another small window will pop up with your app-specific password. Simply copy the password and paste that into your application requesting your iCloud password; in my case, I pasted the provided password into my Outlook 2016 for Mac pop-up window.

![](/images/2fa_tpijlj.png)

