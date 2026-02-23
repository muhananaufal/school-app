import { Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50/50 dark:bg-gray-900">
                {/* Logo / Branding Sederhana */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4">
                        <img src="/favicon.png" alt="Logo" className="w-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        School App
                    </h1>
                    <p className="text-slate-500 mt-2 text-center max-w-md">
                        Kelola kelas, guru, dan murid dengan mudah dalam satu
                        tempat.
                    </p>
                </div>

                {/* Kartu Aksi Utama */}
                <Card className="w-full sm:max-w-md border-none shadow-lg">
                    <CardHeader className="text-center pb-2">
                        <CardTitle>Mulai Sekarang</CardTitle>
                        <CardDescription>
                            Kelola sekolah Anda di mana saja.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 pt-4">
                        {auth.user ? (
                            // Jika User Sudah Login Maka Arahkan ke Dashboard
                            <Link href={route("dashboard")} className="w-full">
                                <Button className="w-full text-lg h-12">
                                    Buka Dashboard
                                </Button>
                            </Link>
                        ) : (
                            // Jika User Belum Login Maka Tampilkan Login & Register
                            <div className="flex flex-col gap-3">
                                <Link href={route("login")} className="w-full">
                                    <Button className="w-full text-lg h-12">
                                        Masuk Akun (Login)
                                    </Button>
                                </Link>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-muted-foreground">
                                            Atau
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={route("register")}
                                    className="w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full text-lg h-12"
                                    >
                                        Daftar Baru
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Footer Kecil */}
                <div className="mt-8 text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} ConnecThink Technical Test
                </div>
            </div>
        </>
    );
}
