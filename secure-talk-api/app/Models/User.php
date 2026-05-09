<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // 🔐 IMPORTANT: Filament access rule
    public function canAccessPanel(Panel $panel): bool
    {
        return true; // allow all users for now (admin panel)
    }

    public function isCounsellor()
    {
        return $this->role === 'counsellor';
    }

    public function assignedPosts()
    {
        return $this->hasMany(Post::class, 'counsellor_id');
    }
}