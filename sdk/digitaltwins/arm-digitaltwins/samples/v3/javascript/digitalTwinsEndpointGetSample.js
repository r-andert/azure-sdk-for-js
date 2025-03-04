/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { AzureDigitalTwinsManagementClient } = require("@azure/arm-digitaltwins");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Get DigitalTwinsInstances Endpoint.
 *
 * @summary Get DigitalTwinsInstances Endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-10-31/examples/DigitalTwinsEndpointGet_example.json
 */
async function getADigitalTwinsInstanceEndpoint() {
  const subscriptionId = "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.get(
    resourceGroupName,
    resourceName,
    endpointName
  );
  console.log(result);
}

getADigitalTwinsInstanceEndpoint().catch(console.error);

/**
 * This sample demonstrates how to Get DigitalTwinsInstances Endpoint.
 *
 * @summary Get DigitalTwinsInstances Endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-10-31/examples/DigitalTwinsEndpointGet_WithIdentity_example.json
 */
async function getADigitalTwinsInstanceEndpointWithIdentity() {
  const subscriptionId = "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.get(
    resourceGroupName,
    resourceName,
    endpointName
  );
  console.log(result);
}

getADigitalTwinsInstanceEndpointWithIdentity().catch(console.error);
