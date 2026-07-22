import AdminLayout from '@/shared/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, ShoppingCart, Package, List, LayoutGrid, Bell } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Dashboard({ counts, recentNotifications = [], monthlyOrders = [], monthlyUsers = [] }) {
    const stats = [
        { name: 'Total Users', value: counts?.users || 0, icon: Users, color: 'bg-blue-500' },
        { name: 'Total Orders', value: counts?.orders || 0, icon: ShoppingCart, color: 'bg-green-500' },
        { name: 'Total Products', value: counts?.products || 0, icon: Package, color: 'bg-purple-500' },
        { name: 'Categories', value: counts?.categories || 0, icon: LayoutGrid, color: 'bg-orange-500' },
        { name: 'Subcategories', value: counts?.subcategories || 0, icon: List, color: 'bg-pink-500' },
    ];

    return (
        <AdminLayout useDefaultPageLayout={false} className='p-6'>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                    <p className="text-gray-500">Overview of your store's performance and recent activity.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat) => (
                        <div key={stat.name} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:-translate-y-1">
                            <dt>
                                <div className={`absolute rounded-xl p-3 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline pb-1">
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </dd>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Orders Chart */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Monthly Orders</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyOrders} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <Tooltip 
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Users Chart */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">User Registrations</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyUsers} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#3B82F6' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
                    <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <Bell className="mr-2 h-5 w-5 text-gray-400" />
                            Recent Notifications
                        </h3>
                    </div>
                    <ul role="list" className="divide-y divide-gray-100">
                        {recentNotifications.length > 0 ? (
                            recentNotifications.map((notification) => (
                                <li key={notification.id} className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                                    <div className="flex justify-between gap-x-6">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{notification.title || 'Notification'}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{notification.description}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 flex flex-col items-end">
                                            <p className="text-sm leading-6 text-gray-900">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </p>
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className={`flex-none rounded-full p-1 ${notification.status === 'read' ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${notification.status === 'read' ? 'bg-green-500' : 'bg-blue-500'}`} />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500 capitalize">
                                                    {notification.status || 'new'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-6 py-8 text-center text-sm text-gray-500">
                                No recent notifications available.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
