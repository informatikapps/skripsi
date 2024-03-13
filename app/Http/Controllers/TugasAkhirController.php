<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\TugasAkhir;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TugasAkhirController extends Controller
{
    public function index()
    {
        $tugasakhir = TugasAkhir::query();
        $search = request()->input('search');
        if ($search) {
            $tugasakhir->where(function ($query) use ($search) {
                $query->where('nama_mhs', 'like', '%' . $search . '%')
                    ->orWhere('ni_mhs', 'like', '%' . $search . '%')
                    ->orWhere('judul_ta', 'like', '%' . $search . '%')
                    ->orWhere('nama_pembimbing_1', 'like', '%' . $search . '%')
                    ->orWhere('nama_pembimbing_2', 'like', '%' . $search . '%')
                    ->orWhere('periode', 'like', '%' . $search . '%')
                    ->orWhere('judul_ta', 'like', '%' . $search . '%')
                    ->orWhere('abstrak', 'like', '%' . $search . '%');
            });
        }

        // Add a condition for 'status_acc' attribute equal to true
        $tugasakhir->where('status_acc', true);
        $tugasakhir = $tugasakhir->paginate(10)->appends(request()->all())->withQueryString();
        // dd($tugasakhir);
        return Inertia::render('Mahasiswa/TugasAkhir/Index', ['tugasAkhir' => $tugasakhir, 'search' => request()->input('search')]);
    }

    public function adminindex(Request $request)
    {
        $tugasakhir = TugasAkhir::query();

        // Check and filter based on status_acc
        if ($request->has('status_acc') && $request->input('status_acc') == "0") {
            $tugasakhir->where('status_acc', false);
        }

        // Check and filter based on search
        $search = $request->input('search');
        if ($search) {
            $tugasakhir->where(function ($query) use ($search) {
                $query->where('nama_mhs', 'like', '%' . $search . '%')
                    ->orWhere('ni_mhs', 'like', '%' . $search . '%')
                    ->orWhere('judul_ta', 'like', '%' . $search . '%')
                    ->orWhere('nama_pembimbing_1', 'like', '%' . $search . '%')
                    ->orWhere('nama_pembimbing_2', 'like', '%' . $search . '%')
                    ->orWhere('periode', 'like', '%' . $search . '%')
                    ->orWhere('judul_ta', 'like', '%' . $search . '%')
                    ->orWhere('abstrak', 'like', '%' . $search . '%');
            });
        }

        $tugasakhir = $tugasakhir->paginate(10)->appends(request()->all())->withQueryString();

        return Inertia::render('Admin/TugasAkhir/Index', [
            'tugasakhir' => $tugasakhir,
            'status_acc' => $request->input('status_acc'),
            'search' => $request->input('search')
        ]);
    }


    public function admincreate()
    {
        $dosen = Dosen::all();
        $image = base64_encode(file_get_contents(public_path('image/contoh2.jpg')));
        // dd($image);
        return Inertia::render('Admin/TugasAkhir/Create', ['dosen' => $dosen, 'image' => $image, ]);
    }

    public function adminstore(Request $request){
        // dd($request->all());
        if(isset($request->file)){
            // dd($request->file);
            foreach($request->file as $fi){
                // dd($fi['NIM']);
                TugasAkhir::create([
                    'user_id' => auth()->user()->id,
                    'nama_mhs' => $fi['Nama'],
                    'ni_mhs' => $fi['NIM'],
                    'judul_ta' => $fi['Judul'],
                    'abstrak' => $fi['Abstrak'],
                    'ni_pembimbing_1' => $fi['NIP Dosen Pembimbing 1'],
                    'ni_pembimbing_2' => $fi['NIP Dosen Pembimbing 2'],
                    'nama_pembimbing_1' => $fi['Dosen Pembimbing 1'],
                    'nama_pembimbing_2' => $fi['Dosen Pembimbing 2'],
                    'periode' => $fi['Periode'],
                    'status_acc' => true,
                ]);
            }
            return redirect(route('admin.ta')); 
        }
        $dosbing_1 = Dosen::find($request->pembimbing_1);
        $dosbing_2 = Dosen::find($request->pembimbing_2);
        // dd($dosbing_1);
        TugasAkhir::create([
            'user_id' => auth()->user()->id,
            'nama_mhs' => $request->name,
            'ni_mhs' => $request->nim,
            'judul_ta' => $request->judul,
            'abstrak' => $request->abstrak,
            'ni_pembimbing_1' => $dosbing_1->nip,
            'ni_pembimbing_2' => $dosbing_2->nip,
            'nama_pembimbing_1' => $dosbing_1->nama_dosen,
            'nama_pembimbing_2' => $dosbing_2->nama_dosen,
            'periode' => $request->periode,
            'status_acc' => true,
        ]);
        return redirect(route('admin.ta'));
    }

    public function adminedit($id){
        $ta = TugasAkhir::find($id);
        // dd($ta);
        $dosen = Dosen::all();
        return Inertia::render('Admin/TugasAkhir/Edit', ['tugasakhir' => $ta, 'dosen' => $dosen]);
    }

    public function adminupdate(Request $request, string $id){
        $ta = TugasAkhir::find($id);
        // dd($request->all());
        $dosbing_1 = Dosen::find($request->pembimbing_1);
        $dosbing_2 = Dosen::find($request->pembimbing_2);
        $ta->nama_mhs = $request->name;
        $ta->ni_mhs = $request->nim;
        $ta->judul_ta = $request->judul;
        $ta->abstrak = $request->abstrak;
        $ta->ni_pembimbing_1 = $dosbing_1->nip;
        $ta->ni_pembimbing_2 = $dosbing_2->nip;
        $ta->nama_pembimbing_1 = $dosbing_1->nama_dosen;
        $ta->nama_pembimbing_2 = $dosbing_2->nama_dosen;
        $ta->periode = $request->periode;
        $ta->save();
        return redirect(route('admin.ta'));
    }

    public function adminacc(string $id){
        $ta = TugasAkhir::find($id);
        // dd($ta);
        $ta->status_acc = true;
        $ta->save();
        $user = User::find($ta->user_id);
        $user->sudah_lulus = true;
        $user->save();
        return redirect(route('admin.taedit', $id));
    }

    public function adminrej(string $id){
        $ta = TugasAkhir::find($id);
        // dd($ta);
        $ta->status_acc = false;
        $ta->save();
        $user = User::find($ta->user_id);
        $user->sudah_lulus = false;
        $user->save();
        return redirect(route('admin.taedit', $id));
    }

    public function create(){
        $mahasiswa = Mahasiswa::where('user_id', auth()->user()->id)->first();
        $mahasiswa->dosen_pembimbing_1 = Dosen::find($mahasiswa->dosen_pembimbing_1);
        $mahasiswa->dosen_pembimbing_2 = Dosen::find($mahasiswa->dosen_pembimbing_2);
        $now = date('Y-m-d');
        $mid = date('Y') . '-07-01';
        if($now < $mid){
            $periode = 'Genap '. date('Y') - 1 . '/' . date('Y');
        }else{
            $periode = 'Gasal ' . date('Y') . '/' . date('Y') + 1;
        }
        // $mahasiswa->nama_pembimbing_1 = Dosen::find($mahasiswa->dosen_pembimbing_1);
        // $mahasiswa->nama_pembimbing_2 = Dosen::find($mahasiswa->dosen_pembimbing_2);
        $ta = TugasAkhir::where('user_id', auth()->user()->id)->first();
        // dd($mahasiswa);
        return Inertia::render('Mahasiswa/TugasAkhir/Saya', ['mahasiswa' => $mahasiswa, 'tugasAkhir' => $ta, 'periode' => $periode]);
    }

    public function store(Request $request){
        // dd($request->all());
        $mahasiswa = Mahasiswa::where('user_id', auth()->user()->id)->first();
        $mahasiswa->dosen_pembimbing_1 = Dosen::find($mahasiswa->dosen_pembimbing_1);
        $mahasiswa->dosen_pembimbing_2 = Dosen::find($mahasiswa->dosen_pembimbing_2);
        if(TugasAkhir::where('user_id', auth()->user()->id)->first()){
            $ta = TugasAkhir::where('user_id', auth()->user()->id)->first();
            $ta->judul_ta = $request->judul;
            $ta->abstrak = $request->abstrak;
            $ta->periode = $request->periode;

            $file = $request->file('file');
            if($file){
                $nama_file = time() .' - '. $request->judul. '.'. $file->getClientOriginalExtension();
                $file->storeAs('public/files', $nama_file);
                Storage::delete('public/files/' . $ta->file);
                $ta->file = $nama_file;
            }
            $ta->save();
            return redirect(route('tugasakhir.create'));
        }
        $file = $request->file('file');
        if($file){
            $nama_file = time() .' - '. $request->judul. '.'. $file->getClientOriginalExtension();
            $file->storeAs('public/files', $nama_file);
        }

        $ta = TugasAkhir::create([
            'user_id' => auth()->user()->id,
            'nama_mhs' => auth()->user()->name,
            'ni_mhs' => auth()->user()->username,
            'judul_ta' => $request->judul,
            'abstrak' => $request->abstrak,
            'periode' => $request->periode,
            'file' => $nama_file,
            'ni_pembimbing_1' => $mahasiswa->dosen_pembimbing_1->nip,
            'ni_pembimbing_2' => $mahasiswa->dosen_pembimbing_2->nip,
            'nama_pembimbing_1' => $mahasiswa->dosen_pembimbing_1->nama_dosen,
            'nama_pembimbing_2' => $mahasiswa->dosen_pembimbing_2->nama_dosen,
        ]);
        return redirect(route('tugasakhir.create'));
        // dd($mahasiswa);
    }

    public function show($id){
        $ta = TugasAkhir::find($id);
        // dd($ta);

        // $file = Storage::url('files/' . $ta->file);
        return Storage::download('public/files/' . $ta->file);
        
    }
}
