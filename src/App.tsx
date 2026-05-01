/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsOverview } from './components/StatsOverview';
import { SystemGrid } from './components/SystemGrid';
import { MetricsPanel } from './components/MetricsPanel';
import { AlertsPanel } from './components/AlertsPanel';
import { ActivityLogs } from './components/ActivityLogs';
import { AdminPanel } from './components/AdminPanel';
import { NeuralLab } from './components/NeuralLab';
import { DeploymentGuide } from './components/DeploymentGuide';
import { LandingPage } from './components/LandingPage';
import { useMonitoring } from './hooks/useMonitoring';
import { motion, AnimatePresence } from 'motion/react';
import { Search, AlertOctagon } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const { 
    systems, 
    alerts, 
    logs, 
    metrics, 
    maintenanceTasks,
    predictionHistory,
    completeMaintenanceTask,
    triggerSimulation,
    addSystem,
    updateSystemStatus, 
    setAlerts, 
    setLogs 
  } = useMonitoring();

  const filteredSystems = systems.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!showDashboard) {
    return <LandingPage onStart={() => setShowDashboard(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0d] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Technical Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0d0d12] z-10 shrink-0">
          <div className="flex items-center gap-6">
            <h2 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              {activeTab} Monitor Access
            </h2>
            <div className="px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2">
              <div className="w-1 h-1 bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest whitespace-nowrap">Kernel_Status: STABLE // Link: ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
              <input 
                type="text" 
                placeholder="Search Systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111116] border border-slate-800 rounded px-8 py-1.5 text-[10px] focus:outline-none focus:border-slate-600 w-48 transition-all font-mono"
              />
            </div>
            
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/30 text-rose-500 border border-rose-500/30 font-bold text-[9px] hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest active:scale-95" onClick={() => triggerSimulation('critical')}>
              <AlertOctagon className="w-3 h-3" />
              <span>Force Error</span>
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <StatsOverview systems={systems} />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    <MetricsPanel data={metrics} />
                  </div>
                  <div className="lg:col-span-1">
                    <AlertsPanel 
                      alerts={alerts} 
                      predictionHistory={predictionHistory}
                      onClear={() => setAlerts([])} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2">
                      <SystemGrid systems={filteredSystems} />
                   </div>
                   <div className="lg:col-span-1">
                      <ActivityLogs logs={logs} />
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'systems' && (
              <motion.div
                key="systems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <SystemGrid systems={filteredSystems} />
              </motion.div>
            )}

            {activeTab === 'alerts' && (
               <motion.div
                 key="alerts"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="max-w-4xl mx-auto h-full"
               >
                 <AlertsPanel 
                   alerts={alerts} 
                   predictionHistory={predictionHistory}
                   onClear={() => setAlerts([])} 
                 />
               </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <MetricsPanel data={metrics} />
                <div className="h-6" />
                <ActivityLogs logs={logs} />
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div
                key="guide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <DeploymentGuide />
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-6xl mx-auto h-full"
              >
                <AdminPanel 
                  systems={systems} 
                  maintenanceTasks={maintenanceTasks} 
                  onUpdateStatus={updateSystemStatus} 
                  onCompleteMaintenance={completeMaintenanceTask}
                  onTriggerSimulation={triggerSimulation}
                  onAddSystem={addSystem}
                />
              </motion.div>
            )}

            {activeTab === 'neural' && (
              <motion.div
                key="neural"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <NeuralLab />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
