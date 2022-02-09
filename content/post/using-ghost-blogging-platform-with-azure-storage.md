+++
author = "jldeen"
date = 2019-03-18T08:13:14Z
description = ""
draft = true
slug = "using-ghost-blogging-platform-with-azure-storage"
title = "Using Ghost Blogging Platform with Azure Storage"

+++


Creating a Ghost Blog Website with hosted MySql 

### Create Azure Database for MySql
```
az mysql server create --resource-group <resource-group-name-here> --name <name-of-mysql-server-instance>  --location eastus --admin-user <admin-user> --admin-password <admin-password> --sku-name GP_Gen5_2 --geo-redundant-backup enabled --storage-size 10240 --version 5.7
```
### Create Azure Storage

`az storage account show-connection-string --resource-group <resource-group-name> --name <storage-account-name>`

### Create Azure CDN for serving images

### Cloudflare - SSL Termination and Certificate Management

### Ghost Azure Storage Plugin

### Sql Query for updating image links (Tested on Ghost 2.16.4)



