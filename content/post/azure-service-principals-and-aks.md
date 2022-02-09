+++
author = "jldeen"
date = 2018-10-04T21:53:48Z
description = ""
draft = true
slug = "azure-service-principals-and-aks"
title = "How to fix Error: Operation failed with status: 'Bad request'. Details: Service Principal clientID"

+++


`Operation failed with status: 'Bad request'. Details: Service Principal clientID...`

azure command line aks deployment with service principal - if you delete SP and AZ stops working, you can delete your saved json files. There are two primary ones I found:`rm ~/.azure/acsServicePrincipal.json10459` `rm ~/.azure/aksServicePrincipal.json`

