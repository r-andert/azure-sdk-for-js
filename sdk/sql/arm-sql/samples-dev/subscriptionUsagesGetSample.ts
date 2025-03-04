/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets a subscription usage metric.
 *
 * @summary Gets a subscription usage metric.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SubscriptionUsageGet.json
 */
async function getSpecificSubscriptionUsageInTheGivenLocation() {
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const locationName = "WestUS";
  const usageName = "ServerQuota";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.subscriptionUsages.get(locationName, usageName);
  console.log(result);
}

getSpecificSubscriptionUsageInTheGivenLocation().catch(console.error);
