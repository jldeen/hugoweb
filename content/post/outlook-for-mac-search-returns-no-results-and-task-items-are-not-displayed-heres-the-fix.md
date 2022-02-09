+++
author = "jldeen"
date = 2017-08-22T16:42:42Z
description = ""
draft = false
image = "Screen-Shot-2017-08-22-at-16.42.24_bnhiyy.png"
slug = "outlook-for-mac-search-returns-no-results-and-task-items-are-not-displayed-heres-the-fix"
title = "Outlook for Mac search returns \"No Results,\" and task items are not displayed? Here's the fix!"

+++


This morning I went to search for an email in Outlook and received the dreaded “No results” message instead of search results. I also discovered my task items disappeared. I’ve had this issue before, but I couldn’t remember how I solved it.

Bam! Here’s a quick blog post if for no other reason than my own reference in the future. Microsoft does have a KB article [here](https://support.microsoft.com/en-us/help/2741535/outlook-for-mac-search-returns-no-results--and-task-items-are-not-disp), but there isn’t really a set of “fix the problem” steps provided. In short, we have to force a reindex of the Outlook 15 Profile folder – it’s likely corrupt.

1. With Outlook closed, confirm you have the following folder:

/Users/[user-goes-here]/Library/Group Containers/UBF8T346G9.Office/Outlook 15 Profiles

2. Open System Preferences, click on “Spotlight.”

3. Click on the Privacy tab.

4. Click the “+” at the bottom and add the folder I mentioned above. (You can also simply drag that folder over into the list below. If the folder already exists in the list, remove it.

5. Close System Preferences, re-open System Preferences and click Spotlight again.

6. Click the Privacy tab, select the folder you added, and click the “-” to remove the folder.

7. Close System Preferences and wait about 10 minutes. Open Outlook and try to search. The spotlight reindex of your Outlook Profile folder should be finished and you should be able to search/view tasks again.

