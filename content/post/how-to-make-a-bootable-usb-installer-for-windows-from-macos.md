+++
author = "jldeen"
date = 2022-02-08T22:00:29Z
description = ""
draft = true
slug = "how-to-make-a-bootable-usb-installer-for-windows-from-macos"
title = "How to make a bootable USB installer for Windows from macOS"

+++


Format USB drive

MS-DOS (FAT) with MBR Partition Scheme

```
rsync -vha --exclude=sources/install.wim /Volumes/CCCOMA_X64FRE_EN-US_DV9/* /Volumes/WINDOWS\ 10

wimlib-imagex split /Volumes/CCCOMA_X64FRE_EN-US_DV9/sources/install.wim /Volumes/WINDOWS\ 10/sources/install.swm 3800

```



