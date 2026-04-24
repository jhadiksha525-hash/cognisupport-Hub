import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Founders() {
  const founders = [
    {
      name: "Dhruv",
      role: "CEO & Founder",
      bio: "An architect of intelligent systems, Dhruv leads our technical strategy, pushing the boundaries of what's possible with RAG and LLM orchestration.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dhruv"
    },
    {
      name: "Diksha",
      role: "CEO & Founder",
      bio: "Visionary leader focused on revolutionizing B2B support through AI research and human-centric design.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diksha"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-black">Our Leadership</h1>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-medium">
            Meet the minds behind CogniSupport Hub, dedicated to building the future of automated customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="max-w-md w-full"
            >
              <div className="glass-card overflow-hidden group bg-white border border-neutral-200 shadow-sm">
                <div className="aspect-square relative bg-neutral-100 overflow-hidden">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-black mb-2">{founder.name}</h3>
                  <p className="text-neutral-900 font-bold mb-4">{founder.role}</p>
                  <p className="text-neutral-500 mb-6 leading-relaxed font-medium">
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
    <a href={href} className="p-2 rounded-lg bg-neutral-100 text-neutral-500 hover:text-white hover:bg-black transition-all">
      {icon}
    </a>
  );
}
