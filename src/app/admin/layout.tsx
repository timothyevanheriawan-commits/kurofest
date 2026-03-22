import { createClient } from "@/lib/supabase/supabase-server";
import AdminShell from "./_shell";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // No user = login page or middleware bypass during dev hot-reload.
    // Render bare children — middleware handles the actual redirect.
    if (!user) {
        return <>{children}</>;
    }

    return <AdminShell user={user}>{children}</AdminShell>;
}