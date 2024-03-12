<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HasSetPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dd(auth()->user()->has_set_password);
        if(!auth()->user()->has_set_password){
            return redirect(route('mahasiswa.firstlogin'));
        }

        if(auth()->user()->sudah_lulus){
            return redirect('/')->with('error', 'Anda sudah lulus, tidak bisa mengakses halaman ini');
        }

        if(auth()->user()->is_admin){
            return redirect(route('admin'));
        }

        return $next($request);
    }
}
