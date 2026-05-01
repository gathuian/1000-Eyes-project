/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Settings, Cpu, Wifi, Code2, CheckCircle2, ArrowRight, Layers, Database } from 'lucide-react';

export function DeploymentGuide() {
  const steps = [
    {
      id: 1,
      icon: Cpu,
      title: 'Sensor Hub Deployment',
      desc: 'Attach physical 1000-Eyes IoT hubs to your machinery. Supports vibration, heat, torque, and pressure sensors.',
      code: 'hub_identify --model CX-900 --auto-pair'
    },
    {
      id: 2,
      icon: Wifi,
      title: 'Network Handshake',
      desc: 'Connect your hubs to the local industrial mesh network. All data is encrypted via AES-256 at the source.',
      code: 'mesh_connect --ssid "EyeMesh_Global" --secure'
    },
    {
      id: 3,
      icon: Settings,
      title: 'Telemetry Mapping',
      desc: 'Define your system parameters in our control plane. Map specific voltages and rotations to critical thresholds.',
      code: 'config_map --input-map /etc/sensors/map.json'
    },
    {
      id: 4,
      icon: Code2,
      title: 'API Integration',
      desc: 'Hook into our real-time WebSocket firehose. Stream sub-millisecond telemetry to your own dashboard or ERP.',
      code: 'curl -X POST https://api.1000eyes.io/v1/keys'
    }
  ];

  return (
    <div className="h-full flex flex-col font-sans overflow-y-auto custom-scrollbar">
      <div className="p-8 border-b border-slate-800 bg-[#15151c]/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Layers className="w-6 h-6 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Mass Setup & Integration Guide</h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Integrating 10,000 systems is as simple as integrating one. Follow our streamlined mesh-onboarding protocol to get your entire factory floor online in minutes.
          </p>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 space-y-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 group"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 font-bold font-mono text-sm group-hover:border-emerald-500/50 transition-colors">
                  {step.id}
                </div>
                {idx !== steps.length - 1 && <div className="w-px h-full bg-slate-800 my-2" />}
              </div>
              <div className="flex-1 pb-12">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-4 h-4 text-slate-500" />
                  <h3 className="text-lg font-bold text-slate-200">{step.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed italic">{step.desc}</p>
                <div className="bg-[#0d0d12] border border-slate-800 rounded p-3 font-mono text-[11px] text-emerald-500 flex items-center justify-between group-hover:bg-slate-900 transition-colors">
                  <span>$ {step.code}</span>
                  <button className="text-slate-600 hover:text-slate-400 uppercase font-bold text-[9px] tracking-widest">
                    [ Copy_Command ]
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pro Tips Section */}
        <div className="lg:col-span-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#111116] border border-emerald-500/10 p-6 rounded-xl">
             <div className="flex items-center gap-2 mb-4 text-emerald-500">
               <CheckCircle2 className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Scaling for Enterprise</span>
             </div>
             <p className="text-slate-400 text-[11px] leading-relaxed italic mb-4">
               For users with many machine tools, use our <span className="text-white font-bold">Bulk_Discovery</span> tool. It scans your subnet and auto-classifies hardware signatures (Pumps, Generators, Boilers) using our neural fingerprint database.
             </p>
             <button className="text-[10px] font-bold text-emerald-500 flex items-center gap-2 hover:gap-3 transition-all">
               READ BULK DOCS <ArrowRight className="w-3 h-3" />
             </button>
           </div>

           <div className="bg-[#111116] border border-blue-500/10 p-6 rounded-xl">
             <div className="flex items-center gap-2 mb-4 text-blue-500">
               <Database className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Database Sync</span>
             </div>
             <p className="text-slate-400 text-[11px] leading-relaxed italic mb-4">
               Automatically import machinery lists from CSV, Excel, or SAP ERP exports. Our mapper handles inconsistent naming conventions and ID formats.
             </p>
             <button className="text-[10px] font-bold text-blue-500 flex items-center gap-2 hover:gap-3 transition-all">
               DOWNLOAD IMPORT TEMPLATE <ArrowRight className="w-3 h-3" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
