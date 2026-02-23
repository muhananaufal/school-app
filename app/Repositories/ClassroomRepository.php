<?php

namespace App\Repositories;

use App\Models\Classroom;
use App\Repositories\Contracts\ClassroomRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ClassroomRepository implements ClassroomRepositoryInterface
{
  // Mengambil semua data kelas murni tanpa relasi
  public function getAll()
  {
    return Classroom::orderBy('created_at', 'desc')->get();
  }

  // Mengambil semua kelas beserta relasi guru dan siswanya
  public function getWithRelations(int $perPage = 5): LengthAwarePaginator
  {
    return Classroom::with(['teachers', 'students'])->latest()->paginate($perPage);
  }

  // Mencari satu data kelas spesifik berdasarkan ID
  public function findById($id)
  {
    return Classroom::findOrFail($id);
  }

  // Menyimpan data kelas baru
  public function create(array $data)
  {
    return Classroom::create($data);
  }

  // Memperbarui data kelas berdasarkan ID
  public function update($id, array $data)
  {
    $classroom = $this->findById($id);
    $classroom->update($data);
    return $classroom;
  }

  // Menghapus data kelas berdasarkan ID
  public function delete($id)
  {
    return $this->findById($id)->delete();
  }
}
