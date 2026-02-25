<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface RelationsSchoolRepositoryInterface extends BaseRepositoryInterface
{
  // Mengambil semua beserta relasi guru dan siswanya
  public function getWithRelations(int $perPage = 5): LengthAwarePaginator;
}
