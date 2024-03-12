<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tugas_akhirs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');   
            $table->string('judul_ta', 500)->nullable();
            $table->string('ni_mhs')->nullable();
            $table->string('nama_mhs')->nullable();
            $table->longText('abstrak')->nullable();
            $table->string('ni_pembimbing_1')->nullable();
            $table->string('nama_pembimbing_1')->nullable();
            $table->string('ni_pembimbing_2')->nullable();
            $table->string('nama_pembimbing_2')->nullable();
            $table->string('periode', 50)->nullable();
            $table->string('file')->nullable();
            $table->boolean('status_acc')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tugas_akhirs');
    }
};
