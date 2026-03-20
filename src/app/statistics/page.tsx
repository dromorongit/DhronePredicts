'use client'

import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts'
import { Trophy, TrendingUp, Target, Percent } from 'lucide-react'

const weeklyData = [
  { day: 'Mon', wins: 5, losses: 2 },
  { day: 'Tue', wins: 4, losses: 3 },
  { day: 'Wed', wins: 6, losses: 1 },
  { day: 'Thu', wins: 3, losses: 4 },
  { day: 'Fri', wins: 7, losses: 2 },
  { day: 'Sat', wins: 8, losses: 3 },
  { day: 'Sun', wins: 5, losses: 2 },
]

const marketTypeData = [
  { name: 'Over 2.5', value: 35, color: '#00ff87' },
  { name: 'BTTS/GG', value: 25, color: '#1f6feb' },
  { name: 'Bankers', value: 20, color: '#a855f7' },
  { name: 'Others', value: 20, color: '#6b7280' },
]

const monthlyTrend = [
  { month: 'Jan', winRate: 72 },
  { month: 'Feb', winRate: 78 },
  { month: 'Mar', winRate: 75 },
  { month: 'Apr', winRate: 82 },
  { month: 'May', winRate: 85 },
  { month: 'Jun', winRate: 80 },
]

const stats = [
  { 
    icon: Trophy, 
    label: 'Total Predictions', 
    value: '1,247',
    change: '+12%',
    positive: true 
  },
  { 
    icon: TrendingUp, 
    label: 'Win Rate', 
    value: '85%',
    change: '+5%',
    positive: true 
  },
  { 
    icon: Target, 
    label: 'Total Winnings', 
    value: '₵45,230',
    change: '+18%',
    positive: true 
  },
  { 
    icon: Percent, 
    label: 'ROI', 
    value: '156%',
    change: '+8%',
    positive: true 
  },
]

export default function StatisticsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Statistics</h1>
          <p className="text-textMuted">Track our performance and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-textMuted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Win Rate Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Win Rate Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3550" />
                  <XAxis dataKey="month" stroke="#8b949e" />
                  <YAxis stroke="#8b949e" domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121826', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#00ff87" 
                    strokeWidth={2}
                    dot={{ fill: '#00ff87' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Weekly Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3550" />
                  <XAxis dataKey="day" stroke="#8b949e" />
                  <YAxis stroke="#8b949e" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121826', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="wins" name="Wins" fill="#00ff87" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="losses" name="Losses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Market Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Predictions by Market Type</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {marketTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121826', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
