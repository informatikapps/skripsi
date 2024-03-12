<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dosen extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'nama_dosen',
        'no_hp',
        'keterangan',
    ];

    public function TugasAkhir(){
        return $this->hasMany(TugasAkhir::class);
    }

    public function mahasiswa(): HasMany{
        return $this->hasMany(Mahasiswa::class);
    }

}
