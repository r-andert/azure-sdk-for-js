/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  CsmOperationDescription,
  DomainRegistrationProviderListOperationsOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DomainRegistrationProvider. */
export interface DomainRegistrationProvider {
  /**
   * Description for Implements Csm operations Api to exposes the list of available Csm Apis under the
   * resource provider
   * @param options The options parameters.
   */
  listOperations(
    options?: DomainRegistrationProviderListOperationsOptionalParams
  ): PagedAsyncIterableIterator<CsmOperationDescription>;
}
