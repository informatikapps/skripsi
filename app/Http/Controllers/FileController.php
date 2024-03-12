<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::when(request('search'), function ($query) {
            $query->where('nama_file', 'like', '%' . request('search') . '%')
                ->orWhere('deskripsi', 'like', '%' . request('search') . '%');
        })->where('is_public', true)
        ->paginate(10);

        return Inertia::render('Admin/File/Index', [
            'files' => $files
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/File/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'judul_file' => 'required',
            'deskripsi' => 'required',
            'file' => 'required|file'
        ]);

        $file = $request->file('file');
        $nama_file = time() .' - '. $request->judul_file. '.'. $file->getClientOriginalExtension();
        $file->storeAs('public/files', $nama_file);

        File::create([
            'nama_file' => $request->judul_file,
            'deskripsi' => $request->deskripsi,
            'alamat_url' => $nama_file,
            'user_id' => auth()->user()->id,
            'is_public' => true
        ]);

        return redirect()->route('file.index')->with('success', 'File berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $filePath = File::findOrFail($id)->alamat_url;
        
        // dd($filePath);
        
        return Storage::download('public/files/'.$filePath);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $file = File::findOrFail($id);

        return Inertia::render('Admin/File/Edit', [
            'files' => $file
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // dd($id);

        
        $file = File::findOrFail($id);
        Storage::delete('public/files/'.$file->alamat_url);
        $file->delete();

        return redirect()->route('file.index')->with('success', 'File berhasil dihapus');

    }
}
