import React from 'react';
import { 
  Shield, 
  Mail, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Activity,
  Clock,
  FileX
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const recentAlerts = [
  {
    id: 1,
    type: 'Suspicious Email Forward',
    employee: 'John Doe',
    severity: 'high',
    time: '2 minutes ago',
    description: 'Employee forwarded confidential policy update to external email'
  },
  {
    id: 2,
    type: 'Policy Violation',
    employee: 'Sarah Wilson',
    severity: 'medium',
    time: '15 minutes ago',
    description: 'Failed to acknowledge security policy within required timeframe'
  },
  {
    id: 3,
    type: 'Anomalous Access',
    employee: 'Mike Johnson',
    severity: 'low',
    time: '1 hour ago',
    description: 'Unusual login pattern detected outside normal hours'
  }
];

const activeCampaigns = [
  {
    id: 1,
    name: 'Q4 Security Policy Update',
    sent: 1250,
    opened: 980,
    responded: 750,
    status: 'active'
  },
  {
    id: 2,
    name: 'Phishing Simulation Test',
    sent: 800,
    opened: 650,
    responded: 520,
    status: 'active'
  },
  {
    id: 3,
    name: 'Data Handling Guidelines',
    sent: 1100,
    opened: 890,
    responded: 670,
    status: 'completed'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor corporate compliance and detect potential malpractice
          </p>
        </div>
        <Button>Generate Report</Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Employees Monitored"
          value="1,847"
          change={{ value: '+12% from last month', trend: 'up' }}
          icon={Users}
          status="safe"
        />
        <MetricCard
          title="Active Alerts"
          value="23"
          change={{ value: '+3 from yesterday', trend: 'up' }}
          icon={AlertTriangle}
          status="warning"
        />
        <MetricCard
          title="Email Campaigns Active"
          value="8"
          change={{ value: '2 completed today', trend: 'neutral' }}
          icon={Mail}
          status="safe"
        />
        <MetricCard
          title="Policy Compliance Rate"
          value="94.2%"
          change={{ value: '+2.1% this week', trend: 'up' }}
          icon={Shield}
          status="safe"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.type}</p>
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : 
                                alert.severity === 'medium' ? 'secondary' : 'outline'}
                        className={alert.severity === 'high' ? 'bg-destructive text-destructive-foreground' :
                                  alert.severity === 'medium' ? 'bg-warning text-warning-foreground' : ''}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alert.employee} • {alert.time}
                    </p>
                    <p className="text-sm mt-1">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Active Email Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sent</p>
                      <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Opened</p>
                      <p className="font-medium">
                        {campaign.opened.toLocaleString()} ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Responded</p>
                      <p className="font-medium">
                        {campaign.responded.toLocaleString()} ({Math.round((campaign.responded / campaign.sent) * 100)}%)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Response Time (Avg)"
          value="2.4h"
          change={{ value: '-0.3h faster', trend: 'up' }}
          icon={Clock}
          status="safe"
        />
        <MetricCard
          title="Policy Violations"
          value="12"
          change={{ value: '-5 from last week', trend: 'down' }}
          icon={FileX}
          status="warning"
        />
        <MetricCard
          title="External Forwards"
          value="38"
          change={{ value: '+8 flagged today', trend: 'up' }}
          icon={TrendingUp}
          status="danger"
        />
        <MetricCard
          title="System Health"
          value="99.8%"
          change={{ value: 'Optimal performance', trend: 'neutral' }}
          icon={Activity}
          status="safe"
        />
      </div>
    </div>
  );
}