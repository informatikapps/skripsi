<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TugasAkhir extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul_ta',
        'abstrak',
        'nama_mhs',
        'ni_mhs',
        'nama_pembimbing_1',
        'ni_pembimbing_1',
        'nama_pembimbing_2',
        'ni_pembimbing_2',
        'periode',
        'user_id',
        'status_acc',
        'file',
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }

}
