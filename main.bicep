targetScope = 'subscription'

param rgName string = 'hugoweb'
param location string = 'eastus2'
param repositoryToken string

var customDomains = [
  'devtest.jessicadeen.com'
  ]

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: rgName
  location: location
}

module staticSiteProd './modules/createAzureStaticSite.bicep' = {
  scope: resourceGroup(rg.name)
  name: 'hugoStaticWeb'
  params: {
    name: 'hugoweb'
    location: location
    customDomains: customDomains
    repositoryUrl: 'https://github.com/jldeen/hugoweb'
    repositoryToken: repositoryToken
    branch: 'main'
    skipActionGeneration: true
  }
}
