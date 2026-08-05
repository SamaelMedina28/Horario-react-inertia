import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileUp, BookOpen, Ban, FileText, X } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Import() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const { data, setData, post, processing, errors } = useForm<{ archivo: File | null }>({
        archivo: null,
    });

    const handleFile = (file: File | null) => {
        if (file && file.type === 'application/pdf') {
            setData('archivo', file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0] ?? null;
        handleFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('carga'));
    };
    return (
        <AppLayout>
            <Head title="Importar" />

            <div className="flex h-full flex-1 flex-col items-center mt-10 gap-8 p-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Panel de horarios</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Importar Horario
                    </h1>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                        Sube un archivo .pdf con tu horario para escanearlo, este horario lo puedes descargar de la pagina de la universidad.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="w-full max-w-2xl">
                    <form onSubmit={handleSubmit}>
                        <Card className="flex flex-col hover:shadow-md transition-shadow duration-200">
                            <CardHeader className='pb-0 border-b-0'>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                                        <FileUp className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-base">Subir PDF</CardTitle>
                                </div>
                            </CardHeader>

                            <Separator />

                            <CardContent className="pt-4 flex-1">
                                {/* Zona drag & drop */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => fileInputRef.current?.click()}
                                    onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                    className={[
                                        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
                                        dragging
                                            ? 'border-primary bg-primary/5'
                                            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30',
                                    ].join(' ')}
                                >
                                    {data.archivo ? (
                                        <>
                                            <FileText className="h-10 w-10 text-primary" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{data.archivo.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {(data.archivo.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setData('archivo', null); }}
                                                className="flex items-center gap-1 text-xs text-destructive hover:underline"
                                            >
                                                <X className="h-3 w-3" /> Quitar archivo
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <FileUp className="h-10 w-10 text-muted-foreground/50" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Arrastra tu PDF aquí</p>
                                                <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground/60">Solo archivos .pdf</span>
                                        </>
                                    )}
                                </div>

                                {/* Input oculto */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                                />

                                {errors.archivo && (
                                    <p className="mt-2 text-xs text-destructive">{errors.archivo}</p>
                                )}
                            </CardContent>

                            <CardFooter className="pt-2 flex gap-2">
                                <Button asChild className="w-full gap-2" variant='outline'>
                                    <Link href={route('inicio')}>
                                        <Ban className="h-4 w-4" />
                                        Cancelar
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full gap-2"
                                    disabled={!data.archivo || processing}
                                >
                                    <FileUp className="h-4 w-4" />
                                    {processing ? 'Subiendo...' : 'Escanear'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
