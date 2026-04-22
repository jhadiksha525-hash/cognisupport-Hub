import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { MessageSquare, Users, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const data = [
  { name: 'Mon', convs: 40, resolved: 32 },
  { name: 'Tue', convs: 55, resolved: 48 },
  { name: 'Wed', convs: 48, resolved: 41 },
  { name: 'Thu', convs: 70, resolved: 58 },
  { name: 'Fri', convs: 62, resolved: 55 },
  { name: 'Sat', convs: 30, resolved: 28 },
  { name: 'Sun', convs: 25, resolved: 22 },
];

export default function Overview() {
  return (
    <div className="space-y-8 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<MessageSquare className="w-5 h-5 text-brand-400" />}
          label="Total Conversations"
          value="1,284"
          trend="+12.5%"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
          label="AI Resolution Rate"
          value="84.2%"
          trend="+2.4%"
        />
        <StatCard 
          icon={<FileText className="w-5 h-5 text-cyan-400" />}
          label="Knowledge Chunks"
          value="24,512"
          trend="+842"
        />
        <StatCard 
          icon={<Users className="w-5 h-5 text-purple-400" />}
          label="Unique Visitors"
          value="892"
          trend="+5.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Conversation Volume</h3>
              <p className="text-slate-500 text-sm">Last 7 days performance</p>
            </div>
            <select className="bg-slate-800 border-none rounded-lg text-sm text-slate-300 px-3 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorConvs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="convs" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorConvs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Questions */}
        <div className="glass-card p-6 border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Top AI Responses</h3>
          <div className="space-y-6">
            <TopQuestion 
              q="What is your refund policy?" 
              count={242} 
              accuracy={98} 
            />
            <TopQuestion 
              q="Pricing plans for enterprise" 
              count={184} 
              accuracy={95} 
            />
            <TopQuestion 
              q="How to reset password?" 
              count={156} 
              accuracy={100} 
            />
            <TopQuestion 
              q="API documentation link" 
              count={124} 
              accuracy={92} 
            />
          </div>
          
          <button className="w-full mt-8 py-3 rounded-xl border border-slate-800 text-slate-400 text-sm hover:text-white hover:bg-slate-800 transition-all font-medium">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass-card p-6 border-slate-800 hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-800 p-2 rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          trend.startsWith('+') ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-white">{value}</h4>
    </div>
  );
}

function TopQuestion({ q, count, accuracy }: { q: string, count: number, accuracy: number }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-slate-300 group-hover:text-brand-400 transition-colors">{q}</p>
        <span className="text-xs text-slate-500">{count} chats</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${accuracy}%` }}
          className="h-full bg-brand-600 rounded-full" 
        />
      </div>
    </div>
  );
}
