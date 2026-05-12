<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WellnessPost extends Model
{
    protected $fillable = [
        'title',
        'message',
        'category',
        'image',
        'button_text',
        'button_link',
        'background_color',
        'is_active',
        'published_at',
        'created_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Creator relationship
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope active posts
     */
    public function scopeActive($query)
    {
        return $query
            ->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            });
    }
}