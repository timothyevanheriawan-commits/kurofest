"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useTransition } from "react";

export default function OrdersRefresh() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    return (
        <button
            onClick={() => startTransition(() => router.refresh())}
            disabled={pending}
            className="flex items-center gap-2 px-4 py-2.5 bg-sumi-950 text-washi-100 text-xs font-bold uppercase tracking-wider hover:bg-sumi-800 transition-colors disabled:opacity-50"
        >
            <RefreshCw size={13} className={pending ? "animate-spin" : ""} />
            Refresh
        </button>
    );
}