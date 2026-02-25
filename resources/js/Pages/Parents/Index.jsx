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

export default function ParentsIndex({ auth, students, parents }) {
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
    } = useForm({ phone: "", name: "", student_id: "" });

    const openModal = (parent = null) => {
        setEditingId(parent ? parent.id : null);
        setData({
            phone: parent?.phone || "",
            name: parent?.name || "",
            student_id: parent?.student_id || "",
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId ? put : post;
        const routeName = editingId
            ? route("parents.update", editingId)
            : route("parents.store");
        action(routeName, { onSuccess: () => setIsOpen(false) });
    };

    const getStudentsName = (id) =>
        students?.data?.find((c) => c.id == id)?.name || "-";

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

    console.log(parents);
    console.log(students);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Kelola Orang Tua
                </h2>
            }
        >
            <Head title="Parents" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <Button
                    onClick={() => openModal()}
                    className="mb-4 ml-4 md:ml-0"
                >
                    Tambah Orang Tua
                </Button>
                <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Nomor HP</TableHead>
                                <TableHead>Wali Dari</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parents?.data?.map((parent) => (
                                <TableRow key={parent.id}>
                                    <TableCell>{parent.name}</TableCell>
                                    <TableCell>{parent.phone}</TableCell>
                                    <TableCell>
                                        {getStudentsName(parent.student_id)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(parent)}
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
                                                        "parents.destroy",
                                                        parent.id
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
                    <Pagination links={parents.meta.links} />
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId
                                ? "Edit Data Orang Tua"
                                : "Tambah Data Orang Tua"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Orang Tua</Label>
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
                            <Label htmlFor="phone">Nomor HP</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="student_id">Pilih Siswa</Label>
                            <select
                                id="student_id"
                                value={data.student_id}
                                onChange={(e) =>
                                    setData("student_id", e.target.value)
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="">-- Pilih Siswa --</option>
                                {students?.data?.map((std) => (
                                    <option key={std.id} value={std.id}>
                                        {std.name}
                                    </option>
                                ))}
                            </select>
                            {errors.student_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.student_id}
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
