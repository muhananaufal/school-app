<?php

namespace App\Http\Controllers;

use App\Http\Requests\ParentsRequest;
use App\Http\Resources\ParentsResource;
use App\Http\Resources\StudentResource;
use App\Services\ParentsService;
use App\Services\StudentService;
use Inertia\Inertia;

class ParentsController extends Controller
{
    public function __construct(protected ParentsService $service, protected StudentService $studentService) {}

    // Mengambil semua data orang tua beserta nama kelasnya
    public function index()
    {
        return Inertia::render('Parents/Index', ['parents' => ParentsResource::collection($this->service->getAllParents()), 'students' => StudentResource::collection($this->studentService->getAllStudents())]);
    }

    // Menyimpan data orang tua baru
    public function store(ParentsRequest $request)
    {
        $this->service->createParents($request->validated());
        return redirect()->back()->with('success', 'Data Orang tua berhasil ditambahkan!');
    }

    // Memperbarui data orang tua berdasarkan ID
    public function update(ParentsRequest $request, $id)
    {
        $this->service->updateParents($id, $request->validated());
        return redirect()->back()->with('success', 'Data Orang tua berhasil diperbarui!');
    }

    // Menghapus data orang tua berdasarkan ID
    public function destroy($id)
    {
        $this->service->deleteParents($id);
        return redirect()->back()->with('success', 'Data Orang tua berhasil dihapus!');
    }
}
