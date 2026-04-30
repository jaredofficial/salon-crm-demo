import { 
  User, 
  Scissors, 
  Users, 
  Sparkles, 
  Droplets, 
  Wind,
  UserCircle
} from 'lucide-react';

export const services = [
  { id: '1', name: 'Haircut & Styling', price: 850, category: 'Hair', icon: Scissors, branchId: 'chandni' },
  { id: '2', name: 'Beard Trim', price: 350, category: 'Hair', icon: Scissors, branchId: 'chandni' },
  { id: '3', name: 'Full Coloring', price: 2500, category: 'Color', icon: Droplets, branchId: 'new-market' },
  { id: '4', name: 'Facial Treatment', price: 1200, category: 'Skin', icon: Sparkles, branchId: 'new-market' },
  { id: '5', name: 'Manicure', price: 600, category: 'Nails', icon: Wind, branchId: 'chandni' },
  { id: '6', name: 'Pedicure', price: 800, category: 'Nails', icon: Wind, branchId: 'new-market' },
];

export const staffMembers = [
  { 
    id: '1', 
    name: 'Rahul Sharma', 
    role: 'Senior Stylist', 
    revenue: 125000, 
    clients: 145, 
    rating: 4.9,
    phone: '+91 98765 43210',
    email: 'rahul@aionsalon.com',
    instagram: '@rahul_styles',
    repeatRate: '78%',
    topServices: ['Haircut', 'Coloring'],
    recentClients: ['Jared M.', 'Sarah W.', 'Amit K.'],
    branchId: 'chandni'
  },
  { 
    id: '2', 
    name: 'Priya Patel', 
    role: 'Skin Specialist', 
    revenue: 98000, 
    clients: 92, 
    rating: 4.8,
    phone: '+91 98765 43211',
    email: 'priya@aionsalon.com',
    instagram: '@priya_skin',
    repeatRate: '65%',
    topServices: ['Facial', 'Peel'],
    recentClients: ['Ananya S.', 'Rohan G.'],
    branchId: 'new-market'
  },
  { 
    id: '3', 
    name: 'Vikram Singh', 
    role: 'Barber', 
    revenue: 45000, 
    clients: 110, 
    rating: 4.7,
    phone: '+91 98765 43212',
    email: 'vikram@aionsalon.com',
    instagram: '@vikram_cuts',
    repeatRate: '82%',
    topServices: ['Beard Trim', 'Fade'],
    recentClients: ['Suresh P.', 'Deepak R.'],
    branchId: 'chandni'
  },
];

export const customers = [
  { id: '1', name: 'Jared Manuel', phone: '+919836682729', points: 450, email: 'jared@example.com', lastVisit: '2024-03-25', branchId: 'chandni', visits: 12, totalSpent: 8500, frequent: ['Haircut', 'Coloring'] },
  { id: '2', name: 'Sarah Wilson', phone: '+919876543210', points: 120, email: 'sarah@example.com', lastVisit: '2024-03-20', branchId: 'new-market', visits: 8, totalSpent: 4200, frequent: ['Beard Trim'] },
  { id: '3', name: 'Amit Kumar', phone: '+919876543211', points: 850, email: 'amit@example.com', lastVisit: '2024-03-28', branchId: 'chandni', visits: 15, totalSpent: 12000, frequent: ['Facial', 'Manicure'] },
  { id: '4', name: 'Ananya Singh', phone: '+919876543212', points: 300, email: 'ananya@example.com', lastVisit: '2024-03-15', branchId: 'new-market', visits: 5, totalSpent: 2500, frequent: ['Haircut'] },
];
