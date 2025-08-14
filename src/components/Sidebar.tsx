import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  Mail, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Email Campaigns', href: '/campaigns', icon: Mail },
  { name: 'Employee Monitoring', href: '/monitoring', icon: Eye },
  { name: 'Alerts & Incidents', href: '/alerts', icon: AlertTriangle },
  { name: 'Employee Directory', href: '/employees', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-primary">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Shield className="h-8 w-8 text-primary-foreground" />
        <span className="ml-3 text-lg font-semibold text-primary-foreground">
          SecureWatch
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-primary-foreground hover:bg-primary-foreground/10'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}