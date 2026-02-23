import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/Components/Pagination";

export default function Dashboard({ auth, classrooms }) {
    const data = classrooms?.data || [];
    const metaLinks = classrooms?.meta?.links || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Dashboard Sekolah
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-lg shadow overflow-x-auto border border-slate-200">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="w-1/3 border-r font-bold text-slate-700">
                                        Nama Kelas
                                    </TableHead>
                                    <TableHead className="w-1/3 border-r font-bold text-slate-700">
                                        Data Guru
                                    </TableHead>
                                    <TableHead className="w-1/3 font-bold text-slate-700">
                                        Data Siswa
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="text-center py-8 text-slate-500"
                                        >
                                            Belum ada data kelas yang terdaftar.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((cls) => {
                                        const teachers = cls.teachers || [];
                                        const students = cls.students || [];

                                        // Menentukan berapa banyak baris yang dibutuhkan untuk 1 kelas
                                        const rowCount = Math.max(
                                            1,
                                            teachers.length,
                                            students.length
                                        );

                                        return Array.from({
                                            length: rowCount,
                                        }).map((_, index) => (
                                            <TableRow
                                                key={`${cls.id}-${index}`}
                                                className="hover:bg-transparent"
                                            >
                                                {/* Merender nama kelas hanya pada iterasi baris pertama */}
                                                {index === 0 && (
                                                    <TableCell
                                                        rowSpan={rowCount}
                                                        className="align-top font-semibold border-r border-b bg-white"
                                                    >
                                                        {cls.name} <br />
                                                        <span className="text-xs text-slate-500 font-normal">
                                                            ({cls.code})
                                                        </span>
                                                    </TableCell>
                                                )}

                                                {/* Merender data Guru pada baris yang sesuai, atau '-' jika sudah habis */}
                                                <TableCell className="border-r border-b">
                                                    {teachers[index] ? (
                                                        <span>
                                                            {
                                                                teachers[index]
                                                                    .name
                                                            }
                                                            <span className="text-xs text-slate-500">
                                                                (
                                                                {
                                                                    teachers[
                                                                        index
                                                                    ].subject
                                                                }
                                                                )
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-300">
                                                            -
                                                        </span>
                                                    )}
                                                </TableCell>

                                                {/* Merender data Siswa pada baris yang sesuai, atau '-' jika sudah habis */}
                                                <TableCell className="border-b">
                                                    {students[index] ? (
                                                        <span>
                                                            {
                                                                students[index]
                                                                    .name
                                                            }
                                                            <span className="text-xs text-slate-500">
                                                                (
                                                                {
                                                                    students[
                                                                        index
                                                                    ].nis
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    students[
                                                                        index
                                                                    ].gender
                                                                }
                                                                )
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-300">
                                                            -
                                                        </span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ));
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="mt-4">
                    <Pagination links={metaLinks} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
