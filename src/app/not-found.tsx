import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-washi-100 p-4 text-center">
            {/* Background number */}
            <span
                className="absolute font-display text-[20rem] md:text-[30rem] font-black leading-none tracking-tighter text-sumi-100 select-none pointer-events-none"
                aria-hidden="true"
            >
                404
            </span>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Japanese text */}
                <p className="font-serif text-2xl text-sumi-400">
                    見つかりません
                </p>

                <h1 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-sumi-950">
                    Page Not Found
                </h1>

                <p className="max-w-md text-sumi-600">
                    The page you are looking for does not exist or has been moved.
                </p>

                {/* Divider */}
                <div className="w-16 h-0.5 bg-shu-600" />

                <Link
                    href="/"
                    className="mt-4 px-8 py-3 bg-sumi-950 text-washi-100 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-shu-600"
                >
                    Return Home
                </Link>
            </div>
        </main>
    );
}