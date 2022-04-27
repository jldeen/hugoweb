+++
author = "jldeen"
date = 2016-08-05T08:00:57Z
description = ""
draft = false
slug = "15-ubuntu-linux-commands-everyone-should-know"
title = "15 Ubuntu Linux Commands Everyone Should Know"
aliases = ["/15-ubuntu-linux-commands-everyone-should-know/"]
layout = "post"

+++


As I mentioned in my [Windows 10 Anniversary Update post](https:/jessicadeen.com/tech/10-things-you-should-know-about-the-windows-10-anniversary-update-now-available/), [Bash is on now on Windows](https:/jessicadeen.com/tech/microsoft/bash-windows/), and I thought it would be beneficial to share 15 Ubuntu Linux commands every user should know. Below is my complied list, but if I missed any, please feel free to add a comment and help the readers out!

![](/generated/full/windows-10-ubutnu_axyqj4.webp)

1. **sudo  
**This command will elevate your command so it executes with “superuser” privileges. Example: sudo apt-get install [package-name-here] You can also use this command to ‘switch user’ to the root user by typing: sudo su. When typed, you will be prompted for your current user password, and once entered, the user will change from the current user to root.
2. **man**  
 This command, when used with another command (example: man sudo), will give you the BSD System Manager’s Manual for the command so you can better understand its function and use. When I was first learning command line, I would man every command to learn more about its application within the system.
3. **pwd  
**This command stands for, “print name of current/working directory” and comes in handy when you don’t know which directory you’re in from the command line.
4. **apt-get  
**This command is used  to handle packages on the system. Perhaps the most common uses of this command are (no quotes) ‘**sudo apt-get update**’, which updates the repositories for the system; ‘**sudo apt-get upgrade**’, which upgrades the packages installed on the system; ‘**sudo apt-get dist-upgrade**’, which upgrades the kernel and some other packages not covered in the previous upgrade command; and ‘**sudo apt-get install [package-name-here]**, which is used to install packages to the system. Note: **apt-get** is for debian based systems such as Ubuntu, which this post focuses on, other operating systems may use different commands such as **yum**, **dnf**, and **zypper**.
5. **ls  
**This command is the unix / Linux equivalent to “dir” in Windows and lists the directory contents. You can add switches to it such as **ls –la**, which will list all contents including those starting with a ‘.’ in a long listing format that displays details such as permissions, date, file/folder count, and owner.
6. **cd**  
 This command is used to ‘change directory’ the same way it is used on Windows. To move from one current working directory to another you would simply type (no quotes), ‘**cd [directory/path/here/]**.
7. **mv**  
 This command is used to move files from a source directory to a destination directory. You can use switches such as **–n** to not overwrite an existing file, or **–f** to force the move. You can also use this command to rename a file.
8. **cp  
**This command is used to copy files and directories from a source (or multiple sources) to a directory. Like the **mv** command above, you can also use switches such as **–f** to force the copy, **–n** to prevent overwriting an existing file, or **–p** to preserve information such as ownership, timestamps, etc.
9. **mkdir  
**This command is used to create a new directory in a desired location within the system. When used, this command will make a directory in the present working directory, if it does not already exist.
10. **rm** and **rmdir  
**When used, both commands, respectively, will remove a file or folder within the system. Like other commands explained above, you can also use switches such as **–f** to force the removal, **–r**  to recursively remove directories and their contents, or **–i** to prompt before every removal. Note: **rmdir** will remove empty directories.
11. **clear**  
 This simple command will clear the terminal screen which, personally, helps tired eyes once too much text has appeared on the screen.
12. **touch **  
 This command will allow you to make a file using just the Linux command line. Similar to the **mkdir** command, you can use touch to make files. Note: When used, this command makes empty files. An example of this command would be: **touch test.txt** You could then use the following command to edit that file, if desired.
13. **nano, pico, vim** (Text Editors)  
 These three commands are all various text editors included in Linux. Nano and Pico are pretty much the same thing today, but in older versions of Unix/Linux pico used to be the version that preceded nano. Vim on the other hand is an enhanced version of vi, which was a popular text editor in older versions of Unix/Linux as well. Personally, I prefer vim, but I have a lot of friends who swear by nano. It ultimately comes down to user preference and, as I’m sure some would argue, memory. Vim does require some additional memorization of shortcut commands used within the editor, but once you have those down, I find it is both easier and faster to use than nano.  For what it’s worth, I used nano for years on OS X before learning vim once I learned Linux command line. Note: In some versions of Linux, you might have to install the vim package to get the new enhanced version. To do so, you would type **sudo apt-get install vim** and press y when prompted.
14. **cat**  
 This command stands for concatenate which will concatenate files and print (display) the standard output on the screen. Using cat is the easiest way to print (display) file contents from the command line. You can even use switches like **–n** to include number lines on the output.
15. **find / location**  
 These commands, as you might guess, are used  to find or locate a file on the system. **Find** is used to search for files in a directory hierarchy, while **locate** finds files by name. **Find** tends to be a little slower than locate, but is also up-to-date and does a real time search. **Locate** is faster, but uses a previously built database (updatedb) and searches only names (or parts of names). When looking for a file on the system, I use **find** 99% of the time.

I originally started this post out with the intention of writing about 10 must-know commands and it quickly turned to 15. As I was writing, I remembered two more helpful commands, but I also want to encourage you to use what you’ve learned. Two bonus commands I want you to know are **kill** and **passwd**, but you can use the **man** command explained above to learn more about each of them. I also strongly encourage you to use the **man** command on each of the other 14 commands I wrote about to understand them a little more in depth.

