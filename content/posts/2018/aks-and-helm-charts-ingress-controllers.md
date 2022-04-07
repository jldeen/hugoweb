+++
author = "jldeen"
date = 2018-05-07T14:00:41Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-05-07-at-09.58.08_xqgcbs.png"
slug = "aks-and-helm-charts-ingress-controllers"
title = "AKS and Helm Charts: Ingress Controllers"
layout = "post"

+++


This is a post I’ve been meaning to write for a long time. In several of my demos, many of you who follow me have seen how I use the following two helm charts to deploy new helm charts on my Kubernetes cluster that route traffic to my nginx ingress controller (LoadBalancer) and pull a valid SSL cert from Let’s Encrypt through the Kube Lego deployment (pod). I want to briefly explain how that’s all working.

[https://github.com/kubernetes/charts/tree/master/stable/nginx-ingress](https://github.com/kubernetes/charts/tree/master/stable/nginx-ingress)

[https://github.com/kubernetes/charts/tree/master/stable/kube-lego](https://github.com/kubernetes/charts/tree/master/stable/kube-lego)

First, you can find out about how to setup both charts in my [previous blog post](https://jessicadeen.com/codefreshazure-devops-kubernetes-helm-webinar/). Once you’ve configured both charts and made a record with your domain registrar, you’re ready to follow along.

The way I’ve configured my nginx/kube-lego setup is as follows:

1. Pointed Google DNS Namespace record to Azure DNS az.jessicadeen.com![](/images/Screen-Shot-2018-05-07-at-09.55.23_whitdn.png)
2. From Azure DNS, created an A record pointing to my nginx ingress within my K8s cluster 1. For this, I used a wildcard *.k8s![](/images/Screen-Shot-2018-05-07-at-09.58.08_xqgcbs.png)

What this means is anytime I register anything with .k8s.az.jessicadeen as the suffix (I.E bob.k8s.az.jessicadeen.com) between Google DNS and Azure DNS, traffic is routed to my nginx ingress controller in my Kubernetes cluster.

Huge shoutout to [Lachie Evenson](https://github.com/lachie83/) for introducing me to this setup!

Now, of course, I do have to ensure my helm charts have the ingress enabled and have the proper ingress.yaml file configured. If you have seen my Build demo with Abel Wang, here are the code snippets I used:

#### Secrets Values Creation
`imagePullSecrets:`
#### Deployment Secrets Template Values 
```
{{- if .Values.imagePullSecrets }}
      imagePullSecrets:
      - name: "{{ .Values.imagePullSecrets }}"
      {{- end }}
```
#### Ingress Values Creation
```
ingress:
  enabled: true
  hostname: build18.k8s.az.jessicadeen.com
  annotations:
     kubernetes.io/ingress.class: nginx
     kubernetes.io/tls-acme: "true"
  tls: true
```
#### Deployment Ingress Template Values
```
{{- if .Values.ingress.enabled }}
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
{{- if .Values.ingress.annotations }}
  annotations:
{{ toYaml .Values.ingress.annotations | indent 4 }}
{{- end }}
  name: {{ template "fullname" . }}
spec:
  rules:
  - host: {{ .Values.ingress.hostname | quote }}
    http:
      paths:
      - path: /
        backend:
          serviceName: {{ template "fullname" . }}
          servicePort: {{ .Values.service.internalPort }}
{{- if .Values.ingress.tls }}
  tls:
  - secretName: {{ .Values.ingress.hostname | quote }}
    hosts:
      - {{ .Values.ingress.hostname | quote }}
{{- end -}}
{{- end }}
```

You’ll notice – all this code does is enable the ingress and secret as part of the Kubernetes deployment with Helm and then the ingress.yaml (which is parameterized) says if the value is enabled, then fill out the following data such as rules to route the host (ingress.hostname) to the http path of /.

That’s it!

