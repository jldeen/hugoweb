<p align="center">
    <img src="https://github.com/jldeen/hugoweb/actions/workflows/static-web-deploy.yaml/badge.svg" alt="Azure Static Web Apps CI/CD">
    <img src ="https://img.shields.io/github/repo-size/jldeen/hugoweb" alt="Repository Size">
    <img src ="https://img.shields.io/tokei/lines/github.com/jldeen/hugoweb" alt="Lines of Code">
    <img src ="https://img.shields.io/github/last-commit/jldeen/hugoweb" alt="Last Commit">
    <img src ="https://img.shields.io/github/issues/jldeen/hugoweb?color=important" alt="Open Issues">
    <img src ="https://img.shields.io/github/issues-pr/jldeen/hugoweb?color=yellowgreen" alt="Open Pull Reqeusts">
    <img src ="https://img.shields.io/github/license/jldeen/hugoweb" alt="License">
</p>

# Jessica Deen HugoWeb
This is the current home of [jessicadeen.com](https://jessicadeen.com), which first began as a Wordpress site around 2009 and has gone through several infrastructure changes over the years. Around 2016, the site was migrated to the popular node.JS CMS system [Ghost](https://github.com/TryGhost/Ghost). The site has run in a container on Kubernetes as well as on Azure Web Apps for Linux. As of April 2022, the site has been converted to [Hugo](https://gohugo.io/) and now runs on [Azure Static WebApps](https://azure.microsoft.com/services/app-service/static/?WT.mc_id=opensource-00000-jessde#overview).

One of the primary reasons for switching from Wordpress to Ghost and now to Hugo was to find a way to simplify the blogging experience, while simulatenously having a responsive and beautiful layout hosted on Azure for as little money as possible. As Hugo is a static site generator, and Azure Static WebApps has a Free tier, this site now costs \$0 to run. Previously, I was paying ~\$80 per month for app service plans, SQL Databases, container registries, storage accounts, and of course, app service resources.

This new version of my blog now also supports users' OS preference when it comes to light//dark themes, and allows for users to override their preference as desired.

## Deployment

This site uses GitHub Actions to deploy to Azure Static Web Apps. The cool thing is Azure Static Web Apps will even setup a GitHub Actions workflow for you and supports testing environments by default. This means each time you open a PR, your code changes will be automatically deployed to that PR / staging environment where you can run your acceptance tests / validation tests / visual tests, etc. 

You can learn about how to get started with Hugo and Azure Static Web Apps [here](https://docs.microsoft.com/azure/static-web-apps/publish-hugo?WT.mc_id=devops-00000-jessde). 

Please [submit an issue](https://github.com/jldeen/hugoweb/issues) if you encounter any problems.