import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@inertiajs/react'
import { Ban } from 'lucide-react'
import { route } from 'ziggy-js';
type Props = {
  dia: string,
  materias: Array<{ id: number, nombre: string }>,
  className?: string,
  clases: Array<{
    id: number,
    dia: string,
    hora_inicio: string,
    hora_fin: string,
    materia_id: number
  }>
}

export default function CardMateria({ dia, materias, clases, className }: Props) {
  if (clases.length === 0) return (
    <div className={`flex flex-col gap-4 text-center sm:w-2/3 sm:max-w-xl mx-auto`}>
      <h1>{dia}</h1>
      <Card className="h-full flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <Ban className="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
          <div>
            <h3 className="font-medium text-neutral-700 dark:text-neutral-300">Sin clases programadas</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No hay clases para el día de hoy</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  return (
    <>
      <div className={`flex flex-col gap-4 text-center ${className}`}>
        <h1>{dia}</h1>
        {clases.map((clase) => (
          <Link key={clase.id} href={route('clases.show', { id: clase.id })}>
            <Card>
              <CardContent>
                <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
                <span>{clase.hora_inicio}</span> - <span>{clase.hora_fin}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>

  )
}