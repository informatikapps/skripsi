<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index(Request $request)
    {
        $dosen = Dosen::where('nama_dosen', 'like', '%'.$request->search.'%')->orWhere('nip', 'like', '%'.$request->search.'%')->paginate(10)->appends($request->all())->withQueryString();
        // dd($dosen);
        return Inertia::render('Admin/Dosen/Index', ['dosen' => $dosen, 'search' => $request->search, 'message' => $request->session()->get('message')]);
    }   

    public function create()
    {
        return Inertia::render('Admin/Dosen/Create');
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'nama' => 'required',
        //     'nip' => 'required|size:18',
        //     'alamat' => 'required',
        //     'prodi' => 'required',
        //     'email' => 'required|email',
        //     'no_hp' => 'required|numeric',
        // ]);
        // dd($request->all());
        Dosen::create(
            [
                'nama_dosen' => $request->name,
                'nip' => $request->nip,
                'no_hp' => $request->no_hp,
                'keterangan' => $request->keterangan,
            ]
        );
        return redirect(route('dosen.index'))->with('message', 'Data berhasil ditambahkan');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $dosen = Dosen::find($id);
        return Inertia::render('Admin/Dosen/Edit', ['dosen' => $dosen]);
    }

    public function update(Request $request, $id)
    {
        // dd($request->all());
        $dosen = Dosen::find($id);
        $dosen->update(
            [
                'nama_dosen' => $request->nama,
                'nip' => $request->nip,
                'no_hp' => $request->no_hp,
                'keterangan' => $request->keterangan,
            ]
        );
        return redirect(route('dosen.index'))->with('message', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        // dd($id);
        $dosen = Dosen::findOrFail($id);
        $dosen->delete();

        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }
    
}
