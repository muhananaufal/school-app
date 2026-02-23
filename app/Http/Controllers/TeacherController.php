<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequest;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\TeacherResource;
use App\Services\ClassroomService;
use App\Services\TeacherService;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function __construct(protected TeacherService $service, protected ClassroomService $classroomService) {}

    // Mengambil semua data guru beserta nama kelas tempat mengajar
    public function index()
    {
        return Inertia::render('Teachers/Index', ['teachers' => TeacherResource::collection($this->service->getAllTeachers()), 'classrooms' => ClassroomResource::collection($this->classroomService->getAllClassrooms())]);
    }

    // Menyimpan data guru baru
    public function store(TeacherRequest $request)
    {
        $this->service->createTeacher($request->validated());
        return redirect()->back();
    }

    // Memperbarui data guru berdasarkan ID
    public function update(TeacherRequest $request, $id)
    {
        $this->service->updateTeacher($id, $request->validated());
        return redirect()->back();
    }

    // Menghapus data guru berdasarkan ID
    public function destroy($id)
    {
        $this->service->deleteTeacher($id);
        return redirect()->back();
    }
}
