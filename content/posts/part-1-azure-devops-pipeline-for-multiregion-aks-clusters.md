+++
author = "jldeen"
date = 2018-10-04T20:38:12Z
description = ""
draft = true
slug = "part-1-azure-devops-pipeline-for-multiregion-aks-clusters"
title = "Part 1: Azure DevOps Pipeline for multiregion AKS clusters"

+++


I've been traveling all year spreading the word of DevOps and Kubernetes (with Helm), but the one piece of consistent feedback I received was, "This was great, but I need more. What happens after 'Hello World' and the basics?" Sure, setting up Ingresses with Cert Manager is a little more fun, but that's not really going to help anyone in a production scenario. There begins our story...

I set out trying to craft a real world production type scenario/demo (use-case) for Kubernetes  and Helm, and I made myself the guinea pig. I broke a lot of things, I fixed a lot of things, and I learned even more. This is the first post of my learning journey.

For the past 10 years my blog has been using WordPress. I have had my setup on Wordpress.com, then moved to self hosted scenarios on a manually configured VM, Bitnami + WordPress offering (still a VM) on Azure, and then Kubernetes using the stable/wordpresss Helm Chart with embedded (in-the-cluster) mariaDB for my MySQL dep.

As you can imagine, the last scenario, while neat to test things out and start living what I preach, the setup isn't scalable and isn't production ready. Here's why:

1. I do not recommend handing your DB from within your cluster.
2. No CI/CD: There is no easy way to backup my DB and wp-content folders to move them from dev>qa>prod envs.
3. Sure I had replicas, but only on one cluster in one region. If something happens to the cluster (for example, I fail to add health checks to a deployment and my resources consumption starts maxing out) or something happens to Azure (and things do happen) my website becomes unavailable. And then people DM me and @ me on Twitter.

The solution I began to craft:

1. WordPress + Azure MySQL DB using Service Catalog and Open Service Broker for Azure
2. Two clusters in two regions (eastus and westeurope)
3. Azure Traffic Manager for failover and performance based routing

This then evolved into me evaluating my framework decision - "Is WordPress still the best framework for my blog? Are there other options out there that might better suit my needs (and your needs as the reader)? Turns out, yes! I found Ghost, an open source, lightweight, CMS offering. It's extensible and allows me to craft blog posts in markdown as opposed to HTML. Sold.

My new solution then began to look like this:

1. Ghost + Azure MySQL DB using Service Catalog and Open Service Broker for Azure
2. Two clusters in two regions (eastus and westeurope)
3. Azure Traffic Manager for failover and performance based routing

I also learned both the azure/wordpress and azure/ghost helm-charts had not been updated for 5+ months so I went down the rabbit hole and updated both of those to support production scenarios. For one, I added support for replicas-needed for scale. I also added a way to specify existing PVs, ingresses (for Ghost) and potential support for Istio (possible future blog post).

In order to make my setup successful I needed to deploy out two clusters in my chosen regions with the following configuration / installation of charts:

1. Helm, which means setting up an RBAC service account for Tiller (hopefully this will change in Helm 3)
2. Nginx Ingress Controller
3. Cert Manager to auto issue SSL Let's-Encrypt certs for my Ingress records, which then means setting up a cluster-issuer
4. NFS Server Provisioner so I can setup readWriteMany PVCs for my replica deployments (needed in Production)
5. Service Catalog so I can then use Open Service Broker for Azure
6. Open Service Broker for Azure so I can provision my Azure DB for MySQL as part of my helm-chart/k8s deployment

Only after my clusters were configured with the above could I then proceed with installing my blogging framework (WordPress or Ghost).

Now, if you've been playing with Kubernetes and Helm for awhile now, manually setting this up is time consuming, and depending on your needs, may require values.yaml files for default setting overrides. I believe in automating everything you can so I setup a pipeline using Azure DevOps to build my infra. While the pipeline may not be perfect (I had to write a lot of shell scripts to check for conditions).

My next blog post will deep dive with the config for Azure DevOps, but for now, here's a teaser screenshot:

