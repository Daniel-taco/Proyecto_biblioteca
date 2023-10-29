<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lend extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'lend_date',
        'expected_return_date',
        'lend_state'
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function Book_lends(): HasMany
    {
        return $this->hasMany(Book_lending::class);
    }

    
}
