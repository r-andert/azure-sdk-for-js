/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  AutoscaleSettingsImpl,
  PredictiveMetricImpl,
  OperationsImpl,
  AlertRuleIncidentsImpl,
  AlertRulesImpl,
  LogProfilesImpl,
  DiagnosticSettingsImpl,
  DiagnosticSettingsCategoryImpl,
  ActionGroupsImpl,
  ActivityLogsImpl,
  EventCategoriesImpl,
  TenantActivityLogsImpl,
  MetricDefinitionsImpl,
  MetricsImpl,
  BaselinesImpl,
  MetricAlertsImpl,
  MetricAlertsStatusImpl,
  ScheduledQueryRulesImpl,
  MetricNamespacesImpl,
  VMInsightsImpl,
  PrivateLinkScopesImpl,
  PrivateLinkScopeOperationStatusImpl,
  PrivateLinkResourcesImpl,
  PrivateEndpointConnectionsImpl,
  PrivateLinkScopedResourcesImpl,
  ActivityLogAlertsImpl,
  DataCollectionEndpointsImpl,
  DataCollectionRuleAssociationsImpl,
  DataCollectionRulesImpl
} from "./operations";
import {
  AutoscaleSettings,
  PredictiveMetric,
  Operations,
  AlertRuleIncidents,
  AlertRules,
  LogProfiles,
  DiagnosticSettings,
  DiagnosticSettingsCategory,
  ActionGroups,
  ActivityLogs,
  EventCategories,
  TenantActivityLogs,
  MetricDefinitions,
  Metrics,
  Baselines,
  MetricAlerts,
  MetricAlertsStatus,
  ScheduledQueryRules,
  MetricNamespaces,
  VMInsights,
  PrivateLinkScopes,
  PrivateLinkScopeOperationStatus,
  PrivateLinkResources,
  PrivateEndpointConnections,
  PrivateLinkScopedResources,
  ActivityLogAlerts,
  DataCollectionEndpoints,
  DataCollectionRuleAssociations,
  DataCollectionRules
} from "./operationsInterfaces";
import { MonitorClientOptionalParams } from "./models";

export class MonitorClient extends coreClient.ServiceClient {
  $host: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the MonitorClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: MonitorClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: MonitorClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials
    };

    const packageDetails = `azsdk-js-arm-monitor/8.0.0-beta.4`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com"
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge
          }
        })
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.autoscaleSettings = new AutoscaleSettingsImpl(this);
    this.predictiveMetric = new PredictiveMetricImpl(this);
    this.operations = new OperationsImpl(this);
    this.alertRuleIncidents = new AlertRuleIncidentsImpl(this);
    this.alertRules = new AlertRulesImpl(this);
    this.logProfiles = new LogProfilesImpl(this);
    this.diagnosticSettings = new DiagnosticSettingsImpl(this);
    this.diagnosticSettingsCategory = new DiagnosticSettingsCategoryImpl(this);
    this.actionGroups = new ActionGroupsImpl(this);
    this.activityLogs = new ActivityLogsImpl(this);
    this.eventCategories = new EventCategoriesImpl(this);
    this.tenantActivityLogs = new TenantActivityLogsImpl(this);
    this.metricDefinitions = new MetricDefinitionsImpl(this);
    this.metrics = new MetricsImpl(this);
    this.baselines = new BaselinesImpl(this);
    this.metricAlerts = new MetricAlertsImpl(this);
    this.metricAlertsStatus = new MetricAlertsStatusImpl(this);
    this.scheduledQueryRules = new ScheduledQueryRulesImpl(this);
    this.metricNamespaces = new MetricNamespacesImpl(this);
    this.vMInsights = new VMInsightsImpl(this);
    this.privateLinkScopes = new PrivateLinkScopesImpl(this);
    this.privateLinkScopeOperationStatus = new PrivateLinkScopeOperationStatusImpl(
      this
    );
    this.privateLinkResources = new PrivateLinkResourcesImpl(this);
    this.privateEndpointConnections = new PrivateEndpointConnectionsImpl(this);
    this.privateLinkScopedResources = new PrivateLinkScopedResourcesImpl(this);
    this.activityLogAlerts = new ActivityLogAlertsImpl(this);
    this.dataCollectionEndpoints = new DataCollectionEndpointsImpl(this);
    this.dataCollectionRuleAssociations = new DataCollectionRuleAssociationsImpl(
      this
    );
    this.dataCollectionRules = new DataCollectionRulesImpl(this);
  }

  autoscaleSettings: AutoscaleSettings;
  predictiveMetric: PredictiveMetric;
  operations: Operations;
  alertRuleIncidents: AlertRuleIncidents;
  alertRules: AlertRules;
  logProfiles: LogProfiles;
  diagnosticSettings: DiagnosticSettings;
  diagnosticSettingsCategory: DiagnosticSettingsCategory;
  actionGroups: ActionGroups;
  activityLogs: ActivityLogs;
  eventCategories: EventCategories;
  tenantActivityLogs: TenantActivityLogs;
  metricDefinitions: MetricDefinitions;
  metrics: Metrics;
  baselines: Baselines;
  metricAlerts: MetricAlerts;
  metricAlertsStatus: MetricAlertsStatus;
  scheduledQueryRules: ScheduledQueryRules;
  metricNamespaces: MetricNamespaces;
  vMInsights: VMInsights;
  privateLinkScopes: PrivateLinkScopes;
  privateLinkScopeOperationStatus: PrivateLinkScopeOperationStatus;
  privateLinkResources: PrivateLinkResources;
  privateEndpointConnections: PrivateEndpointConnections;
  privateLinkScopedResources: PrivateLinkScopedResources;
  activityLogAlerts: ActivityLogAlerts;
  dataCollectionEndpoints: DataCollectionEndpoints;
  dataCollectionRuleAssociations: DataCollectionRuleAssociations;
  dataCollectionRules: DataCollectionRules;
}
