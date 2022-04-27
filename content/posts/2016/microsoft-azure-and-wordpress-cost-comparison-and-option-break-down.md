+++
author = "jldeen"
date = 2016-04-19T13:46:00Z
description = ""
draft = false
slug = "microsoft-azure-and-wordpress-cost-comparison-and-option-break-down"
title = "Microsoft Azure and WordPress &ndash; Cost Comparison and Option Break Down"
aliases = ["/microsoft-azure-and-wordpress-cost-comparison-and-option-break-down/"]
layout = "post"

+++


<span style="font-family: Helvetica; font-size: medium;">I recently decided to migrate my previously self-hosted blog from one 3rd party solution to Microsoft Azure. I’ve performed WordPress migrations before, but surprisingly, never to Azure. Since Microsoft Azure now also offers Docker and Containers support, a part of me wanted to play around with WordPress via Docker in Azure Cloud, but another part of me also wanted to just deploy a simple WebApp WordPress site. I quickly learned there are a few different ways one can deploy a WordPress (WP) site within Azure, and there are pros and cons to all of them. This post will review my findings and analyze the cost differences between the 3 primary methods.</span>

<span style="font-family: Helvetica; font-size: medium;">I deployed 3 different WP instances in Microsoft Azure – WP via WebApp, WP via Bitnami Stack, and WP via Docker Container. Then, to test the performance of each instance, I setup 3 different tests with identical parameters. I ran each test twice and then calculated the mean of the two. The parameters are as follows:</span>

- <span style="font-family: Helvetica; font-size: medium;">Target load – 250</span>
- <span style="font-family: Helvetica; font-size: medium;">Duration – 5 minutes</span>
- <span style="font-family: Helvetica; font-size: medium;">Load generated from – West US</span>

<span style="font-family: Helvetica; font-size: medium;">1. WordPress Deployment via WebApp</span>

<span style="font-family: Helvetica; font-size: medium;">This option is perhaps the easiest and quickest option to deploy a WP site, but I didn’t find it to be the most reliable or most cost effective. Setting it up is easy, but it should be noted you should plan to pay $9.99 per month for a decent MySQL instance via [Clear DB](https://www.cleardb.com/pricing.view) if you’re planning on using your blog for anything more than tinkering. There is a free option (Mercury Pricing Tier), but even according the Clear DB’s documentation, the performance is less than basic. I actually went with the Titan plan option for $3.50 p/ mo., but I still received continuous connection timeout string errors as I attempted to migrate my data (via WordPress XLM Import/Export tool). I even had trouble updating to WordPress 4.5 as the load just proved to be too much for the lesser cost DB option. I ran two performance tests on the Mercury Pricing Tier with the above specified parameters and concluded the average response times were low at 5.25 secs, but the average requests failed 72.5% of the time, with 43 requests per second.</span>

 

![](/generated/full/Screen-Shot-2016-04-25-at-16.15.52_kh8fuz.webp)  ![](/generated/full/Screen-Shot-2016-04-25-at-16.16.27_jk8kpj.webp)

<span style="font-family: Helvetica; font-size: medium;"><u>Resource Costs Breakdown</u></span>

<table border="0" cellpadding="2" cellspacing="0" width="400"><tbody><tr><td valign="top" width="200">Service</td><td valign="top" width="200">Cost</td></tr><tr><td valign="top" width="200">ClearDB – Venus Pricing Tier</td><td valign="top" width="200">$9.99 (pay-as-you-go)</td></tr><tr><td valign="top" width="200">App Service Plan – S1 Standard</td><td valign="top" width="200">$44.64/month (estimated)</td></tr><tr><td valign="top" width="200">Additional Options – Public IP, Storage Account, etc.</td><td valign="top" width="200"> N/A</td></tr><tr><td valign="top" width="200">Total</td><td valign="top" width="200">$54.63</td></tr></tbody></table>2. <span style="font-family: Helvetica; font-size: medium;">WordPress via Bitnami Stack </span>

<span style="font-family: Helvetica; font-size: medium;">This option takes a little bit more resources initially to setup, but I felt it was easier to manage after the fact. I found it to be considerably more reliable than the WebApp and doesn’t use ClearDB, therefore you save on the monthly cost for a separate DB service. This option uses a Linux virtual machine, which has a LAMP stack and WordPress already installed.</span><span style="font-family: Helvetica; font-size: medium;"> Much like option 1, I ran two performance tests with the above specified parameters and concluded the average response times were around 10.33 secs, but the average requests failed less than 0.11% of the time, with 21.41 requests per second.</span>

![](/generated/full/Screen-Shot-2016-04-25-at-16.22.41_ikm8fp.webp)![](/generated/full/Screen-Shot-2016-04-25-at-16.23.16_pgdnsp.webp)

<span style="font-family: Helvetica; font-size: medium;"><u>Resource Costs Breakdown</u></span>

<table border="0" cellpadding="2" cellspacing="0" width="400"><tbody><tr><td valign="top" width="200">Service</td><td valign="top" width="200">Cost</td></tr><tr><td valign="top" width="200">DB Plan</td><td valign="top" width="200">$0.00</td></tr><tr><td valign="top" width="200">VM Size Plan – A0 Basic</td><td valign="top" width="200">$14.88/month (744 hours estimated); $0.020 p/h</td></tr><tr><td valign="top" width="200">Additional Options – Public IP, LRS Storage Account, etc.</td><td valign="top" width="200"> Estimated < $5.00</td></tr><tr><td valign="top" width="200">Total</td><td valign="top" width="200">$19.88 (estimated)</td></tr></tbody></table>3. <span style="font-family: Helvetica; font-size: medium;">WordPress via Docker Container</span>

<span style="font-family: Helvetica; font-size: medium;">This option is still a relatively new concept, but I wanted to see a cost and performance breakdown anyway. This too was far more reliable than the WebApp and also doesn’t use ClearDB. From a security standpoint, using a Docker container is nice simply because if hackers gain root access via a web app with a vulnerability, they only have access to the single Docker container and not your entire host system. This option also uses a Linux virtual machine and performed much like option 2. After running two performance tests, the average response time was 10.29 seconds, the average requests failed 2.40% of the time, and there were an average of 35.53 requests per second.</span>

![](/generated/full/Screen-Shot-2016-04-25-at-16.27.14_ztzxxc.webp)![](/generated/full/Screen-Shot-2016-04-25-at-16.27.31_ratcfl.webp)

<span style="font-family: Helvetica; font-size: medium;"><u>Resource Costs Breakdown</u></span>

<table border="0" cellpadding="2" cellspacing="0" width="400"><tbody><tr><td valign="top" width="200">Service</td><td valign="top" width="200">Cost</td></tr><tr><td valign="top" width="200">DB Plan</td><td valign="top" width="200">$0.00</td></tr><tr><td valign="top" width="200">VM Size Plan – A0 Basic</td><td valign="top" width="200">$14.88/month (744 hours estimated); $0.020 p/h</td></tr><tr><td valign="top" width="200">Additional Options – Public IP, LRS Storage Account, etc.</td><td valign="top" width="200"> Estimated < $5.00</td></tr><tr><td valign="top" width="200">Total</td><td valign="top" width="200">$19.88</td></tr></tbody></table>After comparing the cost, performance, and reliability of the 3 options, I went with option 2, WordPress via Bitnami LAMP stack for the time being. I’ll write an updated post in about a month to report on overall monthly performance and incurred costs.

