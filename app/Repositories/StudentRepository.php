<?php

namespace App\Repositories;

use App\Models\Student;
use App\Repositories\Contracts\RelationsSchoolRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class StudentRepository implements RelationsSchoolRepositoryInterface
{
  // Mengambil semua data siswa beserta nama kelasnya
  public function getAll()
  {
    return Student::orderBy('created_at', 'desc')->get();
  }

  // Mengambil semua siswa beserta relasi orang tua
  public function getWithRelations(int $perPage = 10): LengthAwarePaginator
  {
    return Student::with(['parents'])->latest()->paginate($perPage);
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
