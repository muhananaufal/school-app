<?php

namespace App\Providers;

use App\Repositories\ClassroomRepository;
use App\Repositories\Contracts\BaseRepositoryInterface;
use App\Repositories\Contracts\ClassroomRepositoryInterface;
use App\Repositories\StudentRepository;
use App\Repositories\TeacherRepository;
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
        $this->app->bind(ClassroomRepositoryInterface::class, ClassroomRepository::class);
        
        $this->app->when(TeacherService::class)
            ->needs(BaseRepositoryInterface::class)
            ->give(TeacherRepository::class);
            
        $this->app->when(StudentService::class)
            ->needs(BaseRepositoryInterface::class)
            ->give(StudentRepository::class);
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
