<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('session_id')
                    ->required(),
                Textarea::make('content')
                    ->required()
                    ->columnSpanFull(),
                Select::make('type')
                    ->options(['public' => 'Public', 'private' => 'Private'])
                    ->required(),
                TextInput::make('category')
                    ->default(null),
                DateTimePicker::make('expires_at')
                    ->required(),
                TextInput::make('assigned_counsellor_id')
                    ->numeric()
                    ->default(null),
            ]);
    }
}
