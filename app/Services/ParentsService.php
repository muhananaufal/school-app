<?php

namespace App\Services;

use App\Repositories\Contracts\BaseRepositoryInterface;

class ParentsService
{
  public function __construct(protected BaseRepositoryInterface $repository) {}

  // Mengambil semua data orang tua beserta nama kelasnya
  public function getAllParents($perPage = 10)
  {
    return $this->repository->getAll($perPage);
  }

  // Mencari satu data orang tua spesifik berdasarkan ID
  public function findById($id)
  {
    return $this->repository->findById($id);
  }

  // Menyimpan data orang tua baru
  public function createParents(array $data)
  {
    return $this->repository->create($data);
  }

  // Memperbarui data orang tua berdasarkan ID
  public function updateParents($id, array $data)
  {
    return $this->repository->update($id, $data);
  }

  // Menghapus data orang tua berdasarkan ID
  public function deleteParents($id)
  {
    return $this->repository->delete($id);
  }
}
