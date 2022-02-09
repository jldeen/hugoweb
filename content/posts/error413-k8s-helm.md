+++
author = "jldeen"
date = 2019-03-19T19:13:54Z
description = ""
draft = false
image = "../../images/Fix-413-Request-Entity-Too-Large-on-Nginx-web-server-01-resize.png"
slug = "error413-k8s-helm"
title = "How to fix error 413: Request Entity Too Large in Kubernetes and Helm"
layout = "post"

+++


I have been using the nginx-ingress helm chart in my clusters for quite some time now. I like having only one load balancer to handle any of the apps running on my cluster. This way I can [route traffic through my nginx proxy](https://jessicadeen.com/kubernetes-ingress-controllers-and-certificates-the-walkthrough/) and link it over the stable/cert-mgr helm chart to auto configure SSL Let's Encrypt certs for my deployments. 

However, when going down the rabbit hole to migrate my website from WordPress to Ghost, I went to upload/import the exported json file as part of the migration process and I was given the following error:

`413: Request Entity Too Large`

Turns out the error was due to my default configuration of nginx. I knew the solution if I had nginx running on a VM (I just modify the /etc/nginx/nginx.conf and restart the service), but I wasn't quite sure how to handle it from a helm chart, especially since I want the change to persist in the event of a pod/deployment failure or re-deployment. 

I went to the chart docs and still couldn't find the obvious answer, but I did find [customized configmap.yaml](https://github.com/nginxinc/kubernetes-ingress/blob/master/docs/configmap-and-annotations.md) files with hints of the answer. 

TL;DR: There are a few solutions.

1. I make my own values.yaml file so I can override the defaults for the nginx helm chart. I need to add in proxy-body-size: 256m under `config:` my chart adds an annotation to my deployed configmap, which would then set the `client-max-body` limit to whatever I specified. By default it is 1m and in my example I'm going to increase it to `256m`.

You can see the full default values file [here](https://github.com/helm/charts/blob/master/stable/nginx-ingress/values.yaml), but the beginning of my customize values override.yaml is below:

```
## nginx configuration
## Ref: https://github.com/kubernetes/ingress/blob/master/controllers/nginx/configuration.md
##
controller:
  name: controller
  image:
    repository: quay.io/kubernetes-ingress-controller/nginx-ingress-controller
    tag: "0.22.0"
    pullPolicy: IfNotPresent

  config:
    proxy-body-size: 256m
  # Will add custom header to Nginx https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers
  headers: {}

  # Required for use with CNI based kubernetes installations (such as ones set up by kubeadm),
  # since CNI and hostport don't mix yet. Can be deprecated once https://github.com/kubernetes/kubernetes/issues/23920
  # is merged
  hostNetwork: false

```

Note, I left all other settings the same so, in theory, I could use the `-f` flag in my pipeline when I setup nginx-ingress via the stable helm chart and use my custom values.yaml, but there are other options. 

2. Since `proxy-body-size` is the only change I'm making, I could also use `--set` with `controller.config.proxy-body-size=256m`, which would work just the same. Now, I may keep a values file in my dotcom/iac repo folder just in case I want to make future config updates in which `--set` doesn't make sense.
3. The 3rd options is to apply this setting [to specific Ingress objects](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md#custom-max-body-size) by applying the following annotation: `nginx.ingress.kubernetes.io/proxy-body-size: 256m`

The answer may be different depending on your needs and your use of the nginx ingress helm chart, but at the very least, I hope this helps someone with a more obvious answer than my 30+ open tabs suggested.

