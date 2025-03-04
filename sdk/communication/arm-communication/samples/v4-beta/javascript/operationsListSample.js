/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists all of the available REST API operations of the Microsoft.Communication provider.
 *
 * @summary Lists all of the available REST API operations of the Microsoft.Communication provider.
 * x-ms-original-file: specification/communication/resource-manager/Microsoft.Communication/preview/2022-07-01-preview/examples/communicationServices/operationsList.json
 */
async function operationsList() {
  const subscriptionId =
    process.env["COMMUNICATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  operationsList();
}

main().catch(console.error);
