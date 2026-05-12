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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background:
                  post.background_color ||
                  'linear-gradient(135deg, #4A90E2, #50C9C3)',

                borderRadius: 28,
                padding: 28,
                color: 'white',
                minHeight: 260,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  top: -60,
                  right: -60,
                  filter: 'blur(10px)',
                }}
              />

              {/* Category */}
              {post.category && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.16)',
                    fontSize: 11,
                    letterSpacing: 0.4,
                    marginBottom: 18,
                  }}
                >
                  {post.category}
                </span>
              )}

              {/* Title */}
              <h3
                style={{
                  fontSize: 24,
                  lineHeight: 1.3,
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                {post.title}
              </h3>

              {/* Message */}
              <p
                style={{
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 14,
                }}
              >
                {post.message}
              </p>

              {/* Footer */}
              <div
                style={{
                  marginTop: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
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
    </section>
  )
}