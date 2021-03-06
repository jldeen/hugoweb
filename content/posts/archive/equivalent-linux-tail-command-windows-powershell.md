+++
author = "jldeen"
categories = ["linux", "powershell", "script", "windows"]
date = 2014-04-30T16:23:45Z
description = ""
draft = false
slug = "equivalent-linux-tail-command-windows-powershell"
tags = ["linux", "powershell", "script", "windows"]
title = "Want something equivalent to the Linux Tail command but for Windows? Use PowerShell!"
aliases = ["/equivalent-linux-tail-command-windows-powershell/"]
layout = "post"

+++


If you’re like me and you write a lot of scripts that take anywhere from 15 minutes to 50 minutes to complete an install, sometimes it’s nice to be able to see the log file generated as the installation completes.

In Linux, I would simply use:

```bash
tail -f 'location of file'
```

(without quotations) to monitor the file as new lines are added. In Windows, typing *tail* into command prompt or Windows PowerShell won’t do anything aside from generate an error. However, you can easily use:

```powershell
Get-Content “location of file” -wait
```

(again, no quotations) to accomplish the same task. The -wait switch allows it to “monitor just as *tail -f* in Linux would.

Let me know if this worked for a project you were working on in the comments section below!
