/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List the Log Search rules within a subscription group.
 *
 * @summary List the Log Search rules within a subscription group.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2018-04-16/examples/listScheduledQueryRules.json
 */
async function listRules() {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.scheduledQueryRules.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listRules();
}

main().catch(console.error);
