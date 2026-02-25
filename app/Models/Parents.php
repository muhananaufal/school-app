<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    /** @use HasFactory<\Database\Factories\ParentsFactory> */
    use HasFactory;

    protected $fillable = ['name', 'phone','student_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
