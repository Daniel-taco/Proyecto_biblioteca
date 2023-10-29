<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'genre',
        'publication_year',
        'available_copies',
        'id_category',
        'editorial',
        'edition'
    ];
    public function book_categories(): BelongsTo
    {
        return $this->belongsTo(Book_category::class);
    }
    public function Book_lends(): HasMany
    {
        return $this->hasMany(Book_lending::class);
    }
}
