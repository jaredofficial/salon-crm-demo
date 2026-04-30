import React, { useState } from 'react';
import { 
  MessageSquare, 
  UserPlus, 
  Calendar, 
  CheckCircle2, 
  Clock,
  Zap,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { motion } from 'motion/react';

const workflows = [
  { 
    id: '1', 
    title: 'Appointment Reminders', 
    description: 'Sent 24 hours before the appointment to reduce no-shows.',
    enabled: true,
    steps: [
      { type: 'trigger', label: 'Appointment Booked', icon: Calendar },
      { type: 'wait', label: '24 Hours Before', icon: Clock },
      { type: 'action', label: 'Send WhatsApp Reminder', icon: MessageSquare },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  },
  { 
    id: '2', 
    title: 'New Client Welcome', 
    description: 'Sent immediately after a client\'s first visit with a discount code.',
    enabled: true,
    steps: [
      { type: 'trigger', label: 'First Visit Completed', icon: UserPlus },
      { type: 'wait', label: 'Immediate', icon: Zap },
      { type: 'action', label: 'Send Welcome Message', icon: MessageSquare },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  },
  { 
    id: '3', 
    title: 'Post-Visit Follow-up', 
    description: 'Sent 2 days after visit to ask for a review or feedback.',
    enabled: false,
    steps: [
      { type: 'trigger', label: 'Visit Completed', icon: CheckCircle2 },
      { type: 'wait', label: '2 Days After', icon: Clock },
      { type: 'action', label: 'Send Feedback Request', icon: MessageSquare },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  }
];

export default function AutomationSettings() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
      className="space-y-8 max-w-5xl mx-auto pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Automations</h1>
          <p className="text-muted">Monitor your active automated workflows</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest">MSG91 Active</span>
        </div>
      </div>

      {/* Production Status */}
      <div className="glass rounded-[2rem] p-8 bg-accent/5 border border-accent/20 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-2xl text-accent">
            <PlayCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Production Status</h3>
            <p className="text-sm text-muted">Your WhatsApp sender is currently active and monitoring triggers.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface rounded-2xl border border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Messages Sent (24h)</p>
            <p className="text-2xl font-bold">1,240</p>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Delivery Rate</p>
            <p className="text-2xl font-bold text-accent">99.2%</p>
          </div>
          <div className="p-4 bg-surface rounded-2xl border border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Active Workflows</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="glass rounded-[2rem] p-8 space-y-6 flex flex-col justify-between transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-surface rounded-2xl text-accent border border-border">
                  {workflow.steps[0].icon && (() => {
                    const Icon = workflow.steps[0].icon;
                    return <Icon size={28} />;
                  })()}
                </div>
                <div className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${workflow.enabled ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-surface text-muted border border-border'}`}>
                  {workflow.enabled ? 'Active' : 'Paused'}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold">{workflow.title}</h4>
                <p className="text-sm text-muted mt-2 leading-relaxed">{workflow.description}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {workflow.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="shrink-0 p-2 bg-surface rounded-lg border border-border flex items-center gap-2">
                      {(() => {
                        const Icon = step.icon;
                        return <Icon size={14} className="text-accent" />;
                      })()}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{step.type}</span>
                    </div>
                    {i < workflow.steps.length - 1 && <ArrowRight size={12} className="text-muted shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Last run: {Math.floor(Math.random() * 60)}m ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
