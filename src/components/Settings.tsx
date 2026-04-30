import React, { useState } from 'react';
import { 
  Target, 
  QrCode, 
  Save,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const [salonSettings, setSalonSettings] = useState({
    revenueGoal: '500000',
    upiId: 'roy.rahul11101@okhdfcbank',
    salonName: 'Aion Salon & Spa',
    loyaltyPointsPerRupee: '1',
    defaultMessageCap: '5'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted">Manage your salon configuration</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
            isSaved ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-accent text-accent-foreground shadow-accent/20 hover:opacity-90'
          }`}
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : isSaved ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Salon Configuration */}
        <div className="glass rounded-[2rem] p-8 space-y-6 md:col-span-2 max-w-2xl">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="text-accent" size={24} />
            Salon Configuration
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Monthly Revenue Goal (₹)</label>
              <input 
                type="text" 
                value={salonSettings.revenueGoal}
                onChange={(e) => setSalonSettings({...salonSettings, revenueGoal: e.target.value})}
                className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">UPI ID for QR Code</label>
              <div className="relative">
                <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="text" 
                  value={salonSettings.upiId}
                  onChange={(e) => setSalonSettings({...salonSettings, upiId: e.target.value})}
                  className="w-full bg-surface border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Loyalty Points (Points per ₹100)</label>
                <input 
                  type="number" 
                  value={salonSettings.loyaltyPointsPerRupee}
                  onChange={(e) => setSalonSettings({...salonSettings, loyaltyPointsPerRupee: e.target.value})}
                  className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Default WhatsApp Cap</label>
                <input 
                  type="number" 
                  value={salonSettings.defaultMessageCap}
                  onChange={(e) => setSalonSettings({...salonSettings, defaultMessageCap: e.target.value})}
                  className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
