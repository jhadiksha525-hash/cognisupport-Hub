import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  MoreVertical, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  File,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface Doc {
  id: string;
  name: string;
  size: string;
  status: 'done' | 'processing' | 'failed';
  date: string;
  type: string;
}

const mockDocs: Doc[] = [
  { id: '1', name: 'Refund_Policy_2026.pdf', size: '1.2 MB', status: 'done', date: 'Oct 12, 2026', type: 'PDF' },
  { id: '2', name: 'SOP_Customer_Support.docx', size: '842 KB', status: 'done', date: 'Oct 11, 2026', type: 'DOCX' },
  { id: '3', name: 'Product_Manual_v2.pdf', size: '4.5 MB', status: 'processing', date: 'Oct 14, 2026', type: 'PDF' },
  { id: '4', name: 'Pricing_Strategy_Internal.txt', size: '12 KB', status: 'failed', date: 'Oct 13, 2026', type: 'TXT' },
];

export default function Documents() {
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDocs = mockDocs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gap-6">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsUploading(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Upload Documents
        </button>
      </div>

      <div className="glass-card overflow-hidden border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Document</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Size</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Added Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="group hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-800 p-2 rounded-lg text-brand-400 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{doc.name}</p>
                      <p className="text-[10px] text-slate-500">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{doc.size}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {doc.status === 'done' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Indexed
                      </span>
                    )}
                    {doc.status === 'processing' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                        <Clock className="w-3 h-3 animate-spin" /> Processing
                      </span>
                    )}
                    {doc.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold">
                        <AlertCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{doc.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isUploading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploading(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card p-8 w-full max-w-xl border-slate-700 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Upload Knowledge</h3>
                  <p className="text-slate-400 text-sm">Add documents to train your AI support agent.</p>
                </div>
                <button 
                  onClick={() => setIsUploading(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-brand-500/50 transition-colors group">
                <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-brand-500" />
                </div>
                <p className="text-lg font-bold text-slate-200 mb-2">Drag and drop files here</p>
                <p className="text-slate-400 text-sm mb-6">PDF, DOCX, TXT (Max 10MB each)</p>
                <button className="btn-secondary px-6">Select Files</button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 flex justify-end gap-4">
                <button className="btn-secondary" onClick={() => setIsUploading(false)}>Cancel</button>
                <button className="btn-primary px-8">Process Documents</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
