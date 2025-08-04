import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
        <h1>{clase.dia}</h1>
        <Card className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 py-6 w-xl mx-auto">
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
                <p>{clase.hora_inicio}</p>
              </div>
              <div className="my-2">
                <strong>Hora fin:</strong>
                <p>{clase.hora_fin}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Link href={route('dashboard')} className="flex items-center">
          <Button variant="default" className="flex items-center rounded-full">
            <ChevronLeft/>
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}