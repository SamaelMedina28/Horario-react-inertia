import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ChevronLeft, Clock, LoaderCircle, Plus, Trash } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Edit({ clasesAnteriores, materias, dia }: {
    clasesAnteriores: Array<{
        id: number,
        dia: string,
        profesor: string,
        salon: string,
        edificio: string,
        hora_inicio: string,
        hora_fin: string,
        materia_id: number
    }>,
    materias: Array<{ id: number, nombre: string }>,
    dia: string
}) {
    const { data, setData, errors, post, delete: destroy, processing } = useForm<
        {
            clases: Array<{
                id: number,
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
            clases: clasesAnteriores
        }
    );
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clases',
            href: '/dashboard',
        },
        {
            title: dia,
            href: '#',
        }
    ];
    const agregarOtraClase = () => setData('clases', [
        ...data.clases,
        {
            id: 0,
            dia: dia,
            profesor: '',
            salon: '',
            edificio: '',
            hora_inicio: '12:00',
            hora_fin: '13:00',
            materia_id: ''
        }
    ]);

    const eliminarUltimaClase = () => {
        setData('clases', data.clases.slice(0, -1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('clases.update'), {
            preserveScroll: true,
            onSuccess: () => {
                router.get(route('dashboard'));
            },
        });
    };

    const handleDelete = (id: number) => {
        if (id === 0) {
            // Si es una clase nueva (sin ID), solo la quitamos del estado
            setData('clases', data.clases.filter((clase) => clase.id !== id));
        } else {
            // Si es una clase existente, hacemos la petición al servidor
            destroy(route('clases.destroy', { id }), {
                preserveScroll: true,
                onSuccess: () => {
                    setData('clases', data.clases.filter((clase) => clase.id !== id));
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Clases" />
            <div className="flex h-full flex-1 flex-col items-center gap-8 p-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <Clock className="h-4 w-4" />
                        <span>Panel de horarios</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Editar Clases
                    </h1>
                    <div className="pt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/5 px-4 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 capitalize">
                            {dia}
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="w-full sm:w-3/4 md:max-w-2xl mx-auto">
                    <div className="space-y-6">
                        {data.clases.length === 0 && (
                            <p className="text-center text-muted-foreground">No hay clases programadas para el día de hoy</p>
                        )}
                        {data.clases.map((clase, index) => (
                            <div key={clase.id || `new-${index}`}>
                                <div className="mt-4 text-start font-medium text-muted-foreground">
                                    Clase {index + 1}:
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`materia-${index}`}>Materia:</Label>
                                        <Select
                                            value={clase.materia_id.toString()}
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
                                {clase.id !== 0 && (
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            className="rounded-full p-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 transition-all disabled:opacity-40"
                                            onClick={() => handleDelete(clase.id)}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                )}
                                <div className="h-px md:my-6 my-4 w-full bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
                            </div>
                        ))}
                    </div>
                    {/* Botones de agregar y eliminar */}
                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            type="button"
                            size="icon"
                            className="rounded-full p-2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-300 transition-all"
                            onClick={agregarOtraClase}
                        >
                            <Plus />
                            <span className="sr-only">Agregar otra clase</span>
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            disabled={data.clases.length <= clasesAnteriores.length}
                            className="rounded-full p-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 transition-all disabled:opacity-40"
                            onClick={eliminarUltimaClase}
                        >
                            <Trash />
                            <span className="sr-only">Eliminar última clase</span>
                        </Button>
                    </div>

                    <div className="mt-6 flex justify-center">
                        {data.clases.length === 0 ? (
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-2"
                            >
                                <Button
                                    variant="secondary"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Volver
                                </Button>
                            </Link>
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