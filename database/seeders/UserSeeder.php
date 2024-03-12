<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\TugasAkhir;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [
            [
                'name' => 'admin',
                'username' => 'admin',
                'is_admin' => true,
                'password' => bcrypt('123456'),
                'has_set_password' => true,
            ],
            [
                'name' => 'Budi',
                'username' => '24060121130000',
                'is_admin' => false,
                'password' => bcrypt('123456'),
                'has_set_password'=> false,
            ],
        ];
        foreach ($userData as $key => $val) {
            User::create($val);
        }
        Dosen::create(
            [
                "nip" => "123456789",
                "nama_dosen" => "Dosen",
                "no_hp" => "123456789",
            ]
        );
        $dos_id = Dosen::where('nip','123456789')->first()->id;
        $mhs_id = User::where('username','24060121130000')->first()->id;
        Mahasiswa::create(
            [
                "user_id" => $mhs_id,
            ]
        );
    }
}
