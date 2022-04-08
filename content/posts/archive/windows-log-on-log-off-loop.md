+++
author = "jldeen"
categories = ["Malicious Software", "Security", "Windows 7", "Windows Vista", "Windows XP"]
date = 2010-03-05T23:15:51Z
description = ""
draft = false
slug = "windows-log-on-log-off-loop"
tags = ["Malicious Software", "Security", "Windows 7", "Windows Vista", "Windows XP"]
title = "Windows Log On Log Off Loop"
layout = "post"

+++


Over the past few months I have seen an overwhelming increase to malicious software infection – including on Windows 7 machines. One of the more common errors now-a-days seems to be that when you attempt the removal of the malicious software you get what is now affectionately known as the “Windows Log On / Log Off Loop.”

In the past I have used various applications to provide a fix to this issue however it was always very time consuming and tedious. This solution works with Windows XP, Windows Vista and Windows 7 and is a simple registry modification that takes merely minutes.

The steps are as follows:

1. Boot into Mini Windows XP from either Hiren’s or Bart PE.

2. Run regedit.exe

3. Select HKEY_Users

4. Go to File, and select “Load Hive”

5. Navigate to the Windows installation folder (commonly, C:WindowsSystem32Config 6. Select “Software” and click, “Open”

7. Type a name for the hive (I.E. Repair Hive) 8. The software hive of the user in question will load under the title you assigned it

Finally, navigate to the following location:

`HKEY_USERS RepairHive Microsoft Windows NT CurrentVersion Winlogon`

Double click `Userinit` to change its key to the following:

`C:WindowsSystem32Userinit.exe,`

NOTE: You MUST, MUST, MUST include the comma. That is NOT NOT NOT a typo!

After entering this string, you MUST MUST MUST unload the Hive. Select the hive itself (for example if you labeled it “repair hive” select “repair hive”) and from the File menu choose “Unload Hive”

Restart the computer manually, Windows should be able to successfully log in now and you can proceed with rest of your removal / repair.

<span style="font-family: Wingdings;">J</span>
