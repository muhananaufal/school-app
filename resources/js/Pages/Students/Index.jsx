import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Pagination from "@/Components/Pagination";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function StudentIndex({ auth, students, classrooms }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteUrl, setDeleteUrl] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        errors,
    } = useForm({ nis: "", name: "", gender: "", classroom_id: "" });

    const openModal = (student = null) => {
        setEditingId(student ? student.id : null);
        setData({
            nis: student?.nis || "",
            name: student?.name || "",
            gender: student?.gender || "",
            classroom_id: student?.classroom_id || "",
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId ? put : post;
        const routeName = editingId
            ? route("students.update", editingId)
            : route("students.store");
        action(routeName, { onSuccess: () => setIsOpen(false) });
    };

    const getClassroomName = (id) =>
        classrooms?.data?.find((c) => c.id === id)?.name || "-";

    const confirmDelete = (url) => {
        setDeleteUrl(url);
        setIsDeleteDialogOpen(true);
    };

    const executeDelete = () => {
        if (deleteUrl) {
            destroy(deleteUrl, {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Kelola Siswa
                </h2>
            }
        >
            <Head title="Students" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <Button onClick={() => openModal()} className="mb-4 ml-4 md:ml-0">
                    Tambah Siswa
                </Button>
                <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIS</TableHead>
                                <TableHead>Nama Siswa</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students?.data?.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.nis}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>
                                        {student.gender === "L"
                                            ? "Laki-laki"
                                            : "Perempuan"}
                                    </TableCell>
                                    <TableCell>
                                        {getClassroomName(student.classroom_id)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(student)}
                                            className="mr-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(
                                                    route(
                                                        "students.destroy",
                                                        student.id
                                                    )
                                                )
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination links={students.meta.links} />
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId
                                ? "Edit Data Siswa"
                                : "Tambah Data Siswa"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="nis">NIS</Label>
                            <Input
                                id="nis"
                                value={data.nis}
                                onChange={(e) => setData("nis", e.target.value)}
                            />
                            {errors.nis && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.nis}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name">Nama Siswa</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <select
                                id="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="">-- Pilih Gender --</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="classroom_id">Pilih Kelas</Label>
                            <select
                                id="classroom_id"
                                value={data.classroom_id}
                                onChange={(e) =>
                                    setData("classroom_id", e.target.value)
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="">-- Pilih Kelas --</option>
                                {classrooms?.data?.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.classroom_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.classroom_id}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Simpan
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data ini akan
                            dihapus secara permanen dari server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={executeDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Ya, Hapus Permanen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
