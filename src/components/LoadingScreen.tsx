import React from 'react';
import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0B1020] flex flex-col items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
        <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-2xl relative z-10 border border-white/10">
          <Bot className="w-10 h-10 text-white animate-float" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl font-bold text-white tracking-widest uppercase">CiteSupport</h2>
        <div className="mt-2 flex gap-1 justify-center">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-1 h-1 bg-primary rounded-full" 
          />
          <motion.div 
             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
             transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-1 h-1 bg-primary rounded-full" 
          />
          <motion.div 
             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
             transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-1 h-1 bg-primary rounded-full" 
          />
        </div>
      </motion.div>
    </div>
  );
}
