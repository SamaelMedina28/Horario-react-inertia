import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    Clock,
    MapPin,
    User,
    BookOpen,
} from 'lucide-react';

interface Clase {
    clave_materia: string;
    nombre_materia: string;
    profesor: string;
    grupo: string;
    subgrupo: string;
    salon: string;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    tipo: string;
    etapa: string;
}

const ORDEN_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const COLOR_DIA: Record<string, string> = {
    Lunes:     'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    Martes:    'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
    Miércoles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    Jueves:    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    Viernes:   'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    Sábado:    'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    Domingo:   'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800',
};

export default function Confirmar({ clases }: { clases: Clase[] }) {
    const { post, processing } = useForm({ clases });

    // Agrupar por día manteniendo el orden
    const porDia = ORDEN_DIAS.reduce<Record<string, Clase[]>>((acc, dia) => {
        const del_dia = clases.filter(
            (c) => c.dia.toLowerCase() === dia.toLowerCase()
        );
        if (del_dia.length > 0) acc[dia] = del_dia;
        return acc;
    }, {});

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('creacion'));
    };

    return (
        <AppLayout>
            <Head title="Confirmar Horario" />

            <div className="flex h-full flex-1 flex-col items-center mt-10 gap-8 p-6 max-w-5xl mx-auto">

                {/* ── Header ── */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>Importar desde PDF</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Confirmar horario</h1>
                    <p className="text-muted-foreground text-sm">
                        Revisa que los datos extraídos del PDF sean correctos antes de guardarlos.
                        Se encontraron <strong>{clases.length}</strong> clase(s) en <strong>{Object.keys(porDia).length}</strong> día(s).
                    </p>
                </div>

                <Separator />

                {/* ── Días ── */}
                <form onSubmit={handleConfirm} className="flex flex-col gap-8 w-full max-w-4xl">
                    {Object.entries(porDia).map(([dia, clasesDelDia]) => (
                        <section key={dia} className="flex flex-col gap-3">

                            {/* Título del día */}
                            <div className="flex items-center gap-2">
                                <span
                                    className='inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold bg-neutral-200 dark:bg-neutral-700'
                                >
                                    <CalendarDays className="h-3 w-3" />
                                    {dia}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {clasesDelDia.length} clase{clasesDelDia.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Cards de clases */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {clasesDelDia.map((clase, idx) => (
                                    <Card
                                        key={idx}
                                        className="flex flex-col gap-0 py-0 overflow-hidden hover:shadow-md transition-shadow duration-200"
                                    >
                                        {/* Franja de color del día */}
                                        <div
                                            className={[
                                                'h-1 w-full',
                                                COLOR_DIA[dia]?.split(' ')[0]?.replace('/10', '/60') ?? 'bg-muted',
                                            ].join(' ')}
                                        />

                                        <CardHeader className="px-4 pt-3 pb-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] text-muted-foreground font-mono">
                                                        {clase.clave_materia}
                                                    </p>
                                                    <CardTitle className="text-sm leading-snug line-clamp-2">
                                                        {clase.nombre_materia}
                                                    </CardTitle>
                                                </div>
                                                {clase.tipo && clase.tipo !== 'No encontrado' && (
                                                    <Badge variant="secondary" className="text-[10px] shrink-0">
                                                        {clase.tipo}
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="px-4 pb-4 flex flex-col gap-2">
                                            {/* Hora */}
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                                <span className="font-medium text-foreground">
                                                    {clase.hora_inicio} – {clase.hora_fin}
                                                </span>
                                            </div>

                                            {/* Profesor */}
                                            {clase.profesor && clase.profesor !== 'No encontrado' && (
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <User className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">{clase.profesor}</span>
                                                </div>
                                            )}

                                            {/* Salón */}
                                            {clase.salon && clase.salon !== 'No encontrado' && (
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                                                    <span>{clase.salon}</span>
                                                </div>
                                            )}

                                            {/* Grupo / Subgrupo */}
                                            {(clase.grupo !== 'No encontrado' || clase.subgrupo !== 'No encontrado') && (
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                                                    <span>
                                                        Grupo {clase.grupo}
                                                        {clase.subgrupo !== 'No encontrado' && ` · Sub. ${clase.subgrupo}`}
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* ── Footer de acciones ── */}
                    <Separator />

                    <CardFooter className="px-0 flex flex-col sm:flex-row gap-3 justify-between">
                        <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
                            <Link href={route('importar')}>
                                <ChevronLeft className="h-4 w-4" />
                                Subir otro PDF
                            </Link>
                        </Button>

                        <Button
                            type="submit"
                            className="gap-2 w-full sm:w-auto"
                            disabled={processing || clases.length === 0}
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            {processing ? 'Guardando...' : `Confirmar y guardar ${clases.length} clase(s)`}
                        </Button>
                    </CardFooter>
                </form>
            </div>
        </AppLayout>
    );
}
