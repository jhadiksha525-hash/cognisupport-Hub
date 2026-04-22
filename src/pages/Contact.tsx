import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have questions about CogniSupport? Our team is here to help you scale your support operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-8">
              <ContactInfo 
                icon={<Mail className="w-6 h-6 text-brand-400" />}
                title="Email Us"
                content="support@cognisupport.com"
              />
              <ContactInfo 
                icon={<Phone className="w-6 h-6 text-brand-400" />}
                title="Call Us"
                content="+1 (555) 000-0000"
              />
              <ContactInfo 
                icon={<MapPin className="w-6 h-6 text-brand-400" />}
                title="Visit Us"
                content="123 AI Boulevard, Silicon Valley, CA"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Name</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email</label>
                  <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Subject</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
              </div>
              <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex gap-4">
      <div className="bg-slate-800 p-3 rounded-xl">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-slate-400">{content}</p>
      </div>
    </div>
  );
}
