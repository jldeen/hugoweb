+++
author = "jldeen"
categories = ["codefresh", "containers", "azure devops", "ci/cd", "selenium", "visual testing", "ui testing"]
date = 2020-03-12T21:45:00Z
description = ""
draft = false
image = "../../images/Screen%20Shot%202020-03-11%20at%202.14.05%20PM.png"
slug = "visual-test-consider-container"
tags = ["codefresh", "containers", "azure devops", "ci/cd", "selenium", "visual testing", "ui testing"]
title = "Things to consider when running visual tests in CI/CD pipelines: Container Pipeline Edition (Part 3)"
layout = "post"

+++


If you haven't *at least* read [the first post in this series](https://jessicadeen.com/getting-started-visual-tests-cd/), I recommend checking it out now. Do it. I'll wait. You also might want [to read the second post in this series](https://jessicadeen.com/visual-testing-actions-azdevops/) if you have any investment or interest in traditional pipelines (non-container), but it's not a requirement to follow along here today.

This is the final post in the "Things to consider when running visual tests in CI/CD pipelines" series. I think as the age old saying goes, "They saved the best for last!" Haha, kidding. I'm only slightly bias because if you have been following me for any length of time, you may know I am a *huge* fan of all things containers, including container based pipelines.

If you've used Jenkins for awhile now, you might know you can run [Jenkins](https://jenkins.io/doc/book/pipeline/docker/) within your Kubernetes cluster and take advantage of the Docker socket to run container based pipelines (stay tuned for future blog post on how I approach this).

What is a container based pipeline? In short, it's a pipeline where _each_ task runs in a container. The benefit of this is I don't need to spend time configuring my build server or build environment with _all_ the necessary dependencies and binaries needed for my pipeline. I can simply run a container with those deps/binaries and then execute my tasks accordingly.

In the webinar Angie and I did showcasing best practices with visual testing and CI/CD, I used [Codefresh](https://codefresh.io/jessica) to demonstrate how to run visual tests in a container based pipeline. Codefresh is a Kubernetes native CI/CD platform, specifically built for microservices and container-based applications. It was also the first CI/CD platform that puts the container image at the center of your workflow. As a side note, I do feel Codefresh makes it easier to work with container based pipelines than Jenkins (*shudders at writing groovy*), but that's a neither here nor there. 

Let's review the considerations you should be aware of when it comes to visual tests and a container-based (aka docker-based) pipeline.

1. The obvious: you do not have Chrome locally and easily accessible, unless of course you create a container with Chrome and tools of choice you plan to use. 
 
Since my demo uses a Maven Springboot project, I really wanted to use the smallest image possible (smaller images == faster performance and smaller attack surfaces). My demo uses `maven:3.6.3-jdk-13` to run the tests Angie wrote; I run them just as I would if I were in a "traditional" environment: simply export the required environment variables and run `mvn -f visual_tests/pom.xml clean test`.

2. Since I don't have chrome local, I can spin up a docker compose file with selenium hub and all necessary browser nodes. Selenium has great documentation on how to do that [here](https://github.com/SeleniumHQ/docker-selenium/wiki/Getting-Started-with-Docker-Compose).

3. When using Selenium Hub, especially in a container format, as [the documentation referenced in point 2](https://github.com/SeleniumHQ/docker-selenium/wiki/Getting-Started-with-Docker-Compose#step-4-running-tests) indicates, you have to use a `RemoteWebDriver` to connect to your browser as opposed to the more standard ChromeDriver used in our `local` and `pipeline` environments. Now, when using the `RemoteWebDriver` call as suggested by Selenium's docs (using DesiredCapabilities), you might get an error similar to the following:

```
Message: org.openqa.selenium.remote.DesiredCapabilities chrome

INFO: Using new ChromeOptions() is preferred to DesiredCapabilities.chrome() Starting ChromeDriver 2.44.609538 (b655c5a60b0b544917107a59d4153d4bf78e1b90) on port 33954 Only local connections are allowed.
```

To resolve that error/info message, I simply consolidated their example code to the following (which does not use DesiredCapabilities):
```
chromeOptions = new ChromeOptions();
String Selenium = "http://selenium_hub:4444/wd/hub";
driver = new RemoteWebDriver(new URL(Selenium), chromeOptions);
```
If you read the first post, you can find how I used the above in the getEnvironment() class under the `else if (runWhere.equals("container"))` statement.

Now that we understand the _why_ we wrote our `container` condition in our getEnvironment() class, let's put it to use and have some fun with our pipeline steps!

If you have watched our webinar, or read part 2 in this series, you know there are 3 basic tasks we need to add into our new or existing pipelines:

1. HTTP Check
2. Capture Build Environment Variables
3. Run Visual Tests

However, since we know we also need access to selenium hub for the 3rd task, we have to first define our services. Codefresh makes this super simple since it allows us to define [service containers](https://codefresh.io/docs/docs/codefresh-yaml/service-containers/?WT.mc_id=docs-blog-jessde) in a format based on docker compose.

If you don't have a Codefresh account, and want to play around with it, you can get started for free [here](https://codefresh.io/jessica). **Disclaimer:** This isn't an affiliate link and I'm not paid to promote Codefresh, I just really love all things containers and DevOps.

You can take a look at [my codefresh.yaml here](https://github.com/jldeen/spring-boot-websocket-chat-demo/blob/applitools/codefresh.yml), but for now let's just start with our services section. At the very top of our yaml, we'll use the following:

```
version: "1.0"
services:
  name: selenium_hub
  composition:
    selenium_hub:
      image = selenium/hub:latest
      ports:
        - 4444
      environment:
        - SE_OPTS=-debug
        - GRID_MAX_SESSION=5

    chrome_node:
      image = selenium/node-chrome:latest
      ports:
        - 5900
        - 5555
      command: bash -c "sleep 5 && /opt/bin/entry_point.sh"
      depends_on: 
        - selenium_hub
      environment:
        - HUB_HOST=selenium_hub
        - REMOTE_HOST=http://chrome_node:5555
        - NODE_MAX_SESSION=5
        - NODE_MAX_INSTANCES=5

    firefox_node:
      image = selenium/node-firefox:latest
      user: 1000:1000
      ports:
        - 5900
        - 5555
      command: bash -c "sleep 5 && /opt/bin/entry_point.sh"
      depends_on: 
        - selenium_hub
      environment:
        - HUB_HOST=selenium_hub
        - REMOTE_HOST=http://firefox_node:5555
        - NODE_MAX_SESSION=5
        - NODE_MAX_INSTANCES=5
```
See how similar it looks to a docker-compose.yaml file? Sweet, huh? Once we define our service containers, we simply link the necessary step to the `selenium_hub` service we just defined.

First, however, let's do our http check and then define our Applitools environment variables.

```
http_check:
  image = jldeen/docker-jfrog-cli-java:1.0.4
  title: "Http Check"
  stage: "deploy dev"
  shell: bash
  commands:
    - export attempt_counter=0
    - export export max_attempts=5
    - until $(curl --output /dev/null --silent --head --fail https://${{INGRESS_HOSTNAME_DEV}}); do if [ ${attempt_counter} -eq ${max_attempts} ];then echo "Max attempts reached"; exit 1; fi; printf '.';         attempt_counter=$(($attempt_counter+1)); sleep 20; done

applitools_task:
  image = tutum/curl
  title: "Applitools Build Task"
  stage: "deploy dev"
  commands:
    - export APPLITOOLS_BATCH_ID=CF-${{CF_SHORT_REVISION}}
    - echo "Setting environment variable APPLITOOLS_BATCH_ID - $APPLITOOLS_BATCH_ID"
    - cf_export APPLITOOLS_BATCH_ID=$APPLITOOLS_BATCH_ID
    - APPLITOOLS_BATCH_NAME="Codefresh / ${{CF_SHORT_REVISION}}"
    - echo "Setting environment variable APPLITOOLS_BATCH_NAME - $APPLITOOLS_BATCH_NAME"
    - cf_export APPLITOOLS_BATCH_NAME=$APPLITOOLS_BATCH_NAME
    - export APPLITOOLS_SERVER_URL="https://eyes.applitools.com"
    - echo "Setting environment variable APPLITOOLS_SERVER_URL - $APPLITOOLS_SERVER_URL"
    - cf_export APPLITOOLS_SERVER_URL=$APPLITOOLS_SERVER_URL
    - export APPLITOOLS_BATCH_SEQUENCE=CF-${{CF_SHORT_REVISION}}
    - echo "Setting environment variable APPLITOOLS_BATCH_SEQUENCE - $APPLITOOLS_BATCH_SEQUENCE"
    - cf_export APPLITOOLS_BATCH_SEQUENCE=$APPLITOOLS_BATCH_SEQUENCE
```
Notice on how both above tasks are using specific images: `jldeen/docker-jfrog-cli-java:1.0.4` and `tutum/curl`. 

Both images have only the tools we need for our tasks. I tend to use an image I own and control for a majority of my tasks for security reasons in this specific pipeline, but that's a post for another time.

You might also notice the second task has both `export` and `cf_export`. The first `export` only exports the variable for that task, while the `cf_export` will persist the environment variable for subsequent tasks.

The first 2 tasks are self explanatory as far as their function, so now let's show the code for our final and most important task: visual tests using maven.

```
visual_testing:
  image = maven:3.6.3-jdk-13
  title: "Running Visual Tests"
  stage: "deploy dev"   
  commands:
    - export RUNWHERE=container
    - export TEST_START_PAGE=https://${{INGRESS_HOSTNAME_DEV}}
    - 'mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -f visual_tests/pom.xml clean test'
  services:
    - selenium_hub
```
Notice the the first export command: `export RUNWHERE=container` as well as the last 2 lines:
```
  services:
    - selenium_hub
```
That's where we link our `visual_testing` step to the services we created at the very top of our pipeline. That's it. 

Now, when we run our pipeline and get to our visual tests task, the maven will be able to run our tests using the code we defined in our getEnvironment() class under the condition for `container`.

![Screen%20Shot%202020-03-11%20at%202.13.44%20PM](https://cdn.jessicadeen.com/content/images/Screen%20Shot%202020-03-11%20at%202.13.44%20PM.png)

Now, if you're wanting to do this in something like Jenkins, I will have a future blog post focusing on how to handle container based pipelines, but you will have to consider using a [docker compose plugin](https://plugins.jenkins.io/docker-compose-build-step/) or some other method to spin up services and connect them to running containers. 

Remember, when you use docker-compose, you attach defined services to a network so you'll have to consider your network configuration and port forwarding. 

To give you an idea and some practice, you can play with docker-compose on your system (provided Docker is installed) and [our sample chattybot code](https://github.com/jldeen/spring-boot-websocket-chat-demo). You only need two things:
- [this docker-compose.yaml](https://gist.github.com/jldeen/7f2b69b57fdb28d0240d5389bc1d6047) 
- To change line 69 in `visual_tests/src/test/java/base/BaseTests.java`.

```
# line 69 for Codefresh
String Selenium = "http://selenium_hub:4444/wd/hub";

# line 69 for local container test
String Selenium = "http://127.0.0.1:4444/wd/hub";
```

As a reminder, after making the temporary code change, you will still need to export the `RUNWHERE` environment variable (equal to `container`), along with the `batchId`, `TEST_START_PAGE`, and `APPLITOOLS_API_KEY` variables, and spin up your docker compose service using the following command: `docker-compose -f docker-compose.yaml up -d`.

![selnium-example](https://cdn.jessicadeen.com/content/images/docker-compose-selenium.gif)

Congrats! You just ran visual tests utilizing containers! You're cloud native ready now. Time to update that resume.
![wink](https://media.giphy.com/media/ui1hpJSyBDWlG/giphy.gif)



