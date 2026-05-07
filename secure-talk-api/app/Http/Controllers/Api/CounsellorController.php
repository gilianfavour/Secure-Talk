<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;

class CounsellorController extends Controller
{
    public function index()
    {
        $posts = Post::where('type', 'private')
            ->with('replies')
            ->latest()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'category' => $post->category,
                    'created_at' => $post->created_at,
                    'replies' => $post->replies,
                    'has_reply' => $post->replies->count() > 0,
                ];
            });

        return response()->json($posts);
    }
}