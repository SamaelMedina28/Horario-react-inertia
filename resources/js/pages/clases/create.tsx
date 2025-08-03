import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clases',
    href: '/clases',
  },
];

export default function Create({ materias }: { materias: Array<{ id: number, nombre: string }> }) {


  const calcularDiaSemana = () => {
    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay();
    console.log(diaSemana);
    if (diaSemana >= 5) {
      return 'Lunes';
    }
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    return dias[diaSemana];
  };

  const diaSemana = calcularDiaSemana();

  const { data, setData, errors } = useForm<
    {
      clases: Array<{
        profesor: string,
        salon: string,
        edificio: string,
        hora_inicio: string,
        hora_fin: string,
        materia_id: number
      }>
    }
  >(
    {
      clases: [{ profesor: '', salon: '', edificio: '', hora_inicio: '00:00', hora_fin: '00:00', materia_id: 0 }]
    }
  );

  const agregarOtraClase = () => setData('clases', [...data.clases, { profesor: '', salon: '', edificio: '', hora_inicio: '00:00', hora_fin: '00:00', materia_id: 0 }]);

  const eliminarUltimaClase = () => {
    if (data.clases.length === 1) return;
    setData('clases', data.clases.slice(0, -1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <form action="" className="flex justify-center flex-col gap-4 w-1/2 mx-auto" onSubmit={handleSubmit}>
          {data.clases.map((clase, index) => (
            <div key={index}>
              <div className="relative my-4">
                <div className="relative flex justify-center">
                  <span>Clase {index + 1}: {diaSemana}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                <div>
                  <Label>Materia:</Label>
                  <Select onValueChange={(id) => {
                    const nuevasClases = [...data.clases];
                    nuevasClases[index].materia_id = parseInt(id);
                    setData('clases', nuevasClases);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Materias" />
                    </SelectTrigger>
                    <SelectContent>
                      {materias.map((materia) => (
                        <SelectItem key={materia.id} value={materia.id.toString()}>
                          {materia.nombre} {materia.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(errors as Record<string, string>)[`clases.${index}.materia_id`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.materia_id`]}
                    </span>
                  )}
                </div>
                <div>
                  <Label>Profesor:</Label>
                  <Input type="text" value={clase.profesor} onChange={(e) => {
                      const nuevasClases = [...data.clases];
                      nuevasClases[index].profesor = e.target.value;
                      setData('clases', nuevasClases);
                    }}/>
                  {(errors as Record<string, string>)[`clases.${index}.profesor`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.profesor`]}
                    </span>
                  )}
                </div>

                <div>
                  <Label>Salón:</Label>
                  <Input type="text" value={clase.salon} onChange={(e) => {
                      const nuevasClases = [...data.clases];
                      nuevasClases[index].salon = e.target.value;
                      setData('clases', nuevasClases);
                    }}/>
                  {(errors as Record<string, string>)[`clases.${index}.salon`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.salon`]}
                    </span>
                  )}
                </div>

                <div>
                  <Label>Edificio:</Label>
                  <Input type="text" value={clase.edificio} onChange={(e) => {
                      const nuevasClases = [...data.clases];
                      nuevasClases[index].edificio = e.target.value;
                      setData('clases', nuevasClases);
                    }}/>
                  {(errors as Record<string, string>)[`clases.${index}.edificio`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.edificio`]}
                    </span>
                  )}
                </div>

                <div>
                  <Label>Hora inicio:</Label>
                  <Input type="time" value={clase.hora_inicio} onChange={(e) => {
                      const nuevasClases = [...data.clases];
                      nuevasClases[index].hora_inicio = e.target.value;
                      setData('clases', nuevasClases);
                    }}/>
                  {(errors as Record<string, string>)[`clases.${index}.hora_inicio`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.hora_inicio`]}
                    </span>
                  )}
                </div>

                <div>
                  <Label>Hora fin:</Label>
                  <Input type="time" value={clase.hora_fin} onChange={(e) => {
                      const nuevasClases = [...data.clases];
                      nuevasClases[index].hora_fin = e.target.value;
                      setData('clases', nuevasClases);
                    }}/>
                  {(errors as Record<string, string>)[`clases.${index}.hora_fin`] && (
                    <span className="text-red-500">
                      {(errors as Record<string, string>)[`clases.${index}.hora_fin`]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-2">
            <Button type="button" className="bg-green-500 hover:bg-green-600 text-white rounded-full" onClick={agregarOtraClase}>
              <Plus />
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600 text-white rounded-full" disabled={data.clases.length <= 1} onClick={eliminarUltimaClase}>
              <Trash />
            </Button>
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </div>
    </AppLayout>
  );
}
