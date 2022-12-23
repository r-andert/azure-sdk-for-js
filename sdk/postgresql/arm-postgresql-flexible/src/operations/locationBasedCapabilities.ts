/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { LocationBasedCapabilities } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { PostgreSQLManagementFlexibleServerClient } from "../postgreSQLManagementFlexibleServerClient";
import {
  CapabilityProperties,
  LocationBasedCapabilitiesExecuteNextOptionalParams,
  LocationBasedCapabilitiesExecuteOptionalParams,
  LocationBasedCapabilitiesExecuteResponse,
  LocationBasedCapabilitiesExecuteNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing LocationBasedCapabilities operations. */
export class LocationBasedCapabilitiesImpl
  implements LocationBasedCapabilities {
  private readonly client: PostgreSQLManagementFlexibleServerClient;

  /**
   * Initialize a new instance of the class LocationBasedCapabilities class.
   * @param client Reference to the service client
   */
  constructor(client: PostgreSQLManagementFlexibleServerClient) {
    this.client = client;
  }

  /**
   * Get capabilities at specified location in a given subscription.
   * @param locationName The name of the location.
   * @param options The options parameters.
   */
  public listExecute(
    locationName: string,
    options?: LocationBasedCapabilitiesExecuteOptionalParams
  ): PagedAsyncIterableIterator<CapabilityProperties> {
    const iter = this.executePagingAll(locationName, options);
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
        return this.executePagingPage(locationName, options, settings);
      }
    };
  }

  private async *executePagingPage(
    locationName: string,
    options?: LocationBasedCapabilitiesExecuteOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<CapabilityProperties[]> {
    let result: LocationBasedCapabilitiesExecuteResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._execute(locationName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._executeNext(
        locationName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *executePagingAll(
    locationName: string,
    options?: LocationBasedCapabilitiesExecuteOptionalParams
  ): AsyncIterableIterator<CapabilityProperties> {
    for await (const page of this.executePagingPage(locationName, options)) {
      yield* page;
    }
  }

  /**
   * Get capabilities at specified location in a given subscription.
   * @param locationName The name of the location.
   * @param options The options parameters.
   */
  private _execute(
    locationName: string,
    options?: LocationBasedCapabilitiesExecuteOptionalParams
  ): Promise<LocationBasedCapabilitiesExecuteResponse> {
    return this.client.sendOperationRequest(
      { locationName, options },
      executeOperationSpec
    );
  }

  /**
   * ExecuteNext
   * @param locationName The name of the location.
   * @param nextLink The nextLink from the previous successful call to the Execute method.
   * @param options The options parameters.
   */
  private _executeNext(
    locationName: string,
    nextLink: string,
    options?: LocationBasedCapabilitiesExecuteNextOptionalParams
  ): Promise<LocationBasedCapabilitiesExecuteNextResponse> {
    return this.client.sendOperationRequest(
      { locationName, nextLink, options },
      executeNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const executeOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/capabilities",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CapabilitiesListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const executeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CapabilitiesListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
