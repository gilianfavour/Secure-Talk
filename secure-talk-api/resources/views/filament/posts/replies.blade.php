<div class="p-4 bg-gray-50 rounded-xl space-y-3">
    <h3 class="font-bold text-sm text-gray-700">Replies</h3>

    @forelse($replies as $reply)
        <div class="p-3 bg-white rounded-lg shadow-sm border">
            <p class="text-sm text-gray-800">
                {{ $reply->content }}
            </p>

            <div class="text-xs text-gray-500 mt-2">
                By {{ $reply->responder_type }} • {{ $reply->created_at->diffForHumans() }}
            </div>
        </div>
    @empty
        <p class="text-sm text-gray-400">No replies yet</p>
    @endforelse
</div>