/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Activity, ChevronRight, MonitorDot } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const features = [
    {
      title: 'Live Monitoring',
      desc: 'Track industrial performance in real-time with sub-second latency.',
      icon: Activity,
    },
    {
      title: 'AI Anomaly Detection',
      desc: 'Smart algorithms detect deviations in pressure and temp instantly.',
      icon: Shield,
    },
    {
      title: 'Predictive Sync',
      desc: 'Prevent failures before they happen with IoT-level forecasting.',
      icon: Zap,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="h-20 flex items-center justify-between px-10 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-sm font-bold tracking-widest text-white uppercase italic">1000 Eyes</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-emerald-400 transition-colors">Technology</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Cases</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Integrations</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 pt-20 pb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
        >
          <MonitorDot className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">v2.4_SECURE Node Active</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          Industrial Observability <br />
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-300 bg-clip-text text-transparent italic">Perfected.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 max-w-xl mb-12"
        >
          Real-time AI-powered monitoring for heavy machinery and industrial pipelines. Detect failures early, act faster.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onStart}
          className="group relative px-8 py-4 bg-emerald-500 text-slate-950 font-bold uppercase tracking-widest text-sm rounded shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center gap-3 overflow-hidden"
        >
          <span className="relative z-10">Initialize Dashboard</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.button>
      </div>

      {/* Features Grid */}
      <section className="bg-[#0d0d12] border-t border-white/5 py-32 px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111116] p-8 border border-slate-800 border-l-4 border-l-emerald-500 shadow-xl group hover:border-slate-700 transition-colors"
              >
                <div className="p-3 bg-emerald-500/10 rounded-lg w-fit mb-6">
                  <f.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center bg-[#0d0d12] text-[10px] font-mono text-slate-700 uppercase tracking-widest relative z-10">
        © 2026_DAVIS_SHIRTLIFF_SYSTEMS // SECURE_MESH_ENABLED
      </footer>
    </div>
  );
}
