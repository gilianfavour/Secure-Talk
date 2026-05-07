<?php

use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ReplyController;
use App\Http\Controllers\Api\CounsellorController;

Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/my-posts', [PostController::class, 'myPosts']);
Route::get('/my-messages', [PostController::class, 'myMessages']);

Route::post('/replies', [ReplyController::class, 'store']);

Route::get('/counsellor/posts', [CounsellorController::class, 'index']);

Route::get('/reply-code/{code}', [PostController::class, 'lookupReplyCode']);