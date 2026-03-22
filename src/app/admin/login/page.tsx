"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import { MagneticCTA } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-washi-100 px-6 relative">
            {/* Return to Home */}
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sumi-400 hover:text-sumi-950 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Return to Festival
                </Link>
            </div>

            <div className="w-full max-w-md">
                <header className="text-center mb-10">
                    <div className="mx-auto w-16 h-16 border-2 border-sumi-950 flex items-center justify-center font-serif text-2xl font-bold mb-6 bg-sumi-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        黒
                    </div>
                    <h1 className="font-display text-3xl font-black tracking-tight text-sumi-950 uppercase">
                        Admin Portal
                    </h1>
                    <p className="mt-2 font-serif text-sumi-500 italic">For authorized personnel only</p>
                </header>

                <form onSubmit={handleLogin} className="space-y-6 bg-washi-50 p-8 border-2 border-sumi-200 shadow-sm">
                    <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={cn(
                                "w-full bg-washi-100 border-2 border-sumi-200 py-3 px-4",
                                "focus:border-sumi-950 focus:outline-none transition-colors",
                                "text-sumi-950 font-medium font-mono text-sm"
                            )}
                            placeholder="admin@kurofest.jp"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cn(
                                "w-full bg-washi-100 border-2 border-sumi-200 py-3 px-4",
                                "focus:border-sumi-950 focus:outline-none transition-colors",
                                "text-sumi-950 font-medium font-mono text-sm"
                            )}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-xs text-shu-600 font-medium bg-shu-50 p-3 border-l-4 border-shu-600 flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <MagneticCTA
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Enter Workspace"}
                    </MagneticCTA>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[10px] tracking-[0.2em] text-sumi-300 uppercase">
                        KuroFest 2026 Secured System
                    </p>
                </div>
            </div>
        </div>
    );
}
