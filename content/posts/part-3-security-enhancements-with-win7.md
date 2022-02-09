+++
author = "jldeen"
categories = ["IT", "Security", "Windows 7"]
date = 2010-02-26T06:45:34Z
description = ""
draft = false
slug = "part-3-security-enhancements-with-win7"
tags = ["IT", "Security", "Windows 7"]
title = "Part 3: Security Enhancements with Win7"

+++


I have many enterprise professionals and even average consumers who ask me daily, “How can I be most secure in my daily computing?” The answer is simple: Windows 7. We’ve all heard it, “Windows 7 is the most secure and advanced operating system available today.” Okay, it’s easy to say that, but where is the proof?

What changes were made when moving from Windows XP / Windows Vista and branching into the Windows 7 world?

This post will highlight some of the new features / changes Windows 7 did when compared to its predecessors.

1. <div>Streamlined UAC (User Account Control)</div>We all became familiar with UAC in Windows Vista yet how many of us disabled it within the first 2 minutes of its discovery? Probably everyone reading this post – I know I did. It drove me crazy. “You are about to install a program, are you sure you want to do this?” Me: “What?!?! Of course I’m sure!”

So, how is Windows 7 UAC different from Windows Vista? Well, for one, it is more streamlined. If you notice, the messages were altered to ensure the end user could understand what was happening to his or her machine. For example, instead of the above question, we are now presented with a question like, “A program is attempting to make a change to your computer, are you sure you want to allow this change?” Well that makes more sense. What if it were a program I never wanted to allow to make changes? Like a virus perhaps? Hmm..okay. Good. Now, still the question presents itself – “What is the purpose for UAC?” I’m asked that frequently – why included it in Windows 7? UAC was created in an effort to allow legacy applications to run with standard user rights. By creating a feature like this, Microsoft has enhanced the user experience ten-fold with Windows 7 by reducing the amount of operating system UAC prompt messages a UAC user receives but also ensures that standard users can do more than they could previously and all users will see less prompts than were present in Windows Vista.
2. <div>AppLocker</div> 

Application control policies with AppLocker were redesigned to allow a flexible and simplified mechanism that will allow all IT admins to determine what applications are allowed to run on the desktop yet will still simultaneously let the user run and install applications required to ensure efficiency and productivity in the workplace.

This feature offers a simple structure and ultimately 3 basic rules: “allow”, “deny” and “exception”. Simply put: Allow is “good”; deny is “bad”; exception removes the good and bad rule for specified files.

 

1. <div>Bit Locker / Bit Locker To Go</div>How many times have you lost a computer, hard drive or flash drive with confidential information on it? I lose a flash drive weekly – I know bad habit. BitLocker existed previously on Vista but 7 extends this feature to removable devices as well. BitLocker prevents the Windows 7 file and system protections from being altered or viewed from another operating system.

Windows 7 BitLocker also adds DRA (Data Recovery Agent) for all volumes protected by BitLocker. This will allow IT admins to assign the right DRA to the OS, fixed hard drives and now removable devices as well. Quoted from Microsoft “The DRA is a new key protector that is written to each data volume so that authorized IT administrators will always have access to BitLocker protected volumes.”

 

Windows 7 was built upon the foundation of Windows Vista however 7 still brings quite a bit of security enhancements to the table so that users can feel secure and still efficient in their daily tasks.

For more in depth information on the security enhancements mentioned here, please see the following thread as what I have written in this post is partially paraphrased and quoted directly from the Windows creator themselves – Microsoft.

[http://technet.microsoft.com/en-us/library/dd560691.aspx](http://technet.microsoft.com/en-us/library/dd560691.aspx)

That’s it for tonight folks!

