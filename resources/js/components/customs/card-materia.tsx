import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  dia: string,
  materias: Array<{ id: number, nombre: string }>,
  clases: Array<{ 
    id: number, 
    dia: string,
    hora_inicio: string, 
    hora_fin: string, 
    materia_id: number }>
}

export default function CardMateria({ dia, materias, clases }: Props) {
  return (
   <>
      <div className="flex flex-col gap-4 text-center">
        <h1>{dia}</h1>
        {clases.filter((clase) => clase.dia === dia).map((clase) => (
          <Card key={clase.id}>
            <CardContent>
              <p>{materias.find((materia) => materia.id === clase.materia_id)?.nombre}</p>
              <p>{clase.hora_inicio}</p>
              <p>{clase.hora_fin}</p>
            </CardContent>
          </Card>
        ))}
      </div>
   </>

  )
}