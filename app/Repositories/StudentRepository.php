<?php

namespace App\Repositories;

use App\Models\Student;
use App\Repositories\Contracts\StudentRepositoryInterface;

class StudentRepository implements StudentRepositoryInterface
{
  // Mengambil semua data siswa beserta nama kelasnya
  public function getAll()
  {
    return Student::with('classroom')->get();
  }

  // Mencari satu data siswa spesifik berdasarkan ID
  public function findById($id)
  {
    return Student::findOrFail($id);
  }

  // Menyimpan data siswa baru
  public function create(array $data)
  {
    return Student::create($data);
  }

  // Memperbarui data siswa berdasarkan ID
  public function update($id, array $data)
  {
    $student = $this->findById($id);
    $student->update($data);
    return $student;
  }

  // Menghapus data siswa berdasarkan ID
  public function delete($id)
  {
    return $this->findById($id)->delete();
  }
}
