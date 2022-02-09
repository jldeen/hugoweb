+++
author = "jldeen"
date = 2018-09-20T20:46:00Z
description = ""
draft = false
image = "Screen-Shot-2018-09-20-at-20.08.41_iokeke.png"
slug = "azure-devops-dockerfiles-with-multiline-environment-variables-private-repos-and-ssh-keys"
title = "Azure DevOps: Dockerfiles with multiline environment variables, private repos, and ssh keys"

+++


My previous blog post, [How to access private Azure DevOps repos from a Dockerfile!](https://dev.jldeen.com/tech/how-to-access-private-azure-devops-repos-from-a-dockerfile/) was a big hit in the DevOps and container communities, however, there was one area I discovered that could use further improvement. How does one preserve the multiline formatting when passing the multiline contents of the ssh private key through an environment variable? My final example Dockerfile from my previous post showed the following format, which works great locally:

# this is our first build stage, it will not persist in the final image FROM alpine as intermediate # install git RUN apk update RUN apk add git openssh # add credentials on build ARG SSH_PRIVATE_KEY RUN mkdir /root/.ssh/ RUN echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa RUN chmod 600 ~/.ssh/id_rsa # make sure your domain is accepted RUN touch /root/.ssh/known_hosts RUN ssh-keyscan vs-ssh.visualstudio.com >> /root/.ssh/known_hosts RUN git clone [azure-devops-account-name]@vs-ssh.visualstudio.com:v3/[azure-devops-account-name]/[project-name]/[project-name] FROM alpine # copy the repository form the previous image COPY --from=intermediate /[project-name] /srv/[project-name]

The only problem is when you start to rub a little DevOps on the process. Every single CI/CD tool operates a little differently and as such the formatting of the parsed `SSH_PRIVATE_KEY` can get messed up and produce this error:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-09-20-at-20.08.41_iokeke.png)

“Load key “~/.ssh/id_rsa” or “/root/.ssh/id_rsa”: invalid format – permission denied.

[http://gph.is/1VVfeW2](http://gph.is/1VVfeW2)

The solution is to resolve the line break (/n) the variable couldn’t properly address. To do this you can use tr to replace a character with a new line, but that means we also need to use a variable that has a character to replace.

So how about we do something like this in Linux? `cat ~/.ssh/[private-key-file] | tr 'n' ','`. (I believe cat should also work as an alias for Get-Content in Windows PowerShell.) This works great and produces a file with commas for every new line rather than a new line itself.

**Hint**: If you’re on macOS and want to also run that command AND paste it to your clipboard so you can paste it into Azure DevOps or some other CI/CD tool, you can run this command `cat ~/.ssh/[private-key-file] | tr 'n' ',' | pbcopy`

Now, that means we also have to update our docker file with a line that can parse our newly formatted string and remove the commas and reinstate the line breaks. We do that with a line like this: `echo "${SSH_PRIVATE_KEY}" | tr "," "n" > ~/.ssh/id_rsa`.

So our newly updated Dockerfile looks like this:

# this is our first build stage, it will not persist in the final image FROM alpine as intermediate # install git RUN apk update RUN apk add git openssh # add credentials on build and fix formatting ARG SSH_PRIVATE_KEY RUN mkdir /root/.ssh/ RUN echo "${SSH_PRIVATE_KEY}" | tr "," "n" > ~/.ssh/id_rsa RUN chmod 600 ~/.ssh/id_rsa # make sure your domain is accepted RUN touch /root/.ssh/known_hosts RUN ssh-keyscan vs-ssh.visualstudio.com >> /root/.ssh/known_hosts RUN git clone [azure-devops-account-name]@vs-ssh.visualstudio.com:v3/[azure-devops-account-name]/[project-name]/[project-name] FROM alpine # copy the repository form the previous image COPY --from=intermediate /[project-name] /srv/[project-name]

I have highlighted the line we have changed so the variable can be properly parsed.

And then in Azure DevOps (or the CI/CD tool of your choice), under variables, you now paste in the converted private key **WITH** commas:

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-09-20-at-20.19.16_zi08qr.png)

Obviously, in a real-world scenario, I would also encrypt that variable, but I wanted to share the screenshot so you could see what was being pasted.

And in tasks, you still use the build argument as I previously stated: `SSH_PRIVATE_KEY=$(SSH_PRIVATE_KEY)`

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-09-20-at-20.20.57_fecqpm.png)

So the <span style="text-decoration: underline;">**only**</span> part that changes is the format of the ssh key file contents you paste into use as a variable for your pipeline and the line in your Dockerfile that parses that variable and creates your id_rsa key.

And then you save and queue a new build, and voila!

![](https://cdn.jessicadeen.com/content/images/Screen-Shot-2018-09-20-at-20.37.41_meuj73.png)

![](https://media.giphy.com/media/lHQuX9d5DBhug/giphy.gif)

