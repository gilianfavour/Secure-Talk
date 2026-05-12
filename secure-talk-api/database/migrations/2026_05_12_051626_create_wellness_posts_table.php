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
        Schema::create('wellness_posts', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('message');

            $table->string('category')->nullable();

            $table->string('image')->nullable();

            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();

            $table->string('background_color')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamp('published_at')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wellness_posts');
    }
};