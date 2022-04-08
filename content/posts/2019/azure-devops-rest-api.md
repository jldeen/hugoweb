+++
author = "jldeen"
categories = ["devops", "bash", "linux", "scripting", "powerlevel9k"]
date = 2019-03-02T00:10:19Z
description = ""
draft = false
image = "../../images/Screen-Shot-2019-03-13-at-14.00.05.png"
slug = "azure-devops-rest-api"
tags = ["devops", "bash", "linux", "scripting", "powerlevel9k"]
title = "How to use Azure DevOps open REST API with Curl"
layout = "post"

+++


"Any language, any platform, any cloud" that's what Azure DevOps is capable of, right? Only, what does that _really_ mean? If you've seen my demos, or any member of my team's demos, you know we will showcase *a lot* of functionality in a short amount of time on stage; you know we have task runners with tasks ranging from Microsoft built/maintained to custom Shell/PowerShell scripts empowering you to make Azure DevOps do what **YOU** need [or want] it to do. 

That's not all Azure DevOps can do though, and even as I write this, I think back to my stance on the platform a few years ago; I was so pro-open source, I wouldn't use anything Microsoft for CI/CD. To this day, I'm still a huge fan of Jenkins and Codefresh and both tooling systems still live on in current demos I run, but I recently found a whole new love for Azure DevOps primarily due to their open REST API. It was the answer I never knew I needed.

Every person and company's need is different, we know that, so what I'm writing about is _my_ need as a professional speaker who's sole desire is to educate others on what's possible, no matter how elaborate the configuration or pipeline needs to be; no matter how many 3rd party tools one requires. In order to be effective, I need to easily reset and start fresh when I showcase certain functionality, especially when I am working "from scratch." Recently I wondered how I could quickly and easily delete build and release pipelines within a project from the command line since my favorite hashtag is #noclickyclicky. I had heard Azure DevOps had an open [REST API](https://docs.microsoft.com/rest/api/azure/devops/?view=azure-devops-rest-5.0), but I wasn't aware of just how useful it would be for me.

In just 7 lines of code, I was able to create a shell script, `azd-cleanup.sh`, that would delete any build and/or release pipeline I wanted by simply entering the number of either.

```bash
#!/bin/bash
set -eou pipefail
source ./scripts/variables.sh

curl -u $(presenter):$(PAT) --request DELETE "https://vsrm.dev.azure.com/$(organization)/$(project)/_apis/release/definitions/$(releaseDef)?forceDelete=true&api-version=5.0" && echo "$(organization) $(project) Release Definition $(releaseDef) has been successfully deleted."

sleep 10

curl -u $(presenter):$(PAT) --request DELETE "https://dev.azure.com/$(organization)/$(project)/_apis/build/definitions/$(buildDef)?api-version=5.0" && echo "$(organization) $(project) Build Definition $(buildDef) has been successfully deleted."
```

Now, I obviously can't just make those calls without some kind of authentication, so I have a second shell script, `variables.sh`, with the variables I reference ($presenter, $PAT, $project, $organization, $buildDef, and $releaseDef). 

The variables.sh script has 6 functions, leverages Azure CLI to capture my username for Azure DevOps, and includes a prompt to securely capture my Azure DevOps Personal Access Token.

```bash
PRESENTER=`az account show | jq -r .user.name`
ORGANIZATION=organization-goes-here
PROJECT=project-name-goes-here

echo "Please enter your Personal Access Token, followed by [ENTER] (Input will be hiden):"
read -s PAT
echo
echo "Please enter your Build Definition ID, followed by [ENTER]:"
read buildDef
echo
echo "Please enter your Release Definition ID, followed by [ENTER]:"
read releaseDef

function presenter() 
{
    local  presenter=$PRESENTER
    echo "$presenter"
}

function organization() 
{
    local  organization=$ORGANIZATION
    echo "$organization"
}

function project() 
{
    local  project=$PROJECT
    echo "$project"
}

function PAT() 
{
    local  PAT=$PAT
    echo "$PAT"
}

function buildDef() 
{
    local  buildDef=$buildDef
    echo "$buildDef"
}

function releaseDef() 
{
    local releaseDef=$releaseDef
    echo "$releaseDef"
}
```
I can then automate this even further by making a call to it in my makefile. So my make azd-clean command would look like this:

```bash
azd-clean:
	@scripts/azdo-cleanup.sh
```
You can see the script in action, makefile and all, in the featured image for this post, but I also included it below.

![AzDAPI](/images/AzDAPI.gif)

The best part is, since I am calling the Build and Release service via the open AzD REST API I could, in theory, do the same thing from a build/release bash task from within AzD in the event the functionality I'm looking for is not available by default. Even if the functionality *does* exist from the UI, I could still execute a REST API call to to the respective service, which gives me a lot of potential power in my scripting or application code. With this revelation, I truly realized just how limitless Azure DevOps is.
