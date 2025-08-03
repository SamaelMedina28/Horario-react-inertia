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
type Props = {
    clases: Array<{ id: number, dia: string, profesor: string, salon: string, edificio: string, hora_inicio: string, hora_fin: string, materia_id: number }>,
    materias: Array<{ id: number, nombre: string }>
}

export default function Dashboard({ clases, materias }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full justify-center h-full flex-1 gap-4 rounded-xl p-4 overflow-x-auto">
                <CardMateria dia="Lunes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Lunes')} className="w-1/5" />
                <CardMateria dia="Martes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Martes')} className="w-1/5" />
                <CardMateria dia="Miercoles" materias={materias} clases={clases.filter((clase) => clase.dia === 'Miercoles')} className="w-1/5" />
                <CardMateria dia="Jueves" materias={materias} clases={clases.filter((clase) => clase.dia === 'Jueves')} className="w-1/5" />
                <CardMateria dia="Viernes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Viernes')} className="w-1/5" />
            </div>
        </AppLayout>
    );
}