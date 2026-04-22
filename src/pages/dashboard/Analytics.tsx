import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, Clock, Target, Ghost } from 'lucide-react';

const timeData = [
  { name: '00:00', chats: 12 },
  { name: '04:00', chats: 5 },
  { name: '08:00', chats: 28 },
  { name: '12:00', chats: 84 },
  { name: '16:00', chats: 120 },
  { name: '20:00', chats: 45 },
];

const categoryData = [
  { name: 'Refunds', value: 400 },
  { name: 'Pricing', value: 300 },
  { name: 'Technical', value: 300 },
  { name: 'Account', value: 200 },
];

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f43f5e'];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Avg. Response Time" value="1.2s" sub="AI Instant Answer" icon={<Clock className="text-brand-400" />} />
        <MetricCard label="Deflection Rate" value="72%" sub="Tickets avoided" icon={<Target className="text-cyan-400" />} />
        <MetricCard label="Missed Chats" value="12" sub="Handoff failed" icon={<Ghost className="text-red-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-6">Traffic by Time of Day</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                  <Bar dataKey="chats" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-white mb-6">Inquiry Categories</h3>
          <div className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                </PieChart>
             </ResponsiveContainer>
             <div className="space-y-2">
                {categoryData.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs text-slate-400">{c.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
       <div className="bg-slate-800 p-3 rounded-2xl mb-4">
         {icon}
       </div>
       <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
       <p className="text-[10px] text-slate-500">{sub}</p>
    </div>
  );
}
