<?php

namespace App\Repositories;

use App\Models\Teacher;
use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TeacherRepository implements BaseRepositoryInterface
{
  // Mengambil semua data guru beserta nama kelas tempat mengajar
  public function getAll(int $perPage = 10): LengthAwarePaginator
  {
    return Teacher::with('classroom')->latest()->paginate($perPage);
  }

  // Mencari satu data guru spesifik berdasarkan ID
  public function findById($id)
  {
    return Teacher::findOrFail($id);
  }

  // Menyimpan data guru baru
  public function create(array $data)
  {
    return Teacher::create($data);
  }

  // Memperbarui data guru berdasarkan ID
  public function update($id, array $data)
  {
    $teacher = $this->findById($id);
    $teacher->update($data);
    return $teacher;
  }

  // Menghapus data guru berdasarkan ID
  public function delete($id)
  {
    return $this->findById($id)->delete();
  }
}
