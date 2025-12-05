<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LikeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
        ]);

        $like = Like::firstOrCreate(
            [
                'user_id' => auth()->user()->id,
                'post_id' => $request->post_id,
                'isLiked' => true
            ],
            [
                'uuid' => Str::uuid(),
            ]
        );

        return response()->json(['message' => 'Post liked successfully!', 'like' => $like], 201);
    }
}