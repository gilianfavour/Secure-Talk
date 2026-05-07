<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PostController extends Controller
{
    // ✅ Get all PUBLIC posts (feed)
    public function index()
    {
        return Post::active()
            ->where('type', 'public')
            ->withCount('replies')
            ->latest()
            ->get();
    }

    // ✅ Create new post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:5',
            'type' => 'required|in:public,private',
            'session_id' => 'required|string',
            'category' => 'nullable|string',
        ]);

        // Default values
        $replyCode = null;

        // 🔐 Generate reply code ONLY for private posts
        if ($validated['type'] === 'private') {
            $replyCode = strtoupper(bin2hex(random_bytes(4))); // e.g. A1B2C3D4
        }

        $post = Post::create([
            'content' => $validated['content'],
            'type' => $validated['type'],
            'category' => $validated['category'] ?? null,
            'session_id' => $validated['session_id'],
            'reply_code' => $replyCode,
            'expires_at' => Carbon::now()->addDays(14),
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    // ✅ Get single post (with replies)
    public function show($id)
    {
        $post = Post::with('replies')->findOrFail($id);

        // Prevent access to expired posts
        if ($post->expires_at < now()) {
            return response()->json(['message' => 'Post expired'], 404);
        }

        return $post;
    }

    public function myPosts(Request $request)
    {
        return Post::where('session_id', $request->session_id)
            ->with('replies')
            ->latest()
            ->get();
    }

    public function myMessages(Request $request)
    {
        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return response()->json([
                'error' => 'Session ID is required'
            ], 400);
        }

        $posts = \App\Models\Post::where('session_id', $sessionId)
            ->where('type', 'private')
            ->with('replies') // include counsellor replies
            ->latest()
            ->get();

        return response()->json($posts);
    }

    public function lookupReplyCode($code)
    {
        return Post::with('replies')
            ->where('reply_code', $code)
            ->firstOrFail();
    }
}