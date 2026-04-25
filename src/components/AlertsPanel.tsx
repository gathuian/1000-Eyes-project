/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
  onClear?: () => void;
}

export function AlertsPanel({ alerts, onClear }: AlertsPanelProps) {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filteredAlerts = alerts.filter(a => severityFilter === 'all' || a.severity === severityFilter);

  const filters: { id: typeof severityFilter; label: string }[] = [
    { id: 'all', label: 'ALL' },
    { id: 'critical', label: 'CRITICAL' },
    { id: 'warning', label: 'WARN' },
    { id: 'info', label: 'INFO' },
  ];

  return (
    <div className="bg-[#111116] border border-slate-800 flex flex-col h-full font-sans">
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-rose-950/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">Incident Monitor</span>
        </div>
        <button 
          onClick={onClear}
          className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-tighter"
        >
          [ Flush_Logs ]
        </button>
      </div>

      <div className="p-2 border-b border-slate-800 flex gap-1 bg-[#15151c]">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setSeverityFilter(f.id)}
            className={`px-2 py-1 text-[8px] font-bold tracking-tighter rounded transition-all ${
              severityFilter === f.id 
                ? 'bg-slate-800 text-white border border-slate-700' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredAlerts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="empty"
              className="flex flex-col items-center justify-center py-20 text-slate-600 italic"
            >
              <span className="text-[10px] uppercase font-mono tracking-tighter">{severityFilter === 'all' ? 'Status_Clear: Standing_By' : `No ${severityFilter} incidents`}</span>
            </motion.div>
          ) : (
            filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-3 border-l-2 ${
                  alert.severity === 'critical' 
                    ? 'border-rose-500 bg-rose-500/5' 
                    : alert.severity === 'warning'
                    ? 'border-amber-500 bg-amber-500/5'
                    : 'border-slate-700 bg-slate-800/5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono font-bold ${
                    alert.severity === 'critical' ? 'text-rose-500' : alert.severity === 'warning' ? 'text-amber-500' : 'text-slate-500'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-[9px] text-slate-600 font-mono italic">{alert.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  <span className="font-bold text-slate-500 mr-1">[{alert.systemName}]</span>
                  {alert.description}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 border border-slate-800 rounded p-3 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Node_Health_Index</span>
             <span className="text-sm font-mono text-white">98.4%</span>
           </div>
           <div className="w-10 h-10 flex items-center justify-center border-2 border-emerald-500/40 rounded-full text-[9px] text-emerald-500 font-bold font-mono">
             STBL
           </div>
        </div>
      </div>
    </div>
  );
}
