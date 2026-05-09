import {
  Post,
  PostWithReplies,
  CreatePostPayload,
  CreateReplyPayload,
} from "./types";
import { getSessionId } from './session'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = {
  getPosts: async (): Promise<Post[]> => {
    const res = await fetch(`${BASE_URL}/posts`);
    return res.json();
  },

  getPost: async (id: string): Promise<PostWithReplies> => {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    return res.json();
   },

  createPost: async (data: CreatePostPayload) => {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  createReply: async (data: CreateReplyPayload) => {
    const res = await fetch(`${BASE_URL}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  getMyMessages: async (): Promise<PostWithReplies[]> => {
    const sessionId = getSessionId()

    const res = await fetch(
      `${BASE_URL}/my-messages?session_id=${sessionId}`
    )

    return res.json()
  },

  async getPostByReplyCode(code: string) {
    const res = await fetch(
      `${BASE_URL}/reply-code/${code}`
    )

    if (!res.ok) {
      return null
    }

    return res.json()
  },
};