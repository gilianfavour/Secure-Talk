'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/feed', label: 'Feed' },
  { href: '/share', label: 'Share' },
  { href: '/messages', label: 'My Messages' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  /* Prevent body scroll when menu is open — only touches external DOM, no setState */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#4A90E2]/10 bg-[#F7F9FB]/85 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-4xl items-center justify-between px-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A90E2]/10">
              <Image
                src="/images/logo1.png"
                alt="SecureTalk logo"
                width={70}
                height={70}
                // gap-3
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[16px] font-semibold text-[#1F2933]">
              Secure<span className="text-[#4A90E2]">Talk</span>
            </span>
          </Link>
          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} active={pathname === href} />
            ))}
            <Link
              href="/share?type=private"
              className="ml-2 rounded-full bg-[#4A90E2] px-4 py-1.5 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
            >
              Get support
            </Link>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/share?type=private"
              className="rounded-full bg-[#4A90E2] px-3.5 py-1.5 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
            >
              Get support
            </Link>
            <button
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#4A90E2]/15 bg-white/60 text-[#6B7280] transition-colors hover:bg-white"
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={[
          'fixed left-0 right-0 top-[60px] z-40 md:hidden',
          'border-b border-[#4A90E2]/10 bg-[#F7F9FB]/95 backdrop-blur-md',
          'transition-all duration-200 ease-in-out',
          open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="mx-auto max-w-4xl px-5 py-3 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={[
                'rounded-xl px-4 py-3 text-[15px] font-medium no-underline transition-colors duration-150',
                pathname === href
                  ? 'bg-[#4A90E2]/10 text-[#4A90E2]'
                  : 'text-[#6B7280] hover:bg-[#4A90E2]/7 hover:text-[#4A90E2]',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Desktop nav link ── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'rounded-full border px-3.5 py-1.5 text-sm transition-all duration-150 no-underline',
        active
          ? 'border-[#4A90E2]/20 bg-[#4A90E2]/8 font-medium text-[#4A90E2]'
          : 'border-transparent text-[#6B7280] hover:border-[#4A90E2]/15 hover:bg-[#4A90E2]/7 hover:text-[#4A90E2]',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

/* ── Icons ── */
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}