import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, FileText, Trash2, Search, Filter, 
  CheckCircle2, Clock, AlertCircle, Sparkles, Plus,
  ChevronRight, MoreVertical, Database, Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'indexing' | 'ready' | 'failed';
  chunks: number;
}

const initialDocs: Document[] = [
  { id: '1', name: 'Refund_Policy_2024.pdf', size: '2.4 MB', uploadedAt: '2024-04-20', status: 'ready', chunks: 142 },
  { id: '2', name: 'Employee_Handbook.docx', size: '1.1 MB', uploadedAt: '2024-04-21', status: 'ready', chunks: 563 },
  { id: '3', name: 'Technical_Specs_V2.pdf', size: '4.8 MB', uploadedAt: '2024-04-22', status: 'indexing', chunks: 0 },
];

export default function Documents() {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: 'New_SOP_Document.pdf',
        size: '1.2 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'indexing',
        chunks: 0
      };
      setDocs([newDoc, ...docs]);
      setIsUploading(false);
      
      // Simulate indexing completion
      setTimeout(() => {
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'ready', chunks: 42 } : d));
      }, 4000);
    }, 1500);
  };

  const filteredDocs = docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white tracking-tighter">Knowledge Base</h1>
          <p className="text-white/40 font-medium">Manage the documents your AI uses to generate verified answers.</p>
        </motion.div>
        <button 
          onClick={simulateUpload}
          disabled={isUploading}
          className="btn-primary flex items-center gap-2"
        >
          {isUploading ? <Clock className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </header>

      {/* Analytics Mini-cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Docs" value={docs.length} icon={Database} description="Source files" delay={0} />
        <StatCard label="Knowledge Chunks" value={docs.reduce((acc, d) => acc + d.chunks, 0)} icon={Sparkles} description="Vector points" accent delay={0.1} />
        <StatCard label="Indexing Active" value={docs.filter(d => d.status === 'indexing').length} icon={Zap} description="Live pipeline" delay={0.2} />
        <StatCard label="Storage Scale" value="12.4 MB" icon={FileText} description="Disk usage" delay={0.3} />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search documents by name or format..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 ring-primary/20 transition-all outline-none shadow-xl text-white placeholder:text-white/20"
          />
        </div>
        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-colors shadow-lg">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Document List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card border-white/10 overflow-hidden bg-white/5 shadow-2xl backdrop-blur-xl rounded-3xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest text-center w-20">Icon</th>
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">Document Details</th>
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Vectors</th>
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">Date Added</th>
                <th className="p-6 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right px-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-6 text-center">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center border mx-auto shadow-xl transition-transform group-hover:scale-110 duration-300",
                      doc.status === 'failed' ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-white/5 border-white/10 text-primary"
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                  </td>
                  <td className="p-6">
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{doc.size}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-[10px] font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 uppercase text-white/60 tracking-wider">
                      {doc.chunks > 0 ? `${doc.chunks.toLocaleString()} chunks` : 'Processing'}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-white/40">{doc.uploadedAt}</p>
                  </td>
                  <td className="p-6 text-right px-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 rounded-xl text-red-400 hover:text-white transition-all shadow-lg hover:shadow-red-500/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocs.length === 0 && (
            <div className="p-20 text-center">
              <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No documents found</h3>
              <p className="text-white/40 text-sm">Try adjusting your search filters or upload a new source file.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, description, accent, delay }: { label: string, value: string | number, icon: any, description: string, accent?: boolean, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "p-6 rounded-3xl border shadow-xl group transition-all duration-500 relative overflow-hidden",
        accent 
          ? "bg-gradient-to-br from-primary to-accent border-primary/20 text-white" 
          : "bg-white/5 border-white/10 text-white hover:border-primary/30"
      )}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
          accent ? "bg-white/20 shadow-inner" : "bg-white/5 border border-white/10"
        )}>
          <Icon className={cn("w-7 h-7", accent ? "text-white" : "text-primary")} />
        </div>
        <div>
          <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", accent ? "text-white/60" : "text-white/40")}>{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold tracking-tighter">{value}</p>
          </div>
          <p className={cn("text-[9px] font-bold uppercase tracking-widest", accent ? "text-white/40" : "text-white/20")}>{description}</p>
        </div>
      </div>
      {accent && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
      )}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Document['status'] }) {
  const configs = {
    indexing: { icon: Clock, text: 'Indexing Pipeline', className: 'bg-primary/10 text-primary border-primary/20 shadow-primary/5' },
    ready: { icon: CheckCircle2, text: 'Knowledge Verified', className: 'bg-green-500/10 text-green-400 border-green-500/20 shadow-green-500/5' },
    failed: { icon: AlertCircle, text: 'System Error', className: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/5' }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm", config.className)}>
      <Icon className={cn("w-3.5 h-3.5", status === 'indexing' && 'animate-spin')} />
      {config.text}
    </div>
  );
}
