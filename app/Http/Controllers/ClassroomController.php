<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Http\Resources\ClassroomResource;
use App\Services\ClassroomService;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function __construct(protected ClassroomService $service) {}

    // Mengambil semua kelas beserta relasi guru dan siswanya
    public function index()
    {
        return Inertia::render('Classrooms/Index', ['classrooms' => ClassroomResource::collection($this->service->getClassroomsWithRelations())]);
    }

    // Menyimpan data kelas baru
    public function store(ClassroomRequest $request)
    {
        $this->service->createClassroom($request->validated());
        return redirect()->back();
    }

    // Memperbarui data kelas berdasarkan ID
    public function update(ClassroomRequest $request, $id)
    {
        $this->service->updateClassroom($id, $request->validated());
        return redirect()->back();
    }

    // Menghapus data kelas berdasarkan ID
    public function destroy($id)
    {
        $this->service->deleteClassroom($id);
        return redirect()->back();
    }
}
