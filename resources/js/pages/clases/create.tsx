import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
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

export default function Create({ materias, dia }: { materias: Array<{ id: number, nombre: string }>, dia: string }) {
  const { data, setData, errors, post } = useForm<
    {
      clases: Array<{
        dia: string,
        profesor: string,
        salon: string,
        edificio: string,
        hora_inicio: string,
        hora_fin: string,
        materia_id: string | number
      }>
    }
  >(
    {
      clases: [{ dia: dia, profesor: '', salon: '', edificio: '', hora_inicio: '12:00', hora_fin: '13:00', materia_id: '' }]
    }
  );

  const calcularDiaSiguiente = () => {
    const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const index = dias.indexOf(dia);
    return dias[(index + 1) % 5];
  };
  const diaSiguiente = calcularDiaSiguiente();

  const agregarOtraClase = () => setData('clases', [...data.clases, { dia: dia, profesor: '', salon: '', edificio: '', hora_inicio: '12:00', hora_fin: '13:00', materia_id: '' }]);

  const eliminarUltimaClase = () => {
    if (data.clases.length === 1) return;
    setData('clases', data.clases.slice(0, -1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('clases.store'), {
      onSuccess: () => {
        if (diaSiguiente === 'Lunes') {
          router.get(route('dashboard'));
        } else {
          router.get(route('clases.create', { dia: diaSiguiente }));
        }
      },
    });
  };

  const handleOmitirYTerminar = () => {
    post(route('clases.updateNew'), {
      onSuccess: () => {
        router.get(route('dashboard'));
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col rounded-xl p-4 md:p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center">Crear Clases</h1>
      <p className="text-center text-muted-foreground">{dia}</p>
        <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:max-w-2xl mx-auto">
          <div className="space-y-6">
            {data.clases.map((clase, index) => (
              <div key={index}>
                <div className="mt-4 text-start font-medium text-muted-foreground">
                  Clase {index + 1}:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`materia-${index}`}>Materia:</Label>
                    <Select
                      value={data.clases[index].materia_id?.toString() || ''}
                      onValueChange={(id) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].materia_id = id;
                        setData('clases', nuevasClases);
                      }}
                    >
                      <SelectTrigger id={`materia-${index}`}>
                        <SelectValue placeholder="Materias" />
                      </SelectTrigger>
                      <SelectContent>
                        {materias.map((materia) => (
                          <SelectItem key={materia.id} value={materia.id.toString()}>
                            {materia.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {(errors as Record<string, string>)[`clases.${index}.materia_id`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.materia_id`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`profesor-${index}`}>Profesor:</Label>
                    <Input
                      id={`profesor-${index}`}
                      type="text"
                      value={clase.profesor}
                      onChange={(e) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].profesor = e.target.value;
                        setData('clases', nuevasClases);
                      }}
                    />
                    {(errors as Record<string, string>)[`clases.${index}.profesor`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.profesor`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`salon-${index}`}>Salón:</Label>
                    <Input
                      id={`salon-${index}`}
                      type="text"
                      value={clase.salon}
                      onChange={(e) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].salon = e.target.value;
                        setData('clases', nuevasClases);
                      }}
                    />
                    {(errors as Record<string, string>)[`clases.${index}.salon`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.salon`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edificio-${index}`}>Edificio:</Label>
                    <Input
                      id={`edificio-${index}`}
                      type="text"
                      value={clase.edificio}
                      onChange={(e) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].edificio = e.target.value;
                        setData('clases', nuevasClases);
                      }}
                    />
                    {(errors as Record<string, string>)[`clases.${index}.edificio`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.edificio`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`hora_inicio-${index}`}>Hora inicio:</Label>
                    <Input
                      id={`hora_inicio-${index}`}
                      type="time"
                      value={clase.hora_inicio}
                      onChange={(e) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].hora_inicio = e.target.value;
                        setData('clases', nuevasClases);
                      }}
                    />
                    {(errors as Record<string, string>)[`clases.${index}.hora_inicio`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.hora_inicio`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`hora_fin-${index}`}>Hora fin:</Label>
                    <Input
                      id={`hora_fin-${index}`}
                      type="time"
                      value={clase.hora_fin}
                      onChange={(e) => {
                        const nuevasClases = [...data.clases];
                        nuevasClases[index].hora_fin = e.target.value;
                        setData('clases', nuevasClases);
                      }}
                    />
                    {(errors as Record<string, string>)[`clases.${index}.hora_fin`] && (
                      <p className="text-sm text-red-500">
                        {(errors as Record<string, string>)[`clases.${index}.hora_fin`]}
                      </p>
                    )}
                  </div>
                </div>
                {/* Linea divisoria */}
                <div className="h-px md:my-6 my-4 w-full mx-auto bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              size="icon"
              className="rounded-full p-2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-300 transition-all"
              onClick={agregarOtraClase}
            >
              <Plus className="w-5 h-5" />
              <span className="sr-only">Agregar otra clase</span>
            </Button>
            <Button
              type="button"
              size="icon"
              disabled={data.clases.length <= 1}
              className="rounded-full p-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 transition-all disabled:opacity-40"
              onClick={eliminarUltimaClase}
            >
              <Trash className="w-5 h-5" />
              <span className="sr-only">Eliminar última clase</span>
            </Button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {diaSiguiente == 'Lunes' ? (
              <Button type="button" variant="secondary" className="w-full md:w-auto px-8" onClick={handleOmitirYTerminar}>
                Omitir y terminar
              </Button>
            ) : (
              <Button type="button" variant="secondary" className="w-full md:w-auto px-8" onClick={() => router.get(route('clases.create', { dia: diaSiguiente }))}>
                Omitir
              </Button>
            )}
            <Button type="submit" className="w-full md:w-auto px-8">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}