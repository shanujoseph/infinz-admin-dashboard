
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Eye, DollarSign, Calendar, User, CheckCircle, XCircle, Clock } from 'lucide-react';

const LoanRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [amountRange, setAmountRange] = useState('all');

  const loanRequests = [
    {
      id: 1,
      user: { name: 'John Doe', avatar: 'JD', id: 1 },
      amount: 15000,
      purpose: 'Home Renovation',
      status: 'pending',
      requestDate: '2024-01-15',
      interestRate: 5.5,
      duration: 24,
      creditScore: 720,
      monthlyIncome: 4500
    },
    {
      id: 2,
      user: { name: 'Jane Smith', avatar: 'JS', id: 2 },
      amount: 8500,
      purpose: 'Medical Emergency',
      status: 'approved',
      requestDate: '2024-01-14',
      interestRate: 4.8,
      duration: 18,
      creditScore: 780,
      monthlyIncome: 5200
    },
    {
      id: 3,
      user: { name: 'Mike Johnson', avatar: 'MJ', id: 3 },
      amount: 25000,
      purpose: 'Business Expansion',
      status: 'reviewing',
      requestDate: '2024-01-14',
      interestRate: null,
      duration: 36,
      creditScore: 690,
      monthlyIncome: 6000
    },
    {
      id: 4,
      user: { name: 'Sarah Wilson', avatar: 'SW', id: 4 },
      amount: 12000,
      purpose: 'Debt Consolidation',
      status: 'rejected',
      requestDate: '2024-01-13',
      interestRate: null,
      duration: 24,
      creditScore: 650,
      monthlyIncome: 3800
    },
    {
      id: 5,
      user: { name: 'David Brown', avatar: 'DB', id: 5 },
      amount: 18000,
      purpose: 'Education',
      status: 'approved',
      requestDate: '2024-01-13',
      interestRate: 5.2,
      duration: 30,
      creditScore: 750,
      monthlyIncome: 4800
    }
  ];

  const filteredRequests = loanRequests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    let matchesAmount = true;
    if (amountRange !== 'all') {
      const [min, max] = amountRange.split('-').map(Number);
      matchesAmount = request.amount >= min && (max ? request.amount <= max : true);
    }
    
    return matchesSearch && matchesStatus && matchesAmount;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'reviewing': return <Eye className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleApprove = (requestId: number) => {
    console.log('Approving request:', requestId);
    // Handle approval logic here
  };

  const handleReject = (requestId: number) => {
    console.log('Rejecting request:', requestId);
    // Handle rejection logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Requests</h2>
          <p className="text-gray-600">Review and manage all loan applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Bulk Actions</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">32</p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">$2.4M</p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={amountRange} onValueChange={setAmountRange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="0-10000">$0 - $10k</SelectItem>
                <SelectItem value="10000-20000">$10k - $20k</SelectItem>
                <SelectItem value="20000-50000">$20k - $50k</SelectItem>
                <SelectItem value="50000">$50k+</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loan Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-${request.user.id}.jpg`} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">{request.user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.user.name}</h3>
                    <p className="text-sm text-gray-600">{request.purpose}</p>
                    <p className="text-2xl font-bold text-blue-600">${request.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{request.status}</span>
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{request.requestDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{request.duration} months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Interest Rate</p>
                  <p className="font-medium">{request.interestRate ? `${request.interestRate}%` : 'TBD'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="font-medium">{request.creditScore}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Income</p>
                  <p className="font-medium">${request.monthlyIncome.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {request.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No loan requests found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanRequests;
