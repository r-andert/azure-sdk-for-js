/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { BackupPolicies } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NetAppManagementClient } from "../netAppManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  BackupPolicy,
  BackupPoliciesListOptionalParams,
  BackupPoliciesListResponse,
  BackupPoliciesGetOptionalParams,
  BackupPoliciesGetResponse,
  BackupPoliciesCreateOptionalParams,
  BackupPoliciesCreateResponse,
  BackupPolicyPatch,
  BackupPoliciesUpdateOptionalParams,
  BackupPoliciesUpdateResponse,
  BackupPoliciesDeleteOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing BackupPolicies operations. */
export class BackupPoliciesImpl implements BackupPolicies {
  private readonly client: NetAppManagementClient;

  /**
   * Initialize a new instance of the class BackupPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: NetAppManagementClient) {
    this.client = client;
  }

  /**
   * List backup policies for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: BackupPoliciesListOptionalParams
  ): PagedAsyncIterableIterator<BackupPolicy> {
    const iter = this.listPagingAll(resourceGroupName, accountName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listPagingPage(
          resourceGroupName,
          accountName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: BackupPoliciesListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<BackupPolicy[]> {
    let result: BackupPoliciesListResponse;
    result = await this._list(resourceGroupName, accountName, options);
    yield result.value || [];
  }

  private async *listPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: BackupPoliciesListOptionalParams
  ): AsyncIterableIterator<BackupPolicy> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      accountName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List backup policies for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: BackupPoliciesListOptionalParams
  ): Promise<BackupPoliciesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec
    );
  }

  /**
   * Get a particular backup Policy
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: BackupPoliciesGetOptionalParams
  ): Promise<BackupPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, backupPolicyName, options },
      getOperationSpec
    );
  }

  /**
   * Create a backup policy for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param body Backup policy object supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginCreate(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicy,
    options?: BackupPoliciesCreateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<BackupPoliciesCreateResponse>,
      BackupPoliciesCreateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<BackupPoliciesCreateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, accountName, backupPolicyName, body, options },
      createOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a backup policy for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param body Backup policy object supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginCreateAndWait(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicy,
    options?: BackupPoliciesCreateOptionalParams
  ): Promise<BackupPoliciesCreateResponse> {
    const poller = await this.beginCreate(
      resourceGroupName,
      accountName,
      backupPolicyName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Patch a backup policy for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param body Backup policy object supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicyPatch,
    options?: BackupPoliciesUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<BackupPoliciesUpdateResponse>,
      BackupPoliciesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<BackupPoliciesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, accountName, backupPolicyName, body, options },
      updateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Patch a backup policy for Netapp Account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param body Backup policy object supplied in the body of the operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    body: BackupPolicyPatch,
    options?: BackupPoliciesUpdateOptionalParams
  ): Promise<BackupPoliciesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      accountName,
      backupPolicyName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete backup policy
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: BackupPoliciesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, accountName, backupPolicyName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete backup policy
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param backupPolicyName Backup policy Name which uniquely identify backup policy.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    backupPolicyName: string,
    options?: BackupPoliciesDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      accountName,
      backupPolicyName,
      options
    );
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPoliciesList
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicy
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.backupPolicyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicy
    },
    201: {
      bodyMapper: Mappers.BackupPolicy
    },
    202: {
      bodyMapper: Mappers.BackupPolicy
    },
    204: {
      bodyMapper: Mappers.BackupPolicy
    },
    default: {}
  },
  requestBody: Parameters.body22,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.backupPolicyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicy
    },
    201: {
      bodyMapper: Mappers.BackupPolicy
    },
    202: {
      bodyMapper: Mappers.BackupPolicy
    },
    204: {
      bodyMapper: Mappers.BackupPolicy
    },
    default: {}
  },
  requestBody: Parameters.body23,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.backupPolicyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.backupPolicyName
  ],
  serializer
};
