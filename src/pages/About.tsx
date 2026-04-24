import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Rocket, Eye } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black tracking-tighter">Redefining Support for the AI Era.</h1>
          <p className="text-neutral-500 text-xl leading-relaxed mb-12 font-medium">
            CogniSupport Hub was born out of a simple problem: businesses having too much documentation and too little time to answer customers accurately. 
            We built a platform that lets AI act as a second brain for your support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <AboutSection 
            icon={<Target className="w-8 h-8 text-black" />}
            title="Our Mission"
            content="To provide every company with an intelligent support agent that is as accurate as a human and fast as machine logic."
          />
          <AboutSection 
            icon={<Eye className="w-8 h-8 text-black" />}
            title="Our Vision"
            content="A world where support queries are resolved instantly, and human agents only step in for creative problem solving."
          />
        </div>

        <div className="mt-32 glass-card p-12 bg-white border border-neutral-200 shadow-sm">
          <div className="grid md:grid-cols-4 gap-8 text-center text-black">
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Messages</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-50 border border-neutral-200 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-black tracking-tight">{title}</h3>
      <p className="text-neutral-500 text-lg leading-relaxed font-medium">
        {content}
      </p>
    </div>
  );
}
