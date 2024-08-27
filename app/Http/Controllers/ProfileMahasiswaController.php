<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\File;
use App\Models\Mahasiswa;
use App\Models\TugasAkhir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileMahasiswaController extends Controller
{
    public function firstlogin(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'password' => 'required|confirmed',
        ]);
        // dd(Hash::check($request->password, auth()->user()->password));
        if(Hash::check($request->password, auth()->user()->password)){
            return redirect()->back()->withErrors(['password' => 'Password sama dengan default password']);
        }
        $user = auth()->user();
        // $user->password = bcrypt($request->password);
        $user->has_set_password = true;
        $user->save();
        return redirect(route('pengumumanindex'));

    }

    public function edit(){

        $mahasiswa = Mahasiswa::where('user_id', auth()->user()->id)->first();  
        $mahasiswa->dosen_pembimbing = Dosen::find($mahasiswa->dosen_pembimbing);
        $dosbing1 = Dosen::find($mahasiswa->dosen_pembimbing_1);
        $dosbing2 = Dosen::find($mahasiswa->dosen_pembimbing_2);
        $mahasiswa->irs = File::find($mahasiswa->irs_id);
        $mahasiswa->khs = File::find($mahasiswa->khs_id);
        return Inertia::render('Mahasiswa/Profile/Profile', [
            'mahasiswa' => $mahasiswa,
            'dosbing1' => $dosbing1,
            'dosbing2' => $dosbing2,
            'message' => session('message'),
        ]);
    }

    public function update(Request $request){
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'nim' => 'required',
            'email' => 'required',
            'no_hp' => 'required',
        ]);
        // $irs = File::create([
        //     'nama_file' => $request->irs->getClientOriginalName(),
        // ]);


        $mahasiswa = Mahasiswa::where('user_id', auth()->user()->id)->first();
        $mahasiswa->no_hp = $request->no_hp;
        $mahasiswa->email = $request->email;
        $mahasiswa->no_hp = $request->no_hp;
        $mahasiswa->tema = $request->tema;
        $mahasiswa->pesan = $request->pesan;
        $mahasiswa->save();
        return redirect()->back()->with('message', 'Data berhasil diubah');
    }

    public function tugasakhir(){
        if(isset(Mahasiswa::where('user_id', auth()->user()->id)->first()->dosen_pembimbing)){
            $dosbing = Mahasiswa::where('user_id', auth()->user()->id)->first()->dosen_pembimbing;
            $nama_dosbing = Dosen::find($dosbing)->nama_dosen;
            $nip_dosbing = Dosen::find($dosbing)->nip;
            $judul = TugasAkhir::where('ni_mhs', auth()->user()->username)->first();
        } else {
            $nama_dosbing = null;
            $nip_dosbing = null;
        }
        return Inertia::render('Mahasiswa/Profile/TugasAkhir', ["nama_dosbing" => $nama_dosbing, "nip_dosbing"=> $nip_dosbing, "judul" => $judul, "message" => session('message')]);
    }

    public function tugasakhirPost(Request $request){
        // dd($request->all());
        $request->validate([
            'judul_ta' => 'required',
            'nip_dosbing' => 'required',
            'nama_dosbing' => 'required',
        ]);
        if(TugasAkhir::where('ni_mhs', auth()->user()->username)->first() == null){
            TugasAkhir::create([
                'ni_mhs' => auth()->user()->username,
                'nama_mhs' => auth()->user()->name,
                'judul_ta' => $request->judul_ta,
                'ni_pembimbing' => $request->nip_dosbing,
                'nama_pembimbing' => $request->nama_dosbing,
            ]);
        } else {
            $ta = TugasAkhir::where('ni_mhs', auth()->user()->username)->first();
            $ta->judul_ta = $request->judul_ta;
            $ta->ni_pembimbing = $request->nip_dosbing;
            $ta->nama_pembimbing = $request->nama_dosbing;
            $ta->save();
        }
        return redirect()->back()->with('success', 'Judul dan dosen pembimbing berhasil diubah');
    }
}
