/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @summary Creates or updates a new Event Hub as a nested resource within a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2021-11-01/examples/EventHubs/EHEventHubCreate.json
 */
async function eventHubCreate() {
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = "Default-NotificationHubs-AustraliaEast";
  const namespaceName = "sdk-Namespace-5357";
  const eventHubName = "sdk-EventHub-6547";
  const parameters = {
    captureDescription: {
      destination: {
        name: "EventHubArchive.AzureBlockBlob",
        archiveNameFormat:
          "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
        blobContainer: "container",
        storageAccountResourceId:
          "/subscriptions/e2f361f0-3b27-4503-a9cc-21cfba380093/resourceGroups/Default-Storage-SouthCentralUS/providers/Microsoft.ClassicStorage/storageAccounts/arjunteststorage",
      },
      enabled: true,
      encoding: "Avro",
      intervalInSeconds: 120,
      sizeLimitInBytes: 10485763,
    },
    messageRetentionInDays: 4,
    partitionCount: 4,
    status: "Active",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.eventHubs.createOrUpdate(
    resourceGroupName,
    namespaceName,
    eventHubName,
    parameters
  );
  console.log(result);
}

eventHubCreate().catch(console.error);
