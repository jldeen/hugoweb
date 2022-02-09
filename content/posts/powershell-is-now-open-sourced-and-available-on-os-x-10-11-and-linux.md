+++
author = "jldeen"
date = 2016-08-19T16:43:48Z
description = ""
draft = false
image = "../../images/microsoft-linux_q1dxwi.png"
slug = "powershell-is-now-open-sourced-and-available-on-os-x-10-11-and-linux"
title = "PowerShell is now open sourced and available on OS X 10.11 and Linux!"

+++


**NOTE: This post is now out of date. To view the latest scripts for installing PowerShell Core, please check out my most recent PowerShell Core blog post [here](https:/jessicadeen.com/tech/updated-powershell-core-beta-6-04-azurerm-netcore-module-and-az-cli-2-0-install-scripts-for-ubuntu-and-os-x/).**

Yesterday, Microsoft and Jeffrey Snover announced [PowerShell is now open sourced and available on Linux and OS X](https://azure.microsoft.com/blog/powershell-is-open-sourced-and-is-available-on-linux/) and is available for download [here](https://github.com/PowerShell/PowerShell/tree/d6c0e27998bf9e7e6eabffc6e584de5575068d73). The blog post goes into great detail the journey to where we are now with PowerShell being available on platforms other than Windows, and there’s even a Channel 9 video demoing it [here](https://channel9.msdn.com/Blogs/hybrid-it-management/PowerShell-on-Linux-and-Open-Source). While I strongly encourage you to check out Snover’s announcement and video, I also wanted to note a few things:

1. You’re probably wondering how it works. Well, it’s powered by .NET Core, but does not require you to have .NET Core installed. The package you download will install the parts of .NET Core you need.

2. If you’re a current Bash user who is now interested on diving into PowerShell and want to know where to start, I recommend checking out the Map Book for Experienced Bash Users, which is about 70% of the way down on [this page](https://github.com/PowerShell/PowerShell/tree/d6c0e27998bf9e7e6eabffc6e584de5575068d73/docs/learning-powershell).

3. If you want to get started with setting it up on Ubuntu 14.04, 16.04, and OS X 10.11, instructions are on the GitHub link, but also below:

<span style="text-decoration: underline;">**On Ubuntu 14.04, Ubuntu 16.04, and OS X 10.11 (From a terminal session)**</span>

cd to your home directory by typing:

cd ~

Download the PowerShell package by typing:

wget https://github.com/PowerShell/PowerShell/releases/download/v6.0.0-alpha.9/powershell_6.0.0-alpha.9-1ubuntu1.14.04.1_amd64.deb

For just Ubuntu 14.04

Install the dependencies:

sudo apt-get install libunwind8 libicu52 sudo dpkg -i powershell_6.0.0-alpha.9-1ubuntu1.14.04.1_amd64.deb

For just Ubuntu 16.04

Install the dependencies:

sudo apt-get install libunwind8 libicu55 sudo dpkg -i powershell_6.0.0-alpha.9-1ubuntu1.16.04.1_amd64.deb

For just OS X 10.11

Install the package:

sudo installer -pkg powershell-6.0.0-alpha.9.pkg -target /

Then run powershell by typing the word: powershell  
**  
 Visual Studio Code Modifications**

If you want to edit your Integrated Terminal settings in VS Code on OS X or Ubuntu to use new Powershell, I have included the instructions below:

From within Visual Studio Code, click File -> Preferences -> User Settings. This will open a settings.json file  
**  
 OS X – Add this line:**

{"terminal.integrated.shell.osx": "/usr/local/bin/powershell" }

(Note: this was tested on OS X 10.11.6)

**Ubuntu – Add this line:**

{"terminal.integrated.shell.linux": "/usr/bin/powershell" }

(Note: This was tested on 14.04)  
**  
 Final Tips**

Create an alias to use ‘ps’ instead of powershell

cd to home directory:

cd ~

Create or edit ./bash_profile using your favorite text editor. I used vim.

sudo vim ./bash_profile

Add the following line:

alias ps='powershell'

Type the following to refresh the bash shell environment:

source ~/.bash_profile

And there you go! Test it out, let me know what you think!

