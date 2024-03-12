<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_file',
        'deskripsi',
        'alamat_url',
        'user_id',
        'is_public',
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }
}
