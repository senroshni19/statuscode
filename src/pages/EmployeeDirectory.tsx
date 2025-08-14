import React, { useState, useMemo } from 'react';
import { Search, Users, Mail, Phone, MapPin, Shield, Filter, Download, Eye } from 'lucide-react';

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 0123',
      department: 'Security',
      position: 'Security Analyst',
      location: 'New York, NY',
      status: 'Active',
      avatar: 'SW',
      lastLogin: '2 hours ago',
      riskLevel: 'LOW'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 0124',
      department: 'IT',
      position: 'System Administrator',
      location: 'San Francisco, CA',
      status: 'Active',
      avatar: 'MJ',
      lastLogin: '1 hour ago',
      riskLevel: 'LOW'
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 0125',
      department: 'Operations',
      position: 'Operations Manager',
      location: 'Chicago, IL',
      status: 'Active',
      avatar: 'JD',
      lastLogin: '3 minutes ago',
      riskLevel: 'HIGH'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      phone: '+1 (555) 0126',
      department: 'HR',
      position: 'HR Specialist',
      location: 'Austin, TX',
      status: 'Away',
      avatar: 'EC',
      lastLogin: '1 day ago',
      riskLevel: 'MEDIUM'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.rodriguez@company.com',
      phone: '+1 (555) 0127',
      department: 'Finance',
      position: 'Financial Analyst',
      location: 'Miami, FL',
      status: 'Active',
      avatar: 'DR',
      lastLogin: '30 minutes ago',
      riskLevel: 'LOW'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@company.com',
      phone: '+1 (555) 0128',
      department: 'Marketing',
      position: 'Marketing Director',
      location: 'Los Angeles, CA',
      status: 'Inactive',
      avatar: 'LT',
      lastLogin: '5 days ago',
      riskLevel: 'MEDIUM'
    }
  ];

  const departments = ['All', ...new Set(employees.map(emp => emp.department))];
  const statuses = ['All', 'Active', 'Away', 'Inactive'];

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchTerm, departmentFilter, statusFilter, employees]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Away': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Inactive': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return `px-2 py-1 text-xs font-medium rounded-md border ${statusStyles[status]}`;
  };

  const getRiskBadge = (risk) => {
    const riskStyles = {
      'LOW': 'bg-green-100 text-green-800',
      'MEDIUM': 'bg-yellow-100 text-yellow-800',
      'HIGH': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded ${riskStyles[risk]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-blue-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <Shield className="w-6 h-6" />
            <span className="text-xl font-bold">SecureWatch</span>
          </div>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded bg-blue-800">
              <Users className="w-4 h-4" />
              <span>Employee Directory</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 cursor-pointer">
              <div className="w-4 h-4 border-2 border-current rounded"></div>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>Email Campaigns</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 cursor-pointer">
              <Eye className="w-4 h-4" />
              <span>Employee Monitoring</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-60 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
            <p className="text-gray-600">Manage and monitor employee information</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export Directory</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{employees.filter(e => e.status === 'Active').length}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold">{departments.length - 1}</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold">{employees.filter(e => e.riskLevel === 'HIGH').length}</p>
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg border mb-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {employee.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <span className={getRiskBadge(employee.riskLevel)}>{employee.riskLevel}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{employee.position}</p>
                  <p className="text-sm text-gray-600 mb-3">{employee.department}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{employee.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className={getStatusBadge(employee.status)}>{employee.status}</span>
                    <span className="text-xs text-gray-500">Last login: {employee.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDirectory;