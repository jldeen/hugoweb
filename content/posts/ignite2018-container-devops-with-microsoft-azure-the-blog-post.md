+++
author = "jldeen"
date = 2018-09-25T16:17:53Z
description = ""
draft = false
image = "../../images/Screen-Shot-2018-09-25-at-19.08.15_w1mvf6.png"
slug = "ignite2018-container-devops-with-microsoft-azure-the-blog-post"
title = "Ignite2018: Container DevOps with Microsoft Azure - the blog post!"
layout = "post"

+++


Earlier today I did a session on Container DevOps with Microsoft Azure during Microsoft Ignite 2018. I stated I would follow the session up with a blog post on secrets and how to create them to use with your CI/CD pipelines with Azure DevOps. Here is your promised post! Prior to our session, I did a few things:

I created a namespace. Remember, namespaces separate your deployment objects. (Deployments, pods, services, ingresses, etc.) I did that by typing:

`kubectl create namespace [namespace-name]`

Next, I created a secret to story my private container registry (using Azure Container Registry). I did that by typing:

`kubectl create secret docker-registry [secret-name] --docker-server=[repo-url] --docker-username=[username] --docker-password=[password] --namespace=[namespace-name]`

Finally, I needed to ensure the `kubectl run` command knew it was supposed to use that secret. I could do this one of two ways. First, I could use the `--overrides` flag with my kubectl run command and parse in json telling my deployment.yaml to use my created pull secret. In 1.10, that overrides would look like this:

`--overrides='{ "apiVersion": "apps/v1beta1", "spec": { "template": { "spec": { "imagePullSecrets": [{"name": "my-secret"}] }} }}'`

So the full command would be something like this:

`kubectl run -n ignite2018 hello-ignite --image acrjdtest.azurecr.io/jldeen/build18-node:latest --port 3000 -o json --overrides='{ "apiVersion": "apps/v1beta1", "spec": { "template": { "spec": { "imagePullSecrets": [{"name": "my-secret"}] }} }}'`

The above command will ensure only that deployment in that namespace will have access to that pull secret. Now, if I wanted to simplify this and authorize any deployment in a certain namespace I could attach a pull secret to a service account. By default, each namespace will have one service account named, “default.” The service account will act on behalf of the pods. So if the service account is told to use a pull secret, the SA will then also assure each deployment in its namespace will also use the pull secret. To attach your created pull secret to your default service account you would run this:

`kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "secret-name"}]}'`

Now, here’s the thing – I know a lot of this is manual. Can you use the Kubernetes extension in Azure DevOps to create a secret for you? Yes! But since the kubectl run command is so basic and limited, you would then need to ensure you use the `--overrides` flag so your run command knows it is going to pull from a private repo and needs authorization. This is one area of the extension that could use some updating. All VSTS/Azure DevOps extensions are on GitHub [here](https://github.com/Microsoft/app-store-vsts-extension) – submit a PR if you have an idea of how to improve the Kubernetes and Helm tasks!

The other (better) option, in all honesty, is to use a yaml file for your deployment and not single commands. The yaml files will allow you to update your Kubernetes deployments. Also, the more you understand the declarative language of Kubernetes, the better you will understand creating your own Helm charts. An example of the above deployment and service creation with a yaml file would look like this:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-ignite2018
  labels:
    run: hello-ignite2018
spec:
  replicas: 3
  strategy:
    type: "RollingUpdate"
  selector:
    matchLabels:
      app: hello-ignite2018
  template:
    metadata:
      labels:
        app: hello-ignite2018
    spec:
      imagePullSecrets:
        - name: my-secret
      containers:
        - name: hello-ignite2018
          image = acrjdtest.azurecr.io/jldeen/ignite2018:latest
          imagePullPolicy: Alwas
          ports:
            - name: http
              containerPort: 3000
              protocol: TCP
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  labels:
    run: hello-ignite
  name: hello-ignite
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
      name: http
  selector:
    app: hello-ignite
  type: ClusterIP
```

Note: You could also change Service type to “Cluster IP” and then use an ingress controller. I walk through ingress routing in [this post](https://jessicadeen.com/aks-and-helm-charts-ingress-controllers/).

Then to deploy it you would use the `kubectl apply -f file-name.yaml`

That’s it! Please feel free to comment below with any questions or even just to say hi!

