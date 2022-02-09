+++
author = "jldeen"
date = 2017-12-14T11:39:00Z
description = ""
draft = false
image = "../../images/IMB_o0eiY6_q3tipg.gif"
slug = "powershell-core-master"
title = "PowerShell Core Master Install Script! Get started with just one command!"

+++


I’ve been meaning to write this for a long time. This post will now be considered the “master” for how to get the latest version of PowerShell Core and AzureRM NetCore modules setup on your system. I even included a bonus option to setup Azure CLI, if desired. Enjoy!

![](https://cdn.jessicadeen.com/content/images/IMB_o0eiY6_q3tipg.gif)

Simply copy and paste the below command for your environment into your preferred terminal and press enter. If you’re using Linux, I recommend starting with the Linux Master install script. However, individual Ubuntu (14,16, and 17) install scripts are available in the project repo if needed.

**Linux Master** (As of the time of this post, this script supports Ubuntu 14, 16, 17, Debian 8, Debian 9, CentOS7, and RHEL7)  
 * Requires whiptail

 bash -c "$(curl -fsSL https://raw.githubusercontent.com/jldeen/pwshcore/master/install.sh)"

**macOS **(This is not a GUI install, but should work for macOS 10.12+)

bash -c "$(curl -fsSL https://raw.githubusercontent.com/jldeen/pwshcore/master/mac/install.sh)"

In time, I would like to add support for more distros. If you’d like to contribute to this project, the repo is [here](https://github.com/jldeen/pwshcore).

Note: While I tested this as much as possible, this project is still considered to be in development. There may be bugs. I encourage you to file an issue any are discovered.

