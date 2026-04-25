/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { System, Alert, LogEntry, MetricData, SystemStatus } from '../types';
import { INITIAL_SYSTEMS } from '../constants';

export function useMonitoring() {
  const [systems, setSystems] = useState<System[]>(INITIAL_SYSTEMS);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const metricsRef = useRef<MetricData[]>([]);

  // Initialize metrics
  useEffect(() => {
    const initialMetrics = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}:00`,
      val: Math.floor(Math.random() * 40) + 60
    }));
    setMetrics(initialMetrics);
    metricsRef.current = initialMetrics;
  }, []);

  const addAlert = useCallback((systemName: string, severity: Alert['severity'], desc: string) => {
    const newAlert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      systemName,
      severity,
      description: desc
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 50));
    
    // Also add to logs
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      event: severity === 'critical' ? 'CRITICAL_FAILURE' : 'SYSTEM_WARNING',
      details: `${systemName}: ${desc}`
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100));

    if (severity === 'critical') {
      // Subtle sine wave beep using Web Audio API to avoid external assets
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        console.error('Audio alert failed:', e);
      }
    }
  }, []);

  const updateSystemStatus = useCallback((id: string, status: SystemStatus) => {
    setSystems(prev => prev.map(s => {
      if (s.id === id) {
        if (s.status !== status) {
          const desc = status === 'active' ? 'System restored' : status === 'warning' ? 'Irregular pressure detected' : 'Full system fail-stop triggered';
          addAlert(s.name, status === 'error' ? 'critical' : status === 'warning' ? 'warning' : 'info', desc);
        }
        return { ...s, status, lastUpdated: new Date().toISOString() };
      }
      return s;
    }));
  }, [addAlert]);

  // Simulation Loop
  useEffect(() => {
    const detectAnomaly = (system: System) => {
      let issues: string[] = [];
      if (system.temp > 75) issues.push("High Temperature");
      if (system.pressure > 100) issues.push("High Pressure");
      if (system.temp < 25 && system.id.includes('pump')) issues.push("Temperature Drop Detected");
      if (system.flowRate < 10 && system.status === 'active') issues.push("Unexpected low flow detected");
      return issues;
    };

    const predictFailure = (system: System) => {
      if (system.temp > 80 && system.pressure > 105) {
        return { risk: 'high' as const, note: "Critical over-threshold pairing. Imminent failure risk." };
      }
      if (system.temp > 70 || system.pressure > 95) {
        return { risk: 'medium' as const, note: "Vibration patterns suggest wear. Schedule inspection." };
      }
      return { risk: 'low' as const, note: "Optimal operational parameters." };
    };

    const interval = setInterval(() => {
      setSystems(prev => prev.map(s => {
        // Random fluctuations
        const tempChange = (Math.random() * 4 - 2);
        const pressureChange = (Math.random() * 6 - 3);
        const flowChange = (Math.random() * 8 - 4);
        
        const newTemp = Math.max(20, Math.min(110, s.temp + tempChange));
        const newPressure = Math.max(0, Math.min(150, s.pressure + pressureChange));
        const newFlow = Math.max(0, Math.min(100, s.flowRate + flowChange));

        const updatedSys = {
          ...s,
          temp: Number(newTemp.toFixed(1)),
          pressure: Number(newPressure.toFixed(1)),
          flowRate: Number(newFlow.toFixed(1)),
          lastUpdated: new Date().toISOString()
        };

        // Run AI Detection
        const issues = detectAnomaly(updatedSys);
        const prediction = predictFailure(updatedSys);

        let finalStatus = s.status;
        if (issues.length > 0) {
          finalStatus = issues.some(i => i.toLowerCase().includes('high')) ? 'error' : 'warning';
          // Trigger alert if it's a new or escalated issue
          if (Math.random() > 0.8) { // Don't spam, simulate actual threshold trip
             addAlert(s.name, finalStatus === 'error' ? 'critical' : 'warning', issues.join(", "));
          }
        } else if (s.status !== 'active' && Math.random() > 0.95) {
          // Auto-recovery simulation
          finalStatus = 'active';
        }

        return {
          ...updatedSys,
          status: finalStatus,
          riskLevel: prediction.risk,
          prediction: prediction.note,
          trend: tempChange + pressureChange > 0 ? 'up' : 'down'
        };
      }));

      // Update metrics
      const nextTime = new Date().toLocaleTimeString([], { hour12: false });
      const nextVal = Math.floor(Math.random() * 40) + 60;
      const newMetrics = [...metricsRef.current, { time: nextTime, val: nextVal }].slice(-20);
      metricsRef.current = newMetrics;
      setMetrics(newMetrics);

    }, 3000);

    return () => clearInterval(interval);
  }, [updateSystemStatus, addAlert]);

  return {
    systems,
    alerts,
    logs,
    metrics,
    updateSystemStatus,
    setAlerts,
    setLogs
  };
}
