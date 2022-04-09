+++
author = "jldeen"
categories = ["Docker", "linux", "Azure", "containers", "Networking"]
date = 2020-05-01T13:00:00Z
description = ""
draft = false
image = "../../images/tcpbind-white.png"
slug = "how-to-solve-the-listen-tcp-80-bind-permission-denied-error-in-docker"
tags = ["Docker", "linux", "Azure", "containers", "Networking"]
title = "How to solve the \"listen tcp :80: bind: permission denied\" error in Docker"
layout = "post"

+++


We've all been there. You do everything correct - you set your container to run as non root, you configure your application port as a dynamic port that can be changed at runtime, and then, when runtime comes, you run something like the following command: 

```bash
docker run -e PORT=80 -p 80:80 --name my-app registry/image:tag` and you see this `listen tcp :80: bind: permission denied
```

The problem is simple, and so is the solution.

First, the problem is you're trying to bind to a privileged port - port 80 - but your container is running as non root.

Second, the solution is to grant the necessary root capabilities to the process trying to bind to the privileged port. You can do that by using the setcap command available in the libcap package.

This will vary depending on how you have your Dockerfile setup. 

## Debian
If you are using a Debian based image, I believe the libcap package (libcap2-bin) is already installed so you just need to run 

```bash
setcap 'cap_net_bind_service=+ep' /path-to-app-here
``` 

**Note:** If you are uisng a Go application with Debian and you receive an error like: `standard_init_linux.go:211: exec user process caused "no such file or directory"` try adding `ENV CGO_ENABLED=0` to your build stage. If you're new to go, Cgo let's Go packages call C code; setting CGO_ENABLED to "0" turns this functionality off, which fixes the above error. A full example of how this would look in your Dockerfile can be found [here](https://gist.github.com/jldeen/951306499dd43617f2da52f34db019c7). Though, honestly, you should use Alpine for runtime in a multistage Dockerfile and leave your debian base image to your build stage. Alpine won't need this extra build ENV since Alpine images are [musl libc based](https://alpinelinux.org/posts/Alpine-Linux-has-switched-to-musl-libc.html).


## Alpine
If you are uisng Alpine, which you probably should be, you will need to install the libcap package before you can use the `setcap` command. You can install and call setcap with one line: `RUN apk add libcap && setcap 'cap_net_bind_service=+ep' /path-to-app-here`. 

Once added in the order that makes sense, your Dockerfile might look some what like mine:

```Dockerfile
FROM golang:1.14.2-alpine3.11 as builder

RUN apk update && apk add --no-cache git

WORKDIR $GOPATH/src/croc-hunter/

ENV GOPATH /go

COPY croc-hunter.go /go/src/croc-hunter/
COPY static/ static/

RUN go get -d -v

RUN go build -o /go/bin/croc-hunter

FROM alpine AS final

WORKDIR /app

COPY static/ static/ 

COPY --from=builder /go/bin/croc-hunter /app/croc-hunter

RUN apk add libcap && setcap 'cap_net_bind_service=+ep' /app/croc-hunter

USER 1000

EXPOSE ${PORT}

CMD ["/app/croc-hunter"]

```

Once you rebuild your Dockefile with the updated setcap command, retry your `docker run` command you should see success:

![Screen%20Shot%202020-04-30%20at%201.47.34%20PM](/generated/full/Screen%20Shot%202020-04-30%20at%201.47.34%20PM.webp)

You can see this in action in my latest YouTube Video (TS 6:35), just click the image below!

[![YouTube Video][1]][2]

[1]:  /generated/full/DockerENV-Social.webp
[2]:  https://jldeen.dev/from-app-to-cloud
