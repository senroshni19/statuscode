import React, { useState } from 'react';

import { AlertTriangle, Shield, Clock, Search, Download, Eye, X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const AlertsIncidentsPage = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('All Severities');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 'SEC-001',
      title: 'Malware Detection',
      description: 'Suspicious executable file detected in system downloads',
      type: 'Security Incident',
      severity: 'CRITICAL',
      status: 'ACTIVE',
      timestamp: '2024-07-19 14:23:00',
      riskScore: 95,
      affectedSystems: ['WORKSTATION-01', 'FILE-SERVER-03'],
      actions: ['Quarantine File', 'Run Full Scan', 'Isolate System']
    },
    {
      id: 'NET-002',
      title: 'Network Intrusion Attempt',
      description: 'Multiple failed SSH connection attempts from external IP',
      type: 'Security Alert',
      severity: 'HIGH',
      status: 'INVESTIGATING',
      timestamp: '2024-07-19 13:45:00',
      riskScore: 87,
      affectedSystems: ['FIREWALL-01', 'SERVER-MAIN'],
      actions: ['Block IP Address', 'Review Logs', 'Update Security Rules']
    },
    {
      id: 'SYS-003',
      title: 'System Resource Alert',
      description: 'CPU usage exceeded 90% threshold for extended period',
      type: 'System Alert',
      severity: 'MEDIUM',
      status: 'ACKNOWLEDGED',
      timestamp: '2024-07-19 12:10:00',
      riskScore: 65,
      affectedSystems: ['DATABASE-SERVER-01'],
      actions: ['Scale Resources', 'Check Processes', 'Monitor Performance']
    },
    {
      id: 'DATA-004',
      title: 'Data Backup Failure',
      description: 'Automated backup process failed for critical databases',
      type: 'System Incident',
      severity: 'HIGH',
      status: 'RESOLVED',
      timestamp: '2024-07-19 09:30:00',
      riskScore: 78,
      affectedSystems: ['BACKUP-SERVER-01', 'DATABASE-CLUSTER'],
      actions: ['Manual Backup', 'Fix Backup Script', 'Verify Data Integrity']
    },
    {
      id: 'ACC-005',
      title: 'Unauthorized Access',
      description: 'Login attempt from restricted geographical location',
      type: 'Security Alert',
      severity: 'HIGH',
      status: 'ACTIVE',
      timestamp: '2024-07-19 11:15:00',
      riskScore: 82,
      affectedSystems: ['AUTHENTICATION-SERVER'],
      actions: ['Block Account', 'Verify Identity', 'Reset Credentials']
    },
    {
      id: 'APP-006',
      title: 'Application Error Spike',
      description: 'Critical application errors increased by 300%',
      type: 'Application Alert',
      severity: 'MEDIUM',
      status: 'INVESTIGATING',
      timestamp: '2024-07-19 10:45:00',
      riskScore: 71,
      affectedSystems: ['WEB-APP-01', 'API-GATEWAY'],
      actions: ['Check Application Logs', 'Restart Services', 'Contact Dev Team']
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-100 text-red-800';
      case 'INVESTIGATING': return 'bg-yellow-100 text-yellow-800';
      case 'ACKNOWLEDGED': return 'bg-blue-100 text-blue-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return <XCircle className="w-4 h-4" />;
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4" />;
      case 'MEDIUM':
        return <AlertCircle className="w-4 h-4" />;
      case 'LOW':
        return <Info className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Security Incident':
      case 'Security Alert':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'System Alert':
      case 'System Incident':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'Application Alert':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'All Severities' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All Status' || alert.status === selectedStatus;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Alerts & Incidents</h1>
            <p className="text-gray-600 mt-1">Monitor security alerts, system incidents and critical events</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">18</p>
                <p className="text-xs text-gray-500">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical/High</p>
                <p className="text-2xl font-semibold text-red-600">4</p>
                <p className="text-xs text-red-500">Require immediate action</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Investigation</p>
                <p className="text-2xl font-semibold text-yellow-600">3</p>
                <p className="text-xs text-yellow-600">Being analyzed</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-semibold text-green-600">12</p>
                <p className="text-xs text-green-600">Average: 2.5 hours</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts and incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Severities</option>
              <option>CRITICAL</option>
              <option>HIGH</option>
              <option>MEDIUM</option>
              <option>LOW</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>ACTIVE</option>
              <option>INVESTIGATING</option>
              <option>ACKNOWLEDGED</option>
              <option>RESOLVED</option>
            </select>
          </div>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Alert/Incident</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Severity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Risk Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                          {getSeverityIcon(alert.severity)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{alert.title}</p>
                          <p className="text-sm text-gray-600 max-w-xs truncate">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {alert.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(alert.type)}
                        <span className="text-sm font-medium text-gray-700">{alert.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              alert.riskScore >= 80 ? 'bg-red-500' : 
                              alert.riskScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${alert.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{alert.riskScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {alert.timestamp}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getTypeIcon(selectedAlert.type)}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedAlert.title}</h2>
                  <p className="text-sm text-gray-500">ID: {selectedAlert.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedAlert.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <p className="text-gray-900">{selectedAlert.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Severity</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(selectedAlert.severity)}`}>
                          {getSeverityIcon(selectedAlert.severity)}
                          {selectedAlert.severity}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAlert.status)}`}>
                          {selectedAlert.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Risk Score</label>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              selectedAlert.riskScore >= 80 ? 'bg-red-500' : 
                              selectedAlert.riskScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${selectedAlert.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{selectedAlert.riskScore}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Timestamp</label>
                      <p className="text-gray-900">{selectedAlert.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 mb-3 block">Affected Systems</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedSystems.map((system, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 mb-3 block">Recommended Actions</label>
                  <div className="space-y-2">
                    {selectedAlert.actions.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{action}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Execute
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Acknowledge
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                  Assign
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
                  Escalate
                </button>
                <button className="px-4 py-2 text-green-600 hover:text-green-800 border border-green-300 rounded-lg">
                  Resolve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsIncidentsPage;