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
          icon={<MessageSquare className="w-5 h-5 text-primary" />}
          label="Total Conversations"
          value="1,284"
          trend="+12.5%"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-5 h-5 text-accent" />}
          label="AI Resolution Rate"
          value="84.2%"
          trend="+2.4%"
        />
        <StatCard 
          icon={<FileText className="w-5 h-5 text-primary" />}
          label="Knowledge Chunks"
          value="24,512"
          trend="+842"
        />
        <StatCard 
          icon={<Users className="w-5 h-5 text-primary" />}
          label="Unique Visitors"
          value="892"
          trend="+5.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 border-border bg-surface">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-text-main tracking-tight">Conversation Volume</h3>
              <p className="text-text-muted text-sm font-medium">Last 7 days performance</p>
            </div>
            <select className="bg-bg border border-border rounded-lg text-sm text-text-muted px-3 py-1 font-bold outline-none focus:ring-2 focus:ring-primary/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorConvs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#a3a3a3" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  fontWeight={600}
                />
                <YAxis 
                  stroke="#a3a3a3" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                  fontWeight={600}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563EB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="convs" 
                  stroke="#2563EB" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorConvs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Questions */}
        <div className="glass-card p-6 border-border bg-surface">
          <h3 className="text-lg font-bold text-text-main mb-6 tracking-tight">Top AI Responses</h3>
          <div className="space-y-6">
            <TopQuestion 
              q="What is your refund policy?" 
              count={242} 
              accuracy={98} 
              color="bg-primary"
            />
            <TopQuestion 
              q="Pricing plans for enterprise" 
              count={184} 
              accuracy={95} 
              color="bg-accent"
            />
            <TopQuestion 
              q="How to reset password?" 
              count={156} 
              accuracy={100} 
              color="bg-success"
            />
            <TopQuestion 
              q="API documentation link" 
              count={124} 
              accuracy={92} 
              color="bg-primary"
            />
          </div>
          
          <button className="w-full mt-8 py-3 rounded-lg border border-border text-text-muted text-sm hover:text-primary hover:bg-primary/5 transition-all font-bold">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass-card p-6 border-border bg-surface hover:border-primary transition-all group shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-bg border border-border p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm",
          trend.startsWith('+') ? "bg-primary text-white" : "bg-red-50 text-error"
        )}>
          {trend}
        </span>
      </div>
      <p className="text-text-muted text-sm font-bold mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-text-main tracking-tight">{value}</h4>
    </div>
  );
}

function TopQuestion({ q, count, accuracy, color = "bg-primary" }: { q: string, count: number, accuracy: number, color?: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-bold text-text-muted group-hover:text-primary transition-colors">{q}</p>
        <span className="text-xs text-text-muted font-medium">{count} chats</span>
      </div>
      <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden border border-border">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${accuracy}%` }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}
