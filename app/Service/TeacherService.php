<?php

namespace App\Services;

use App\Repositories\Contracts\TeacherRepositoryInterface;

class TeacherService
{
  public function __construct(protected TeacherRepositoryInterface $repository) {}

  // Mengambil semua data guru beserta nama kelas tempat mengajar
  public function getAllTeachers()
  {
    return $this->repository->getAll();
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
