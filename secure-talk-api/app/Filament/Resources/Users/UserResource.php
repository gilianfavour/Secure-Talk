<?php

namespace App\Filament\Resources\Users;

use App\Filament\Resources\Users\Pages\CreateUser;
use App\Filament\Resources\Users\Pages\EditUser;
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Filament\Resources\Users\Schemas\UserForm;
use App\Filament\Resources\Users\Tables\UsersTable;
use App\Models\User;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Users';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('role')
            ->options([
                'admin' => 'Admin',
                'counsellor' => 'Counsellor',
                'user' => 'User',
            ])
            ->required(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),

                Tables\Columns\TextColumn::make('email'),

                Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->color(fn ($state) =>
                        match ($state) {
                            'admin' => 'danger',
                            'counsellor' => 'success',
                            default => 'gray',
                        }
                    ),
                Tables\Columns\TextColumn::make('assigned_posts_count')
                    ->counts('assignedPosts')
                    ->label('Assigned Posts'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUsers::route('/'),
            'create' => CreateUser::route('/create'),
            'edit' => EditUser::route('/{record}/edit'),
        ];
    }
}
