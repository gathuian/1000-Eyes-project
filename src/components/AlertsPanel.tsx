/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { Alert, PredictionHistory } from '../types';
import { History, Bell, ExternalLink } from 'lucide-react';

interface AlertsPanelProps {
  alerts: Alert[];
  predictionHistory?: PredictionHistory[];
  onClear?: () => void;
}

export function AlertsPanel({ alerts, predictionHistory = [], onClear }: AlertsPanelProps) {
  const [activeTab, setActiveTab] = useState<'incidents' | 'history'>('incidents');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(a => severityFilter === 'all' || a.severity === severityFilter);

  // Prioritize critical alerts at the top
  const prioritizedAlerts = [...filteredAlerts].sort((a, b) => {
    if (a.severity === 'critical' && b.severity !== 'critical') return -1;
    if (a.severity !== 'critical' && b.severity === 'critical') return 1;
    return 0;
  });

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
          <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">Observer Mesh</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-[#0d0d12] rounded p-0.5 border border-slate-800">
             <button 
               onClick={() => setActiveTab('incidents')}
               className={`p-1 rounded ${activeTab === 'incidents' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-400'}`}
             >
               <Bell className="w-3 h-3" />
             </button>
             <button 
               onClick={() => setActiveTab('history')}
               className={`p-1 rounded ${activeTab === 'history' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-400'}`}
             >
               <History className="w-3 h-3" />
             </button>
           </div>
           <button 
             onClick={onClear}
             className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-tighter"
           >
             [ Flush ]
           </button>
        </div>
      </div>

      {activeTab === 'incidents' ? (
        <>
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
              {prioritizedAlerts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key="empty"
                  className="flex flex-col items-center justify-center py-20 text-slate-600 italic"
                >
                  <span className="text-[10px] uppercase font-mono tracking-tighter">{severityFilter === 'all' ? 'Status_Clear: Standing_By' : `No ${severityFilter} incidents`}</span>
                </motion.div>
              ) : (
                prioritizedAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
                    className={`p-3 border-l-2 cursor-pointer transition-all ${
                      alert.severity === 'critical' 
                        ? 'border-rose-500 bg-rose-500/10 shadow-[inner_0_0_10px_rgba(244,63,94,0.1)]' 
                        : alert.severity === 'warning'
                        ? 'border-amber-500 bg-amber-500/5'
                        : 'border-slate-700 bg-slate-800/5'
                    } ${expandedId === alert.id ? 'ring-1 ring-slate-700' : 'hover:bg-slate-800/20'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1.5">
                        {alert.severity === 'critical' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
                        <span className={`text-[10px] font-mono font-bold ${
                          alert.severity === 'critical' ? 'text-rose-500' : alert.severity === 'warning' ? 'text-amber-500' : 'text-slate-500'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-600 font-mono italic">{alert.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      <span className="font-bold text-slate-500 mr-1">[{alert.systemName}]</span>
                      {alert.description}
                    </p>
                    
                    <AnimatePresence>
                      {expandedId === alert.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 pt-3 border-t border-slate-800/50 overflow-hidden"
                        >
                          <div className="space-y-1 text-[9px] font-mono text-slate-500 uppercase">
                            <div className="flex justify-between">
                              <span>Trace_ID:</span>
                              <span className="text-slate-400">{alert.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Origin:</span>
                              <span className="text-slate-400">Mesh_Node_IO</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Priority:</span>
                              <span className={alert.severity === 'critical' ? 'text-rose-500' : 'text-slate-400'}>
                                {alert.severity === 'critical' ? 'P0_IMMEDIATE' : 'P1_ROUTINE'}
                              </span>
                            </div>
                          </div>
                          <button className="w-full mt-3 py-1 bg-slate-800 text-[8px] font-bold text-slate-300 rounded border border-slate-700 hover:bg-slate-700 flex items-center justify-center gap-1">
                            <ExternalLink className="w-2 h-2" />
                            VIEW_DETAILED_LOG
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <History className="w-3 h-3" />
            AI Prediction Archive
          </div>
          {predictionHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600 italic">
               <span className="text-[10px] uppercase font-mono tracking-tighter">No historical data found</span>
            </div>
          ) : (
            predictionHistory.map((history) => (
              <motion.div
                key={history.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#0d0d12] border border-slate-800 rounded relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                  history.riskLevel === 'high' ? 'bg-rose-500' : 
                  history.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {history.systemId.replace('-', '_').toUpperCase()}
                  </span>
                  <span className="text-[8px] text-slate-600 font-mono">{history.timestamp}</span>
                </div>
                <p className="text-[10px] text-slate-500 italic leading-tight mb-2">"{history.prediction}"</p>
                <div className="flex items-center gap-1">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                    history.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-500' : 
                    history.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {history.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded p-3 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Active_Thread_Count</span>
             <span className="text-sm font-mono text-white tracking-widest">{activeTab === 'incidents' ? alerts.length : predictionHistory.length}</span>
           </div>
           <div className="w-10 h-10 flex items-center justify-center border-2 border-emerald-500/40 rounded-full text-[9px] text-emerald-500 font-bold font-mono group hover:scale-110 transition-transform">
             STBL
           </div>
        </div>
      </div>
    </div>
  );
}
