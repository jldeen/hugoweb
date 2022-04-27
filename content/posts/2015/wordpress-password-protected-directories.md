+++
author = "jldeen"
date = 2015-08-17T14:11:04Z
description = ""
draft = false
slug = "wordpress-password-protected-directories"
title = "WordPress and Password Protected Directories"
aliases = ["/wordpress-password-protected-directories/"]
layout = "post"

+++


Recently, I found myself working on a project where password protecting subdirectories with .htaccess and .htpasswd was needed, despite the insecure nature of such an implementation. After I added configured .htaccess, I noticed any of the links would generate a 404 Not Found error. If I removed .htaccess and .htpasswd, the links would work just fine.

I finally realized this was related the .htaccess file in the root directory WordPress owns. There are two ways to bypass the 404 error, which is a result of WordPress’ rewrite rules for permalinks.

First, you can edit the .htaccess file found in / and change the RewriteRule line in the following snippet of code:

# BEGIN WordPress RewriteEngine On RewriteBase / RewriteCond %{REQUEST_FILENAME} !-f RewriteCond %{REQUEST_FILENAME} !-d RewriteRule . /index.php [L] # END WordPress

to

RewriteRule ./ /index.php [L]

So the end result can look like this:

# BEGIN WordPress RewriteEngine On RewriteBase /RewriteRule ^index\.php$ - [L] RewriteCond %{REQUEST_FILENAME} !-f RewriteCond %{REQUEST_FILENAME} !-d #RewriteRule . /index.php [L] # replaced with next line... RewriteRule ./ /index.php [L] # END WordPress

The other way to bypass the 404 error is to add the following to the .htaccess file:

# BEGIN allow password protected directories with 404 errors ErrorDocument 401 ./error.html ErrorDocument 403 ./error.html # END allow modification

**Note:** You will need to create an error.html file, which can be simple, or customized. Here’s some sample text to get you started:

  <title>401 Error</title>   <h1>Sorry, 401 Error. Please contact the website administrator if you feel you have reached this page in error.</h1>  

In some cases, when you update WordPress or certain plugins, the WordPress section of the .htaccess file will be over written and updated, which results in the 404 error returning. In this instance, you can use the other 401 redirect code (which can be added before the # Begin WordPress section) to achieve the same end result.

