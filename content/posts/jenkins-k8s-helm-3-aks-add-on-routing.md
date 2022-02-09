+++
author = "jldeen"
date = 2020-12-01T23:02:16Z
description = ""
draft = true
slug = "jenkins-k8s-helm-3-aks-add-on-routing"
title = "Jenkins K8s Helm 3 AKS add on routing"
layout = "post"

+++


```

controller:
  tag: "2.269"
  resources:
    requests:
      cpu: "50m"
      memory: "256Mi"
    limits:
      cpu: "2000m"
      memory: "2048Mi"
  serviceType: ClusterIP
  servicePort: 8080
  targetPort: 8080
  installPlugins:
      - kubernetes:1.28.3
      - pipeline-stage-view:2.19
      - pipeline-rest-api:2.19
      - workflow-aggregator:2.6
      - credentials-binding:1.24
      - git:4.4.5
      - pipeline-github-lib:1.0
      - ghprb:1.42.1
      - blueocean:1.24.3

  scriptApproval:
    - "method groovy.json.JsonSlurperClassic parseText java.lang.String"
    - "new groovy.json.JsonSlurperClassic"
    - "staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods leftShift java.util.Map java.util.Map"
    - "staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods split java.lang.String"
    - "method java.util.Collection toArray"
    - "staticMethod org.kohsuke.groovy.sandbox.impl.Checker checkedCall java.lang.Object boolean boolean java.lang.String java.lang.Object[]"
    - "staticMethod org.kohsuke.groovy.sandbox.impl.Checker checkedGetProperty java.lang.Object boolean boolean java.lang.Object"

  ingress:
    enabled: true
    apiVersion: extensions/v1beta1
    annotations:
      kubernetes.io/ingress.class: addon-http-application-routing
      nginx.ingress.kubernetes.io/rewrite-target: /
      kubernetes.io/tls-acme: "true"
      certmanager.k8s.io/cluster-issuer: letsencrypt-prod
    hostName: jenkins.k8s.az.jessicadeen.com

```



