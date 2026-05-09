'use client'

import { useState } from "react"
import PostCard from "../components/PostCard"
import EmptyState from "../components/EmptyState"
import { useEffect } from "react"
import { api } from "../lib/api"
import type { Post } from "../lib/types"


const filters = ["all", "Stress", "Anxiety", "Relationships"]

export default function FeedPage() {
  const [active, setActive] = useState("all")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const filteredPosts =
  active === "all"
    ? posts
    : posts.filter(
        (p) => p.category?.toLowerCase() === active.toLowerCase()
      )
  
  useEffect(() => {
    api.getPosts()
      .then((data) => {
        setPosts(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Community Feed</h1>
        <p className="text-sm text-[var(--soft)]">
          You are not alone. Others are sharing too.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              active === f
                ? "bg-[var(--primary)] text-white"
                : "bg-gray-100 text-[var(--soft)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              category={post.category}
              time={new Date(post.created_at).toLocaleString()}
              replies={post.replies_count}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

    </div>
  )
}