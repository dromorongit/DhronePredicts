'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Crown,
  LayoutDashboard
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/predictions', label: 'Predictions' },
  { href: '/results', label: 'Results' },
  { href: '/statistics', label: 'Statistics' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/vvip', label: 'VVIP', badge: true },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-green-400 flex items-center justify-center">
              <span className="text-black font-bold text-lg">D</span>
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">DhronePredicts</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-textMuted hover:text-text hover:bg-surface'
                )}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-vvip rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-black" />
                  </span>
                )}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-20 h-9 bg-surface animate-pulse rounded-lg" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface hover:bg-surfaceLight border border-border transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text">{session.user?.name?.split(' ')[0] || 'User'}</span>
                  <ChevronDown className="w-3 h-3 text-textMuted" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-1.5">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surfaceLight transition-colors text-sm"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-textMuted" />
                          <span>Dashboard</span>
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surfaceLight transition-colors text-sm"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Crown className="w-4 h-4 text-vvip" />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surfaceLight transition-colors text-sm text-loss"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-textMuted hover:text-text transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border"
          >
            <div className="px-4 py-4 space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-textMuted hover:bg-surface'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-textMuted hover:bg-surface"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-textMuted hover:bg-surface"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut()
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-loss hover:bg-surface"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-center text-textMuted hover:bg-surface"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-black text-center hover:bg-primary/90"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
