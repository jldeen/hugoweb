+++
author = "jldeen"
date = 2016-06-02T15:49:25Z
description = ""
draft = false
image = "bitnami_vliu7m.png"
slug = "windows-azure-how-to-get-started-with-bitnami-and-wordpress"
title = "Microsoft Azure: How to get started with Bitnami and WordPress"

+++


<span style="font-size: small;">I thought I would write a quick how-to for getting started quickly with Bitnami and WordPress in less than 5 minutes from within Microsoft Azure. First, sign into the the new portal at portal.azure.com and then click on “New” on the left hand side. This will open a blade where you can search the marketplace for the Bitnami WordPress pre-configured, ready to run image for Microsoft Azure.  </span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image.png)

<span style="font-size: small;">Select the WordPress option where Bitnami is the publisher and a new blade will open allowing you the option to select, “Create.”</span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-1.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-1.png)

<span style="font-size: small;">Once you click create, you will be sent on a journey to create and configure your virtual machine. You will want to enter in your required fields, and remember to make note of your username and password if you opted for that authentication option.</span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-2.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-2.png)

<span style="font-size: small;">You will want to choose the size of the VM you want. I recommend starting with the A0 Standard option and then scaling as needed. You can then configure any optional features such as disk type, monitoring, network security groups, availability sets, etc. Finally, click on step 4 for the summary and confirm all looks well. </span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-3.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-3.png)

<span style="font-size: small;">Press OK and proceed to step 5 to purchase and begin the VM creation. The creation process will take a little bit of time to get going, but once it completes, you will see a notification in your notification center. You can follow the deployment process along if you wish and watch as all your resources are created. </span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-4.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-4.png)

<span style="font-size: small;">Finally, to login to your new instance, you can navigate to your public IP address and append /wp-admin/ to the end of it, or you can assign a DNS name to it if you wish and then still append the DNS with /wp-admin/. Example: 104.40.80.178/wp-admin/ or bitdemojd1.westus.cloudapp.azure.com/wp-admin/</span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-5.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-5.png)

<span style="font-size: small;">**<span style="color: #ff0000;">Your user credentials to login will be “user” and “bitnami” without quotations.</span>**</span>

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-6.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-6.png)

[![image](https:/jessicadeen.com/wp-content/uploads/2016/06/image_thumb-7.png "image")](https:/jessicadeen.com/wp-content/uploads/2016/06/image-7.png)

<span style="font-size: small;">And that’s it! You’re ready to get started with WordPress running within Microsoft Azure using the Bitnami stack.</span>

