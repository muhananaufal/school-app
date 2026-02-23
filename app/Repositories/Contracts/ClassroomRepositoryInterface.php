<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ClassroomRepositoryInterface
{
  // Mengambil semua data kelas murni tanpa relasi
  public function getAll();

  // Mengambil semua kelas beserta relasi guru dan siswanya
  public function getWithRelations(int $perPage = 5): LengthAwarePaginator;

  // Mencari satu data kelas spesifik berdasarkan ID
  public function findById($id);

  // Menyimpan data kelas baru
  public function create(array $data);

  // Memperbarui data kelas berdasarkan ID
  public function update($id, array $data);

  // Menghapus data kelas berdasarkan ID
  public function delete($id);
}
