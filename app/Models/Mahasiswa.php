<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $fillable = [
            'user_id',
            'email',
            'no_hp',
            'tema',
            'pesan',
            'dosen_pembimbing_1',
            'dosen_pembimbing_2',
    ];

    public function User(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function dosen_pembimbing_1(): BelongsTo{
        return $this->belongsTo(Dosen::class, 'dosen_pembimbing_1');
    }

    public function dosen_pembimbing_2(): BelongsTo{
        return $this->belongsTo(Dosen::class, 'dosen_pembimbing_2');
    }
}
