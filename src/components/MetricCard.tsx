import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  status?: 'safe' | 'warning' | 'danger';
}

export function MetricCard({ title, value, change, icon: Icon, status }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'safe':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'danger':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendColor = () => {
    if (!change) return '';
    switch (change.trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          {status && (
            <Badge variant="secondary" className={getStatusColor()}>
              {status.toUpperCase()}
            </Badge>
          )}
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getTrendColor()}`}>
            {change.trend === 'up' ? '↗' : change.trend === 'down' ? '↘' : '→'} {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}