<?php

namespace App\Providers;

use App\Repositories\ClassroomRepository;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\RelationsSchoolRepositoryInterface;
use App\Repositories\ParentsRepository;
use App\Repositories\StudentRepository;
use App\Repositories\TeacherRepository;
use App\Services\ClassroomService;
use App\Services\ParentsService;
use App\Services\StudentService;
use App\Services\TeacherService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when(ClassroomService::class)
            ->needs(RelationsSchoolRepositoryInterface::class)
            ->give(ClassroomRepository::class);

        $this->app->when(StudentService::class)
            ->needs(RelationsSchoolRepositoryInterface::class)
            ->give(StudentRepository::class);

        $this->app->when(TeacherService::class)
            ->needs(BaseRepositoryInterface::class)
            ->give(TeacherRepository::class);

        $this->app->when(ParentsService::class)
            ->needs(BaseRepositoryInterface::class)
            ->give(ParentsRepository::class);
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
