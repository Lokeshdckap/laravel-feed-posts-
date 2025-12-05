<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostPleaseController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {

        $posts = Post::withCount('likes')
                     ->with([
                            'likes' => fn($q) => $q->where('user_id', auth()->id()),
                            'user:id,name'
                    ])
                    ->latest()
                    ->get()
                    ->map(function ($post) {
                        $post->isLiked = $post->likes->isNotEmpty();
                        unset($post->likes);
                        return $post;
                    });

        return response()->json([
            'message' => 'Posts retrieved successfully',
            'data' => $posts
        ], 200);
    }
}
