import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Materias',
    href: '/materias',
  },
];

export default function Create() {
  const { data, setData, post, errors } = useForm<
    {
      materias: Array<{ nombre: string }>
    }
  >(
    {
      materias: [{ nombre: '' }]
    }
  );

  const agregarOtraMateria = () => setData('materias', [...data.materias, { nombre: '' }]);

  const eliminarUltimaMateria = () => {
    if (data.materias.length === 1) return;
    setData('materias', data.materias.slice(0, -1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('materias.store'), {
      onSuccess: () => {
        router.get(route('clases.create', { dia: 'Lunes' }));
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <form action="" className="flex justify-center flex-col gap-4 w-1/2 mx-auto" onSubmit={handleSubmit}>
          {data.materias.map((materia, index) => (
            <div key={index}>
              <Label htmlFor={`nombre-${index}`}>Nombre</Label>
              <Input
                id={`nombre-${index}`}
                type="text"
                value={materia.nombre}
                onChange={(e) => {
                  const nuevasMaterias = [...data.materias];
                  nuevasMaterias[index].nombre = e.target.value;
                  setData('materias', nuevasMaterias);
                }}

              />
              {(errors as Record<string, string>)[`materias.${index}.nombre`] && (
                <span className="text-red-500">
                  {(errors as Record<string, string>)[`materias.${index}.nombre`]}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-center gap-2">
            <Button type="button" className="bg-green-500 hover:bg-green-600 text-white rounded-full" onClick={agregarOtraMateria}>
              <Plus />
            </Button>
            <Button type="button" className="bg-red-500 hover:bg-red-600 text-white rounded-full" disabled={data.materias.length <= 1} onClick={eliminarUltimaMateria}>
              <Trash />
            </Button>
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </div>
    </AppLayout>
  );
}
