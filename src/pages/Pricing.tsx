import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter text-text-main">
            Simple, Transparent Pricing.
          </h1>
          <p className="text-text-muted text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Choose the plan that's right for your support team. No hidden fees, ever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-3xl border ${
                plan.popular ? 'border-primary bg-primary/5 shadow-2xl relative' : 'border-border bg-surface'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2 text-text-main tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold text-text-main">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-text-muted font-bold text-sm">/mo</span>}
              </div>
              <p className="text-text-muted text-sm mb-8 font-medium">{plan.description}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-bold text-text-main">
                    <Check className={`w-4 h-4 ${plan.popular ? 'text-primary' : 'text-accent'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/sign-up" 
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.popular ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20' : 'bg-bg text-text-main border border-border hover:border-primary'
                }`}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
