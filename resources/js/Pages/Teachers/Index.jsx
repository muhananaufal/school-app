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

export default function TeacherIndex({ auth, teachers, classrooms }) {
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
    } = useForm({ nip: "", name: "", subject: "", classroom_id: "" });

    const openModal = (teacher = null) => {
        setEditingId(teacher ? teacher.id : null);
        setData({
            nip: teacher?.nip || "",
            name: teacher?.name || "",
            subject: teacher?.subject || "",
            classroom_id: teacher?.classroom_id || "",
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId ? put : post;
        const routeName = editingId
            ? route("teachers.update", editingId)
            : route("teachers.store");
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
                    Kelola Guru
                </h2>
            }
        >
            <Head title="Teachers" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <Button onClick={() => openModal()} className="mb-4">
                    Tambah Guru
                </Button>
                <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nama Guru</TableHead>
                                <TableHead>Mata Pelajaran</TableHead>
                                <TableHead>Mengajar di Kelas</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers?.data?.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>{teacher.nip}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.subject}</TableCell>
                                    <TableCell>
                                        {getClassroomName(teacher.classroom_id)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(teacher)}
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
                                                        "teachers.destroy",
                                                        teacher.id
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
                    <Pagination links={teachers.meta.links} />
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? "Edit Data Guru" : "Tambah Data Guru"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="nip">NIP</Label>
                            <Input
                                id="nip"
                                value={data.nip}
                                onChange={(e) => setData("nip", e.target.value)}
                            />
                            {errors.nip && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.nip}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name">Nama Guru</Label>
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
                            <Label htmlFor="subject">Mata Pelajaran</Label>
                            <Input
                                id="subject"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.subject}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="classroom_id">Pilih Kelas</Label>
                            {/* Native select dengan styling Tailwind ala shadcn */}
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
