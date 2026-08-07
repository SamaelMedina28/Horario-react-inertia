import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronLeft, LoaderCircle, Plus, Trash } from 'lucide-react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Materias',
        href: '/dashboard',
    },
    {
        title: 'Editar',
        href: '/materias/edit',
    },
];

export default function Edit({ materiasAnteriores }: { materiasAnteriores: Array<{ id: number; nombre: string }> }) {
    const { data, setData, post, errors, delete: destroy, processing } = useForm<
        {
            materias: Array<{ id: number; nombre: string }>
        }
    >(
        {
            materias: materiasAnteriores
        }
    );

    const agregarOtraMateria = () => setData('materias', [...data.materias, { id: 0, nombre: '' }]);

    const eliminarUltimaMateria = () => {
        if (data.materias.length === 1) return;
        setData('materias', data.materias.slice(0, -1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('materias.update'), {
            onSuccess: () => {
                router.get(route('dashboard'));
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(route('materias.destroy', { id }), {
            onSuccess: () => {
                setData('materias', data.materias.filter((materia) => materia.id !== id));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-8 p-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Panel de horarios</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Editar Materias
                    </h1>
                </div>
                <form action="" className="flex justify-center flex-col gap-4 w-full sm:w-3/4 md:max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    {data.materias.map((materia, index) => (
                        <div key={index} className="space-y-1">
                            <Label htmlFor={`nombre-${index}`} className="text-zinc-700 dark:text-zinc-300">
                                Nombre de la materia
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id={`nombre-${index}`}
                                    type="text"
                                    value={materia.nombre}
                                    placeholder="Ej. Matemáticas"
                                    onChange={(e) => {
                                        const nuevasMaterias = [...data.materias];
                                        nuevasMaterias[index].nombre = e.target.value;
                                        setData('materias', nuevasMaterias);
                                    }}
                                />
                                {materia.id !== 0 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="rounded-md p-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 transition-all disabled:opacity-40"
                                        onClick={() => handleDelete(materia.id)}
                                    >
                                        <Trash className="w-5 h-5" />
                                    </Button>
                                )}

                            </div>
                            {(errors as Record<string, string>)[`materias.${index}.nombre`] && (
                                <p className="text-sm text-red-500">
                                    {(errors as Record<string, string>)[`materias.${index}.nombre`]}
                                </p>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center gap-2 mt-2">
                        <Button
                            type="button"
                            size="icon"
                            className="rounded-full p-2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-300 transition-all"
                            onClick={agregarOtraMateria}
                        >
                            <Plus className="w-5 h-5" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            disabled={data.materias.length <= materiasAnteriores.length}
                            className="rounded-full p-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 transition-all disabled:opacity-40"
                            onClick={eliminarUltimaMateria}
                        >
                            <Trash className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex justify-center mt-3">
                        {data.materias.length === 0 ? (
                            <Button
                                variant="secondary"
                                onClick={() => router.get(route('dashboard'))}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Volver
                            </Button>
                        ) : (
                            processing ? (
                                <Button disabled>
                                    <LoaderCircle className="w-5 h-5 animate-spin" />
                                    Guardando...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full md:w-auto px-8">
                                    Actualizar
                                </Button>
                            ))}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
