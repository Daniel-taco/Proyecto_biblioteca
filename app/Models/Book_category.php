<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book_category extends Model
{
    use HasFactory;
    protected $fillable = ['category_name', 'description'];
    
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
