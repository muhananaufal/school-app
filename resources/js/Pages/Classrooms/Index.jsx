import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Pagination from "@/Components/Pagination";

export default function ClassroomIndex({ auth, classrooms }) {
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
    } = useForm({ code: "", name: "" });

    const openModal = (classroom = null) => {
        setEditingId(classroom ? classroom.id : null);
        setData({ code: classroom?.code || "", name: classroom?.name || "" });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId ? put : post;
        const routeName = editingId
            ? route("classrooms.update", editingId)
            : route("classrooms.store");
        action(routeName, { onSuccess: () => setIsOpen(false) });
    };

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
                    Kelola Kelas
                </h2>
            }
        >
            <Head title="Classrooms" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <Button onClick={() => openModal()} className="mb-4">
                    Tambah Kelas
                </Button>
                <div className="bg-white p-6 rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama Kelas</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classrooms.data.map((cls) => (
                                <TableRow key={cls.id}>
                                    <TableCell>{cls.code}</TableCell>
                                    <TableCell>{cls.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openModal(cls)}
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
                                                        "classrooms.destroy",
                                                        cls.id
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
                    <Pagination links={classrooms.meta.links} />
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? "Edit Kelas" : "Tambah Kelas"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="code">Kode Kelas</Label>
                            <Input
                                id="code"
                                value={data.code}
                                onChange={(e) =>
                                    setData("code", e.target.value)
                                }
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.code}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name">Nama Kelas</Label>
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
