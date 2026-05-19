'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Edit, Trash2, Plus } from 'lucide-react'
import { mockProducts } from '@/lib/mockData'

// Mock dashboard data
const dashboardStats = [
  { label: 'Total Revenue', value: '$12,549', change: '+12.5%', icon: DollarSign, color: 'bg-blue-100' },
  { label: 'Orders', value: '324', change: '+8.2%', icon: ShoppingCart, color: 'bg-green-100' },
  { label: 'Products', value: mockProducts.length.toString(), change: '+4 new', icon: Package, color: 'bg-purple-100' },
  { label: 'Customers', value: '1,243', change: '+15.3%', icon: Users, color: 'bg-orange-100' },
]

const chartData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 221 },
  { month: 'Mar', revenue: 2000, orders: 229 },
  { month: 'Apr', revenue: 2780, orders: 200 },
  { month: 'May', revenue: 1890, orders: 229 },
  { month: 'Jun', revenue: 2390, orders: 200 },
  { month: 'Jul', revenue: 3490, orders: 210 },
]

const recentOrders = [
  { id: '#ORD-1001', customer: 'Sarah Mitchell', amount: '$299', status: 'Completed', date: '2 hours ago' },
  { id: '#ORD-1002', customer: 'James Chen', amount: '$449', status: 'Pending', date: '4 hours ago' },
  { id: '#ORD-1003', customer: 'Emma Johnson', amount: '$189', status: 'Completed', date: '1 day ago' },
  { id: '#ORD-1004', customer: 'Michael Rodriguez', amount: '$599', status: 'Shipped', date: '2 days ago' },
  { id: '#ORD-1005', customer: 'Lisa Anderson', amount: '$249', status: 'Completed', date: '3 days ago' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome back!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold mb-2">{stat.value}</p>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#c9a876" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Orders Chart */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Orders Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#1a1a1a" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">Manage Products</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card className="p-6">
              <div className="space-y-3">
                {mockProducts.slice(0, 8).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-secondary px-2 py-1 rounded">{product.category}</span>
                        <span className="text-xs text-muted-foreground">${product.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6 mt-6">
            <h2 className="font-serif text-xl font-bold">Order Management</h2>

            <Card className="p-6">
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer} • {order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">{order.amount}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
