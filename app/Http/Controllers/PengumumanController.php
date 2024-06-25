<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $informasi = Informasi::when(request('search'), function ($query) {
            $query->where('judul_info', 'like', '%' . request('search') . '%')
                ->orWhere('isi_info', 'like', '%' . request('search') . '%');
        })->paginate(10);
        return Inertia::render('Admin/Informasi/Index', [
            'informasi' => $informasi,
            'message' => $request->session()->get('message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Informasi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        Informasi::create(
            [
                'judul_info' => $request->judul,
                'isi_info' => $request->konten,
            ]
        );
        return redirect()->route('pengumuman.index')->with('message', 'Data Pengumuman berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $informasi = Informasi::find($id);
        return Inertia::render('Admin/Informasi/Edit', [
            'informasi' => $informasi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $informasi = Informasi::find($id);
        $informasi->update(
            [
                'judul_info' => $request->judul,
                'isi_info' => $request->konten,
            ]
        );
        return redirect()->route('pengumuman.index')->with('message', 'Data Pengumuman berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pengumuman = Informasi::find($id);
        // dd($pengumuman);
        $pengumuman->delete();
        return redirect()->route('pengumuman.index')->with('message', 'Data Pengumuman berhasil dihapus');
    }
}
