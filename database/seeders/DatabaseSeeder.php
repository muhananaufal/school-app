<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Akun untuk login
        User::factory()->create([
            'name' => 'Admin School',
            'email' => 'admin@schoolapp.com',
            'password' => bcrypt('password'),
        ]);

        // Generate 5 Kelas, masing-masing 3 Guru dan 15 Siswa
        Classroom::factory(5)
            ->has(Teacher::factory()->count(3))
            ->has(Student::factory()->count(15))
            ->create();
    }
}
