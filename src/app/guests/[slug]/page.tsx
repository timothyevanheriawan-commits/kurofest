import type { Metadata } from "next";
import { GuestDetails } from "@/components/features/guests/guest-details";
import { getGuestBySlug, MOCK_GUESTS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Generate static paths for performance
export function generateStaticParams() {
    return MOCK_GUESTS.map((guest) => ({ slug: guest.slug }));
}

// Dynamic metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const guest = getGuestBySlug(slug);

    if (!guest) {
        return { title: "Guest Not Found" };
    }

    return {
        title: guest.name,
        description: guest.tagline || `${guest.name} at KuroFest 2026`,
    };
}

// Page Component
export default async function GuestPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const guest = getGuestBySlug(slug);

    if (!guest) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-16 md:px-8">
            <div className="mx-auto flex items-center justify-center">
                <GuestDetails guest={guest} isModal={false} />
            </div>
        </main>
    );
}