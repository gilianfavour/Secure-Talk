export type Post = {
  id: number;
  content: string;
  type: "public" | "private";
  category?: string;
  created_at: string;
  replies_count?: number;
};

export type Reply = {
  id: number;
  post_id: number;
  content: string;
  responder_type: "user" | "counsellor";
  created_at: string;
};

// ✅ ADD THIS
export type PostWithReplies = Post & {
  replies: Reply[];
};

export type CreatePostPayload = {
  content: string;
  type: "public" | "private";
  category?: string;
  session_id: string;
};

export type CreateReplyPayload = {
  post_id: number;
  content: string;
};