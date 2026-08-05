import AppLayout from '@/layouts/app-layout';
import { Head} from '@inertiajs/react';

export default function Inicio() {


    return (
        <AppLayout>
            <Head title="Inicio" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-center text-2xl font-bold">Crear Materia</h1>

            </div>
        </AppLayout>
    );
}
