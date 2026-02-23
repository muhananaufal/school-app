<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nip' => fake()->unique()->numerify('##########'),
            'name' => fake()->name(),
            'subject' => fake()->randomElement(['Matematika', 'Fisika', 'Biologi', 'Kimia', 'Sejarah']),
        ];
    }
}
