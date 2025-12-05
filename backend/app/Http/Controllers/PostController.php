<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'body'  => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $post = new Post();
        $post->uuid = Str::uuid();
        $post->user_id = auth()->user()->id;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return response()->json([
            'message' => 'Post Created Successfully',
            'post' => $post,
        ], 201);
    }

}
