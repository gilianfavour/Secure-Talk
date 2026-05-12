<?php

namespace App\Filament\Resources\Posts;

use App\Models\Post;
use UnitEnum;
use BackedEnum;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DateTimePicker;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

use App\Filament\Resources\Posts\PostResource\Pages\ListPosts;
use App\Filament\Resources\Posts\PostResource\Pages\CreatePost;
use App\Filament\Resources\Posts\PostResource\Pages\EditPost;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ChatBubbleLeftRight;

    protected static ?string $navigationGroup = 'Content';

    protected static ?string $recordTitleAttribute = 'content';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('content')
                ->required()
                ->columnSpanFull(),

            Select::make('type')
                ->options([
                    'public' => 'Public',
                    'private' => 'Private',
                ])
                ->required(),

            TextInput::make('category'),

            TextInput::make('session_id')
                ->required(),

            TextInput::make('reply_code')
                ->disabled()
                ->dehydrated(false),

            DateTimePicker::make('expires_at'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),

                TextColumn::make('content')
                    ->limit(40)
                    ->searchable(),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) =>
                        $state === 'private' ? 'danger' : 'success'
                    ),

                TextColumn::make('category'),

                TextColumn::make('session_id')
                    ->limit(10),

                TextColumn::make('reply_code'),

                TextColumn::make('replies_count')
                    ->counts('replies')
                    ->label('Replies'),

                TextColumn::make('expires_at')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'public' => 'Public',
                        'private' => 'Private',
                    ]),

                Tables\Filters\Filter::make('active')
                    ->query(fn ($query) =>
                        $query->where('expires_at', '>', now())
                    ),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPosts::route('/'),
            'create' => CreatePost::route('/create'),
            'edit' => EditPost::route('/{record}/edit'),
        ];
    }
}