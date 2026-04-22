import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Founders() {
  const founders = [
    {
      name: "Diksha",
      role: "Founder & CEO",
      bio: "Visionary leader focused on revolutionizing B2B support through AI research and human-centric design.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diksha"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Leadership</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Meet the minds behind CogniSupport Hub, dedicated to building the future of automated customer service.
          </p>
        </div>

        <div className="flex justify-center">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="max-w-md w-full"
            >
              <div className="glass-card overflow-hidden group">
                <div className="aspect-square relative bg-brand-950 overflow-hidden">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                  <p className="text-brand-400 font-medium mb-4">{founder.role}</p>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {founder.bio}
                  </p>
                  <div className="flex justify-center gap-4">
                    <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                    <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" />
                    <SocialIcon icon={<Github className="w-5 h-5" />} href="#" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-brand-600 transition-all">
      {icon}
    </a>
  );
}
