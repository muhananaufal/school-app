<?php

namespace App\Services;

use App\Repositories\Contracts\ClassroomRepositoryInterface;

class ClassroomService
{
  public function __construct(protected ClassroomRepositoryInterface $repository) {}

  // Mengambil semua data kelas murni tanpa relasi
  public function getAllClassrooms($perPage = 3)
  {
    return $this->repository->getAll($perPage);
  }

  // Mengambil semua kelas beserta relasi guru dan siswanya
  public function getClassroomsWithRelations($perPage = 5)
  {
    return $this->repository->getWithRelations($perPage);
  }

  // Mencari satu data kelas spesifik berdasarkan ID
  public function getClassroomById($id)
  {
    return $this->repository->findById($id);
  }

  // Menyimpan data kelas baru
  public function createClassroom(array $data)
  {
    return $this->repository->create($data);
  }

  // Memperbarui data kelas berdasarkan ID
  public function updateClassroom($id, array $data)
  {
    return $this->repository->update($id, $data);
  }

  public function deleteClassroom($id)
  {
    return $this->repository->delete($id);
  }
}
