+++
author = "jldeen"
categories = ["devops", "Azure", "linux", "ubuntu", "ci/cd", "selenium"]
date = 2020-03-12T21:43:00Z
description = ""
draft = false
image = "Screen%20Shot%202020-03-11%20at%201.11.44%20PM.png"
slug = "getting-started-visual-tests-cd"
tags = ["devops", "Azure", "linux", "ubuntu", "ci/cd", "selenium"]
title = "Things to consider when running visual tests in CI/CD pipelines: Getting Started (Part 1)"

+++


Testing - it's an important part of a developer's day-to-day, but it's also crucial to the operations engineer. In a world where DevOps is more than just a buzzword, where it's become accepted as a mindset shift and culture change, we _all_ need to consider running quality tests. Traditional testing may include UI testing, integration testing, code coverage checks, and so forth, but what about visual tests? What about gaining confidence in verifying in more than just if your application runs?

Today I partnered with [Angie Jones](http://angiejones.tech/) from Applitools in a joint webinar where we talked about best practices as it pertains to both Visual Testing and also CI/CD. If you didn't get a chance to watch the webinar, or stumbled on this post _after_ the webinar, you can watch it here [to be updated]. 

My demos focused on 3 different CI/CD scenarios: 

- Azure DevOps
- GitHub Actions
- Container Based Pipelines (Using Codefresh, but you can also run a container native pipeline in Jenkins, for example)

As we learned, running visual tests locally are a bit different than running them in an unattended format using a pipeline or automated workflow. This post recaps some pre-reqs you need when it comes to setting up your build server environment.

First, let's consider the obvious: lack of access to a GUI. 

Running an automated pipeline/workflow means I am typically running my pipeline from the command line, with tasks defined in YAML (or groovy if you hate your life and love your Jenkins investment). What does this mean? Well, for starters, you don't have a GUI setup for your browser to launch. If you're using ChromeDriver as a connection means to run pixel-to-pixel or Applitools testing in your code, you're going to need to setup a headless environment for Chrome to run in. The below will walk you through how to configure your build server to support headless Chrome on Ubuntu 16.04 and 18.04. Lucky for us, headless chrome has been shipping with Chrome as of version 59 (current version as of the date of this blog post is version 80).

## Setting up your build server

I deployed the following on Ubuntu 18.04 in Azure. You can create a VM in the portal by following the instructions [here](https://docs.microsoft.com/azure/virtual-machines/linux/quick-create-portal?WT.mc_id=docs-blog-jessde), or you can use the [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=docs-blog-jessde) by following the guidance [here](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-cli). If you don't have an Azure account, you can create one for free [here](https://azure.microsoft.com/free/?WT.mc_id=docs-blog-jessde).

```
# Install Chromium
sudo apt install chromium-browser -y
```
If you don't install Chromium, or have access to Chrome on your system, you will get an error similar to the follwing if you try and run the test configuration below:

```
org.openqa.selenium.WebDriverException:
unknown error: cannot find Chrome binary
```

If you have not already setup your build server with Java 13 and Maven, and plan to run the test configuration code below, you will want to install both using the following commands (tested on Ubuntu 16.04 and 18.04):

```
# Optional: Java 13 and Maven
sudo add-apt-repository ppa:linuxuprising/java
sudo apt-get update
sudo apt-get install maven oracle-java13-installer -y
```

Now, if you would like to test your new configuration and headless Chrome browser, you can run the same Visual Tests Angie and I created during our webinar. 

*Note*: The below test configuration requires: 
- Chromium
- Java 13
- Maven 
- [Applitools Account - Create one Free Here](https://applitools.com/users/register)!

Simply run the following:

```
# Test Configuration
git clone https://github.com/jldeen/spring-boot-web-socket-chat-demo
cd spring-boot-web-socket-chat-demo && git checkout applitools

# Set local environment variables
export RUNWHERE=pipeline
export TEST_START_PAGE="http://cf-chattybot.k8s.az.jessicadeen.com/"
export APPLITOOLS_BATCH_ID=12345678
export APPLITOOLS_API_KEY=[Applitools-Api-Key-Here]

# From the newly cloned repo working directory run:
mvn -f visual_tests/pom.xml clean test
```
## Setting up your code (Java Example)

##### Step 1: Consider your environments

As we've discussed, when running visual tests, things are a little different depending on your environment. In our webinar, Angie I showcased 3 common environments when it comes to running visual tests:

- local (standard environment a developer works in, perhaps even right clicking on the test and selecting 'run test')
- pipeline (traditional environment with hosted or private/self-hosted server)
- container (newer, more cloud native, no direct access to local chrome; uses selenium-hub and docker-compose service creation)

We came up with the following class that allows you to export an environment variable (I.E. `export RUNWHERE=local`), which can be equal to `local`, `pipeline` or `container`.

Examples of all code snippets below can be found in full context on GitHub [here](https://github.com/jldeen/spring-boot-websocket-chat-demo/blob/applitools/visual_tests/src/test/java/base/BaseTests.java).

First, all 3 environments require the following:

```
### packages needed:
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

### container-based pipeline packages needed:
import org.openqa.selenium.remote.RemoteWebDriver;
import java.net.MalformedURLException;
import java.net.URL;

### general code needed for getEnvironment() class to work:
chromeOptions = new ChromeOptions();
WebDriverManager.chromedriver().setup();
```
`getEnvironment()` class snippet:
```
 private static void getEnvironment() throws MalformedURLException {
    runWhere = System.getenv("RUNWHERE");

    if (runWhere.equals("local")) {
      // Standard local visual test call
      driver = new ChromeDriver();
    }
    else if (runWhere.equals("pipeline")) {
      // build server headless chrome CI/CD example
      chromeOptions.addArguments("--headless", "--no-sandbox");
      driver = new ChromeDriver(chromeOptions);
    }
    else if (runWhere.equals("container")) {
      // selenium hub remote settings (container based CI/CD)
      String Selenium = "http://selenium_hub:4444/wd/hub";
      driver = new RemoteWebDriver(new URL(Selenium), chromeOptions);
    };
  }
```
Let's break down what each environment is doing:
- `local` - Connects to locally installed Chrome using `ChromeDriver` and launches a GUI instance of Chrome.

![Screen%20Shot%202020-03-11%20at%202.10.17%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202020-03-11%20at%202.10.17%20PM.png)

- `pipeline` - Connects to locally installed Chrome using `ChromeDriver` and runs Chrome silently (headless) in the background using `--headless` and `--no-sandbox` arguments. Note: According to [Google's Documentation here](https://developers.google.com/web/updates/2017/04/headless-chrome?WT.mc_id=docs-blog-jessde), if running Chrome headless on Windows, you will need to add an additional argument: `--disable-gpu`.

![Screen%20Shot%202020-03-11%20at%202.12.48%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202020-03-11%20at%202.12.48%20PM.png)

- `container` - Connects to selenium hub using `RemoteWebDriver` and runs tests against Chrome (or whatever broswer node you have configured in selenium_hub).

![Screen%20Shot%202020-03-11%20at%202.13.44%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202020-03-11%20at%202.13.44%20PM.png)
![Screen%20Shot%202020-03-11%20at%202.14.05%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202020-03-11%20at%202.14.05%20PM.png)

##### Step 2: Add the code for Applitools environment variable capture 

We need to tell our code to capture system environment variables we will set as part of our CI/CD pipelines; this tells Applitools what the name of our tests are and assign a batch ID. 

Our `batchId` and `batchName` can be whatever we configure them to be, but I tend to assign my `batchId` to my git commit-sha (shortend) or the build run id and my batch name to the name of the pipeline or repo/project. (You'll learn more about that in the adventure posts below.)

```
// obtain the batch name and ID from the environment variables
String batchName = System.getenv("APPLITOOLS_BATCH_NAME");
String batchId   = System.getenv("APPLITOOLS_BATCH_ID");

// set the batch
BatchInfo batchInfo = new BatchInfo(batchName);
batchInfo.setId(batchId);
eyes.setBatch(batchInfo);
```
Great, you now have your Linux server ready to run visual tests as part of CI/CD and you have your code ready to accept multiple environment scenarios! You are now ready to wire up your tests with your new or existing pipelines / workflows. 

Pick your adventure below! 

#### Azure DevOps and GitHub Actions
To get started with adding Applitools and Visual Testing to your CI/CD pipeline, and you are using Azure DevOps or GitHub Actions, checkout [this blog post](https://jessicadeen.com/visual-testing-actions-azdevops/). 

*Pro Tip:* 

If you have not yet configured your linux server to run as a private build agent for Azure DevOps, you might find [this doc](https://docs.microsoft.com/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=browser&WT.mc_id=docs-blog-jessde#install) helpful.

If you plan to use your linux server as a self-hosted runner for GitHub Actions, you might find [this prior blog post](https://jessicadeen.com/github-actions-self-hosted-runner/) helpful.

#### Container Based Pipeline (Codefresh)
If you are considering container based pipelines, or already have an investment in container based pipelines, check out [this blog post](https://jessicadeen.com/visual-test-consider-container/) where we walk through considerations with Visual Tests, Selenium, and CI/CD.



