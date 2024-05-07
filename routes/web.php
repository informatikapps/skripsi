<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileMahasiswaController;
use App\Http\Controllers\TugasAkhirController;
use App\Http\Controllers\PengumumanFileController;
use Illuminate\Foundation\Application;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route("login"));
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'has_set_password'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/setting/firstlogin', function () {
        return Inertia::render('Mahasiswa/FirstLogin');
    })->name('mahasiswa.firstlogin');
    Route::post('/setting/firstlogin', [ProfileMahasiswaController::class, 'firstLogin'])->name('mahasiswa.firstloginpost');
    Route::get('/profile', [ProfileMahasiswaController::class, 'edit'])->name('profile.edit')->middleware('has_set_password');
    Route::patch('/profile', [ProfileMahasiswaController::class, 'update'])->name('profile.update')->middleware('has_set_password');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware('has_set_password');
    Route::get('/pengumuman', [PengumumanFileController::class, 'indexPengumuman'])->name('pengumumanindex')->middleware('has_set_password');
    Route::get('/pengumuman/{id}', [PengumumanFileController::class, 'detailPengumuman'])->name('pengumumandetail')->middleware('has_set_password');
    Route::get('/file', [PengumumanFileController::class, 'indexFile'])->name('da.index')->middleware('has_set_password');
    Route::get('/file/{id}', [PengumumanFileController::class, 'downloadFile'])->name('da.download')->middleware('has_set_password');
    Route::get('/tugasakhir', [TugasAkhirController::class, 'index'])->name('tugasakhir.index')->middleware('has_set_password');
    Route::get('/tugasakhir/detail/{id}', [TugasAkhirController::class, 'detail'])->name('tugasakhir.detail')->middleware('has_set_password');
    Route::get('/tugasakhir/saya', [TugasAkhirController::class, 'create'])->name('tugasakhir.create')->middleware('has_set_password');
    Route::get('/tugasakhir/saya/{id}', [TugasAkhirController::class, 'show'])->name('tugasakhir.show')->middleware('has_set_password');
    Route::post('/tugasakhir/saya', [TugasAkhirController::class, 'store'])->name('tugasakhir.store')->middleware('has_set_password');
});

Route::get('/admin/login', [App\Http\Controllers\AdminController::class, 'login'])->name('adminlogin');
Route::middleware(['is_admin'])->group(function () {
    Route::get('/admin', [App\Http\Controllers\AdminController::class, 'index'])->name('admin');
    Route::post('/admin/logout', [App\Http\Controllers\AdminController::class, 'logout'])->name('admin.logout');
    Route::get('/admin/mahasiswa', [App\Http\Controllers\AdminController::class, 'mahasiswa'])->name('admin.mahasiswa');
    Route::get('/admin/mahasiswa/create', [App\Http\Controllers\AdminController::class, 'mahasiswaCreate'])->name('admin.mahasiswacreate');
    Route::post('/admin/mahasiswa/create', [App\Http\Controllers\AdminController::class, 'mahasiswaCreatePost'])->name('admin.mahasiswacreatepost');
    Route::post('/admin/mahasiswa/import', [App\Http\Controllers\AdminController::class, 'import'])->name('admin.mahasiswaimport');
    Route::get('/admin/mahasiswa/{id}', [App\Http\Controllers\AdminController::class, 'mahasiswaEdit'])->name('admin.mahasiswaedit');
    Route::patch('/admin/mahasiswa/{id}', [App\Http\Controllers\AdminController::class, 'mahasiswaEditPost'])->name('admin.mahasiswaeditpost');
    Route::delete('/admin/mahasiswa/{id}', [App\Http\Controllers\AdminController::class, 'mahasiswaDelete'])->name('admin.mahasiswadelete');
    Route::post('/admin/reset/{id}', [App\Http\Controllers\AdminController::class, 'resetPassword'])->name('admin.reset');
    Route::get('admin/tugasakhir', [TugasAkhirController::class, 'adminindex'])->name('admin.ta');
    Route::get('admin/tugasakhir/create', [TugasAkhirController::class, 'admincreate'])->name('admin.tacreate');
    Route::post('admin/tugasakhir/create', [TugasAkhirController::class, 'adminstore'])->name('admin.tacreatepost');
    Route::get('admin/tugasakhir/{id}', [TugasAkhirController::class, 'adminedit'])->name('admin.taedit');
    Route::patch('admin/tugasakhir/{id}', [TugasAkhirController::class, 'adminupdate'])->name('admin.taupdate');
    Route::patch('admin/tugasakhir/acc/{id}', [TugasAkhirController::class, 'adminacc'])->name('admin.taacc');
    Route::patch('admin/tugasakhir/rej/{id}', [TugasAkhirController::class, 'adminrej'])->name('admin.tarej');   
    Route::delete('admin/tugasakhir/{id}', [TugasAkhirController::class, 'delete'])->name('admin.tadelete');
    Route::resource('admin/dosen', DosenController::class);
    Route::resource('admin/pengumuman', PengumumanController::class);
    Route::resource('admin/file', FileController::class);
    Route::get('admin/profile', [ProfileController::class, 'edit'])->name('admin.profile');
    Route::get('admin/ta/{id}', [TugasAkhirController::class, 'show'])->name('admin.tashow');
    Route::get('admin/testdelete', [App\Http\Controllers\AdminController::class, 'testdel'])->name('admin.testdelete');
    Route::patch('admin/profile', [AdminController::class, 'updateUser'])->name('admin.update');

});
Route::post('/admin/login', [App\Http\Controllers\AdminController::class, 'loginPost'])->name('adminloginpost');
Route::get('test', function () {
    return Inertia::render('Mahasiswa/Test');
})->name('test');

require __DIR__.'/auth.php';
