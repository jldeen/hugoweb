+++
author = "jldeen"
date = 2018-10-04T21:20:34Z
description = ""
draft = true
slug = "untitled"
title = "WordPress to Ghost Blog Migration"
layout = "post"

+++


DISCLAIMER: This blog posts focuses on a migration from a self-hosted version of WordPress. If you are using a wordpress.com blog, you will [theoretically] want to export your content to xml and setup a temporary self-hosted wordpress blog instance so you can install plugins.

### Backup your data and get it out of production
1. Do not do this on your production based blog. You will be dealing with live data and installing new plugins. In the event of a timeout or crash, I recommend first exporting your data using the all-in-one wordpress exporter (this will export ALL of your wordpress content, including your media, posts, tags, plugins, themes, etc.). Use it to export your data
2. Assuming you take my recommendation, take your backup .wpress file and setup a new WordPress instance for dev/migration (unless you already have one, in that case, good job!) If you are using Kubernetes this is easy since you can use the stable/wordpress helm chart to setup a temporary instance and just use it for your wordpress>ghost conversion.
3. After you setup your dev WordPress site, use the all-in-one wordpress tool to import the data you exported in step 1. 
4. Now, you should have a replicated version of your wordpress instance. Great. In order to move to ghost, you need to preserve your pictures since the Ghost exporter we will use in the next step will not preserve your pictures. To do this you will want to setup cloudinary and go to media in your dev wordpress instance. If you're like me and have more than 20 items per page and 10+ pages you will want to allow 250+ items on the page. Hit the "all" checkbox and then opt to upload to cloudinary. The cloudinary plugin will then upload all your media to your account AND it will update the links in your posts to use the newly uploaded, cloud-based, permalinks. 
5.  After a successful import, go to plugins and install a new plugin "Ghost," which will then allow you to export a json file with your content. (And since you have your photos/featured images in the cloud) you no longer need to export your wp-content\uploads folder. 
6. Now that you have your json file with your wordpress content, you are ready to setup your first instance of Ghost. At the time of this writing, 10/2018, Ghost 2.0 does not support native import of your exported json. You will have to do the following:
    - deploy Ghost 1.0
    - import the json
    - ensure there aren't any issues and confirm you can see your content
    - export again for 2.0
    - deploy Ghost 2.0
    - import your 1.0 json to your new 2.0 instance
### Customize your new Ghost Blog
1. Themes
2. Disqus for comments (will need to edit your theme)
3. Site tagline/logo





