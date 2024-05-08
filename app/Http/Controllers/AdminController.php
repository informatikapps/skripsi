<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\TugasAkhir;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AdminController extends Controller
{
    public function index()
    {
        // dd(auth()->user());
        // if(!auth()->user()->is_admin){
        //    return redirect(route("adminlogin")); 
        // }
        $green = Mahasiswa::whereNotNull('dosen_pembimbing_1')->whereNotNull('dosen_pembimbing_2')->whereNotNull('tema')->whereNotNull('pesan')->count();
        $yellow = Mahasiswa::whereNull('dosen_pembimbing_1')->whereNull('dosen_pembimbing_2')->whereNotNull('tema')->whereNotNull('pesan')->count();
        $red = Mahasiswa::whereNull('dosen_pembimbing_1')->whereNull('dosen_pembimbing_2')->whereNull('tema')->whereNotNull('pesan')->count();

        return Inertia::render('Admin/Dashboard', [
            'green' => $green,
            'yellow' => $yellow,
            'red' => $red,
        ]);
    }
    public function login()
    {
        return Inertia::render('Admin/Login');
    }
    public function loginPost(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended(route("admin"));
    }
    public function logout()
    {
        Auth::logout();
        return redirect(route("adminlogin"));
    }

    public function mahasiswa(Request $request)
    {
        // $mahasiswa = User::where('is_admin', false)->paginate(10);
        // $mahasiswa = Mahasiswa::paginate(10);
        $mahasiswa = Mahasiswa::query();
        // $tema = $request->input('tema') === 'true';
        // $dosbing = $request->input('dosbing') === 'true';
        // if ($tema){
        //     $mahasiswa->whereNotNull('tema');
        // }

        // if ($dosbing){
        //     $mahasiswa->whereNotNull('dosen_pembimbing_1')->whereNotNull('dosen_pembimbing_2');
        // }
        $where = $request->input('where')==='dosbing';
        $search = $request->input('search');

        if($where){
            $mahasiswa->whereNull('dosen_pembimbing_1')->whereNull('dosen_pembimbing_2')->whereNotNull('tema')->whereNotNull('pesan');
        }

        // dd($mahasiswaQuery->paginate(10));
        if($search != null){
            $mahasiswa->whereHas('user', function($query) use ($search){
                $query->where('name', 'like', '%'.$search.'%')->orWhere('username', 'like', '%'.$search.'%');
            });
        }
        $mahasiswa = $mahasiswa->paginate(10);
        
        // dd($mahasiswa);

        // dd(Mahasiswa::find(2)->User());
        
        foreach ($mahasiswa as $mhs) {
            $mhs->user = User::find($mhs->user_id);
        }
        // dd($mahasiswa);
        // dd($mahasiswa);
        return Inertia::render(
            'Admin/Mahasiswa/Index',
            [
                'mahasiswa' => $mahasiswa,
                'where' => $where,
                'search' => $search,
            ]
        );
    }

    public function mahasiswaCreate()
    {

        $image = base64_encode(file_get_contents(public_path('image/contoh1.jpg')));
        // dd($image);

        return Inertia::render('Admin/Mahasiswa/Create', [
            'image' => $image,
        ]);
    }

    public function mahasiswaCreatePost(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'username' => $request->nim,
            'is_admin' => false,
            'password' => bcrypt('123456'),
            'has_set_password' => false,
        ]);
        $mahasiswa = Mahasiswa::create([
            'user_id' => $user->id,
        ]);
        return redirect(route('admin.mahasiswa'));
    }


    public function import(Request $request)
    {
        // dd($request->mhsJson);
        if($request->mhsJson != null){
            // dd($request->mhsJson[0]["NIM"]);
            $mahasiswas = json_decode($request->mhsJson);
            // dd($mahasiswas[0);
            foreach ($mahasiswas as $mahasiswa) {
                $user = User::create([
                    'name' => $mahasiswa->Nama,
                    'username' => $mahasiswa->NIM,
                    'is_admin' => false,
                    'password' => bcrypt('123456'),
                    'has_set_password' => false,
                ]);
                Mahasiswa::create([
                    'user_id' => $user->id,
                ]);
            }
        }
        return redirect(route('admin.mahasiswa'));  
    }

    public function tugasakhir()
    {
        return Inertia::render('Admin/TugasAkhir/Index');
    }

    public function mahasiswaEdit($id)
    {
        $mahasiswa = User::find($id);
        $mahasiswa->mhs = Mahasiswa::where('user_id', $id)->first();
        $dosen = Dosen::all();
        if(TugasAkhir::where('user_id', $id)->first() != null){
            $mahasiswa->tugasakhir = TugasAkhir::where('user_id', $id)->first()->id;
        }
        // dd($dosen[0]);
        // dd($mahasiswa);
        return Inertia::render('Admin/Mahasiswa/Edit', [
            'mahasiswa' => $mahasiswa,
            'dosen' => $dosen,
        ]);
    }

    public function mahasiswaEditPost(Request $request, $id)
    {
        // dd($request->all());
        $user = User::find($id);
        $user->name = $request->name;
        $user->username = $request->nim;
        $user->save();
        $mahasiswa = Mahasiswa::where('user_id', $id)->first();
        $mahasiswa->dosen_pembimbing_1 = $request->dosen_pembimbing_1;
        $mahasiswa->dosen_pembimbing_2 = $request->dosen_pembimbing_2;
        $mahasiswa->save();
        // dd($mahasiswa);
        return redirect(route('admin.mahasiswa'));
    }

    public function mahasiswaDelete($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }


    public function resetPassword($id)
    {
        $user = User::find($id);
        $user->password = bcrypt('123456');
        $user->has_set_password = false;
        $user->save();
        return redirect(route('admin.mahasiswa'));
    }

    public function updateUser(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->username = $request->username;
        $user->save();
        return redirect(route('admin'));
    }

    public function test()
    {
        return Inertia::render('Admin/Test');
    }

}
