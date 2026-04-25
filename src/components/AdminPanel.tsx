/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertOctagon, Terminal } from 'lucide-react';
import { System, SystemStatus } from '../types';

interface AdminPanelProps {
  systems: System[];
  onUpdateStatus: (id: string, status: SystemStatus) => void;
}

export function AdminPanel({ systems, onUpdateStatus }: AdminPanelProps) {
  return (
    <div className="bg-[#111116] border border-slate-800 flex flex-col h-full font-sans">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#15151c]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Simulation Control Interface</span>
        </div>
        <span className="text-[9px] font-mono text-rose-500 animate-pulse font-bold tracking-tighter">SECURE_LEVEL_3</span>
      </div>

      <div className="p-6 grid grid-cols-1 gap-4">
        {systems.map((system) => (
          <div key={system.id} className="bg-[#0d0d12] border border-slate-800/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-700 transition-all">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter mb-0.5">UID: {system.id.toUpperCase()}</span>
              <h4 className="text-sm font-bold text-slate-200 tracking-tight">{system.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1 h-1 rounded-full ${
                  system.status === 'active' ? 'bg-emerald-500' : system.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
                <span className="text-[8px] text-slate-500 uppercase font-mono tracking-widest">{system.status}</span>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => onUpdateStatus(system.id, 'active')}
                className={`px-3 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                  system.status === 'active' 
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-transparent text-slate-500 border-slate-800 hover:text-emerald-500 hover:border-emerald-500/40'
                }`}
              >
                Stable
              </button>
              
              <button
                onClick={() => onUpdateStatus(system.id, 'warning')}
                className={`px-3 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                  system.status === 'warning' 
                    ? 'bg-amber-500 text-white border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                    : 'bg-transparent text-slate-500 border-slate-800 hover:text-amber-500 hover:border-amber-500/40'
                }`}
              >
                Anomalous
              </button>
 
              <button
                onClick={() => onUpdateStatus(system.id, 'error')}
                className={`px-3 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                  system.status === 'error' 
                    ? 'bg-rose-500 text-white border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                    : 'bg-transparent text-slate-500 border-slate-800 hover:text-rose-500 hover:border-rose-500/40'
                }`}
              >
                Critical_Spike
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 bg-rose-950/10 border-t border-slate-800 flex items-start gap-3">
        <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Protocol Warning</h5>
          <p className="text-[9px] text-slate-500 leading-normal mt-1 max-w-sm italic">
            Override actions are permanent in the local node cluster until manual reset by site management. Use with caution.
          </p>
        </div>
      </div>
    </div>
  );
}
