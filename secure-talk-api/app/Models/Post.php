<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'session_id',
        'content',
        'type',
        'category',
        'reply_code',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    // Relationships
    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    // Scope: only active posts
    public function scopeActive($query)
    {
        return $query->where('expires_at', '>', now());
    }
    public function counsellor()
    {
        return $this->belongsTo(User::class, 'counsellor_id');
    }
}