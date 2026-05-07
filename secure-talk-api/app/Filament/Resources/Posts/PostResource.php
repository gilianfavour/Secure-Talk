<?php

namespace App\Filament\Resources\Posts;

use App\Filament\Resources\Posts\Pages\CreatePost;
use App\Filament\Resources\Posts\Pages\EditPost;
use App\Filament\Resources\Posts\Pages\ListPosts;
use App\Models\Post;
use App\Models\Reply;

use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

// Forms
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;

// Actions & Notifications
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'content';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('content')->label('User Message')->disabled(),
            TextInput::make('category')->disabled(),
            Select::make('type')
                ->options([
                    'public' => 'Public',
                    'private' => 'Private',
                ])
                ->disabled(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),

                Tables\Columns\TextColumn::make('content')
                    ->limit(50)
                    ->label('Message'),

                Tables\Columns\TextColumn::make('category')->badge(),

                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) => $state === 'private' ? 'danger' : 'success'),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => $state === 'resolved' ? 'success' : 'danger'),

                Tables\Columns\TextColumn::make('created_at')->dateTime(),

                Tables\Columns\TextColumn::make('replies_count')
                    ->counts('replies')
                    ->label('Replies'),
                Tables\Columns\TextColumn::make('counsellor.name')
                    ->label('Assigned To')
                    ->default('Unassigned'),
            ])

            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'public' => 'Public',
                        'private' => 'Private',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'open' => 'Open',
                        'resolved' => 'Resolved',
                    ]),

                Tables\Filters\Filter::make('unanswered')
                    ->query(fn ($query) => $query->doesntHave('replies')),

                Tables\Filters\Filter::make('mine')
                    ->label('Assigned to Me')
                    ->query(fn ($query) => $query->where('counsellor_id', auth()->id())),
            ])

            ->defaultSort('created_at', 'desc')

            ->actions([

                // ✅ Reply
                Action::make('reply')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->form([
                        Textarea::make('content')
                            ->required()
                            ->maxLength(1000),
                    ])
                    ->action(function ($record, array $data) {

                        Reply::create([
                            'post_id' => $record->id,
                            'content' => $data['content'],
                            'responder_type' => 'counsellor',
                            'counsellor_id' => auth()->id(),
                        ]);

                        Notification::make()
                            ->title('Reply sent')
                            ->success()
                            ->send();
                    }),

                // ✅ View Replies (FIXED WAY)
                Action::make('viewReplies')
                    ->label('Replies')
                    ->icon('heroicon-o-eye')
                    ->modalHeading('Replies')
                    ->modalContent(fn ($record) =>
                        view('filament.posts.replies', [
                            'replies' => $record->replies()->latest()->get(),
                        ])
                    ),

                // ✅ Assign
                Action::make('assign')
                    ->label('Assign to Me')
                    ->color('info')
                    ->action(fn ($record) =>
                        $record->update([
                            'counsellor_id' => auth()->id(),
                        ])
                    ),

                // ✅ Resolve
                Action::make('resolve')
                    ->color('success')
                    ->action(fn ($record) =>
                        $record->update(['status' => 'resolved'])
                    ),

                // ✅ Reopen
                Action::make('reopen')
                    ->color('warning')
                    ->action(fn ($record) =>
                        $record->update(['status' => 'open'])
                    ),
                Action::make('assignCounsellor')
                    ->label('Assign')
                    ->form([
                        Select::make('counsellor_id')
                            ->label('Counsellor')
                            ->options(
                                \App\Models\User::where('role', 'counsellor')
                                    ->pluck('name', 'id')
                            )
                            ->searchable()
                            ->required(),
                    ])
                    ->action(function ($record, $data) {
                        $record->update([
                            'counsellor_id' => $data['counsellor_id'],
                        ]);
                    }),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getEloquentQuery(): Builder
    {
        $user = auth()->user();

        if ($user->role === 'admin') {
            return parent::getEloquentQuery();
        }

        if ($user->role === 'counsellor') {
            return parent::getEloquentQuery()
                ->where('type', 'private')
                ->where(function ($q) use ($user) {
                    $q->whereNull('counsellor_id')
                    ->orWhere('counsellor_id', $user->id);
                });
        }

        return parent::getEloquentQuery()->whereRaw('1 = 0');
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