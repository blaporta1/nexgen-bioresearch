'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import NexGenLogo from './NexGenLogo'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'COA Library', href: '/coa' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isHeroPage = pathname === '/'

  return (
    <>
      {/* Compliance Banner */}
      <div className="compliance-banner">
        FOR IN-VITRO RESEARCH AND LABORATORY USE ONLY · NOT FOR HUMAN OR VETERINARY USE ·{' '}
        <span style={{ color: '#3A85E0' }}>NEXGENBIO.COM</span>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || !isHeroPage
            ? 'nav-glass shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <NexGenLogo
              variant={!scrolled && isHeroPage ? 'light' : 'dark'}
              size="sm"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-signal'
                    : !scrolled && isHeroPage
                    ? 'text-white/80 hover:text-white'
                    : 'text-navy/70 hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-colors ${
                !scrolled && isHeroPage
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-navy/70 hover:text-navy hover:bg-cloud'
              }`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-signal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href="/shop"
              className="hidden md:flex btn-primary px-4 py-2 rounded-lg text-sm"
            >
              Shop Peptides
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg ${
                !scrolled && isHeroPage ? 'text-white' : 'text-navy'
              }`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-frost">
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 border-b border-cloud ${
                    pathname === link.href ? 'text-signal' : 'text-navy/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="btn-primary px-4 py-3 rounded-lg text-sm text-center mt-2"
              >
                Shop Peptides
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
