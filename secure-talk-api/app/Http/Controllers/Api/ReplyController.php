<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use App\Models\Post;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    public function store(Request $request)
    {
        // ✅ Store validated data properly
        $validated = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'content' => 'required|string|min:2',
            'responder_type' => 'nullable|in:user,counsellor',
        ]);

        $post = Post::findOrFail($validated['post_id']);

        // ✅ Prevent replying to expired posts (safe check)
        if ($post->expires_at && $post->expires_at < now()) {
            return response()->json([
                'message' => 'Cannot reply to expired post'
            ], 400);
        }

        $reply = Reply::create([
            'post_id' => $validated['post_id'],
            'content' => $validated['content'],
            'responder_type' => $validated['responder_type'] ?? 'user',
        ]);

        return response()->json([
            'message' => 'Reply added',
            'data' => $reply
        ], 201);
    }
}