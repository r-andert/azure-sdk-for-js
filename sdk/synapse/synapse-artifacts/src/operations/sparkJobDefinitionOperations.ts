/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { tracingClient } from "../tracing";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { SparkJobDefinitionOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  SparkJobDefinitionResource,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams,
  SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  ArtifactRenameRequest,
  SparkJobDefinitionRenameSparkJobDefinitionOptionalParams,
  SparkJobDefinitionDebugSparkJobDefinitionOptionalParams,
  SparkJobDefinitionDebugSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SparkJobDefinitionOperations operations. */
export class SparkJobDefinitionOperationsImpl
  implements SparkJobDefinitionOperations {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class SparkJobDefinitionOperations class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  public listSparkJobDefinitionsByWorkspace(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): PagedAsyncIterableIterator<SparkJobDefinitionResource> {
    const iter = this.getSparkJobDefinitionsByWorkspacePagingAll(options);
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
        return this.getSparkJobDefinitionsByWorkspacePagingPage(
          options,
          settings
        );
      }
    };
  }

  private async *getSparkJobDefinitionsByWorkspacePagingPage(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SparkJobDefinitionResource[]> {
    let result: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._getSparkJobDefinitionsByWorkspace(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._getSparkJobDefinitionsByWorkspaceNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *getSparkJobDefinitionsByWorkspacePagingAll(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): AsyncIterableIterator<SparkJobDefinitionResource> {
    for await (const page of this.getSparkJobDefinitionsByWorkspacePagingPage(
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  private async _getSparkJobDefinitionsByWorkspace(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient._getSparkJobDefinitionsByWorkspace",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { options },
          getSparkJobDefinitionsByWorkspaceOperationSpec
        ) as Promise<
          SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse
        >;
      }
    );
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateSparkJobDefinition(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options?: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse
      >,
      SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginCreateOrUpdateSparkJobDefinition",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<
            SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse
          >;
        }
      );
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
      { sparkJobDefinitionName, sparkJobDefinition, options },
      createOrUpdateSparkJobDefinitionOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options?: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> {
    const poller = await this.beginCreateOrUpdateSparkJobDefinition(
      sparkJobDefinitionName,
      sparkJobDefinition,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async getSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionGetSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient.getSparkJobDefinition",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { sparkJobDefinitionName, options },
          getSparkJobDefinitionOperationSpec
        ) as Promise<SparkJobDefinitionGetSparkJobDefinitionResponse>;
      }
    );
  }

  /**
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginDeleteSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginDeleteSparkJobDefinition",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<void>;
        }
      );
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
      { sparkJobDefinitionName, options },
      deleteSparkJobDefinitionOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginDeleteSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams
  ): Promise<void> {
    const poller = await this.beginDeleteSparkJobDefinition(
      sparkJobDefinitionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginExecuteSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<SparkJobDefinitionExecuteSparkJobDefinitionResponse>,
      SparkJobDefinitionExecuteSparkJobDefinitionResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginExecuteSparkJobDefinition",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<
            SparkJobDefinitionExecuteSparkJobDefinitionResponse
          >;
        }
      );
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
      { sparkJobDefinitionName, options },
      executeSparkJobDefinitionOperationSpec
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
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginExecuteSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse> {
    const poller = await this.beginExecuteSparkJobDefinition(
      sparkJobDefinitionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Renames a sparkJobDefinition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async beginRenameSparkJobDefinition(
    sparkJobDefinitionName: string,
    request: ArtifactRenameRequest,
    options?: SparkJobDefinitionRenameSparkJobDefinitionOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginRenameSparkJobDefinition",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<void>;
        }
      );
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
      { sparkJobDefinitionName, request, options },
      renameSparkJobDefinitionOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Renames a sparkJobDefinition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async beginRenameSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    request: ArtifactRenameRequest,
    options?: SparkJobDefinitionRenameSparkJobDefinitionOptionalParams
  ): Promise<void> {
    const poller = await this.beginRenameSparkJobDefinition(
      sparkJobDefinitionName,
      request,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginDebugSparkJobDefinition(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: SparkJobDefinitionDebugSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<SparkJobDefinitionDebugSparkJobDefinitionResponse>,
      SparkJobDefinitionDebugSparkJobDefinitionResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginDebugSparkJobDefinition",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<
            SparkJobDefinitionDebugSparkJobDefinitionResponse
          >;
        }
      );
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
      { sparkJobDefinitionAzureResource, options },
      debugSparkJobDefinitionOperationSpec
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
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginDebugSparkJobDefinitionAndWait(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: SparkJobDefinitionDebugSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse> {
    const poller = await this.beginDebugSparkJobDefinition(
      sparkJobDefinitionAzureResource,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * GetSparkJobDefinitionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 GetSparkJobDefinitionsByWorkspace method.
   * @param options The options parameters.
   */
  private async _getSparkJobDefinitionsByWorkspaceNext(
    nextLink: string,
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient._getSparkJobDefinitionsByWorkspaceNext",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { nextLink, options },
          getSparkJobDefinitionsByWorkspaceNextOperationSpec
        ) as Promise<
          SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
        >;
      }
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getSparkJobDefinitionsByWorkspaceOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    201: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    202: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    204: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sparkJobDefinition,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const executeSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/execute",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const renameSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const debugSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/debugSparkJobDefinition",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sparkJobDefinitionAzureResource,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionsByWorkspaceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
