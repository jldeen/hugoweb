+++
author = "jldeen"
categories = ["azure devops", "devops", "linux", "code", "testing", "github", "github actions"]
date = 2020-03-12T21:44:00Z
description = ""
draft = false
image = "../../images/Screen%20Shot%202020-03-11%20at%202.12.48%20PM.png"
slug = "visual-testing-actions-azdevops"
tags = ["azure devops", "devops", "linux", "code", "testing", "github", "github actions"]
title = "Things to consider when running visual tests in CI/CD pipelines: Azure Devops & GitHub Actions (Part 2)"
aliases = ["/visual-testing-actions-azdevops/"]
layout = "post"

+++


If you haven't yet read [the first post](https://jessicadeen.com/consideration-visual-tests-azd/) in this series, I recommend checking it out now. Do it. I'll wait, I probably need some more java in my body, anyway. Get it, java == coffee? 

![eye roll](https://media.giphy.com/media/sbwjM9VRh0mLm/giphy.gif)

Great, now that you have your build environment and code ready to run visual tests, and I have my coffee (*whispers* java), let's walk through things you should note when it comes to configuring your pipeline.

If you're still new to DevOps, let's do a quick recap on what DevOps is. 

"DevOps is the union of people, process, and products to enable continuous delivery of value to our end users." - Donvan Brown

Azure DevOps and GitHub Actions are both platforms you can use to deliver said value. Azure DevOps is a fully extensible platform of services, and GitHub actions allows you to automate your workflow without ever leaving GitHub. Both options are more traditional in the sense you run your tasks on a hosted (provided for you) or private (you own, pay for and maintain) server; we will refer to this method as the term: 'pipeline'.

There are 3 basic tasks we need to add into our new or existing pipelines:

- HTTP Check
- Capture Build Environment Variables
- Run Visual Tests

These tasks will be added to our dev/test/qa environment stage and will run _after_ your dev/test/qa deployment succeeds.

I'm a huge fan of YAML, particularly because I can just run bash commands as a native task. Below is an example of the YAML I would add to my existing pipeline:

### Azure DevOps Example

In order to run the below code, you will need to install the [Applitools Extension](https://marketplace.visualstudio.com/items?itemName=applitools.applitools-integration) to your [Azure DevOps organization](https://docs.microsoft.com/azure/devops/marketplace/install-extension?view=azure-devops&tabs=browser&WT.mc_id=docs-blog-jessde).

You will notice there are 3 tasks; each task performs the task we outlined above.

```yaml
- bash: |
    # Run check to see when $(hostname) is available
    attempt_counter=0
    max_attempts=5
    until $(curl --output /dev/null --silent --head --fail https://"$(hostname)"/); do
        if [ ${attempt_counter} -eq ${max_attempts} ];then
          echo "Max attempts reached"
          exit 1
        fi
        printf '.'
        attempt_counter=$(($attempt_counter+1))
        sleep 20
    done
  displayName: HTTP Check

- task: ApplitoolsBuildTask@0

- task: Maven@3
  inputs:
    mavenPomFile: 'visual_tests/pom.xml'
    goals: 'test'
    options: 'clean test'
    publishJUnitResults: true
    testResultsFiles: '**/surefire-reports/TEST-*.xml'
    javaHomeOption: 'JDKVersion'
    mavenVersionOption: 'Default'
    mavenAuthenticateFeed: false
    effectivePomSkip: false
    sonarQubeRunAnalysis: false
  env:
    APPLITOOLS_API_KEY: $(APPLITOOLS_API_KEY)
    RUNWHERE: pipeline
    TEST_START_PAGE: https://$(hostname)
  displayName: "Visual Testing"
```
Notice at the very bottom, in the last task, I have 3 required environment variables set:

- APPLITOOLS_API_KEY
- RUNWHERE
- TEST_START_PAGE

In this kind of environment (Azure DevOps, GitHub Actions, or virutally any build server that is not container based), the `RUNWHERE` environment variable will be set to `pipeline`, which is the reference term we reviewed earlier in this post.

![Screen%20Shot%202020-03-11%20at%202.12.48%20PM](/generated/full/Screen%20Shot%202020-03-11%20at%202.12.48%20PM.webp)

### GitHub Actions Example

The below code is a little different than the Azure DevOps snippet above, particularly because there isn't an Applitools Extension _yet_. In the meantime, we can capture the necessary environment variables the same way we usually would in bash, and then Actions allows us to use [::set-env](https://help.github.com/en/actions/reference/development-tools-for-github-actions#set-an-environment-variable-set-env) to persist them to future steps. 

You also might notice there is an _extra_ step for java - this is just so GitHub Actions uses the proper version of java for your project; in my case and my code, I require Java 13. The below snippet is an actual action, not just bash code, and it even creates a settings.xml file for us with our github information securely passsed.

```yaml
 - name: http check
   run: |
    attempt_counter=0
    max_attempts=5
    until $(curl --output /dev/null --silent --head --fail https://$hostname/); do
        if [ ${attempt_counter} -eq ${max_attempts} ];then
        echo "Max attempts reached"
        exit 1
        fi
        printf '.'
        attempt_counter=$(($attempt_counter+1))
        sleep 20
    done
    
- name: Applitools Build Task
  run: |
    # set batch ID
    APPLITOOLS_BATCH_ID=${{ github.run_id }}
    echo "::set-env name=APPLITOOLS_BATCH_ID::$APPLITOOLS_BATCH_ID"
    echo "Setting environment variable APPLITOOLS_BATCH_ID: $APPLITOOLS_BATCH_ID"
    
    # set batch name
    APPLITOOLS_BATCH_NAME="GitHub Actions / ${{ github.workflow }}"
    echo "::set-env name=APPLITOOLS_BATCH_NAME::$APPLITOOLS_BATCH_NAME"
    echo "Setting environment variable APPLITOOLS_BATCH_NAME: $APPLITOOLS_BATCH_NAME"
    
    # set server url
    APPLITOOLS_SERVER_URL="https://eyes.applitools.com"
    echo "::set-env name=APPLITOOLS_SERVER_URL::$APPLITOOLS_SERVER_URL"
    echo "Setting environment variable APPLITOOLS_SERVER_URL: $APPLITOOLS_SERVER_URL"
    
    # set batch sequence
    APPLITOOLS_BATCH_SEQUENCE="GitHub Actions / ${{ github.workflow }}"
    echo "::set-env name=APPLITOOLS_BATCH_SEQUENCE::$APPLITOOLS_BATCH_SEQUENCE"
    echo "Setting environment variable APPLITOOLS_BATCH_SEQUENCE: $APPLITOOLS_BATCH_SEQUENCE"
    
    # set test start page
    TEST_START_PAGE=https://$hostname
    echo "::set-env name=TEST_START_PAGE::$TEST_START_PAGE"
    echo "Setting environment variable TEST_START_PAGE_TEST: $TEST_START_PAGE"

- name: "Set JDK version"
  uses: actions/setup-java@v1
  with:
    java-version: '13'
    architecture: x64
    jdkFile: /usr/lib/jvm/java-13-oracle

- name: "Visual Testing"
  env:
      APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
      RUNWHERE: pipeline
  run: mvn -f visual_tests/pom.xml clean test
```
Notice again, at the very bottom in the last task, I still have my required environment variables set; only I opted to export the `TEST_START_PAGE` as part of my Applitools bash test. One of the environment variables (`APPLITOOLS_API_KEY`) is a secret encrypted variable; to learn how to create GitHub Actions secrets, [click here](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

Once you have your tasks added and environment variables set, you're ready to run your pipeline!

![Screen%20Shot%202020-03-11%20at%202.21.02%20PM](/generated/full/Screen%20Shot%202020-03-11%20at%202.21.02%20PM.webp)
