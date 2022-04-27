+++
author = "jldeen"
date = 2016-05-05T19:49:18Z
description = ""
draft = false
image = "../../images/Wordpress_azure_pkymmw.jpg"
slug = "microsoft-azure-and-wordpress-bitnami-cost-comparison-and-option-break-down"
title = "Microsoft Azure and WordPress – Bitnami Cost Comparison and Option Break Down"
aliases = ["/microsoft-azure-and-wordpress-bitnami-cost-comparison-and-option-break-down/"]
layout = "post"

+++


<span style="font-family: Helvetica; font-size: medium;">I recently decided to migrate my previously self-hosted blog from one 3rd party solution to Microsoft Azure. I’ve performed WordPress migrations before, but surprisingly, never to Azure. Since Microsoft Azure now also offers Docker and Containers support, a part of me wanted to play around with WordPress via Docker in Azure Cloud, but another part of me also wanted to just deploy a simple WordPress site. I quickly learned there are a few different ways one can deploy a WordPress (WP) site within Azure, but this post is going to focus on two of them, as well as the pros and cons to each. This post will review my findings and analyze the cost differences between the 2 primary methods Bitnami offers through Microsoft Azure.</span>

<span style="font-family: Helvetica; font-size: medium;">I deployed 2 different WP instances in Microsoft Azure – WP via Bitnami Stack and WP via Docker Container. Then, to test the performance of each instance, I setup 3 different tests with identical parameters. I ran each test twice and then calculated the mean of the two. The parameters are as follows:</span>

- <span style="font-family: Helvetica; font-size: medium;">Target load – 250</span>
- <span style="font-family: Helvetica; font-size: medium;">Duration – 5 minutes</span>
- <span style="font-family: Helvetica; font-size: medium;">Load generated from – West US</span>

1. <span style="font-family: Helvetica; font-size: medium;">WordPress via Bitnami Stack</span>

<span style="font-family: Helvetica; font-size: medium;">This option uses a Linux virtual machine, which has a LAMP stack and WordPress already installed.</span><span style="font-family: Helvetica; font-size: medium;"> I ran two performance tests with the above specified parameters and concluded the average response times were around 10.33 secs, the average requests failed less than 0.11% of the time, and there were an average of 21.41 requests per second.</span>

![](/generated/full/Screen-Shot-2016-04-25-at-16.22.41_ikm8fp.webp)![](/generated/full/Screen-Shot-2016-04-25-at-16.23.16_pgdnsp.webp)

<span style="font-family: Helvetica; font-size: medium;"><u>Resource Costs Breakdown</u></span>

<table border="0" cellpadding="2" cellspacing="0" width="400"><tbody><tr><td valign="top" width="200">Service</td><td valign="top" width="200">Cost</td></tr><tr><td valign="top" width="200">DB Plan</td><td valign="top" width="200">$0.00</td></tr><tr><td valign="top" width="200">VM Size Plan – A0 Basic</td><td valign="top" width="200">$14.88/month (744 hours estimated); $0.020 p/h</td></tr><tr><td valign="top" width="200">Additional Options – Public IP, LRS Storage Account, etc.</td><td valign="top" width="200"> Estimated < $5.00</td></tr><tr><td valign="top" width="200">Total</td><td valign="top" width="200">$19.88 (estimated)</td></tr></tbody></table>2. <span style="font-family: Helvetica; font-size: medium;">WordPress via Bitnami Docker Container</span>

<span style="font-family: Helvetica; font-size: medium;">This option is still a relatively new concept, but I wanted to see a cost and performance breakdown anyway. From a security standpoint, using a Docker container is nice simply because if hackers gain root access via a web app with a vulnerability, they only have access to the single Docker container and not your entire host system. This option also uses a Linux virtual machine, just like option 1, and performed similarly. After running the same two performance tests mentioned above, the average response time was 10.29 seconds, but the average requests failed slightly higher at 2.40% of the time with an average of 35.53 requests per second.</span>

![](/generated/full/Screen-Shot-2016-04-25-at-16.27.14_ztzxxc.webp)![](/generated/full/Screen-Shot-2016-04-25-at-16.27.31_ratcfl.webp)

<span style="font-family: Helvetica; font-size: medium;"><u>Resource Costs Breakdown</u></span>

<table border="0" cellpadding="2" cellspacing="0" width="400"><tbody><tr><td valign="top" width="200">Service</td><td valign="top" width="200">Cost</td></tr><tr><td valign="top" width="200">DB Plan</td><td valign="top" width="200">$0.00</td></tr><tr><td valign="top" width="200">VM Size Plan – A0 Basic</td><td valign="top" width="200">$14.88/month (744 hours estimated); $0.020 p/h</td></tr><tr><td valign="top" width="200">Additional Options – Public IP, LRS Storage Account, etc.</td><td valign="top" width="200"> Estimated < $5.00</td></tr><tr><td valign="top" width="200">Total</td><td valign="top" width="200">$19.88</td></tr></tbody></table>After comparing the cost, performance, and reliability of the 2 options, I went with option 1 – WordPress via Bitnami LAMP stack for the time being. The cost was pretty much identical, but option 1 had more reliability. Still, I stand by recommending the use of a Docker Container for a production WordPress site, or any web application, if security is a greater concern. You could even run multiple websites from one Bitnami Docker Container and if one site is compromised, you only have to worry about addressing that one isolated issue, and not the host as a whole.

I’ll write an updated post in about a month to report on overall monthly performance and incurred costs.

