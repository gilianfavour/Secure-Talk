'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/app/lib/api'
import type { PostWithReplies } from '@/app/lib/types'

import {
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Trash2,
  Check,
  X,
} from 'lucide-react'

export default function PostDetail() {
  const params = useParams()
  const id = params?.id as string

  const [post, setPost] = useState<PostWithReplies | null>(null)
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedText, setEditedText] = useState('')

  useEffect(() => {
    if (!id) return

    api
      .getPost(id)
      .then((data) => {
        setPost(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async () => {
    if (!reply.trim() || !post) return

    try {
      const res = await api.createReply({
        post_id: post.id,
        content: reply,
      })

      setPost((prev) =>
        prev
          ? {
              ...prev,
              replies: [
                ...prev.replies,
                {
                  id: res.id ?? Date.now(),
                  post_id: prev.id,
                  content: reply,
                  responder_type: 'user',
                  created_at: new Date().toISOString(),

                  likes: 0,
                  dislikes: 0,
                  user_reaction: null,
                  can_edit: true,
                },
              ],
            }
          : prev
      )

      setReply('')
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error(err)
      alert('Failed to send reply')
    }
  }

  const handleReaction = async (
    replyId: number,
    type: 'like' | 'dislike'
  ) => {
    setPost((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        replies: prev.replies.map((reply) => {
          if (reply.id !== replyId) return reply

          let likes = reply.likes || 0
          let dislikes = reply.dislikes || 0

          if (reply.user_reaction === type) {
            if (type === 'like') likes--
            else dislikes--

            return {
              ...reply,
              likes,
              dislikes,
              user_reaction: null,
            }
          }

          if (reply.user_reaction === 'like') likes--
          if (reply.user_reaction === 'dislike') dislikes--

          if (type === 'like') likes++
          else dislikes++

          return {
            ...reply,
            likes,
            dislikes,
            user_reaction: type,
          }
        }),
      }
    })
  }

  const startEdit = (id: number, content: string) => {
    setEditingId(id)
    setEditedText(content)
  }

  const saveEdit = async (replyId: number) => {
    setPost((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        replies: prev.replies.map((r) =>
          r.id === replyId
            ? {
                ...r,
                content: editedText,
              }
            : r
        ),
      }
    })

    setEditingId(null)
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-400">
          Loading...
        </p>
      )}

      {/* Post */}
      {!loading && post && (
        <div className="mb-6 rounded-2xl border border-[#4A90E2]/15 bg-white/80 p-6 backdrop-blur-sm">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4A90E2]/15 bg-[#4A90E2]/8 px-3 py-1 text-[11px] font-medium text-[#4A90E2]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A90E2]" />
              Anonymous
            </span>

            <span className="text-[11px] text-[#9CA3AF]">
              ·
            </span>

            <span className="text-[11px] text-[#9CA3AF]">
              {post.category}
            </span>
          </div>

          <p className="mt-3 text-[17px] leading-[1.7] text-[#1F2933]">
            {post.content}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[12px] text-[#9CA3AF]">
              {new Date(post.created_at).toLocaleString()}
            </span>

            <div className="text-[12px] text-[#9CA3AF]">
              {post.replies.length} responses
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-[12px] font-medium uppercase tracking-[0.5px] text-[#9CA3AF]">
          Community responses
        </span>

        <div className="h-px flex-1 bg-[#4A90E2]/10" />
      </div>

      {/* Replies */}
      <div className="mb-6 flex flex-col gap-4">
        {post?.replies.map((r) => (
          <div
            key={r.id}
            className="group rounded-2xl border border-[#4A90E2]/10 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Edit mode */}
                {editingId === r.id ? (
                  <textarea
                    value={editedText}
                    onChange={(e) =>
                      setEditedText(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#4A90E2]/20 p-3 outline-none focus:border-[#4A90E2]"
                  />
                ) : (
                  <p className="text-[14px] leading-[1.75] text-[#1F2933]">
                    {r.content}
                  </p>
                )}

                <span className="mt-3 block text-[11px] text-[#9CA3AF]">
                  {new Date(
                    r.created_at
                  ).toLocaleString()}
                </span>
              </div>

              {/* Edit buttons */}
              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {editingId === r.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(r.id)}
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() =>
                        setEditingId(null)
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        startEdit(r.id, r.content)
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                    </button>

                    <button className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Reactions */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() =>
                  handleReaction(r.id, 'like')
                }
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
                  r.user_reaction === 'like'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                }`}
              >
                <ThumbsUp size={15} />
                {r.likes || 0}
              </button>

              <button
                onClick={() =>
                  handleReaction(r.id, 'dislike')
                }
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
                  r.user_reaction === 'dislike'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                }`}
              >
                <ThumbsDown size={15} />
                {r.dislikes || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Success message */}
      {submitted && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#4CAF50]/20 bg-[#4CAF50]/8 px-4 py-3 text-[13px] text-[#3a9e3a]">
          Your response was shared anonymously.
          Thank you for showing up for someone.
        </div>
      )}

      {/* Reply box */}
      <div className="rounded-2xl border border-[#4A90E2]/15 bg-white/80 p-5 backdrop-blur-sm">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
          Write a supportive response
        </span>

        <div className="relative">
          <textarea
            value={reply}
            onChange={(e) =>
              setReply(
                e.target.value.slice(0, 500)
              )
            }
            placeholder="Share something kind, helpful, or simply let them know they're not alone…"
            className="w-full min-h-[110px] resize-none rounded-[14px] border border-[#4A90E2]/20 bg-white px-4 py-3.5 text-[14px] leading-[1.65] text-[#1F2933] placeholder:text-[#9CA3AF] outline-none focus:border-[#4A90E2]"
          />

          <span className="absolute bottom-3 right-4 text-[11px] text-[#9CA3AF]">
            {reply.length} / 500
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[12px] text-[#9CA3AF]">
            Your response is anonymous
          </p>

          <button
            onClick={handleSubmit}
            disabled={!reply.trim()}
            className="flex items-center gap-2 rounded-xl bg-[#4A90E2] px-5 py-2.5 text-[13.5px] font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            Send response
          </button>
        </div>
      </div>
    </section>
  )
}