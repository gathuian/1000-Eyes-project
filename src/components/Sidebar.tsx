/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Bell, Terminal, ShieldAlert, Cpu, BrainCircuit, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'OVERVIEW' },
    { id: 'systems', icon: Cpu, label: 'SYSTEM NODES' },
    { id: 'alerts', icon: Bell, label: 'INCIDENT LOGS' },
    { id: 'logs', icon: Terminal, label: 'METRIC ANALYTICS' },
    { id: 'neural', icon: BrainCircuit, label: 'NEURAL LAB' },
    { id: 'guide', icon: BookOpen, label: 'DEPLOYMENT GUIDE' },
    { id: 'admin', icon: ShieldAlert, label: 'ADMIN CONTROL' },
  ];

  return (
    <aside className="w-[220px] bg-[#0d0d12] border-r border-slate-800 flex flex-col h-screen shrink-0 font-sans">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <h1 className="text-sm font-bold tracking-widest text-white uppercase italic">1000 Eyes</h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter font-mono">Monitoring v2.4_SECURE</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full px-3 py-2 text-[11px] font-bold tracking-wider transition-all flex justify-between items-center group ${
              activeTab === item.id
                ? 'bg-slate-800/50 text-white rounded border border-slate-700'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>{item.label}</span>
            {activeTab === item.id && <div className="w-1.5 h-1.5 bg-emerald-400"></div>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-[#0a0a0d]">
        <div className="p-3 bg-[#111116] rounded border border-slate-800">
          <div className="text-[9px] text-slate-600 uppercase tracking-widest mb-3 font-bold">Authenticated_Node</div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="text-emerald-500 font-bold text-[10px]">11</span>
             </div>
             <div className="flex flex-col truncate">
               <span className="text-[10px] font-bold text-slate-300 uppercase">Operator_Main</span>
               <span className="text-[8px] text-slate-600 font-mono">ID: 0x442A_01</span>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
