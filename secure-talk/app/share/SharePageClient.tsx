'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '../lib/api'
import { getSessionId } from '../lib/session'

const CATEGORIES = [
  'Anxiety',
  'Stress',
  'Relationships',
  'Depression',
  'Loneliness',
  'Grief',
  'Other',
]

const MAX_CHARS = 1000

export default function SharePageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialType =
    searchParams.get('type') === 'private' ? 'private' : 'public'

  const [type, setType] = useState<'public' | 'private'>(initialType)
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [replyCode, setReplyCode] = useState<string | null>(null)
  const [codeCopied, setCodeCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const existing = localStorage.getItem('secure_talk_session')

    if (!existing) {
      localStorage.setItem(
        'secure_talk_session',
        `anon_${Math.random().toString(36).substring(2)}`
      )
    }
  }, [])

  const charsCount = content.length

  const handleSubmit = async () => {
    if (!content.trim() || loading) return

    setLoading(true)

    try {
      const post = await api.createPost({
        content: content.trim(),
        type,
        category: category || undefined,
        session_id: getSessionId(),
      })

      setSubmitted(true)
      setContent('')
      setCategory('')

      if (type === 'private') {
        const code = post?.reply_code ?? null

        setReplyCode(code)

        if (code && typeof window !== 'undefined') {
          const existingCodes = JSON.parse(
            localStorage.getItem('reply_codes') || '[]'
          )

          const updatedCodes = Array.from(
            new Set([...existingCodes, code])
          )

          localStorage.setItem(
            'reply_codes',
            JSON.stringify(updatedCodes)
          )
        }
      } else {
        setTimeout(() => {
          router.push('/feed')
        }, 1500)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCode = async () => {
    if (!replyCode) return

    try {
      await navigator.clipboard.writeText(replyCode)
      setCodeCopied(true)

      setTimeout(() => {
        setCodeCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  /* PUBLIC SUCCESS */
  if (submitted && type === 'public') {
    return (
      <section className="flex min-h-[calc(100vh-60px)] items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-[480px] flex-col items-center gap-4 rounded-[20px] border border-green-200 bg-green-50 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckIcon color="#16a34a" size={22} />
          </div>

          <h3 className="text-[18px] font-semibold text-green-800">
            Post shared!
          </h3>

          <p className="text-sm leading-[1.6] text-green-700">
            Your post has been shared anonymously with the community.
            Redirecting to the feed...
          </p>
        </div>
      </section>
    )
  }

  /* PRIVATE SUCCESS */
  if (submitted && type === 'private') {
    return (
      <section className="flex min-h-[calc(100vh-60px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-[520px] rounded-[20px] border border-[#4A90E2]/15 bg-white p-8 shadow-sm">

          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#50C9C3]/15">
              <CheckIcon color="#50C9C3" size={22} />
            </div>

            <h3 className="text-[20px] font-semibold text-[#1F2933]">
              Message sent to counsellor
            </h3>

            <p className="max-w-[360px] text-[14px] leading-[1.65] text-[#6B7280]">
              Save your reply code below. You&apos;ll need it to check your
              counsellor&apos;s response later.
            </p>
          </div>

          {replyCode ? (
            <div className="mb-5 rounded-[14px] border border-[#4A90E2]/20 bg-[#F7F9FB] p-5">
              <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.6px] text-[#9CA3AF]">
                Your reply code
              </p>

              <p className="text-center font-mono text-[28px] font-semibold tracking-[6px] text-[#1F2933]">
                {replyCode}
              </p>
            </div>
          ) : (
            <div className="mb-5 rounded-[14px] border border-[#4A90E2]/20 bg-[#F7F9FB] p-5 text-center text-sm text-[#6B7280]">
              Your message has been sent successfully.
            </div>
          )}

          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
            <WarnIcon />

            <p className="text-[12.5px] leading-[1.55] text-amber-700">
              Save or copy this code now. It&apos;s the only way to retrieve
              your counsellor&apos;s response.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {replyCode && (
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex w-full items-center justify-center gap-2 rounded-[13px] border border-[#4A90E2]/25 bg-white py-3 text-[14px] font-medium text-[#4A90E2] transition-all hover:bg-[#4A90E2]/5"
              >
                {codeCopied ? (
                  <CheckIcon color="#4A90E2" size={14} />
                ) : (
                  <CopyIcon />
                )}

                {codeCopied ? 'Copied!' : 'Copy code'}
              </button>
            )}

            <button
              type="button"
              onClick={() => router.push('/messages')}
              className="flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#50C9C3] py-3 text-[14px] font-medium text-white transition-all hover:opacity-90"
            >
              Go to my messages
              <ArrowIcon />
            </button>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setReplyCode(null)
              }}
              className="text-center text-[13px] text-[#9CA3AF] hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-16">

      <div className="mb-7 max-w-[480px] text-center">
        <h1 className="mb-2 text-[26px] font-semibold tracking-[-0.3px] text-[#1F2933]">
          What&apos;s on your mind?
        </h1>

        <p className="text-[15px] leading-[1.6] text-[#6B7280]">
          You are safe here. No one knows who you are.
        </p>
      </div>

      <div className="flex w-full max-w-[580px] flex-col gap-5 rounded-[20px] border border-[#4A90E2]/15 bg-white p-7 shadow-sm">

        <div className="grid grid-cols-2 gap-1.5 rounded-[14px] border border-[#4A90E2]/12 bg-[#4A90E2]/5 p-1.5">
          <ToggleBtn
            active={type === 'public'}
            activeColor="blue"
            onClick={() => setType('public')}
            icon={<GlobeIcon active={type === 'public'} />}
            label="Share with community"
          />

          <ToggleBtn
            active={type === 'private'}
            activeColor="teal"
            onClick={() => setType('private')}
            icon={<LockIcon active={type === 'private'} />}
            label="Get private support"
          />
        </div>

        <div
          className={[
            'flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13px] leading-[1.55]',
            type === 'public'
              ? 'border-[#4A90E2]/14 bg-[#4A90E2]/5 text-[#4A90E2]'
              : 'border-[#50C9C3]/18 bg-[#50C9C3]/5 text-[#3aada8]',
          ].join(' ')}
        >
          <InfoIcon color={type === 'public' ? '#4A90E2' : '#50C9C3'} />

          <p>
            {type === 'public'
              ? 'Your post will be visible to the community anonymously.'
              : "Only a counsellor will see this message. You'll receive a reply code."}
          </p>
        </div>

        <div>
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
            How are you feeling?
          </span>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setCategory(cat === category ? '' : cat)
                }
                className={[
                  'rounded-full border px-3.5 py-1.5 text-[13px] transition-all',
                  category === cat
                    ? 'border-[#4A90E2] bg-[#4A90E2]/10 font-medium text-[#4A90E2]'
                    : 'border-[#4A90E2]/20 bg-white text-[#6B7280] hover:border-[#4A90E2]',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
            Your message
          </span>

          <div className="relative">
            <textarea
              value={content}
              onChange={(e) =>
                setContent(e.target.value.slice(0, MAX_CHARS))
              }
              placeholder="Take your time and share what's on your mind..."
              className="w-full min-h-[170px] resize-none rounded-[14px] border border-[#4A90E2]/20 bg-white px-4 py-4 text-[15px] leading-[1.65] text-[#1F2933] outline-none transition-all focus:border-[#4A90E2] focus:ring-4 focus:ring-[#4A90E2]/10"
            />

            <span className="absolute bottom-3 right-4 text-[11px] text-[#9CA3AF]">
              {charsCount} / {MAX_CHARS}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() || loading}
          className={[
            'flex w-full items-center justify-center gap-2 rounded-[13px] py-3.5 text-[15px] font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-40',
            type === 'public'
              ? 'bg-[#4A90E2]'
              : 'bg-[#50C9C3]',
          ].join(' ')}
        >
          <ArrowIcon />

          {loading
            ? 'Sending...'
            : type === 'public'
            ? 'Share safely'
            : 'Send to counsellor'}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          <FooterItem icon={<ShieldIcon />} label="Anonymous" />
          <FooterDot />
          <FooterItem icon={<ClockMiniIcon />} label="Disappears in 14 days" />
          <FooterDot />
          <FooterItem icon={<PrivacyIcon />} label="Private" />
        </div>
      </div>
    </section>
  )
}

/* COMPONENTS */

function ToggleBtn({
  active,
  activeColor,
  onClick,
  icon,
  label,
}: {
  active: boolean
  activeColor: 'blue' | 'teal'
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-center justify-center gap-2 rounded-[10px] py-2.5 text-[13.5px] font-medium transition-all',
        active
          ? `bg-white ${
              activeColor === 'blue'
                ? 'text-[#4A90E2]'
                : 'text-[#50C9C3]'
            } shadow-sm`
          : 'text-[#6B7280]',
      ].join(' ')}
    >
      {icon}
      {label}
    </button>
  )
}

function FooterItem({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
      {icon}
      {label}
    </div>
  )
}

function FooterDot() {
  return (
    <span className="h-[3px] w-[3px] rounded-full bg-[#D1D5DB]" />
  )
}

/* ICONS */

function GlobeIcon({ active }: { active: boolean }) {
  const c = active ? '#4A90E2' : '#6B7280'

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.3" />
      <path d="M1.5 7h11" stroke={c} strokeWidth="1" />
    </svg>
  )
}

function LockIcon({ active }: { active: boolean }) {
  const c = active ? '#50C9C3' : '#6B7280'

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="2.5"
        y="6.5"
        width="9"
        height="6"
        rx="1.5"
        stroke={c}
        strokeWidth="1.2"
      />
      <path
        d="M4.5 6.5V5a2.5 2.5 0 015 0v1.5"
        stroke={c}
        strokeWidth="1.2"
      />
    </svg>
  )
}

function InfoIcon({ color }: { color: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="7.5"
        cy="7.5"
        r="6"
        stroke={color}
        strokeWidth="1.2"
      />
      <path
        d="M7.5 5v1M7.5 7.5v3"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon({
  color,
  size = 16,
}: {
  color: string
  size?: number
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="4.5"
        y="4.5"
        width="7"
        height="7"
        rx="1.2"
        stroke="#4A90E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M7.5 1.5L1 13h13L7.5 1.5z"
        stroke="#d97706"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1L1 3v3c0 2.5 1.9 4.4 5 5 3.1-.6 5-2.5 5-5V3L6 1z"
        stroke="#4CAF50"
        strokeWidth="1"
      />
    </svg>
  )
}

function ClockMiniIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="#6B7280"
        strokeWidth="1"
      />
    </svg>
  )
}

function PrivacyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect
        x="2"
        y="5.5"
        width="8"
        height="5.5"
        rx="1.2"
        stroke="#6B7280"
        strokeWidth="1"
      />
    </svg>
  )
}