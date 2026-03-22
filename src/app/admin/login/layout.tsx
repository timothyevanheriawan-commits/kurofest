/**
 * Login page layout — overrides the parent admin layout.
 * Since middleware passes /admin/login through without auth checks,
 * and this layout renders instead of AdminLayout for this route,
 * no shell or auth wrapping is applied.
 */
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}