<?php

namespace App\Filament\Resources\Posts;

use App\Models\Post;
use App\Models\User;
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
use Illuminate\Database\Eloquent\Builder;

use App\Filament\Resources\Posts\Pages\ListPosts;
use App\Filament\Resources\Posts\Pages\CreatePost;
use App\Filament\Resources\Posts\Pages\EditPost;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ChatBubbleLeftRight;

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

            Select::make('status')
                ->options([
                    'pending' => 'Pending',
                    'assigned' => 'Assigned',
                    'closed' => 'Closed',
                ])
                ->default('pending')
                ->required(),

            Select::make('counsellor_id')
                ->label('Assigned Counsellor')
                ->relationship(
                    name: 'counsellor',
                    titleAttribute: 'name'
                )
                ->disabled(fn () => auth()->user()?->role === 'counsellor')
                ->options(
                    User::where('role', 'counsellor')
                        ->pluck('name', 'id')
                )
                ->searchable()
                ->preload(),

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
                TextColumn::make('id')
                    ->disabled(fn () => auth()->user()?->role === 'counsellor')
                    ->sortable(),

                TextColumn::make('content')
                    ->limit(40)
                    ->searchable(),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) =>
                        $state === 'private' ? 'danger' : 'success'
                    ),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'pending' => 'warning',
                        'assigned' => 'success',
                        'closed' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('counsellor.name')
                    ->label('Counsellor')
                    ->default('Unassigned'),

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

            ->actions([
                Tables\Actions\EditAction::make(),

                Tables\Actions\Action::make('assign')
                    ->label('Assign')
                    ->icon('heroicon-o-user-plus')
                    ->form([
                        Select::make('counsellor_id')
                            ->label('Counsellor')
                            ->options(
                                User::where('role', 'counsellor')
                                    ->pluck('name', 'id')
                            )
                            ->required(),
                    ])
                    ->action(function ($record, array $data) {
                        $record->update([
                            'counsellor_id' => $data['counsellor_id'],
                            'status' => 'assigned',
                        ]);
                    }),
            ])
        ->defaultSort('created_at', 'desc');
    }

    

    public static function getRelations(): array
    {
        return [];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        $user = auth()->user();

        if ($user->role === 'counsellor') {
            return $query->where('counsellor_id', $user->id);
        }

        return $query;
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