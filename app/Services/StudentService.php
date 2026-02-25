<?php

namespace App\Services;

use App\Repositories\Contracts\BaseRepositoryInterface;

class StudentService
{
  public function __construct(protected BaseRepositoryInterface $repository) {}

  // Mengambil semua data siswa beserta nama kelasnya
  public function getAllStudents($perPage = 10)
  {
    return $this->repository->getAll($perPage);
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
