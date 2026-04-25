/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal } from 'lucide-react';
import { LogEntry } from '../types';

interface ActivityLogsProps {
  logs: LogEntry[];
}

export function ActivityLogs({ logs }: ActivityLogsProps) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-full flex flex-col font-mono text-xs">
      <div className="flex items-center gap-2 mb-6">
        <Terminal className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-slate-200 font-sans">Operation Logs</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
        {logs.length === 0 && (
          <div className="text-slate-700 italic">Listening for kernel events...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 leading-relaxed group">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 font-bold ${
              log.event.includes('CRITICAL') ? 'text-rose-500' : 'text-emerald-500'
            }`}>
              {log.event}:
            </span>
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
              {log.details}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
