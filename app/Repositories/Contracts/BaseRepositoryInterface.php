<?php

namespace App\Repositories\Contracts;

interface BaseRepositoryInterface
{
  // Mengambil semua data murni tanpa relasi
  public function getAll();

  // Mencari satu data spesifik berdasarkan ID
  public function findById($id);

  // Menyimpan data baru
  public function create(array $data);

  // Memperbarui data berdasarkan ID
  public function update($id, array $data);

  // Menghapus data berdasarkan ID
  public function delete($id);
}
