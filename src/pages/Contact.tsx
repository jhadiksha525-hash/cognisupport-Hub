import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black tracking-tighter">Get in Touch</h1>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-medium">
            Have questions about CiteSupport? Our team is here to help you scale your support operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-8 bg-white border border-neutral-200 shadow-sm">
              <ContactInfo 
                icon={<Mail className="w-6 h-6 text-black" />}
                title="Email Us"
                content="support@citesupport.com"
              />
              <ContactInfo 
                icon={<Phone className="w-6 h-6 text-black" />}
                title="Call Us"
                content="+1 (555) 000-0000"
              />
              <ContactInfo 
                icon={<MapPin className="w-6 h-6 text-black" />}
                title="Visit Us"
                content="123 AI Boulevard, Silicon Valley, CA"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 bg-white border border-neutral-200 shadow-sm"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500">Name</label>
                  <input type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500">Email</label>
                  <input type="email" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-500">Subject</label>
                <input type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-500">Message</label>
                <textarea rows={4} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all" />
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
      <div className="bg-neutral-100 p-3 rounded-xl border border-neutral-200">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-black">{title}</h4>
        <p className="text-neutral-500 font-medium">{content}</p>
      </div>
    </div>
  );
}
