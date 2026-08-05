import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CalendarPlus, FileUp, ArrowRight, BookOpen } from 'lucide-react';

export default function Inicio() {
    return (
        <AppLayout>
            <Head title="Inicio" />

            <div className="flex h-full flex-1 flex-col items-center mt-10 gap-8 p-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Panel de horarios</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Carga tu horario
                    </h1>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                        Elige cómo quieres registrar tu horario escolar. Puedes hacerlo de forma manual o importarlo desde un PDF.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                    {/* Opción 1: Manual */}
                    <Card className="flex flex-col hover:shadow-md transition-shadow duration-200">
                        <CardHeader className='pb-0 border-b-0'>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                                    <CalendarPlus className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Agregar manualmente</CardTitle>
                            </div>
                        </CardHeader>
                        <Separator />

                        <CardContent className="pt-4 flex-1">
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    Control total sobre cada dato
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    Edita en el momento
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    Sin necesidad de archivos
                                </li>
                            </ul>
                        </CardContent>

                        <CardFooter className="pt-2">
                            <Button asChild className="w-full gap-2">
                                <Link href={route('materias.create')}>
                                    Comenzar
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Opción 2: PDF */}
                    <Card className="flex flex-col hover:shadow-md transition-shadow duration-200">
                        <CardHeader className="pb-0 border-b-0">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted text-muted-foreground">
                                    <FileUp className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-base">Importar desde PDF</CardTitle>
                            </div>
                        </CardHeader>

                        <Separator />

                        <CardContent className="pt-4 flex-1">
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                                    Carga rápida desde tu horario oficial
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                                    Extracción automática de datos
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                                    Revisa antes de guardar
                                </li>
                            </ul>
                        </CardContent>

                        <CardFooter className="pt-2">
                            <Button
                                variant="secondary"
                                className="w-full"
                                asChild
                            >
                                <Link href={route('importar')}>
                                    <FileUp className="h-4 w-4" />
                                    Subir PDF
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
