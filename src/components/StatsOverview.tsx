/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { System } from '../types';

interface StatsOverviewProps {
  systems: System[];
}

export function StatsOverview({ systems }: StatsOverviewProps) {
  const total = systems.length;
  const active = systems.filter(s => s.status === 'active').length;
  const warnings = systems.filter(s => s.status === 'warning').length;
  const critical = systems.filter(s => s.status === 'error').length;

  const stats = [
    { label: 'Total Systems', value: total, color: 'text-white', barColor: 'bg-blue-500', id: '#01' },
    { label: 'Active Nodes', value: active, color: 'text-emerald-400', barColor: 'bg-emerald-500', id: '#02' },
    { label: 'Warnings', value: warnings, color: 'text-amber-400', barColor: 'bg-amber-500', id: '#03' },
    { label: 'Critical Failure', value: critical, color: 'text-rose-500', barColor: 'bg-rose-500', id: '#04' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-[#111116] p-4 border border-slate-800 relative group"
        >
          <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-slate-700 tracking-tighter">
            {stat.id}
          </div>
          
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            {stat.label}
          </div>
          
          <motion.div 
            layout
            className={`text-2xl font-mono mt-1 ${stat.color} transition-colors duration-500`}
          >
            {stat.value.toString().padStart(2, '0')}
          </motion.div>
          
          <div className="h-1 bg-slate-900 w-full mt-4">
            <motion.div 
              className={`h-1 ${stat.barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${(stat.value / total) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
