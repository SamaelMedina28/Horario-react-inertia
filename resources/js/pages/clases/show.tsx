import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { formatHora } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import { Button } from '@/components/ui/button';

type Props = {
    clase: {
        id: number,
        nombre: string,
        profesor: string,
        salon: string,
        edificio: string,
        hora_inicio: string,
        hora_fin: string,
        dia: string
    },
    materia: {
        id: number,
        nombre: string
    }
}

export default function Show({ clase, materia }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clases',
            href: route('dashboard'),
        },
        {
            title: materia.nombre,
            href: route('clases.show', clase.id),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full flex-col justify-center items-center gap-4 p-4 overflow-x-auto">
                <h1 className="text-xl tracking-tight mt-4">{clase.dia}</h1>
                <Card className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 py-6 w-full sm:w-2/3 sm:max-w-xl mx-auto relative overflow-hidden">
                    <CardContent className="flex flex-col gap-2">
                        <div className="my-2">
                            <strong>Materia:</strong>
                            <p>{materia.nombre}</p>
                        </div>
                        <div className="my-2">
                            <strong>Profesor:</strong>
                            <p>{clase.profesor}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-2">
                            <div className="my-2">
                                <strong>Salon:</strong>
                                <p>{clase.salon}</p>
                            </div>
                            <div className="my-2">
                                <strong>Edificio:</strong>
                                <p className="uppercase">{clase.edificio}</p>
                            </div>
                            <div className="my-2">
                                <strong>Hora inicio:</strong>
                                <p>{formatHora(clase.hora_inicio)}</p>
                            </div>
                            <div className="my-2">
                                <strong>Hora fin:</strong>
                                <p>{formatHora(clase.hora_fin)}</p>
                            </div>
                        </div>
                    </CardContent>
                    <BorderBeam
                        size={200}
                        duration={7}
                        borderWidth={2}
                        colorFrom="#22c55e"  // Verde vibrante pero profesional
                        colorTo="#86efac"    // Verde claro suave
                        delay={0.5}
                    />
                </Card>
                <Button variant="outline" size="icon" className="flex items-center justify-center rounded-full w-12 h-12" asChild>
                    <Link href={route('dashboard')} className="flex items-center mb-4">
                        <ChevronLeft />
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}