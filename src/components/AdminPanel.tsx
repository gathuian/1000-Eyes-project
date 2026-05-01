/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { System, SystemStatus, MaintenanceTask } from '../types';
import { AlertOctagon, Terminal, Calendar, PlayCircle, CheckCircle2, ShieldCheck, ZapOff, Activity, RefreshCw, Plus, X } from 'lucide-react';

interface AdminPanelProps {
  systems: System[];
  maintenanceTasks: MaintenanceTask[];
  onUpdateStatus: (id: string, status: SystemStatus) => void;
  onCompleteMaintenance: (id: string) => void;
  onTriggerSimulation: (type: 'safe' | 'critical' | 'warning' | 'recovery') => void;
  onAddSystem: (system: Omit<System, 'id' | 'status' | 'lastUpdated' | 'trend' | 'riskLevel' | 'prediction'>) => void;
}

export function AdminPanel({ systems, maintenanceTasks, onUpdateStatus, onCompleteMaintenance, onTriggerSimulation, onAddSystem }: AdminPanelProps) {
  const [newMachine, setNewMachine] = useState({ name: '', type: 'PUMP', location: 'Section A', unit: 'RPM' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMachine.name) return;
    onAddSystem({
      ...newMachine,
      temp: 40,
      pressure: 70,
      value: 65,
    });
    setNewMachine({ name: '', type: 'PUMP', location: 'Section A', unit: 'RPM' });
    setIsAdding(false);
  };
  return (
    <div className="bg-[#111116] border border-slate-800 flex flex-col h-full font-sans overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#15151c] shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Mesh Command Interface</span>
        </div>
        <span className="text-[9px] font-mono text-rose-500 animate-pulse font-bold tracking-tighter">SECURE_LEVEL_3</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Global Simulations Section */}
        <div className="p-6 border-b border-slate-800 bg-[#0d0d12]/50">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <PlayCircle className="w-3 h-3" />
            Global Response Training Simulations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             <button 
               onClick={() => onTriggerSimulation('safe')}
               className="p-3 bg-[#111116] border border-slate-800 rounded hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
             >
                <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-bold text-white uppercase mb-0.5">Safe Mode</div>
                <div className="text-[8px] text-slate-500 lowercase opacity-60">Reset mesh parameters</div>
             </button>
             <button 
               onClick={() => onTriggerSimulation('warning')}
               className="p-3 bg-[#111116] border border-slate-800 rounded hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
             >
                <Activity className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-bold text-white uppercase mb-0.5">Drift test</div>
                <div className="text-[8px] text-slate-500 lowercase opacity-60">Generate minor anomalies</div>
             </button>
             <button 
               onClick={() => onTriggerSimulation('critical')}
               className="p-3 bg-[#111116] border border-slate-800 rounded hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group"
             >
                <ZapOff className="w-5 h-5 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-bold text-white uppercase mb-0.5">Grid Surge</div>
                <div className="text-[8px] text-slate-500 lowercase opacity-60">Simulate mass failure</div>
             </button>
             <button 
               onClick={() => onTriggerSimulation('recovery')}
               className="p-3 bg-[#111116] border border-slate-800 rounded hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
             >
                <RefreshCw className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-bold text-white uppercase mb-0.5">Auto_Reboot</div>
                <div className="text-[8px] text-slate-500 lowercase opacity-60">Mesh sync routine</div>
             </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Control List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Node_Bypass_Control</h3>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors"
              >
                {isAdding ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                {isAdding ? 'CANCEL' : 'REGISTER_NEW_NODE'}
              </button>
            </div>

            {isAdding && (
              <form onSubmit={handleSubmit} className="mb-6 p-4 bg-[#15151c] border border-emerald-500/20 rounded space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Node Name</label>
                    <input 
                      type="text" 
                      value={newMachine.name}
                      onChange={(e) => setNewMachine({...newMachine, name: e.target.value})}
                      placeholder="e.g. Pump Gamma"
                      className="bg-[#0d0d12] border border-slate-800 p-2 text-xs text-white rounded focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Category</label>
                    <select 
                      value={newMachine.type}
                      onChange={(e) => setNewMachine({...newMachine, type: e.target.value})}
                      className="bg-[#0d0d12] border border-slate-800 p-2 text-xs text-white rounded focus:border-emerald-500/50 outline-none"
                    >
                      <option value="PUMP">WATER_PUMP</option>
                      <option value="GENERATOR">POWER_GENERATOR</option>
                      <option value="VALVE">PRESSURE_VALVE</option>
                      <option value="BOILER">HEAT_EXCHANGER</option>
                      <option value="TURBINE">TURBINE_UNIT</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Sector</label>
                    <input 
                      type="text" 
                      value={newMachine.location}
                      onChange={(e) => setNewMachine({...newMachine, location: e.target.value})}
                      placeholder="e.g. Wing B"
                      className="bg-[#0d0d12] border border-slate-800 p-2 text-xs text-white rounded focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Primary Unit</label>
                    <input 
                      type="text" 
                      value={newMachine.unit}
                      onChange={(e) => setNewMachine({...newMachine, unit: e.target.value})}
                      placeholder="e.g. PSI"
                      className="bg-[#0d0d12] border border-slate-800 p-2 text-xs text-white rounded focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-2 bg-emerald-500 text-slate-900 font-bold text-[10px] uppercase tracking-widest rounded hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Confirm Registration
                </button>
              </form>
            )}

            <div className="space-y-3">
              {systems.map((system) => (
                <div key={system.id} className="bg-[#0d0d12] border border-slate-800/60 p-3 flex flex-col gap-3 group hover:border-slate-700 transition-all rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">UID: {system.id.toUpperCase()}</span>
                      <h4 className="text-xs font-bold text-slate-200 tracking-tight">{system.name}</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
                      <div className={`w-1 h-1 rounded-full ${
                        system.status === 'active' ? 'bg-emerald-500' : system.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <span className="text-[8px] text-slate-500 uppercase font-mono">{system.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => onUpdateStatus(system.id, 'active')}
                      className={`flex-1 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                        system.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40' 
                          : 'bg-transparent text-slate-600 border-slate-800 hover:text-emerald-500'
                      }`}
                    >
                      STBL
                    </button>
                    <button
                      onClick={() => onUpdateStatus(system.id, 'warning')}
                      className={`flex-1 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                        system.status === 'warning' 
                          ? 'bg-amber-500/20 text-amber-500 border-amber-500/40' 
                          : 'bg-transparent text-slate-600 border-slate-800 hover:text-amber-500'
                      }`}
                    >
                      ANML
                    </button>
                    <button
                      onClick={() => onUpdateStatus(system.id, 'error')}
                      className={`flex-1 py-1.5 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                        system.status === 'error' 
                          ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' 
                          : 'bg-transparent text-slate-600 border-slate-800 hover:text-rose-500'
                      }`}
                    >
                      CRIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Schedule Section */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Maintenance Schedule
            </h3>
            <div className="space-y-3">
              {maintenanceTasks.map((task) => (
                <div key={task.id} className={`bg-[#0d0d12] border p-3 rounded group transition-all ${
                  task.status === 'completed' ? 'border-slate-800/20 opacity-60' : 'border-slate-800 hover:border-slate-700'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter mb-1">{task.date} // {task.systemName}</span>
                      <h5 className={`text-xs font-bold leading-tight ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                        {task.task}
                      </h5>
                    </div>
                    {task.status !== 'completed' && (
                      <button 
                        onClick={() => onCompleteMaintenance(task.id)}
                        className="p-1 hover:text-emerald-500 text-slate-600 transition-colors"
                        title="Mark Completed"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-slate-800 rounded text-[9px] font-bold text-slate-600 hover:border-slate-600 hover:text-slate-400 transition-all uppercase tracking-widest mt-4">
                + Add Maintenance Window
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-rose-950/10 border-t border-slate-800 flex items-start gap-3 shrink-0">
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
