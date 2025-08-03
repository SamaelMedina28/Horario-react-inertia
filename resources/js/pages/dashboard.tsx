import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({clases, materias}: {clases: Array<{id: number, dia: string, profesor: string, salon: string, edificio: string, hora_inicio: string, hora_fin: string, materia_id: number}>, materias: Array<{id: number, nombre: string}>}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {clases.map((clase) => (
                    <div key={clase.id}>
                        <h2>{clase.dia}</h2>
                        <p>{clase.profesor}</p>
                        <p>{clase.salon}</p>
                        <p>{clase.edificio}</p>
                        <p>{clase.hora_inicio}</p>
                        <p>{clase.hora_fin}</p>
                        <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
