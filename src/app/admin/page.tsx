'use client'

import { useSession } from 'next-auth/react'
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
  Eye
} from 'lucide-react'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/')
    }
  }, [session, status, router])

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
                <div className="text-2xl font-bold mb-1">2,547</div>
                <div className="text-sm text-textMuted">Total Users</div>
              </div>
              <div className="glass rounded-xl p-6">
                <Crown className="w-8 h-8 text-vvip mb-3" />
                <div className="text-2xl font-bold mb-1">342</div>
                <div className="text-sm text-textMuted">VVIP Members</div>
              </div>
              <div className="glass rounded-xl p-6">
                <Trophy className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-2xl font-bold mb-1">1,247</div>
                <div className="text-sm text-textMuted">Total Predictions</div>
              </div>
              <div className="glass rounded-xl p-6">
                <BarChart3 className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold mb-1">85%</div>
                <div className="text-sm text-textMuted">Win Rate</div>
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
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Prediction</span>
              </button>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-surfaceLight">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Match</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Prediction</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Odds</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-textMuted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4">Arsenal vs Liverpool</td>
                    <td className="px-6 py-4">Over 2.5 Goals</td>
                    <td className="px-6 py-4">1.75</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs bg-yellow-500/20 text-yellow-400">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-surfaceLight rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-surfaceLight rounded-lg transition-colors text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Manage Users</h2>
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
                  <tr>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">User</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md text-xs bg-vvip/20 text-vvip">
                        VVIP
                      </span>
                    </td>
                    <td className="px-6 py-4">Jan 15, 2024</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-surfaceLight rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'subscriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Manage Subscriptions</h2>
            <div className="glass rounded-xl p-6">
              <p className="text-textMuted">Subscription management coming soon...</p>
            </div>
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
      </div>
    </div>
  )
}
