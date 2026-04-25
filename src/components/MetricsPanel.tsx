/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MetricData } from '../types';

interface MetricsPanelProps {
  data: MetricData[];
}

export function MetricsPanel({ data }: MetricsPanelProps) {
  return (
    <div className="bg-[#111116] border border-slate-800 flex flex-col h-[300px] font-sans">
      <div className="p-3 border-b border-slate-800 flex justify-between items-end bg-[#15151c]">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Aggregate Throughput Data</span>
          <div className="text-xl font-mono text-white mt-0.5">4.2 <span className="text-xs text-slate-500 font-sans uppercase">Gbps</span></div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 uppercase italic font-mono">LIVE_STREAM_OK [0x42]</span>
          <div className="text-xs font-mono text-emerald-400">98.4% Efficiency</div>
        </div>
      </div>

      <div className="flex-1 p-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis dataKey="time" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} minTickGap={30} />
            <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} domain={[50, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0d0d12', borderColor: '#334155', borderRadius: '4px', border: '1px solid #1e293b' }}
              itemStyle={{ color: '#22d3ee', fontSize: '10px', textTransform: 'uppercase' }}
              labelStyle={{ color: '#64748b', fontSize: '9px', marginBottom: '4px' }}
              cursor={{ stroke: '#22d3ee', strokeWidth: 1 }}
            />
            <Area type="stepAfter" dataKey="val" stroke="#22d3ee" fillOpacity={1} fill="url(#colorVal)" strokeWidth={1.5} animationDuration={500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-6 p-4 pt-0 gap-2">
         {Array.from({ length: 6 }).map((_, i) => (
           <div key={i} className={`h-1 rounded-full ${i === 3 ? 'bg-rose-500/40' : 'bg-emerald-500/40'}`} />
         ))}
      </div>
    </div>
  );
}
