<?php

namespace App\Repositories;

use App\Models\Parents;
use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ParentsRepository implements BaseRepositoryInterface
{
  // Mengambil semua data orang tua beserta nama kelasnya
  public function getAll(int $perPage = 10): LengthAwarePaginator
  {
    return Parents::with('student')->latest()->paginate($perPage);
  }

  // Mencari satu data orang tua spesifik berdasarkan ID
  public function findById($id)
  {
    return Parents::findOrFail($id);
  }

  // Menyimpan data orang tua baru
  public function create(array $data)
  {
    return Parents::create($data);
  }

  // Memperbarui data orang tua berdasarkan ID
  public function update($id, array $data)
  {
    $parents = $this->findById($id);
    $parents->update($data);
    return $parents;
  }

  // Menghapus data orang tua berdasarkan ID
  public function delete($id)
  {
    return $this->findById($id)->delete();
  }
}
