import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Horario UABC">
                <style>{`
                    @keyframes spotlight {
                        0%   { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
                        100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
                    }
                    .animate-spotlight {
                        animation: spotlight 2s ease 0.75s 1 forwards;
                    }
                `}</style>
            </Head>

            {/* Full-screen centered layout */}
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">

                {/* Aceternity Spotlight — adapts via fill color */}
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60"
                    fill="hsl(var(--foreground))"
                />

                {/* Subtle dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
                >
                    {/* UABC Logo */}
                    <motion.img
                        src="/Logo-uabc.png"
                        alt="UABC"
                        className="h-24 w-auto select-none"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        draggable={false}
                    />

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                            Horario Escolar
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Organiza y consulta tu horario de clases de la UABC.
                        </p>
                    </div>

                    {/* Auth actions */}
                    <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
                        {auth.user ? (
                            /* Already logged in → go to dashboard */
                            <Button asChild className="w-full gap-2">
                                <Link href={route('dashboard')}>
                                    Entrar
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild className="w-full gap-2">
                                    <Link href={route('login')}>
                                        <LogIn className="h-4 w-4" />
                                        Iniciar sesión
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full gap-2">
                                    <Link href={route('register')}>
                                        Registrarse
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Footer */}
                <p className="absolute bottom-6 text-[11px] text-muted-foreground/50 select-none">
                    Universidad Autónoma de Baja California
                </p>
            </div>
        </>
    );
}
