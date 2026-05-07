<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->id();

            // Link to post
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();

            // Reply content
            $table->text('content');

            // Who replied
            $table->enum('responder_type', ['user', 'counsellor'])->default('user');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
