import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardMateria from '@/components/customs/card-materia';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ clases, materias }: { clases: Array<{ id: number, dia: string, profesor: string, salon: string, edificio: string, hora_inicio: string, hora_fin: string, materia_id: number }>, materias: Array<{ id: number, nombre: string }> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full justify-center h-full flex-1 gap-4 rounded-xl p-4 overflow-x-auto">
                <CardMateria dia="Lunes" materias={materias} clases={clases} />
                <CardMateria dia="Martes" materias={materias} clases={clases} />
                <CardMateria dia="Miercoles" materias={materias} clases={clases} />
                <CardMateria dia="Jueves" materias={materias} clases={clases} />
                <CardMateria dia="Viernes" materias={materias} clases={clases} />
            </div>
        </AppLayout>
    );
}