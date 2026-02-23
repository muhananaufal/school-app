<?php

namespace App\Repositories\Contracts;

interface TeacherRepositoryInterface
{
  // Mengambil semua data guru beserta nama kelas tempat mengajar
  public function getAll();

  // Mencari satu data guru spesifik berdasarkan ID
  public function findById($id);

  // Menyimpan data guru baru
  public function create(array $data);

  // Memperbarui data guru berdasarkan ID
  public function update($id, array $data);

  // Menghapus data guru berdasarkan ID
  public function delete($id);
}
