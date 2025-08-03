import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
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
                <div className="flex flex-col gap-4 text-center">
                    <h1>Lunes</h1>
                    {clases.filter((clase) => clase.dia === 'Lunes').map((clase) => (
                        <Card key={clase.id}>
                            <CardContent>
                                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                                <p>{clase.hora_inicio}</p>
                                <p>{clase.hora_fin}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <h1>Martes</h1>
                    {clases.filter((clase) => clase.dia === 'Martes').map((clase) => (
                        <Card key={clase.id}>
                            <CardContent>
                                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                                <p>{clase.hora_inicio}</p>
                                <p>{clase.hora_fin}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <h1>Miercoles</h1>
                    {clases.filter((clase) => clase.dia === 'Miercoles').map((clase) => (
                        <Card key={clase.id}>
                            <CardContent>
                                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                                <p>{clase.hora_inicio}</p>
                                <p>{clase.hora_fin}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <h1>Jueves</h1>
                    {clases.filter((clase) => clase.dia === 'Jueves').map((clase) => (
                        <Card key={clase.id}>
                            <CardContent>
                                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                                <p>{clase.hora_inicio}</p>
                                <p>{clase.hora_fin}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <h1>Viernes</h1>
                    {clases.filter((clase) => clase.dia === 'Viernes').map((clase) => (
                        <Card key={clase.id}>
                            <CardContent>
                                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                                <p>{clase.hora_inicio}</p>
                                <p>{clase.hora_fin}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
