<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Http\Resources\ClassroomResource;
use App\Http\Resources\StudentResource;
use App\Services\ClassroomService;
use App\Services\StudentService;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function __construct(protected StudentService $service, protected ClassroomService $classroomService) {}

    // Mengambil semua data siswa beserta nama kelasnya
    public function index()
    {
        return Inertia::render('Students/Index', ['students' => StudentResource::collection($this->service->getStudentWithRelations(10)), 'classrooms' => ClassroomResource::collection($this->classroomService->getAllClassrooms())]);
    }

    // Menyimpan data siswa baru
    public function store(StudentRequest $request)
    {
        $this->service->createStudent($request->validated());
        return redirect()->back()->with('success', 'Data Siswa berhasil ditambahkan!');
    }

    // Memperbarui data siswa berdasarkan ID
    public function update(StudentRequest $request, $id)
    {
        $this->service->updateStudent($id, $request->validated());
        return redirect()->back()->with('success', 'Data Siswa berhasil diperbarui!');
    }

    // Menghapus data siswa berdasarkan ID
    public function destroy($id)
    {
        $this->service->deleteStudent($id);
        return redirect()->back()->with('success', 'Data Siswa berhasil dihapus!');
    }
}
