+++
author = "jldeen"
date = 2017-08-11T08:00:18Z
description = ""
draft = false
image = "Screen-Shot-2017-08-10-at-21.06.28_v6o0xr.png"
slug = "powershell-core-scripting-pro-tip"
title = "PowerShell Core Scripting Pro Tip!"

+++


Super quick update today – here’s a handy little pro tip when scripting shell scripts for PowerShell Core. In my previous install scripts I would use the same command one would use from a command line level:

powershell Install-Module -Name AzureRM.Netcore

However, I ran into two problems in my [latest scripts](https:/jessicadeen.com/tech/updated-powershell-core-beta-6-04-azurerm-netcore-module-and-az-cli-2-0-install-scripts-for-ubuntu-and-os-x/). First, you now have to use sudo to give the user permissions to install modules. Second, you have to specifically declare you intend to use a command after “powershell” and wrap the command in curly braces. Here’s how the new command would look:

sudo powershell -Command {Install-Module -Name AzureRM.Netcore}

It should be noted if you don’t use the -Command switch after, you will receive the following error: *“The argument ‘Install-Module’ to the -File parameter does not exist. Provide the path to an existing ‘.ps1’ file as an argument to the -File parameter.”*

I played with this for an hour before I read the documentation by typing:

powershell -h

For those interested, I have included documentation for the -Command switch below:

“-Command  
 Executes the specified commands (and any parameters) as though they were  
 typed at the Windows PowerShell command prompt, and then exits, unless  
 NoExit is specified. The value of Command can be “-“, a string. or a  
 script block.If the value of Command is “-“, the command text is read from standard

If the value of Command is “-“, the command text is read from standard  
 input.

If the value of Command is a script block, the script block must be enclosed  
 in braces ({}). You can specify a script block only when running PowerShell.exe  
 in Windows PowerShell. The results of the script block are returned to the  
 parent shell as deserialized XML objects, not live objects.

If the value of Command is a string, Command must be the last parameter  
 in the command, because any characters typed after the command are  
 interpreted as the command arguments.

To write a string that runs a Windows PowerShell command, use the format:  
 “& {<command>}”  
 where the quotation marks indicate a string and the invoke operator (&)  
 causes the command to be executed.”

