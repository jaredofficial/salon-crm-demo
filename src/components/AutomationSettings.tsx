import React, { useState } from 'react';
import { 
  MessageSquare, 
  Bell, 
  UserPlus, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Clock,
  Zap,
  ArrowRight,
  X,
  Settings2,
  PlayCircle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MousePointer2,
  Hand
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialWorkflows = [
  { 
    id: '1', 
    title: 'Appointment Reminders', 
    description: 'Sent 24 hours before the appointment to reduce no-shows.',
    enabled: true,
    steps: [
      { type: 'trigger', label: 'Appointment Booked', icon: Calendar, config: { event: 'appointment_booked' } },
      { type: 'wait', label: '24 Hours Before', icon: Clock, config: { delay: 86400 } },
      { type: 'action', label: 'Send WhatsApp Reminder', icon: MessageSquare, config: { templateId: 'appointment_reminder_v1' } },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  },
  { 
    id: '2', 
    title: 'New Client Welcome', 
    description: 'Sent immediately after a client\'s first visit with a discount code.',
    enabled: true,
    steps: [
      { type: 'trigger', label: 'First Visit Completed', icon: UserPlus, config: { event: 'visit_completed' } },
      { type: 'wait', label: 'Immediate', icon: Zap, config: { delay: 0 } },
      { type: 'action', label: 'Send Welcome Message', icon: MessageSquare, config: { templateId: 'welcome_template_v1' } },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  },
  { 
    id: '3', 
    title: 'Post-Visit Follow-up', 
    description: 'Sent 2 days after visit to ask for a review or feedback.',
    enabled: false,
    steps: [
      { type: 'trigger', label: 'Visit Completed', icon: CheckCircle2, config: { event: 'visit_completed' } },
      { type: 'wait', label: '2 Days After', icon: Clock, config: { delay: 172800 } },
      { type: 'action', label: 'Send Feedback Request', icon: MessageSquare, config: { templateId: 'feedback_request_v1' } },
      { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
    ]
  }
];

export default function AutomationSettings() {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [health, setHealth] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  React.useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch('/api/whatsapp/health');
        const data = await res.json();
        setHealth(data);
      } catch (e) {
        console.error('Health check failed:', e);
      }
    }
    checkHealth();
  }, []);

  const openEditModal = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsEditModalOpen(true);
    setZoomLevel(1);
  };

  const handleNewWorkflow = () => {
    const newWorkflow = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Custom Workflow',
      description: 'Define your custom automation trigger and actions.',
      enabled: true,
      steps: [
        { type: 'trigger', label: 'Visit Completed', icon: Zap, config: { event: 'visit_completed' } },
        { type: 'wait', label: 'Immediate', icon: Clock, config: { delay: 0 } },
        { type: 'action', label: 'Send WhatsApp Message', icon: MessageSquare, config: { templateId: 'welcome_template_v1' } },
        { type: 'end', label: 'Workflow Complete', icon: CheckCircle2 }
      ]
    };
    setWorkflows([...workflows, newWorkflow]);
    openEditModal(newWorkflow);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Automations</h1>
          <p className="text-muted">Build and manage your automated WhatsApp workflows</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest">Twilio Active</span>
          </div>
          <button 
            onClick={handleNewWorkflow}
            className="bg-accent text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            <Plus size={20} />
            New Workflow
          </button>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="glass rounded-[2rem] p-8 space-y-6 flex flex-col justify-between group hover:border-accent/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-surface rounded-2xl text-accent border border-border group-hover:border-accent/20 transition-all">
                  {workflow.steps[0].icon && (() => {
                    const Icon = workflow.steps[0].icon;
                    return <Icon size={28} />;
                  })()}
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${workflow.enabled ? 'bg-accent' : 'bg-border'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${workflow.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold">{workflow.title}</h4>
                <p className="text-sm text-muted mt-2 leading-relaxed">{workflow.description}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
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
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Last run: 45m ago</span>
                <button 
                  onClick={() => openEditModal(workflow)}
                  className="text-sm font-bold text-accent hover:underline flex items-center gap-1"
                >
                  <Settings2 size={14} />
                  Edit Workflow
                </button>
              </div>
            </div>
          </div>
        ))}
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

      {/* Workflow Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedWorkflow && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full h-full glass rounded-[3rem] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 border-b border-border bg-surface/50 backdrop-blur-xl z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                    <Settings2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Workflow Canvas</h3>
                    <p className="text-muted text-sm">{selectedWorkflow.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Miro-like Toolbar */}
                  <div className="flex items-center gap-1 bg-surface p-1 rounded-2xl border border-border">
                    <button 
                      onClick={() => setIsPanning(false)}
                      className={`p-2 rounded-xl transition-all ${!isPanning ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
                      title="Select Mode"
                    >
                      <MousePointer2 size={18} />
                    </button>
                    <button 
                      onClick={() => setIsPanning(true)}
                      className={`p-2 rounded-xl transition-all ${isPanning ? 'bg-accent text-black' : 'text-muted hover:text-white'}`}
                      title="Pan Mode"
                    >
                      <Hand size={18} />
                    </button>
                    <div className="w-px h-4 bg-border mx-1"></div>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
                      className="p-2 text-muted hover:text-white hover:bg-surface-hover rounded-xl transition-all"
                    >
                      <ZoomOut size={18} />
                    </button>
                    <span className="text-xs font-bold w-12 text-center text-muted">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))}
                      className="p-2 text-muted hover:text-white hover:bg-surface-hover rounded-xl transition-all"
                    >
                      <ZoomIn size={18} />
                    </button>
                    <button 
                      onClick={() => setZoomLevel(1)}
                      className="p-2 text-muted hover:text-white hover:bg-surface-hover rounded-xl transition-all"
                    >
                      <Maximize2 size={18} />
                    </button>
                  </div>

                  <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-muted hover:text-white hover:bg-surface-hover rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Canvas Area */}
              <div className={`flex-1 relative overflow-hidden bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] ${isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}>
                <motion.div 
                  animate={{ scale: zoomLevel }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center min-h-full min-w-full p-20"
                >
                  <div className="flex flex-col items-center gap-4 min-w-[400px]">
                    {selectedWorkflow.steps.map((step: any, i: number) => (
                      <React.Fragment key={i}>
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-full max-w-md flex items-center gap-6 p-8 bg-surface/80 backdrop-blur-md rounded-[2rem] border border-border group hover:border-accent/50 transition-all shadow-2xl relative"
                        >
                          <div className={`p-5 rounded-[1.5rem] shadow-inner ${
                            step.type === 'trigger' ? 'bg-blue-500/10 text-blue-500' :
                            step.type === 'wait' ? 'bg-purple-500/10 text-purple-500' :
                            step.type === 'action' ? 'bg-accent/10 text-accent' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {(() => {
                              const Icon = step.icon;
                              return <Icon size={32} />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{step.type}</p>
                              <button className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                            </div>
                            <p className="text-xl font-bold">{step.label}</p>
                            {step.config?.templateId && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                                  Template: {step.config.templateId}
                                </span>
                                <span className="text-[10px] text-muted italic">Approved by Twilio</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Node Connection Points */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-border rounded-full border-4 border-surface group-hover:bg-accent transition-colors"></div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-border rounded-full border-4 border-surface group-hover:bg-accent transition-colors"></div>
                        </motion.div>
                        
                        {i < selectedWorkflow.steps.length - 1 && (
                          <div className="flex flex-col items-center gap-2 py-2">
                            <div className="w-0.5 h-12 bg-gradient-to-b from-border to-accent/20"></div>
                            <button className="w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:scale-110 transition-all shadow-lg">
                              <Plus size={16} />
                            </button>
                            <div className="w-0.5 h-12 bg-gradient-to-t from-border to-accent/20"></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-border bg-surface/50 backdrop-blur-xl z-20 flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Trigger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Action</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-8 py-4 bg-surface border border-border rounded-2xl font-bold hover:bg-surface-hover transition-all"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={() => {
                      alert('Workflow saved successfully!');
                      setIsEditModalOpen(false);
                    }}
                    className="px-12 py-4 bg-accent text-black rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                  >
                    Publish Workflow
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
