import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small teams getting started with AI support.',
    features: [
      'Up to 500 Messages / mo',
      '1,000 Knowledge Chunks',
      'Basic Citations',
      'Standard Widget Decor',
      'Email Support'
    ]
  },
  {
    name: 'Pro',
    price: '$149',
    description: 'Advanced features for growing support operations.',
    features: [
      'Up to 5,000 Messages / mo',
      '10,000 Knowledge Chunks',
      'Detailed Citations',
      'Human Handoff Integration',
      'Priority Support',
      'Custom Theme Branded Widget'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Scalable solutions for large-scale organizations.',
    features: [
      'Unlimited Messages',
      'Unlimited Knowledge Base',
      'Dedicated Instance Isolation',
      'SLA Guarantees',
      'Custom LLM Fine-tuning',
      '24/7 Account Manager'
    ]
  }
];

export default function Pricing() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#070A12] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Choose the plan that's right for your support team. No hidden fees, ever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-3xl p-[1px] transition-all duration-500",
                plan.popular 
                  ? "bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] shadow-[0_10px_60px_rgba(109,40,217,0.25)] scale-105 z-10" 
                  : "bg-white/10"
              )}
            >
              <div className="rounded-[calc(1.5rem-1px)] border border-white/10 bg-[#0B1020]/90 backdrop-blur-xl p-10 h-full flex flex-col relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(109,40,217,0.5)] whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-white/40 font-bold text-sm">/mo</span>}
                </div>
                <p className="text-white/60 text-sm mb-8 font-medium leading-relaxed">{plan.description}</p>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <React.Fragment key={feature}>
                      <li className="flex items-center gap-3 text-sm font-bold text-white/80">
                        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Check className={cn("w-3 h-3", plan.popular ? 'text-primary' : 'text-white/40')} />
                        </div>
                        {feature}
                      </li>
                      {idx < plan.features.length - 1 && <div className="my-4 border-t border-white/10" />}
                    </React.Fragment>
                  ))}
                </ul>

                <Link 
                  to="/sign-up" 
                  className={cn(
                    "mt-6 w-full rounded-xl px-5 py-4 font-semibold text-white transition-all flex items-center justify-center gap-2",
                    plan.popular 
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#4F46E5] hover:from-[#7C3AED] hover:to-[#6366F1] shadow-xl shadow-primary/20" 
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  )}
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
