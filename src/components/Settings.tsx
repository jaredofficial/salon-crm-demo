import React, { useState } from 'react';
import { 
  Database, 
  MessageSquare, 
  Target, 
  QrCode, 
  Save,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const [salonSettings, setSalonSettings] = useState({
    revenueGoal: '500000',
    upiId: 'salon@upi',
    salonName: 'Aion Salon & Spa',
    loyaltyPointsPerRupee: '1',
    defaultMessageCap: '5'
  });

  const [msg91Settings] = useState({
    authKey: '********************************',
    integratedNumber: import.meta.env.VITE_MSG91_INTEGRATED_NUMBER || '+910000000000'
  });

  const [supabaseSettings] = useState({
    url: import.meta.env.VITE_SUPABASE_URL || 'https://********.supabase.co',
    anonKey: '********************************'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted">Manage your salon configuration and integrations</p>
        </div>
        <button className="bg-accent text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Salon Configuration */}
        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="text-accent" size={24} />
            Salon Configuration
          </h3>
          <div className="space-y-4">
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
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Default WhatsApp Cap (Messages per Client)</label>
              <input 
                type="number" 
                value={salonSettings.defaultMessageCap}
                onChange={(e) => setSalonSettings({...salonSettings, defaultMessageCap: e.target.value})}
                className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* MSG91 Integration */}
        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="text-accent" size={24} />
            MSG91 WhatsApp
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Auth Key</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="text" 
                  readOnly
                  value={msg91Settings.authKey}
                  className="w-full bg-surface/50 border border-border rounded-xl py-3 pl-12 pr-4 cursor-not-allowed font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Integrated Number</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="text" 
                  readOnly
                  value={msg91Settings.integratedNumber}
                  className="w-full bg-surface/50 border border-border rounded-xl py-3 pl-12 pr-4 cursor-not-allowed font-mono text-xs"
                />
              </div>
            </div>
            <p className="text-[10px] text-muted italic">Credentials are managed via environment variables for security.</p>
          </div>
        </div>

        {/* Supabase Integration */}
        <div className="glass rounded-3xl p-8 space-y-6 md:col-span-2">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-accent" size={24} />
            Supabase Database
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Project URL</label>
              <input 
                type="text" 
                readOnly
                value={supabaseSettings.url}
                className="w-full bg-surface/50 border border-border rounded-xl py-3 px-4 cursor-not-allowed font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Anon Key</label>
              <input 
                type="text" 
                readOnly
                value={supabaseSettings.anonKey}
                className="w-full bg-surface/50 border border-border rounded-xl py-3 px-4 cursor-not-allowed font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
