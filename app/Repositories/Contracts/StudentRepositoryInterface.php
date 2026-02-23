<?php

namespace App\Repositories\Contracts;

interface StudentRepositoryInterface
{
  // Mengambil semua data siswa beserta nama kelasnya
  public function getAll();

  // Mencari satu data siswa spesifik berdasarkan ID
  public function findById($id);

  // Menyimpan data siswa baru
  public function create(array $data);

  // Memperbarui data siswa berdasarkan ID
  public function update($id, array $data);

  // Menghapus data siswa berdasarkan ID
  public function delete($id);
}
