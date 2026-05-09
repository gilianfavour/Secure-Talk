'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../lib/api'
import type { PostWithReplies } from '../lib/types'

export default function MyMessagesPage() {
  const router = useRouter()

  // Messages loaded from session
  const [messages, setMessages] = useState<PostWithReplies[]>([])
  const [loading, setLoading] = useState(true)

  // Reply code lookup
  const [codeInput, setCodeInput] = useState('')
  const [codeResult, setCodeResult] = useState<PostWithReplies | null>(null)
  const [codeError, setCodeError] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [savedCodes, setSavedCodes] = useState<string[]>([])

    useEffect(() => {
      const load = async () => {
        try {
          const data = await api.getMyMessages()
          setMessages(data)
        } catch (err) {
          console.error('Failed to load messages:', err)
          setMessages([])
        } finally {
          setLoading(false)
        }

        try {
          const stored = localStorage.getItem('reply_codes')
          setSavedCodes(stored ? JSON.parse(stored) : [])
        } catch {
          setSavedCodes([])
        }
      }

      load()
    }, [])
    
  const handleCodeLookup = async () => {
    const trimmed = codeInput.trim().toUpperCase()
    if (!trimmed) return
    setCodeLoading(true)
    setCodeError('')
    setCodeResult(null)
    try {
      const result = await api.getPostByReplyCode(trimmed)
      if (!result) {
        setCodeError('No message found for that code. Double-check and try again.')
      } else {
        setCodeResult(result)
      }
    } catch {
      setCodeError('Something went wrong. Please try again.')
    } finally {
      setCodeLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 space-y-8">

      {/* ── Header ── */}
      <div>
        <h1 className="text-[24px] font-semibold tracking-[-0.3px] text-[#1F2933]">My Private Messages</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Only you and your counsellor can see these messages.
        </p>
      </div>

      {/* ── Reply code lookup ── */}
      <div className="rounded-[20px] border border-[#4A90E2]/15 bg-white/80 p-6 backdrop-blur-sm space-y-4">

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#50C9C3]/10">
            <KeyIcon />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#1F2933]">Check a reply by code</p>
            <p className="text-[12.5px] text-[#6B7280] leading-[1.5]">
              Enter the reply code you received when you sent a private message.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleCodeLookup()}
            placeholder="e.g. RIVER-4821"
            maxLength={12}
            className="flex-1 rounded-[12px] border border-[#4A90E2]/20 bg-white px-4 py-2.5 font-mono text-[15px] tracking-wider text-[#1F2933] placeholder:text-[#9CA3AF] placeholder:tracking-normal outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 transition-all"
          />
          <button
            onClick={handleCodeLookup}
            disabled={!codeInput.trim() || codeLoading}
            className="rounded-[12px] bg-[#50C9C3] px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {codeLoading ? 'Checking…' : 'Check'}
          </button>
        </div>

        {/* Saved codes quick-access */}
        {savedCodes.length > 0 && !codeResult && (
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.5px] text-[#9CA3AF]">Your saved codes</p>
            <div className="flex flex-wrap gap-2">
              {savedCodes.map((code) => (
                <button
                  key={code}
                  onClick={() => { setCodeInput(code); setCodeResult(null); setCodeError('') }}
                  className="rounded-full border border-[#4A90E2]/20 bg-[#F7F9FB] px-3 py-1 font-mono text-[12px] text-[#4A90E2] hover:border-[#4A90E2]/40 transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {codeError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-600">
            <WarnIcon />
            {codeError}
          </div>
        )}

        {/* Result */}
        {codeResult && (
          <MessageCard msg={codeResult} highlight />
        )}

      </div>

      {/* ── Messages from this session ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-[#1F2933]">From this session</h2>
          <button
            onClick={() => router.push('/share?type=private')}
            className="flex items-center gap-1.5 rounded-full bg-[#4A90E2]/10 px-3.5 py-1.5 text-[12.5px] font-medium text-[#4A90E2] hover:bg-[#4A90E2]/15 transition-colors"
          >
            <PlusIcon />
            New message
          </button>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <div key={n} className="h-28 animate-pulse rounded-2xl border border-[#E5E7EB] bg-white" />
            ))}
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#4A90E2]/20 bg-[#4A90E2]/3 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A90E2]/10">
              <ChatIcon />
            </div>
            <p className="text-[14px] text-[#6B7280]">No private messages yet this session.</p>
            <button
              onClick={() => router.push('/share?type=private')}
              className="rounded-full bg-[#4A90E2] px-4 py-2 text-[13px] font-medium text-white hover:opacity-90 transition-opacity"
            >
              Send your first message
            </button>
          </div>
        )}

        {!loading && messages.map((msg) => (
          <MessageCard key={msg.id} msg={msg} />
        ))}
      </div>

    </section>
  )
}

/* ── Message Card ── */
function MessageCard({ msg, highlight = false }: { msg: PostWithReplies; highlight?: boolean }) {
  const replies = msg.replies ?? []
  const hasReply = replies.length > 0

  return (
    <div className={[
      'rounded-2xl border bg-white p-5 space-y-4 transition-all',
      highlight ? 'border-[#50C9C3]/40 shadow-[0_0_0_3px_rgba(80,201,195,0.08)]' : 'border-[#4A90E2]/15',
    ].join(' ')}>

      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[#4A90E2]/15 bg-[#4A90E2]/5 px-2.5 py-0.5 text-[11px] font-medium text-[#4A90E2]">
          {msg.category || 'General'}
        </span>
        <span className={[
          'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
          hasReply ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600',
        ].join(' ')}>
          <span className={[
            'h-1.5 w-1.5 rounded-full',
            hasReply ? 'bg-green-500' : 'bg-amber-400',
          ].join(' ')} />
          {hasReply ? 'Counsellor replied' : 'Waiting for reply'}
        </span>
      </div>

      {/* User's message */}
      <p className="text-[14.5px] leading-[1.7] text-[#374151]">
        {msg.content}
      </p>

      {/* Counsellor replies */}
      {hasReply && (
        <div className="space-y-2.5 border-t border-[#E5E7EB] pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#50C9C3]/15">
              <CounsellorIcon />
            </div>
            <p className="text-[11.5px] font-medium text-[#50C9C3]">Counsellor</p>
          </div>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-[14px] border border-[#50C9C3]/15 bg-[#50C9C3]/5 px-4 py-3.5 text-[14px] leading-[1.65] text-[#1F2933]"
            >
              {reply.content}
            </div>
          ))}
        </div>
      )}

      {/* Waiting state */}
      {!hasReply && (
        <div className="flex items-center gap-2.5 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-2.5">
          <ClockIcon />
          <p className="text-[12.5px] text-amber-700">
            A counsellor will review your message and respond soon.
          </p>
        </div>
      )}

    </div>
  )
}

/* ── Icons ── */

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7" cy="8" r="3.5" stroke="#50C9C3" strokeWidth="1.3" />
      <path d="M9.5 10.5l5 5M12 13l1.5-1.5" stroke="#50C9C3" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.5 3.5h11a1 1 0 011 1v7a1 1 0 01-1 1H5.5L2 15V4.5a1 1 0 011.5-1z" stroke="#4A90E2" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 8h6M6 10.5h3.5" stroke="#4A90E2" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CounsellorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="4" r="2" stroke="#50C9C3" strokeWidth="1.1" />
      <path d="M2 10c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="#50C9C3" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2v8M2 6h8" stroke="#4A90E2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1.5L1 12.5h12L7 1.5z" stroke="#dc2626" strokeWidth="1.2" fill="rgba(220,38,38,0.07)" strokeLinejoin="round" />
      <path d="M7 5.5v3M7 9.5v.5" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="5.5" stroke="#d97706" strokeWidth="1.2" fill="rgba(217,119,6,0.07)" />
      <path d="M7 4.5v3l1.5 1" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}