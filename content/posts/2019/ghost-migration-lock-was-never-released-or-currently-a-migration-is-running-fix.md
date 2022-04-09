+++
author = "jldeen"
date = 2019-08-30T20:05:56Z
description = ""
draft = false
image = "../../images/Screen%20Shot%202019-08-30%20at%2012.45.56%20PM.png"
slug = "ghost-migration-lock-was-never-released-or-currently-a-migration-is-running-fix"
title = "Ghost: Migration lock was never released or currently a migration is running (Fix!)"
layout = "post"

+++


This blog runs on a self hosted Ghost instance in an Azure App Service via a Linux Container. I opted for this setup because it's the smallest overhead, while still allowing me to easily control my updates with an Azure DevOps Pipeline through the use of deployment slots. Last night, while updating Ghost to the latest version available (2.30.2 as of the date of this post) I noticed an error in my Dev slot logs - `Migration lock was never released or currently a migration is running at MigrationsAreLockedError.KnexMigrateError` ... well, shit. That's not good, I thought, especially since all I did was change the version of Ghost's framework and updated the Casper theme to the latest version (1.11.1 as of the time of this post).

This error appears only if the migration process is destroyed while the migrator migrates the database. Database locks are important because they limit the migration to only one user/session rather than multiple processes trying to do the same thing, but if the process gets destroyed, you'll see the above error. Depending on how you're running your blog, you could try to use the Ghost CLI to run `ghost update --rollback` or you can can very easily unlock the database through the database itself. (Make a backup of your database first!)

![Screen%20Shot%202019-08-30%20at%201.04.12%20PM](/generated/full/Screen%20Shot%202019-08-30%20at%201.04.12%20PM.webp)

In my case, I used the second option, as is showcased in the above picture. I unlocked my database through the database itself by using MySQL Workbench and then I ran the following query: `UPDATE migrations_lock setlocked=0where lock_key='km01';` and just like that, I was back up and running and could finish testing my Dev deployment slot before ultimately promoting to production.



