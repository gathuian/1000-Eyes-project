/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Satellite, Lock, Database, Dna, Bot } from 'lucide-react';

export function NeuralLab() {
  const futureFeatures = [
    {
      id: 'mesh',
      icon: Satellite,
      title: 'Satellite Mesh Link',
      desc: 'Deep-space synchronization for remote industrial outposts. 99.999% uptime via low-orbit relay.',
      status: 'In Development'
    },
    {
      id: 'bio',
      icon: Dna,
      title: 'Biometric Ops Lock',
      desc: 'Zero-trust authorization using retinal and cardiovascular synchronization patterns.',
      status: 'Coming Soon'
    },
    {
      id: 'predict',
      icon: Bot,
      title: 'Cognitive Prediction',
      desc: 'LLM-powered maintenance advisories. Predictive logic that learns from mechanical vibration acoustics.',
      status: 'Coming Soon'
    },
    {
      id: 'vault',
      icon: Lock,
      title: 'Quantum Ledger Vault',
      desc: 'Immutable log storage secured by post-quantum encryption standards.',
      status: 'Planning'
    },
    {
      id: 'storage',
      icon: Database,
      title: 'Holographic Storage',
      desc: 'High-density metric archiving for up to 50 years of sub-second telemetry.',
      status: 'Researching'
    }
  ];

  return (
    <div className="h-full flex flex-col font-sans">
      <div className="p-8 text-center max-w-2xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <Rocket className="w-8 h-8 text-emerald-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight uppercase tracking-[0.1em]">The Neural Lab</h2>
        <p className="text-slate-500 text-sm leading-relaxed italic">
          The future of industrial observability is being forged here. Our experimental features push the boundaries of what's possible in real-time telemetry and predictive maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {futureFeatures.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111116] border border-slate-800 p-6 rounded relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 group-hover:text-emerald-500 transition-colors">
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-widest">
                {f.status}
              </span>
            </div>
            <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">{f.title}</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed italic line-clamp-3">
              {f.desc}
            </p>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <f.icon className="w-12 h-12" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
