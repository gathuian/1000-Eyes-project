/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { System } from '../types';

interface SystemGridProps {
  systems: System[];
}

export function SystemGrid({ systems }: SystemGridProps) {
  const [typeFilter, setTypeFilter] = React.useState<string>('ALL');

  const types = ['ALL', ...Array.from(new Set(systems.map(s => s.type)))];

  const filteredSystems = systems.filter(s => typeFilter === 'ALL' || s.type === typeFilter);

  return (
    <div className="bg-[#111116] border border-slate-800 flex flex-col h-full">
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-[#15151c]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">System Status Matrix</span>
          </div>
          
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#0d0d12] border border-slate-700 text-[9px] text-slate-400 px-2 py-0.5 focus:outline-none focus:border-emerald-500 uppercase tracking-tighter rounded cursor-pointer transition-colors hover:border-slate-500"
          >
            {types.map(t => (
              <option key={t} value={t} className="bg-[#111116] text-slate-300">
                {t.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <span className="text-[9px] font-mono text-emerald-500">LIVE_PULSE.STREAM</span>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="text-slate-500 italic border-b border-slate-800 bg-[#0d0d12]">
              <th className="p-4 font-normal uppercase text-[9px] tracking-widest">Identifier</th>
              <th className="p-4 font-normal uppercase text-[9px] tracking-widest text-center">Status</th>
              <th className="p-4 font-normal uppercase text-[9px] tracking-widest">IoT Telemetry</th>
              <th className="p-4 font-normal uppercase text-[9px] tracking-widest">AI Prediction</th>
              <th className="p-4 font-normal uppercase text-[9px] tracking-widest text-right">Synchronization</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredSystems.map((system) => (
                <motion.tr 
                   key={system.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   layout
                   className="border-b border-slate-800/40 hover:bg-slate-800/10 transition-colors group relative overflow-hidden"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-bold tracking-tighter group-hover:text-emerald-400 transition-colors">{system.id.toUpperCase().replace('-', '_')}</span>
                      <span className="text-[9px] text-slate-600 font-sans italic opacity-80">{system.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <motion.div layout className="flex items-center justify-center">
                      <StatusBadge status={system.status} />
                    </motion.div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-500 w-8">TEMP:</span>
                        <span className={`text-[10px] font-bold ${system.temp > 75 ? 'text-rose-500' : 'text-slate-300'}`}>{system.temp}°C</span>
                        <div className="flex-1 h-1 bg-slate-900 rounded-full overflow-hidden max-w-[40px]">
                           <motion.div 
                             className={`h-full ${system.temp > 75 ? 'bg-rose-500' : 'bg-slate-600'}`}
                             animate={{ width: `${Math.min(100, (system.temp / 110) * 100)}%` }}
                           />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-500 w-8">PRES:</span>
                        <span className={`text-[10px] font-bold ${system.pressure > 100 ? 'text-rose-500' : 'text-slate-300'}`}>{system.pressure} PSI</span>
                        <div className="flex-1 h-1 bg-slate-900 rounded-full overflow-hidden max-w-[40px]">
                           <motion.div 
                             className={`h-full ${system.pressure > 100 ? 'bg-rose-500' : 'bg-slate-600'}`}
                             animate={{ width: `${Math.min(100, (system.pressure / 150) * 100)}%` }}
                           />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col max-w-[180px]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1 h-1 rounded-full ${
                          system.riskLevel === 'high' ? 'bg-rose-500 animate-pulse' : 
                          system.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Risk: {system.riskLevel}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 leading-tight italic truncate">
                        {system.prediction}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-slate-600 uppercase text-[10px]">
                    <motion.span layout>{new Date(system.lastUpdated).toLocaleTimeString([], { hour12: false })}</motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: System['status'] }) {
  const cfg = {
    active: { label: 'ONLINE', color: 'text-emerald-500', pulse: 'bg-emerald-500' },
    warning: { label: 'WARN', color: 'text-amber-500', pulse: 'bg-amber-500' },
    error: { label: 'OFLINE', color: 'text-rose-500', pulse: 'bg-rose-500' },
  }[status];

  return (
    <div className={`flex items-center gap-1.5 font-bold ${cfg.color} text-[9px] tracking-widest`}>
      <div className={`w-1 h-1 rounded-full ${cfg.pulse} ${status !== 'active' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </div>
  );
}
