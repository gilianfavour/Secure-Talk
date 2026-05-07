<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = [
        'post_id',
        'content',
        'responder_type',
        'counsellor_id',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}