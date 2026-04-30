import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Plus, 
  Search,
  Instagram,
  Phone,
  Mail,
  User,
  ChevronRight,
  X,
  PieChart,
  Repeat,
  Trophy,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { staffMembers } from '../data/mockData';

export default function StaffTracking({ branchId }: { branchId: string }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    phone: '',
    role: '',
    email: '',
    instagram: ''
  });

  const branchStaff = staffMembers.filter(s => s.branchId === branchId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Performance</h1>
          <p className="text-muted">Track and manage your team's productivity</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-accent text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-accent/20"
        >
          <Plus size={20} />
          Add Staff Member
        </button>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border-l-4 border-accent">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-accent/10 rounded-2xl text-accent">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Top Earner</p>
              <p className="text-lg font-bold">Rahul Sharma</p>
            </div>
          </div>
          <p className="text-3xl font-bold">₹1.25L</p>
        </div>
        <div className="glass p-6 rounded-3xl border-l-4 border-purple-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Highest Rated</p>
              <p className="text-lg font-bold">Rahul Sharma</p>
            </div>
          </div>
          <p className="text-3xl font-bold">4.9/5.0</p>
        </div>
        <div className="glass p-6 rounded-3xl border-l-4 border-pink-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-500">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">Most Clients</p>
              <p className="text-lg font-bold">Rahul Sharma</p>
            </div>
          </div>
          <p className="text-3xl font-bold">145</p>
        </div>
      </div>

      {/* Staff List */}
      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold">Team Directory</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full bg-surface border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted">Staff Member</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted">Role</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted">Revenue</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted">Clients</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-muted">Rating</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {branchStaff.map((staff) => (
                <tr 
                  key={staff.id} 
                  onClick={() => setSelectedStaff(staff)}
                  className="border-b border-border/50 hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold">
                        {staff.name[0]}
                      </div>
                      <span className="font-bold">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-muted text-sm">{staff.role}</td>
                  <td className="px-8 py-6 font-bold text-accent">₹{staff.revenue.toLocaleString()}</td>
                  <td className="px-8 py-6 text-sm">{staff.clients}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1 text-accent">
                      <Star size={14} fill="currentColor" />
                      <span className="font-bold text-sm">{staff.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <ChevronRight size={20} className="text-muted group-hover:text-white transition-all" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass rounded-[2.5rem] p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Add Staff Member</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Full Name</label>
                  <input 
                    type="text" 
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Phone Number</label>
                  <input 
                    type="text" 
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Role</label>
                  <input 
                    type="text" 
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    placeholder="e.g. Senior Stylist"
                    className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Email</label>
                  <input 
                    type="email" 
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Instagram ID</label>
                  <input 
                    type="text" 
                    value={newStaff.instagram}
                    onChange={(e) => setNewStaff({...newStaff, instagram: e.target.value})}
                    placeholder="@username"
                    className="w-full bg-surface border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => {
                    alert('Staff member added successfully!');
                    setIsAddModalOpen(false);
                    setNewStaff({ name: '', phone: '', role: '', email: '', instagram: '' });
                  }}
                  className="flex-1 bg-accent text-black py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all"
                >
                  Save Staff Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Staff Details Modal */}
      <AnimatePresence>
        {selectedStaff && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStaff(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass rounded-[3rem] p-10 space-y-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-accent flex items-center justify-center text-black text-4xl font-bold">
                    {selectedStaff.name[0]}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{selectedStaff.name}</h3>
                    <p className="text-accent font-bold">{selectedStaff.role}</p>
                    <div className="flex gap-4 mt-3">
                      <a href={`tel:${selectedStaff.phone}`} className="p-2 bg-surface rounded-xl text-muted hover:text-white transition-all"><Phone size={18} /></a>
                      <a href={`mailto:${selectedStaff.email}`} className="p-2 bg-surface rounded-xl text-muted hover:text-white transition-all"><Mail size={18} /></a>
                      <a href={`https://instagram.com/${selectedStaff.instagram.replace('@', '')}`} target="_blank" className="p-2 bg-surface rounded-xl text-muted hover:text-white transition-all"><Instagram size={18} /></a>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedStaff(null)} className="text-muted hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface p-4 rounded-2xl border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Total Revenue</p>
                  <p className="text-xl font-bold text-accent">₹{selectedStaff.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-surface p-4 rounded-2xl border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Repeat Rate</p>
                  <p className="text-xl font-bold flex items-center gap-2">
                    <Repeat size={18} className="text-purple-500" />
                    {selectedStaff.repeatRate}
                  </p>
                </div>
                <div className="bg-surface p-4 rounded-2xl border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Total Clients</p>
                  <p className="text-xl font-bold">{selectedStaff.clients}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <PieChart size={18} className="text-accent" />
                    Revenue Breakdown
                  </h4>
                  <div className="space-y-3">
                    {selectedStaff.topServices.map((service: string, i: number) => (
                      <div key={service} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{service}</span>
                          <span className="font-bold">{80 - i * 20}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${80 - i * 20}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Users size={18} className="text-purple-500" />
                    Repeat Clients
                  </h4>
                  <div className="space-y-2">
                    {selectedStaff.recentClients.map((client: string) => (
                      <div key={client} className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs font-bold">
                          {client[0]}
                        </div>
                        <span className="text-sm font-medium">{client}</span>
                        <span className="ml-auto text-[10px] bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full">VIP</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Star({ size, fill }: { size: number, fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
