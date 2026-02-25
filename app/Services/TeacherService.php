<?php

namespace App\Services;

use App\Repositories\Contracts\BaseRepositoryInterface;

class TeacherService
{
  public function __construct(protected BaseRepositoryInterface $repository) {}

  // Mengambil semua data guru beserta nama kelas tempat mengajar
  public function getAllTeachers($perPage = 10)
  {
    return $this->repository->getAll($perPage);
  }

  // Mencari satu data guru spesifik berdasarkan ID
  public function findById($id)
  {
    return $this->repository->findById($id);
  }

  // Menyimpan data guru baru
  public function createTeacher(array $data)
  {
    return $this->repository->create($data);
  }

  // Memperbarui data guru berdasarkan ID
  public function updateTeacher($id, array $data)
  {
    return $this->repository->update($id, $data);
  }

  // Menghapus data guru berdasarkan ID
  public function deleteTeacher($id)
  {
    return $this->repository->delete($id);
  }
}
