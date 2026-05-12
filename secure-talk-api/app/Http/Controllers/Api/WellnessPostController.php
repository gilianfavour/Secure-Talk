<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WellnessPost;
use Illuminate\Http\Request;

class WellnessPostController extends Controller
{
    /**
     * Public wellness feed
     */
    public function index()
    {
        $posts = WellnessPost::active()
            ->latest()
            ->take(12)
            ->get();

        return response()->json($posts);
    }

    /**
     * Store wellness post
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'background_color' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['created_by'] = auth()->id();

        $post = WellnessPost::create($validated);

        return response()->json([
            'message' => 'Wellness post created successfully.',
            'post' => $post,
        ], 201);
    }
}