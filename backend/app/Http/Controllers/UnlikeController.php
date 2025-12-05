<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UnlikeController extends Controller
{
    public function __invoke(Request $request,$postId): JsonResponse
    {
        $like = Like::where('user_id', auth()->user()->id)
                    ->where('post_id', $postId)
                    ->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Post unliked successfully!'], 200);
        }

        return response()->json(['message' => 'Like not found'], 404);
    }
}