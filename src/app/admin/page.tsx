'use client'

import React, { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Trophy, 
  Crown, 
  Settings, 
  BarChart3, 
  Lock,
  Plus,
  Trash2,
  Edit,
  Eye,
  Bell
} from 'lucide-react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [predictions, setPredictions] = useState<any[]>([])
  const [predictionsLoading, setPredictionsLoading] = useState(false)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [showPredictionForm, setShowPredictionForm] = useState(false)
  const [editingPrediction, setEditingPrediction] = useState<any>(null)
  const [predictionFormData, setPredictionFormData] = useState({
    sport: 'FOOTBALL',
    league: '',
    homeTeam: '',
    awayTeam: '',
    prediction: '',
    odds: '',
    confidence: 'MEDIUM',
    matchTime: '',
    marketType: 'FREE_BETS',
    isVvip: false
  })

  // Users state
  const [users, setUsers] = useState<any[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersPagination, setUsersPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [userSearch, setUserSearch] = useState('')

  // Subscriptions state
  const [payments, setPayments] = useState<any[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [paymentsPagination, setPaymentsPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [subscriptionStats, setSubscriptionStats] = useState<any>({ totalRevenue: 0, subscriptionStats: [] })

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/')
    }
  }, [session, status, router])

  // Fetch dashboard data
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetch('/api/admin/dashboard')
        .then(res => res.json())
        .then(data => setDashboardData(data))
        .catch(err => console.error('Error fetching dashboard data:', err))
    }
  }, [activeTab])

  // Fetch predictions
  useEffect(() => {
    if (activeTab === 'predictions') {
      setPredictionsLoading(true)
      fetch(`/api/admin/predictions?page=${pagination.page}&limit=${pagination.limit}`)
        .then(res => res.json())
        .then(data => {
          setPredictions(data.predictions || [])
          setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          setPredictionsLoading(false)
        })
        .catch(err => {
          console.error('Error fetching predictions:', err)
          setPredictionsLoading(false)
        })
    }
  }, [activeTab, pagination.page, pagination.limit])

  // Handle prediction form submit
  const handlePredictionSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const url = editingPrediction ? '/api/admin/predictions' : '/api/admin/predictions'
      const method = editingPrediction ? 'PUT' : 'POST'
      const body = editingPrediction
        ? { id: editingPrediction.id, ...predictionFormData }
        : predictionFormData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.ok) {
        setShowPredictionForm(false)
        setEditingPrediction(null)
        setPredictionFormData({
          sport: 'FOOTBALL',
          league: '',
          homeTeam: '',
          awayTeam: '',
          prediction: '',
          odds: '',
          confidence: 'MEDIUM',
          matchTime: '',
          marketType: 'FREE_BETS',
          isVvip: false
        })
        // Refresh predictions
        fetch(`/api/admin/predictions?page=${pagination.page}&limit=${pagination.limit}`)
          .then(res => res.json())
          .then(data => {
            setPredictions(data.predictions || [])
            setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error saving prediction:', err)
    }
  }

  // Handle delete prediction
  const handleDeletePrediction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prediction?')) return
    try {
      const res = await fetch(`/api/admin/predictions?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        // Refresh predictions
        fetch(`/api/admin/predictions?page=${pagination.page}&limit=${pagination.limit}`)
          .then(res => res.json())
          .then(data => {
            setPredictions(data.predictions || [])
            setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error deleting prediction:', err)
    }
  }

  // Handle toggle VIP
  const handleToggleVip = async (id: string, isVvip: boolean) => {
    try {
      const res = await fetch('/api/admin/predictions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isVvip: !isVvip })
      })
      if (res.ok) {
        // Refresh predictions
        fetch(`/api/admin/predictions?page=${pagination.page}&limit=${pagination.limit}`)
          .then(res => res.json())
          .then(data => {
            setPredictions(data.predictions || [])
            setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error toggling VIP:', err)
    }
  }

  // Handle update result
  const handleUpdateResult = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/predictions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        // Refresh predictions
        fetch(`/api/admin/predictions?page=${pagination.page}&limit=${pagination.limit}`)
          .then(res => res.json())
          .then(data => {
            setPredictions(data.predictions || [])
            setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error updating result:', err)
    }
  }

  // Fetch users
  useEffect(() => {
    if (activeTab === 'users') {
      setUsersLoading(true)
      fetch(`/api/admin/users?page=${usersPagination.page}&limit=${usersPagination.limit}&search=${userSearch}`)
        .then(res => res.json())
        .then(data => {
          setUsers(data.users || [])
          setUsersPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          setUsersLoading(false)
        })
        .catch(err => {
          console.error('Error fetching users:', err)
          setUsersLoading(false)
        })
    }
  }, [activeTab, usersPagination.page, usersPagination.limit, userSearch])

  // Handle toggle role
  const handleToggleRole = async (id: string, role: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: role === 'ADMIN' ? 'USER' : 'ADMIN' })
      })
      if (res.ok) {
        fetch(`/api/admin/users?page=${usersPagination.page}&limit=${usersPagination.limit}&search=${userSearch}`)
          .then(res => res.json())
          .then(data => {
            setUsers(data.users || [])
            setUsersPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error toggling role:', err)
    }
  }

  // Handle toggle ban
  const handleToggleBan = async (id: string, isBanned: boolean) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isBanned: !isBanned })
      })
      if (res.ok) {
        fetch(`/api/admin/users?page=${usersPagination.page}&limit=${usersPagination.limit}&search=${userSearch}`)
          .then(res => res.json())
          .then(data => {
            setUsers(data.users || [])
            setUsersPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error toggling ban:', err)
    }
  }

  // Handle delete user
  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetch(`/api/admin/users?page=${usersPagination.page}&limit=${usersPagination.limit}&search=${userSearch}`)
          .then(res => res.json())
          .then(data => {
            setUsers(data.users || [])
            setUsersPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  // Handle reset password
  const handleResetPassword = async (id: string) => {
    const newPassword = prompt('Enter new password:')
    if (!newPassword) return
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newPassword })
      })
      if (res.ok) {
        alert('Password reset successfully')
      }
    } catch (err) {
      console.error('Error resetting password:', err)
    }
  }

  // Handle activate/deactivate subscription
  const handleToggleSubscription = async (id: string, isActive: boolean, tier: string) => {
    const endDate = prompt('Enter subscription end date (YYYY-MM-DD):', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    if (!endDate) return
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, subscription: { tier, isActive: !isActive, endDate } })
      })
      if (res.ok) {
        fetch(`/api/admin/users?page=${usersPagination.page}&limit=${usersPagination.limit}&search=${userSearch}`)
          .then(res => res.json())
          .then(data => {
            setUsers(data.users || [])
            setUsersPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          })
      }
    } catch (err) {
      console.error('Error toggling subscription:', err)
    }
  }

  // Fetch payments
  useEffect(() => {
    if (activeTab === 'subscriptions') {
      setPaymentsLoading(true)
      fetch(`/api/admin/subscriptions?page=${paymentsPagination.page}&limit=${paymentsPagination.limit}`)
        .then(res => res.json())
        .then(data => {
          setPayments(data.payments || [])
          setPaymentsPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
          setSubscriptionStats(data.stats || { totalRevenue: 0, subscriptionStats: [] })
          setPaymentsLoading(false)
        })
        .catch(err => {
          console.error('Error fetching payments:', err)
          setPaymentsLoading(false)
        })
    }
  }, [activeTab, paymentsPagination.page, paymentsPagination.limit])

  // Handle update payment status
  const handleUpdatePaymentStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/subscriptions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        fetch(`/api/admin/subscriptions?page=${paymentsPagination.page}&limit=${paymentsPagination.limit}`)
          .then(res => res.json())
          .then(data => {
            setPayments(data.payments || [])
            setPaymentsPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
            setSubscriptionStats(data.stats || { totalRevenue: 0, subscriptionStats: [] })
          })
      }
    } catch (err) {
      console.error('Error updating payment status:', err)
    }
  }

  if (status === 'loading' || !session || session.user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'predictions', label: 'Predictions', icon: Trophy },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: Crown },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-textMuted">Manage your predictions platform</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-black'
                  : 'bg-surface text-textMuted hover:text-text'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <div className="text-2xl font-bold mb-1">{dashboardData?.totalUsers || 0}</div>
                <div className="text-sm text-textMuted">Total Users</div>
              </div>
              <div className="glass rounded-xl p-6">
                <Crown className="w-8 h-8 text-vvip mb-3" />
                <div className="text-2xl font-bold mb-1">{dashboardData?.activeVipUsers || 0}</div>
                <div className="text-sm text-textMuted">Active VIP Users</div>
              </div>
              <div className="glass rounded-xl p-6">
                <Trophy className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-2xl font-bold mb-1">{dashboardData?.predictionsToday || 0}</div>
                <div className="text-sm text-textMuted">Predictions Today</div>
              </div>
              <div className="glass rounded-xl p-6">
                <BarChart3 className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold mb-1">{dashboardData?.winRate || 0}%</div>
                <div className="text-sm text-textMuted">Win Rate</div>
              </div>
            </div>

            {/* Revenue */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="font-semibold">Total Revenue</h3>
                  <p className="text-sm text-textMuted">Total revenue from subscriptions</p>
                </div>
                <div className="ml-auto text-2xl font-bold">
                  ${dashboardData?.totalRevenue || 0}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {dashboardData?.recentActivity?.length > 0 ? (
                  dashboardData.recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-medium">{activity.match}</div>
                        <div className="text-sm text-textMuted">{activity.prediction}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-md text-xs ${
                          activity.status === 'WON' ? 'bg-green-500/20 text-green-400' :
                          activity.status === 'LOST' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {activity.status}
                        </span>
                        <div className="text-xs text-textMuted mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-textMuted">No recent activity</p>
                )}
              </div>
            </div>

            {/* Website Lock */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-textMuted" />
                  <div>
                    <h3 className="font-semibold">Website Lock</h3>
                    <p className="text-sm text-textMuted">Lock the website for maintenance</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-surfaceLight rounded-lg text-sm hover:bg-surface transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'predictions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Manage Predictions</h2>
              <button 
                onClick={() => setShowPredictionForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Prediction</span>
              </button>
            </div>
            {predictionsLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surfaceLight">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Match</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Prediction</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Odds</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">VIP</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {predictions.map((pred: any) => (
                      <tr key={pred.id}>
                        <td className="px-6 py-4">{pred.homeTeam} vs {pred.awayTeam}</td>
                        <td className="px-6 py-4">{pred.prediction}</td>
                        <td className="px-6 py-4">{pred.odds}</td>
                        <td className="px-6 py-4">
                          <select
                            value={pred.status}
                            onChange={(e: any) => handleUpdateResult(pred.id, e.target.value)}
                            className="px-2 py-1 rounded-md text-xs bg-yellow-500/20 text-yellow-400 border-none"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="WON">Won</option>
                            <option value="LOST">Lost</option>
                            <option value="VOID">Void</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleVip(pred.id, pred.isVvip)}
                            className={`px-2 py-1 rounded-md text-xs ${pred.isVvip ? 'bg-vvip/20 text-vvip' : 'bg-surfaceLight text-textMuted'}`}
                          >
                            {pred.isVvip ? 'VIP' : 'Free'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setEditingPrediction(pred)
                                setPredictionFormData({
                                  sport: pred.sport,
                                  league: pred.league,
                                  homeTeam: pred.homeTeam,
                                  awayTeam: pred.awayTeam,
                                  prediction: pred.prediction,
                                  odds: pred.odds.toString(),
                                  confidence: pred.confidence,
                                  matchTime: new Date(pred.matchTime).toISOString().slice(0, 16),
                                  marketType: pred.marketType,
                                  isVvip: pred.isVvip
                                })
                                setShowPredictionForm(true)
                              }}
                              className="p-2 hover:bg-surfaceLight rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeletePrediction(pred.id)}
                              className="p-2 hover:bg-surfaceLight rounded-lg transition-colors text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-white/5">
                  <div className="text-sm text-textMuted">
                    Showing page {pagination.page} of {pagination.pages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                      disabled={pagination.page === 1}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                      disabled={pagination.page === pagination.pages}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Prediction Form Modal */}
        {showPredictionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="glass rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{editingPrediction ? 'Edit Prediction' : 'Add Prediction'}</h3>
                <button onClick={() => { setShowPredictionForm(false); setEditingPrediction(null) }} className="text-textMuted hover:text-text">
                  ✕
                </button>
              </div>
              <form onSubmit={handlePredictionSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Sport</label>
                    <select
                      value={predictionFormData.sport}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, sport: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    >
                      <option value="FOOTBALL">Football</option>
                      <option value="BASKETBALL">Basketball</option>
                      <option value="TENNIS">Tennis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Market Type</label>
                    <select
                      value={predictionFormData.marketType}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, marketType: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    >
                      <option value="FREE_BETS">Free Bets</option>
                      <option value="BANKERS">Bankers</option>
                      <option value="FREE_2_ODDS">Free 2 Odds</option>
                      <option value="SUPER_SINGLE">Super Single</option>
                      <option value="OVER_1_5">Over 1.5</option>
                      <option value="OVER_2_5">Over 2.5</option>
                      <option value="BTTS_GG">BTTS GG</option>
                      <option value="OVER_3_5">Over 3.5</option>
                      <option value="DOUBLE_CHANCE">Double Chance</option>
                      <option value="CORNERS">Corners</option>
                      <option value="CORRECT_SCORES">Correct Scores</option>
                      <option value="DRAWS">Draws</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">League</label>
                  <input
                    type="text"
                    value={predictionFormData.league}
                    onChange={(e: any) => setPredictionFormData({ ...predictionFormData, league: e.target.value })}
                    className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Home Team</label>
                    <input
                      type="text"
                      value={predictionFormData.homeTeam}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, homeTeam: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Away Team</label>
                    <input
                      type="text"
                      value={predictionFormData.awayTeam}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, awayTeam: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Prediction</label>
                  <input
                    type="text"
                    value={predictionFormData.prediction}
                    onChange={(e: any) => setPredictionFormData({ ...predictionFormData, prediction: e.target.value })}
                    className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Odds</label>
                    <input
                      type="number"
                      step="0.01"
                      value={predictionFormData.odds}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, odds: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textMuted mb-1">Confidence</label>
                    <select
                      value={predictionFormData.confidence}
                      onChange={(e: any) => setPredictionFormData({ ...predictionFormData, confidence: e.target.value })}
                      className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-1">Match Time</label>
                  <input
                    type="datetime-local"
                    value={predictionFormData.matchTime}
                    onChange={(e: any) => setPredictionFormData({ ...predictionFormData, matchTime: e.target.value })}
                    className="w-full px-3 py-2 bg-surfaceLight rounded-lg text-text"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isVvip"
                    checked={predictionFormData.isVvip}
                    onChange={(e: any) => setPredictionFormData({ ...predictionFormData, isVvip: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="isVvip" className="text-sm text-textMuted">VIP Prediction</label>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingPrediction ? 'Update Prediction' : 'Create Prediction'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Manage Users</h2>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e: any) => setUserSearch(e.target.value)}
                className="w-full px-4 py-2 bg-surfaceLight border border-white/5 rounded-lg text-text focus:outline-none focus:border-primary/50"
              />
            </div>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surfaceLight">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">User</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Subscription</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Joined</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user: any) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{user.name || 'N/A'}</div>
                            <div className="text-sm text-textMuted">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleRole(user.id, user.role)}
                            className={`px-2 py-1 rounded-md text-xs ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-surfaceLight text-textMuted'}`}
                          >
                            {user.role}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {user.subscription ? (
                            <button
                              onClick={() => handleToggleSubscription(user.id, user.subscription.isActive, user.subscription.tier)}
                              className={`px-2 py-1 rounded-md text-xs ${user.subscription.isActive ? 'bg-vvip/20 text-vvip' : 'bg-red-500/20 text-red-400'}`}
                            >
                              {user.subscription.tier} ({user.subscription.isActive ? 'Active' : 'Inactive'})
                            </button>
                          ) : (
                            <span className="text-textMuted">No Subscription</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-textMuted">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleBan(user.id, user.isBanned)}
                              className={`p-2 hover:bg-surfaceLight rounded-lg transition-colors ${user.isBanned ? 'text-red-400' : 'text-textMuted'}`}
                              title={user.isBanned ? 'Unban User' : 'Ban User'}
                            >
                              <Lock className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleResetPassword(user.id)}
                              className="p-2 hover:bg-surfaceLight rounded-lg transition-colors text-textMuted"
                              title="Reset Password"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 hover:bg-surfaceLight rounded-lg transition-colors text-red-400"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-white/5">
                  <div className="text-sm text-textMuted">
                    Showing page {usersPagination.page} of {usersPagination.pages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setUsersPagination({ ...usersPagination, page: usersPagination.page - 1 })}
                      disabled={usersPagination.page === 1}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setUsersPagination({ ...usersPagination, page: usersPagination.page + 1 })}
                      disabled={usersPagination.page === usersPagination.pages}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'subscriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Manage Subscriptions</h2>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="glass rounded-xl p-6">
                <Crown className="w-8 h-8 text-vvip mb-3" />
                <div className="text-2xl font-bold mb-1">${subscriptionStats.totalRevenue}</div>
                <div className="text-sm text-textMuted">Total Revenue</div>
              </div>
              {subscriptionStats.subscriptionStats?.map((stat: any) => (
                <div key={stat.tier} className="glass rounded-xl p-6">
                  <Crown className="w-8 h-8 text-vvip mb-3" />
                  <div className="text-2xl font-bold mb-1">{stat._count}</div>
                  <div className="text-sm text-textMuted">{stat.tier} Subscribers</div>
                </div>
              ))}
            </div>
            {/* Payments Table */}
            {paymentsLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surfaceLight">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">User</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Tier</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {payments.map((payment: any) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{payment.user.name || 'N/A'}</div>
                            <div className="text-sm text-textMuted">{payment.user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-md text-xs bg-vvip/20 text-vvip">
                            {payment.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4">{payment.amount} {payment.currency}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-xs ${
                            payment.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                            payment.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-textMuted">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {payment.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleUpdatePaymentStatus(payment.id, 'COMPLETED')}
                                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs hover:bg-green-500/30"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdatePaymentStatus(payment.id, 'FAILED')}
                                  className="px-2 py-1 bg-red-500/20 text-red-400 rounded-md text-xs hover:bg-red-500/30"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-white/5">
                  <div className="text-sm text-textMuted">
                    Showing page {paymentsPagination.page} of {paymentsPagination.pages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPaymentsPagination({ ...paymentsPagination, page: paymentsPagination.page - 1 })}
                      disabled={paymentsPagination.page === 1}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPaymentsPagination({ ...paymentsPagination, page: paymentsPagination.page + 1 })}
                      disabled={paymentsPagination.page === paymentsPagination.pages}
                      className="px-3 py-1 bg-surfaceLight rounded-lg text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

         {activeTab === 'settings' && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h2 className="text-xl font-bold mb-6">Settings</h2>
             <div className="glass rounded-xl p-6 space-y-6">
               <div>
                 <h3 className="font-semibold mb-2">Website Lock</h3>
                 <p className="text-sm text-textMuted mb-4">Temporarily lock the website for maintenance</p>
                 <div className="flex items-center gap-4">
                   <button className="px-4 py-2 bg-surfaceLight rounded-lg hover:bg-surface transition-colors">
                     Lock Website
                   </button>
                 </div>
               </div>
               <div className="border-t border-white/5 pt-6">
                 <h3 className="font-semibold mb-2">Site Message</h3>
                 <p className="text-sm text-textMuted mb-4">Display a message to users</p>
                 <textarea 
                   className="w-full px-4 py-2 bg-surfaceLight border border-white/5 rounded-lg text-text focus:outline-none focus:border-primary/50"
                   rows={3}
                   placeholder="Enter message..."
                 />
               </div>
             </div>
           </motion.div>
         )}
         {activeTab === 'notifications' && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h2 className="text-xl font-bold mb-6">Notifications</h2>
             <div className="glass rounded-xl p-6 space-y-6">
               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
                 <div>
                   <h3 className="font-semibold mb-2">Send Message to Users</h3>
                   <p className="text-sm text-textMuted mb-4">Send a notification to all users</p>
                   <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors">
                     <Bell className="w-4 h-4" />
                     <span>Send Message</span>
                   </button>
                 </div>
               </div>
               <div className="border-t border-white/5 pt-6">
                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
                   <div>
                     <h3 className="font-semibold mb-2">Send VIP Alerts</h3>
                     <p className="text-sm text-textMuted mb-4">Send exclusive alerts to VIP members</p>
                     <button className="flex items-center space-x-2 px-4 py-2 bg-vvip text-black rounded-lg hover:bg-vvip/90 transition-colors">
                       <Bell className="w-4 h-4" />
                       <span>Send VIP Alert</span>
                     </button>
                   </div>
                 </div>
               </div>
               <div className="border-t border-white/5 pt-6">
                 <h3 className="font-semibold mb-2">Email Notification Settings</h3>
                 <p className="text-sm text-textMuted mb-4">Configure email notifications (coming soon)</p>
                 <div className="flex items-center gap-4">
                   <button className="px-4 py-2 bg-surfaceLight rounded-lg hover:bg-surface transition-colors">
                     Configure Email
                   </button>
                 </div>
               </div>
             </div>
           </motion.div>
         )}
      </div>
    </div>
  )
}
