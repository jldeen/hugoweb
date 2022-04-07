+++
author = "jldeen"
categories = ["Azure", "app service", "windows", "architecture", "64bit"]
date = 2020-04-03T21:43:00Z
description = ""
draft = false
image = "../../images/x64appservice_wh.png"
slug = "running-64bit-node-web-app-windows-app-service"
tags = ["Azure", "app service", "windows", "architecture", "64bit"]
title = "Running a 64 bit node Web App in Windows Azure App Service"
layout = "post"

+++


This post will walk you through the key things you should know when running a 64 bit node application in Azure App Service for Windows. HUGE shoutout to [Marie Hoeger](https://twitter.com/_mhoeger) from Microsoft for helping provide official guidance for this.

First, I do want to point out the obvious - you may not actually _need_ 64 bit (x64) support for your web app. [Scott Hanselman](https://twitter.com/shanselman?s=20) has a great post on showing you the memory consumption differences between x86 (32 bit) and x64 [here](https://www.hanselman.com/blog/PennyPinchingInTheCloudYourWebAppDoesntNeed64bit.aspx). Now, his post is about 5 years old and things have changed in technology, though the heart of his post is probably right - you may not _actually_ need x64 support within your Windows web app and I encourage you to weigh the pros/cons to see if you _actually_ need it. If so, this post will walk you through the official way to wire everything up.

I have a web app that truly does require x64 support because one of the package dependencies is [Lovell's Sharp](https://github.com/lovell/sharp), which is a high performance image processesing module. Perhaps you have experience with this same module after following Chris Tjoumas' blog walk through, "[Creating a Ghost Blog on Azure App Service](https://devblogs.microsoft.com/premier-developer/creating-a-ghost-blog-on-an-azure-app-service/?WT.mc_id=docs-blog-jessde)", which uses a neat project from [Yannick Reekmans](https://blog.yannickreekmans.be/) - only, I discovered it doesn't work quite right without x64 support. In fact, even this blog - which is based on the popular [Ghost blogging platform](https://ghost.org/) - uses it by default, and my custom Ghost Azure Storage Adapter also uses it. I don't beleive Sharp has supported x86 in quite some time (since 0.11.4 as is [noted in this GitHub issue](https://github.com/lovell/sharp/issues/379)), but I never noticed it until someone reached out and asked for help with my storage adapter in, specifically, [Windows App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=docs-blog-jessde).

## The TL;DR

There are few posts online you can find that will walk you through hacks of how to get things to work, but I reached out to the product group to get the official answer.

There are 3 main configurations you need for x64 Windows App Service support:

1. Configure 64-bit platform support (in General Settings)

![Screen%20Shot%202020-03-30%20at%202.12.41%20PM](/images/Screen%20Shot%202020-03-30%20at%202.12.41%20PM.png)

2. Application Setting (environment variable) for `WEBSITE_NODE_DEFAULT_VERSION` == `~10`. 
**Note:** The tilde is not a typo and needs to be there.

![Screen%20Shot%202020-03-30%20at%202.21.32%20PM](/images/Screen%20Shot%202020-03-30%20at%202.21.32%20PM.png)

3. Ensure you are using a "Basic" or higher SKU for your app service plan. 64-bit isn't supported for "Free" or "Shared" SKUs. Also, be sure to remove any other settings/workarounds - you do not need any other environment variables or settings (this includes any manual overrides you may have added to your deploy.cmd or iisnode.yml).

Once you have these configurations applied, you should be able to support x64 bit architecture. In fact, you can test your settings by using Kudu. Try this - log into your Azure Portal, navigating to your web app, scrolling down to Console (under Development Tools) on the left hand side. Within console type, `node -p "process.arch"`. Assuming you performed the 2.5 steps above, you should now see `x64` returned. 

![Screen%20Shot%202020-04-03%20at%201.13.05%20PM](/images/Screen%20Shot%202020-04-03%20at%201.13.05%20PM.png)

You could even do an additional check and type `where node` to see both Program Files (x86) and (Program Files) ((for x64)) listed.

![Screen%20Shot%202020-04-03%20at%201.13.24%20PM](/images/Screen%20Shot%202020-04-03%20at%201.13.24%20PM.png)

**Note:** If you had an app that was previously configured with some workarounds, clear them up, and __redeploy__ using the new settings - any 500 errors should be resolved.

## ARM Templates

Now, because I'm a huge fan of #noclickyclicky I setup an ARM template to create everything for me; this includes the app service plan and the web app with full x64 support. You can do this in an ARM template by setting the following two properties:

1. `siteProperties` - specifically the `"use32BitWorkerProcess": false,` property, which will tell your App Service Config to use x64 instead. If you're curious, Azure Docs does have a good template reference I used to get the following settings [here](https://docs.microsoft.com/azure/templates/microsoft.web/2018-11-01/sites?WT.mc_id=docs-blog-jessde).

```
"siteProperties": {
    "netFrameworkVersion": "v4.7",  
    "use32BitWorkerProcess": false,
    "httpsonly": true,
    "webSocketsEnabled": true, 
    "alwaysOn": true,
    "requestTracingEnabled": true,
    "httpLoggingEnabled": true,
    "logsDirectorySizeLimit": 40,
    "detailedErrorLoggingEnabled": true, 
    "remoteDebuggingEnabled": true
}
```
You can then call this property by using the [web config resource](https://docs.microsoft.com/azure/templates/microsoft.web/2018-11-01/sites/config?WT.mc_id=docs-blog-jessde) for your `Microsoft.web/sites` resource. Here's the relevant snippet:

```
{
    "apiVersion": "2018-11-01",
    "name": "web",
    "type": "config",
    "dependsOn": [
    "[resourceId('Microsoft.Web/sites', parameters('siteName'))]"
    ],
    "properties": "[variables('siteProperties')]"
},
```
An example of how you would declare a Microsoft.Web/sites resource with the web config resource can be found [here](https://github.com/jldeen/Ghost-Azure/blob/master/azuredeploy.json#L124-L149) - specifically, line 148, which references siteProperties [on lines 83-94](https://github.com/jldeen/Ghost-Azure/blob/master/azuredeploy.json#L83-L94).

2. appSettings - specifically the `WEBSITE_NODE_DEFAULT_VERSION` property. The app settings template reference doc is [here](https://docs.microsoft.com/azure/templates/microsoft.web/2018-11-01/sites/config-appsettings?WT.mc_id=docs-blog-jessde).

```
{
    "name": "appsettings",
    "type": "config",
    "apiVersion": "2018-11-01",
    "dependsOn": [
    "[resourceId('Microsoft.Web/sites', parameters('siteName'))]",
    ],
    "properties": {
    "WEBSITE_NODE_DEFAULT_VERSION": "~10"
    }
},
```
You can see how this is then referenced, in full context, on GitHub [here](https://github.com/jldeen/Ghost-Azure/blob/master/azuredeploy.json#L179-L198) (note line 194) where I set the WEBSITE_NODE_DEFAULT_VERSION app setting.

### Putting It All Together

To test all this out, I forked the repo Chris used in the blog post I mentioned above and updated the one click deployment to stand up a Windows App Service Plan, Windows Web Site (with x64 support), Application Insights, and a storage account. I added my Ghost Azure Storage adapter to the repo and ran a one-click-deploy - it worked! I could tell for sure I was installing x64 node packages by looking at the logs - previously I would see node modules referenceing `ia32` support and now I see the expected `win32-x64` package architecture.

![Screen%20Shot%202020-04-03%20at%202.26.14%20PM](/images/Screen%20Shot%202020-04-03%20at%202.26.14%20PM.png)

Or, if you're like me and you enjoy playing with the command line, you could go back over to your Kudu console and type one of the following commands:

```
# faster command
cat node_modules/sharp/package.json | grep version

or

# slower command
npm list | grep sharp 
```

At the time of this blog post the latest version of Sharp is 0.25.2, which is exactly what Kudu reports. Excellent.

![Screen%20Shot%202020-04-03%20at%202.37.09%20PM](/images/Screen%20Shot%202020-04-03%20at%202.37.09%20PM.png)

If you want to give it a try yourself, [head on over to my repo and hit the one-click-deploy to Azure button](https://github.com/jldeen/Ghost-Azure#one-click-deploy)!



