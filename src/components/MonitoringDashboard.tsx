import React, { useState } from 'react';
import { 
  Eye, 
  Mail, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const employeeData = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Engineering',
    role: 'Senior Developer',
    emailsReceived: 15,
    emailsOpened: 12,
    responsesGiven: 8,
    lastActivity: '2024-01-16 14:30',
    riskLevel: 'low',
    flags: ['External forward detected'],
    complianceScore: 85
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    department: 'Marketing',
    role: 'Marketing Manager',
    emailsReceived: 22,
    emailsOpened: 20,
    responsesGiven: 18,
    lastActivity: '2024-01-16 16:45',
    riskLevel: 'medium',
    flags: ['Late policy acknowledgment'],
    complianceScore: 72
  },
  {
    id: 3,
    name: 'Mike Johnson',
    department: 'Finance',
    role: 'Financial Analyst',
    emailsReceived: 8,
    emailsOpened: 8,
    responsesGiven: 8,
    lastActivity: '2024-01-16 09:15',
    riskLevel: 'low',
    flags: [],
    complianceScore: 98
  },
  {
    id: 4,
    name: 'Emily Chen',
    department: 'HR',
    role: 'HR Specialist',
    emailsReceived: 31,
    emailsOpened: 28,
    responsesGiven: 25,
    lastActivity: '2024-01-16 17:20',
    riskLevel: 'high',
    flags: ['Multiple policy violations', 'Suspicious access pattern'],
    complianceScore: 45
  },
  {
    id: 5,
    name: 'David Brown',
    department: 'Sales',
    role: 'Sales Representative',
    emailsReceived: 19,
    emailsOpened: 16,
    responsesGiven: 12,
    lastActivity: '2024-01-16 13:00',
    riskLevel: 'medium',
    flags: ['Delayed responses'],
    complianceScore: 67
  }
];

export function MonitoringDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredData = employeeData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesRisk = riskFilter === 'all' || employee.riskLevel === riskFilter;
    
    return matchesSearch && matchesDepartment && matchesRisk;
  });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getComplianceIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-success" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Monitoring</h1>
          <p className="text-muted-foreground">
            Track employee engagement and compliance behavior
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeData.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently monitored
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {employeeData.filter(e => e.riskLevel === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(employeeData.reduce((acc, e) => acc + e.complianceScore, 0) / employeeData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Organization average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (employeeData.reduce((acc, e) => acc + e.responsesGiven, 0) / 
                 employeeData.reduce((acc, e) => acc + e.emailsReceived, 0)) * 100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Emails</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.role}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{employee.emailsReceived} received</div>
                      <div className="text-muted-foreground">{employee.emailsOpened} opened</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{employee.responsesGiven} responses</div>
                      <div className="text-muted-foreground">
                        {Math.round((employee.responsesGiven / employee.emailsReceived) * 100)}% rate
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getComplianceIcon(employee.complianceScore)}
                      <span>{employee.complianceScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskBadgeColor(employee.riskLevel)}>
                      {employee.riskLevel.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {employee.flags.length > 0 ? (
                      <div className="space-y-1">
                        {employee.flags.map((flag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No flags</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(employee.lastActivity).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}