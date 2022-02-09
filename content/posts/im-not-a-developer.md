+++
author = "jldeen"
categories = ["aks", "developer", "helm", "ghost", "blog"]
date = 2018-10-16T15:00:00Z
description = "I'm currently on a plane flying back from TechBash 2018 (which was in the middle of nowhere) and it just hit me. \"I'm not a developer.\" \nWhat a load of shit. "
draft = false
image = "../../images/Screen-Shot-2018-10-16-at-00.06.15.png"
slug = "im-not-a-developer"
summary = "I'm currently on a plane flying back from TechBash 2018 (which was in the middle of nowhere) and it just hit me. \"I'm not a developer.\" \nWhat a load of shit. "
tags = ["aks", "developer", "helm", "ghost", "blog"]
title = "I'm not a developer."

+++


As I write this, I'm currently on a plane flying back from TechBash 2018 (which was in the middle of nowhere) and it just hit me. "I'm not a developer."

What a load of shit.

As a person with a significant ops background, I have repeatedly said, "I'm not a developer." And, if I've worked with you, I've probably pissed you off and you've told me to snap out of it.

I'm not alone though - I have heard it from several ops/IT Pro's in my circle. And yet, as I subconsciously think that and work through it (with copious amounts of Macallan 18 and 3AM code/debugging sessions), I consider what I just spent the last week doing. Submitting several [merged] PRs to various open source repos, including:

* azure/helm-charts,
* kubernetes-incubator/service-catalog
* vsts-extensions/app-store-release,
* and my own bastardized fork of croc-hunter from Lachie Evenson

I also have been eyeball deep in revamping my website. It started off innocently enough - I wanted to scale it to a multi-region kubernetes cluster scenario and use Azure DevOps as my pipeline, but before I knew it, I was working on debugging node.js locally and writing my own config.json files with DB connection strings baked in. And here I thought I was just going to use a pre-baked existing image/chart and build my infra since I'm ops and that's what I do, but that doesn't work in real-world production. I know that - I work on a DevOps team, but dev still isn't my first language. And it may never be, to be honest.

There is STILL a voice in the back of my head that says, "I'm not a developer" no matter how many charts I write, or JavaScript croc-hunter mods I make at 12AM the night before I go on stage, that voice persists. Scott Hanselman has a blog post I frequently refer back to about being a phony, and I admit, I relate to a lot of what he writes about as I consider my own "not-a-dev" insecurity.

The truth is - I'm not good with DBs (schemas confuse me) and I still struggle with remembering the difference between a string and a bool. Just because I'm learning a new language (or several at this point since the ops field is going more code-brain and I have to become familiar with the unfamiliar) doesn't mean I'm not a dev, it just means I'm not a Node.js dev, but I'm learning. I'm not a Go dev, but I'm learning. I'm not a Python dev, but I'm learning. Sorry .net core... I'll get to you at some point, and when I do, I'll learn.

The upcoming blog posts will go so much more in depth about my current projects, including this new blog you're seeing, but I had to launch this new layout/framework with my confession: I AM a developer. And I fucking built this site using a few open source projects:

* [Ghost](https://github.com/TryGhost/Ghost)
* Node
* Docker
* Kubernetes (duh)
* [helm](https://github.com/helm/helm)
* [draft](https://github.com/Azure/draft)
* [mmornati/ghost-cloudinary-store](https://github.com/mmornati/ghost-cloudinary-store)

I'm so proud to share with you: The Deen of DevOps. One of my coworkers, [Jeremy Likness](https://twitter.com/jeremylikness), coined that phrase at TechBash (now 2 weeks ago). It reminded me of the Dean of a school, though with obviously different spelling. So, with this new launch - welcome to school. It's okay if you're not __________ (fill in the blank). Let's learn together.

