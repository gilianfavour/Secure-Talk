'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/api'

import type { WellnessPost } from '@/app/lib/types'

export default function WellnessFeed() {
  const [posts, setPosts] = useState<WellnessPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
        .getWellnessPosts()
        .then((data) => {
        setPosts(data)
        })
        .catch((err) => {
        console.error('Failed to fetch wellness posts:', err)
        })
        .finally(() => {
        setLoading(false)
        })
    }, [])

  if (loading) {
    return (
      <section
        style={{
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#6B7280' }}>
          Loading wellness content...
        </p>
      </section>
    )
  }

  if (!posts.length) {
    return null
  }

  return (
    <section
      style={{
        padding: '60px 20px',
        background: '#F7F9FD',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 42,
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#1F2933',
              marginBottom: 10,
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            A little encouragement for today
          </h2>

          <p
            style={{
              color: '#6B7280',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.7,
              fontSize: 15,
            }}
          >
            Small reminders, emotional support, and mental wellness messages
            created to help you breathe a little easier.
          </p>
        </div>

        {/* Cards */}
        {/* Cards Carousel */}
<div
  style={{
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    padding: '10px 0',
  }}
>
  {/* animation styles */}
  <style>{`
    @keyframes scrollWellness {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `}</style>

  <div
    style={{
      display: 'flex',
      width: 'max-content',
      gap: 18,
      animation: 'scrollWellness 45s linear infinite',
    }}
  >
    {[...posts, ...posts].map((post, index) => (
      <div
        key={`${post.id}-${index}`}
        style={{
          background:
            post.background_color ||
            'linear-gradient(135deg, #4A90E2, #50C9C3)',

          borderRadius: 24,
          padding: 22,
          color: 'white',

          width: 250,
          minWidth: 250,
          minHeight: 220,

          position: 'relative',
          overflow: 'hidden',

          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            top: -50,
            right: -50,
            filter: 'blur(10px)',
          }}
        />

        {/* Category */}
        {post.category && (
          <span
            style={{
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              fontSize: 10,
              letterSpacing: 0.4,
              marginBottom: 16,
            }}
          >
            {post.category}
          </span>
        )}

        {/* Title */}
        <h3
          style={{
            fontSize: 20,
            lineHeight: 1.3,
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          {post.title}
        </h3>

        {/* Message */}
        <p
          style={{
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.88)',
            fontSize: 13,
          }}
        >
          {post.message}
        </p>

        {/* Footer */}
        <div
          style={{
            marginTop: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <span>♡</span>
          Secure Talk Wellness
        </div>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  )
}