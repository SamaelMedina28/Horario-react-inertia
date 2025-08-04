import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clases',
    href: '/clases',
  },
];
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
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex w-full flex-col justify-center items-center gap-4 p-4 overflow-x-auto">
        <Card className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 py-6 w-xl mx-auto">
          <CardHeader>
            <h1>{clase.dia}</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <strong>Materia:</strong>
            <p>{materia.nombre}</p>
            <strong>Profesor:</strong>
            <p>{clase.profesor}</p>
            <div className="grid grid-cols-2 gap-2 my-2">
              <strong>Salon:</strong>
              <strong>Edificio:</strong>
              <p>{clase.salon}</p>
              <p>{clase.edificio}</p>
              <strong>Hora inicio:</strong>
              <strong>Hora fin:</strong>
              <p>{clase.hora_inicio}</p>
              <p>{clase.hora_fin}</p>
            </div>
          </CardContent>
        </Card>
        <Link href={route('dashboard')} className="flex items-center">
          <Button variant="outline">
            <ChevronLeft/>
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}