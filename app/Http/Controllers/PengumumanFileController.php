<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Informasi;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengumumanFileController extends Controller
{
    public function indexPengumuman(Request $request)
    {

        $mahasiswa = Mahasiswa::where('user_id', auth()->user()->id)->first();
        $has_set_profile = $mahasiswa->tema != null && $mahasiswa != null;

        // dd($has_set_profile);

        $informasi = Informasi::query();
        $search = $request->input('search');
        if ($search) {
            $informasi->where('judul_info', 'like', '%' . $search . '%')
                ->orWhere('isi_info', 'like', '%' . $search . '%');
        }
        $informasi = $informasi->paginate(10)->appends(request()->all())->withQueryString();

        // dd($informasi);

        return Inertia::render('Dashboard', [
                'informasi' => $informasi,
                'has_set_profile' => $has_set_profile,
            'search' => $search,
        ]);
    }

    public function detailPengumuman($id)
    {
        $informasi = Informasi::find($id);
        return Inertia::render('Mahasiswa/FileInformasi/Detail', [
            'informasi' => $informasi
        ]);
    }

    public function indexFile(Request $request){
        $files = File::query();
        $search = $request->input('search');
        if($search){
            $files->where('nama_file', 'like', '%'.$search.'%');
        }
        $files = $files->where('is_public', true)->paginate(10)->appends(request()->all())->withQueryString();
        return Inertia::render('Mahasiswa/FileInformasi/DownloadArea', [
            'files' => $files,
            'search' => request()->input('search')
        ]);

        
    }

    public function downloadFile($id){
        $file = File::find($id);
        return Storage::download('public/files/'.$file->alamat_url);
    }

}
