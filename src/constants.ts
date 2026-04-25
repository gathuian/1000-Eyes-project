/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { System } from './types';

export const INITIAL_SYSTEMS: System[] = [
  {
    id: 'pump-a',
    name: 'Water Pump A',
    type: 'Pumping Station',
    status: 'active',
    lastUpdated: new Date().toISOString(),
    value: 85,
    unit: 'L/min',
    trend: 'stable',
    temp: 40,
    pressure: 70,
    flowRate: 85,
    riskLevel: 'low',
    prediction: 'System operating normally.'
  },
  {
    id: 'gen-b',
    name: 'Generator B',
    type: 'Auxiliary Power',
    status: 'warning',
    lastUpdated: new Date().toISOString(),
    value: 72,
    unit: '% Load',
    trend: 'up',
    temp: 55,
    pressure: 80,
    flowRate: 0,
    riskLevel: 'medium',
    prediction: 'High friction detected, maintenance window approaching.'
  },
  {
    id: 'pipe-c',
    name: 'Pipeline C',
    type: 'Main Trunk',
    status: 'active',
    lastUpdated: new Date().toISOString(),
    value: 4.2,
    unit: 'Bar',
    trend: 'down',
    temp: 30,
    pressure: 60,
    flowRate: 92,
    riskLevel: 'low',
    prediction: 'Optimized flow state.'
  },
  {
    id: 'cooling-d',
    name: 'Cooling Tower D',
    type: 'HVAC',
    status: 'active',
    lastUpdated: new Date().toISOString(),
    value: 12.5,
    unit: '°C',
    trend: 'stable',
    temp: 22,
    pressure: 45,
    flowRate: 75,
    riskLevel: 'low',
    prediction: 'Peak efficiency.'
  },
  {
    id: 'boiler-e',
    name: 'Boiler E',
    type: 'Thermal',
    status: 'error',
    lastUpdated: new Date().toISOString(),
    value: 180,
    unit: 'PSI',
    trend: 'up',
    temp: 92,
    pressure: 110,
    flowRate: 40,
    riskLevel: 'high',
    prediction: 'Critical overpressure. Emergency shutdown recommended.'
  }
];
