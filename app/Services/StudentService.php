<?php

namespace App\Services;

use App\Repositories\Contracts\RelationsSchoolRepositoryInterface;

class StudentService
{
  public function __construct(protected RelationsSchoolRepositoryInterface $repository) {}

  // Mengambil semua data siswa beserta nama kelasnya
  public function getAllStudents()
  {
    return $this->repository->getAll();
  }

  // Mengambil semua siswa beserta relasi orang tua
  public function getStudentWithRelations($perPage = 5)
  {
    return $this->repository->getWithRelations($perPage);
  }


  // Mencari satu data siswa spesifik berdasarkan ID
  public function findById($id)
  {
    return $this->repository->findById($id);
  }

  // Menyimpan data siswa baru
  public function createStudent(array $data)
  {
    return $this->repository->create($data);
  }

  // Memperbarui data siswa berdasarkan ID
  public function updateStudent($id, array $data)
  {
    return $this->repository->update($id, $data);
  }

  // Menghapus data siswa berdasarkan ID
  public function deleteStudent($id)
  {
    return $this->repository->delete($id);
  }
}
