<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book_lending extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_lend',
        'id_book'
    ];

    public function books(): BelongsTo{
        return $this->belongsTo(Book::class);
    }
    public function lends(): BelongsTo
    {
        return $this->belongsTo(Lend::class);
    }

}
