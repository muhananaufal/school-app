<?php

namespace App\Repositories;

use App\Models\Classroom;
use App\Repositories\Contracts\ClassroomRepositoryInterface;

class ClassroomRepository implements ClassroomRepositoryInterface
{
  // Mengambil semua data kelas murni tanpa relasi
  public function getAll()
  {
    return Classroom::all();
  }

  // Mengambil semua kelas beserta relasi guru dan siswanya
  public function getWithRelations()
  {
    return Classroom::with(['teachers', 'students'])->get();
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
