/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SystemStatus = 'active' | 'warning' | 'error';

export interface System {
  id: string;
  name: string;
  type: string;
  status: SystemStatus;
  lastUpdated: string;
  value: number; // General efficiency/main metric
  unit: string;
  trend: 'up' | 'down' | 'stable';
  // IoT Metrics
  temp: number;
  pressure: number;
  flowRate: number;
  prediction?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface Alert {
  id: string;
  timestamp: string;
  systemName: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
}

export interface MaintenanceTask {
  id: string;
  systemId: string;
  systemName: string;
  date: string;
  task: string;
  status: 'pending' | 'completed';
}

export interface PredictionHistory {
  id: string;
  systemId: string;
  timestamp: string;
  prediction: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  details: string;
}

export interface MetricData {
  time: string;
  val: number;
}
