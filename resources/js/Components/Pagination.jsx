import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center mt-6 gap-1">
            {links.map((link, k) => (
                <Link
                    key={k}
                    href={link.url || ""}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 border rounded text-sm transition-colors ${
                        link.active
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    preserveScroll
                />
            ))}
        </div>
    );
}
