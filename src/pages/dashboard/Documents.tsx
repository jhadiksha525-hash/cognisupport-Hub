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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={() => setIsUploading(true)}
          className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Upload className="w-4 h-4" /> Upload Documents
        </button>
      </div>

      <div className="glass-card overflow-hidden border-border bg-surface shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-bg/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Document</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Size</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Added Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="group hover:bg-bg transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-bg border border-border p-2 rounded-lg text-primary group-hover:scale-110 transition-transform shadow-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main mb-0.5">{doc.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted font-medium">{doc.size}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {doc.status === 'done' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-sm shadow-primary/10">
                        <CheckCircle2 className="w-3 h-3" /> Indexed
                      </span>
                    )}
                    {doc.status === 'processing' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg text-text-muted text-[10px] font-bold uppercase tracking-wider border border-border">
                        <Clock className="w-3 h-3 animate-spin" /> Processing
                      </span>
                    )}
                    {doc.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/10 text-error text-[10px] font-bold uppercase tracking-wider border border-error/10">
                        <AlertCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted font-medium">{doc.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-bg rounded-lg text-text-muted hover:text-primary transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-error/5 rounded-lg text-text-muted hover:text-error transition-all">
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
              className="absolute inset-0 bg-text-main/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card p-8 w-full max-w-xl border-border bg-surface shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-text-main mb-1 tracking-tighter">Upload Knowledge</h3>
                  <p className="text-text-muted text-sm font-medium">Add documents to train your AI support agent.</p>
                </div>
                <button 
                  onClick={() => setIsUploading(false)}
                  className="p-2 hover:bg-bg rounded-lg text-text-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary transition-all group bg-bg/50">
                <div className="bg-surface border border-border shadow-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-primary transition-all">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-bold text-text-main mb-2 tracking-tight">Drag and drop files here</p>
                <p className="text-text-muted text-sm mb-6 font-medium">PDF, DOCX, TXT (Max 10MB each)</p>
                <button className="btn-secondary px-6">Select Files</button>
              </div>

              <div className="mt-8 pt-8 border-t border-border flex justify-end gap-4">
                <button className="btn-secondary" onClick={() => setIsUploading(false)}>Cancel</button>
                <button className="btn-primary px-8 shadow-lg shadow-primary/20">Process Documents</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
