import Link from "next/link"

type Props = {
  id?: number
  content: string
  category?: string
  time: string
  replies?: number
}

export default function PostCard({ id = 0, content, category, time, replies }: Props) {
  return (
    <Link href={`/feed/${id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition space-y-3 cursor-pointer">

        {category && (
          <span className="text-xs text-[var(--secondary)] font-medium">
            #{category}
          </span>
        )}

        <p className="text-[15px] leading-relaxed text-[var(--text)]">
          {content}
        </p>

        <div className="flex justify-between text-xs text-[var(--soft)] pt-2">
          <span>{time}</span>
          {replies !== undefined && <span>{replies} replies</span>}
        </div>

      </div>
    </Link>
  )
}