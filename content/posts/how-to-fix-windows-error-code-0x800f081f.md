+++
author = "jldeen"
date = 2016-12-20T13:09:25Z
description = ""
draft = false
image = "../../images/Error-code_uavl9m.png"
slug = "how-to-fix-windows-error-code-0x800f081f"
title = "How to fix Windows Error Code 0x800f081f"

+++


If you are struggling with Windows Error Code: 0x800f081f – *“The source files could not be found. Use the “Source” option to specify the location of the files that are required to restore the feature. For more information on specifying a source location, see http://go.microsoft.com/fwlink/?LinkId=243077″* – this post is for you.

You may know you can use DISM to resolve the error by typing the following, but there is one more step you need to do in order for the command to work.

Prior to running the below command, download the .cab file for Windows 10 from [here](https://jldeen.blob.core.windows.net/public/microsoft-windows-netfx3-ondemand-package.cab) and save it directly to your C: root directory. After the .cab file successfully downloads, you can run the below command from a PowerShell prompt and it should complete without error.

Dism.exe /online /enable-feature /featurename:NetFX3 /source:C: /LimitAccess

![](https://cdn.jessicadeen.com/content/images/Error-code_uavl9m.png)

