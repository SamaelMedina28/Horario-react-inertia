import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardMateria from '@/components/customs/card-materia';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
// ... other imports

// Import Swiper styles
import 'swiper/css';
import { useRef, useEffect } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
type Props = {
    clases: Array<{ id: number, dia: string, profesor: string, salon: string, edificio: string, hora_inicio: string, hora_fin: string, materia_id: number }>,
    materias: Array<{ id: number, nombre: string }>
}

export default function Dashboard({ clases, materias }: Props) {
    const swiperRef = useRef<{ swiper: SwiperType } | null>(null);

    const goToSlide = (index: number) => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };

    useEffect(() => {
        if (!swiperRef.current) return;
        const diaActual = new Date().getDay();
        if (diaActual === 0 || diaActual === 6) goToSlide(0); else goToSlide(diaActual - 1);
    }, [clases]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex w-full justify-center h-full flex-1 gap-4 rounded-xl p-4 overflow-x-auto">
                <Swiper className="w-full" ref={swiperRef}>
                    <SwiperSlide>
                        <CardMateria dia="Lunes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Lunes')} className="w-1/2 mx-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMateria dia="Martes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Martes')} className="w-1/2 mx-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMateria dia="Miercoles" materias={materias} clases={clases.filter((clase) => clase.dia === 'Miercoles')} className="w-1/2 mx-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMateria dia="Jueves" materias={materias} clases={clases.filter((clase) => clase.dia === 'Jueves')} className="w-1/2 mx-auto" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMateria dia="Viernes" materias={materias} clases={clases.filter((clase) => clase.dia === 'Viernes')} className="w-1/2 mx-auto" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </AppLayout>
    );
}