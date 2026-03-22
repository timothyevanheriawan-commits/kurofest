import { createClient } from "@/lib/supabase/supabase-server";
import { cn } from "@/lib/utils";
import OrdersRefresh from "./_refresh";

type Order = {
    id: string;
    created_at: string;
    customer_name: string;
    customer_email: string;
    ticket_type: "standard" | "premium" | "vip";
    ticket_price: number;
    status: string;
    confirmation_code: string;
};

const TICKET_STYLE: Record<string, string> = {
    vip: "bg-sumi-950 text-washi-100",
    premium: "bg-shu-600 text-washi-100",
    standard: "bg-sumi-100 text-sumi-700",
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export default async function AdminOrdersPage() {
    const supabase = await createClient();

    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    const total = orders?.reduce((sum, o) => sum + (o.ticket_price ?? 0), 0) ?? 0;

    return (
        <div className="space-y-8">
            <header className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        Orders
                    </h1>
                    <p className="mt-1 font-serif text-lg text-sumi-400">注文管理</p>
                </div>

                <div className="flex items-center gap-4 text-right">
                    {/* Revenue summary */}
                    <div className="hidden md:block">
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase">
                            Total Revenue
                        </p>
                        <p className="font-mono text-2xl font-bold text-sumi-950">
                            ¥{total.toLocaleString("en-US")}
                        </p>
                    </div>

                    {/* Refresh — client component so it can trigger router.refresh() */}
                    <OrdersRefresh />

                    {/* Seed button only in development */}
                    {process.env.NODE_ENV === "development" && (
                        <SeedButton />
                    )}
                </div>
            </header>

            {error && (
                <div className="border-l-4 border-shu-600 bg-shu-50 p-4 text-sm text-shu-700">
                    Error loading orders: {error.message}
                </div>
            )}

            <div className="bg-white border-2 border-sumi-950 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-sumi-50 border-b-2 border-sumi-950">
                                {["Code", "Customer", "Ticket", "Status", "Date", "Amount"].map((h, i) => (
                                    <th key={h} className={cn(
                                        "px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400",
                                        i === 5 && "text-right"
                                    )}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sumi-100">
                            {!orders || orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-sumi-400 font-serif italic">
                                        No orders yet.
                                    </td>
                                </tr>
                            ) : orders.map((order: Order) => (
                                <tr key={order.id} className="hover:bg-washi-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-mono font-bold text-sumi-950 text-sm">
                                            {order.confirmation_code}
                                        </div>
                                        <div className="text-[10px] text-sumi-300 font-mono truncate max-w-[100px]" title={order.id}>
                                            {order.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-sumi-900">{order.customer_name}</div>
                                        <div className="text-xs text-sumi-400">{order.customer_email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wide",
                                            TICKET_STYLE[order.ticket_type] ?? "bg-sumi-100 text-sumi-600"
                                        )}>
                                            {order.ticket_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-shu-600 shrink-0" />
                                            <span className="text-xs text-sumi-600 capitalize">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sumi-500 font-mono text-xs whitespace-nowrap">
                                        {formatDate(order.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono font-bold text-sumi-950">
                                        ¥{order.ticket_price.toLocaleString("en-US")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Isolated so it only renders in dev (no client JS shipped in prod)
function SeedButton() {
    return (
        <form action={async () => {
            "use server";
            if (process.env.NODE_ENV !== "development") {
                throw new Error("Forbidden");
            }
            // Seed action — only callable in dev since SeedButton is only rendered in dev
            const { createClient } = await import("@/lib/supabase/supabase-server");
            const supabase = await createClient();
            const types = ["standard", "premium", "vip"] as const;
            const names = ["Alice Tanaka", "Bob Suzuki", "Charlie Sato", "Diana Ito", "Evan Yamamoto"];
            const mocks = Array.from({ length: 5 }).map(() => {
                const type = types[Math.floor(Math.random() * types.length)];
                return {
                    customer_name: names[Math.floor(Math.random() * names.length)],
                    customer_email: `user${Math.floor(Math.random() * 1000)}@example.com`,
                    ticket_type: type,
                    ticket_price: type === "standard" ? 8500 : type === "premium" ? 15000 : 35000,
                    status: "completed",
                    confirmation_code: `KF26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                };
            });
            await supabase.from("orders").insert(mocks);
        }}>
            <button
                type="submit"
                className="px-4 py-2 border-2 border-dashed border-sumi-300 text-xs font-bold uppercase tracking-wider text-sumi-400 hover:border-sumi-950 hover:text-sumi-950 transition-colors"
            >
                Seed Dev Data
            </button>
        </form>
    );
}