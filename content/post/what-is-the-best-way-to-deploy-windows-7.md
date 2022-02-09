+++
author = "jldeen"
date = 2012-12-09T20:24:11Z
description = ""
draft = false
slug = "what-is-the-best-way-to-deploy-windows-7"
title = "What is the best way to deploy Windows 7?"

+++


I have a lot of people ask about the best method to move their enterprise from a legacy operating system to Windows 7. I wrote a bit of a general step-by-step that I hoped would assist other IT Pro’s who may find themselves in the same scenario asking the same question.

To begin, I always recommend the [Microsoft Deployment Toolkit (MDT)](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx). First, it’s free. Second, it can handle all your deployments including Windows XP, Windows 7, Windows Server 2003, Windows 2008 and Windows 2008R2. Using MDT, you can easily add both applications and drivers, create task sequences, join a domain, create an administrator account, specify time zone, etc. You can also import all user data into the new environment using the [User State Migration Tool](http://technet.microsoft.com/en-us/library/dd560801(v=ws.10).aspx) (also free).  
 To become familiar with the process of using MDT, you might want to check out these videos:  
 • [Deployment Day Session 1: Introduction to MDT 2012](http://technet.microsoft.com/en-us/video/tdbe12-deployment-day-session1.aspx)  
 • [Deployment Day Session 2: MDT 2012 Advanced](http://technet.microsoft.com/en-us/video/tdbe12-deployment-day-session2)  
 You can even tie MDT into Windows Deployment Services if you wish to help streamline the deployment process.  
 To have computer name assigned to a client computer, you will want to check out [Prestaging client computers](http://technet.microsoft.com/en-us/library/cc770832(v=ws.10).aspx) from TechNet, if you are using Windows Server 2008 or Windows Server 2008 R2. If you are using Windows Server 2003, or Windows Server 2003 R2, you’ll want to read [Prestage client computers](http://technet.microsoft.com/en-us/library/cc759196(v=ws.10).aspx). Alternatively, you could use an asterisk (*) to have a name generated automatically during your deployment process.  
 In addition to the videos previously provided, you might also want to check out these two videos on the topic of deployment and imaging using some of the tools mentioned above:  
 • [Alphabet Soup Deployment: Understanding MDT, WDS, MAP, ACT, SCCM, and USMT](http://technet.microsoft.com/en-us/windows/ff657745)  
 • [Deploy Windows 7 The Easy Way: Using WDS, MDT and AIK – Step-By-Step](http://blogs.technet.com/b/danstolts/archive/2010/03/11/deploy-windows-7-the-easy-way-using-wds-mdt-and-aik-step-by-step-video.aspx)

As far as sysprep goes, you can customize the machine according to your specifications within [audit mode](http://technet.microsoft.com/en-us/library/dd799305(v=ws.10).aspx) and then run sysprep /oobe /generalize with an unattend.xml file that has the [copyprofile setting enabled](http://support.microsoft.com/kb/973289). After running your sysprep command you will want to boot to your capture utility and proceed to capture an image of your reference machine. If you need a capture utility, you might want to check out Microsoft’s [ImageX](http://support.microsoft.com/kb/973289) which is also available for free.  
 Two videos that will walk you through the process of using sysprep, imagex and customizing a Windows installation can be found on the Springboard Series page on TechNet at the following links:  
 • [Preparing an Image using Sysprep and ImageX](http://technet.microsoft.com/en-us/windows/preparing-an-image-using-sysprep-and-imagex.aspx)  
 • [Capture the Customized Windows Installation](http://technet.microsoft.com/en-us/windows/ff657748)  
 Hope this helps gets you started and feel free to ask questions in the comments below regarding your imaging and deployment process!

