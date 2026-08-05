<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Smalot\PdfParser\Parser;

class ImportarController extends Controller
{
    /**
     * Vista donde se sube el archivo PDF con el horario.
     */
    public function import()
    {
        return Inertia::render('import/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function upload(Request $request)
    {
        // 1. Validamos que sí venga un archivo y sea PDF
        $request->validate([
            'archivo' => 'required|mimes:pdf|max:2048',
        ]);

        $file = $request->file('archivo');
        $clases_extraidas = [];

        try {
            // 2. Extraemos el texto usando Smalot
            $parser = new Parser();
            $pdf = $parser->parseFile($file->getPathname());
            $texto_completo = $pdf->getText();

            // 3. Partimos el texto
            $bloques = explode("Asignatura:", $texto_completo);

            // Analizamos cada bloque (ignoramos el índice 0)
            for ($i = 1; $i < count($bloques); $i++) {
                $bloque = $bloques[$i];

                // Extraemos la materia cruda
                $materia_cruda = $this->extraerDato("/^\s*(.*?)(?:Día:|Catedrático:|\n)/is", $bloque);

                if (strpos($materia_cruda, " - ") !== false) {
                    list($clave_materia, $nombre_materia) = explode(" - ", $materia_cruda, 2);
                } else {
                    $clave_materia = "";
                    $nombre_materia = $materia_cruda;
                }

                $profesor = $this->extraerDato("/Catedrático:\s*(.*?)(?=\n|Grupo:|Universidad|$)/i", $bloque);

                if (preg_match("/([a-zA-ZáéíóúÁÉÍÓÚ]+)\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/i", $bloque, $match_horario)) {
                    $dia = trim($match_horario[1]);
                    $hora_inicio = trim($match_horario[2]);
                    $hora_fin = trim($match_horario[3]);
                } else {
                    $dia = "No encontrado";
                    $hora_inicio = "No encontrado";
                    $hora_fin = "No encontrado";
                }

                // Datos cortos (con el fix de Regex aplicado para evitar que se peguen las palabras)
                $grupo = $this->extraerDato("/Grupo:\s*(\d+)/i", $bloque);
                $subgrupo = $this->extraerDato("/Subgrupo:\s*(\d+)/i", $bloque);
                $salon = $this->extraerDato("/Salón:\s*(.*?)(?=\s*Etapa|\n|$)/i", $bloque);
                $etapa = $this->extraerDato("/Etapa:?\s*(.*?)(?=\s*Tipo|\n|$)/i", $bloque);
                $tipo = $this->extraerDato("/Tipo:?\s*([a-zA-Z]+)/i", $bloque);

                $clases_extraidas[] = [
                    "clave_materia"  => trim($clave_materia),
                    "nombre_materia" => trim($nombre_materia),
                    "profesor"       => $profesor,
                    "dia"            => $dia,
                    "hora_inicio"    => $hora_inicio,
                    "hora_fin"       => $hora_fin,
                    "grupo"          => $grupo,
                    "subgrupo"       => $subgrupo,
                    "salon"          => $salon,
                    "tipo"           => $tipo,
                    "etapa"          => $etapa,
                ];
            }

            // 4. Ordenamos por día y hora
            $orden_dias = [
                "lunes" => 0, "martes" => 1, "miércoles" => 2,
                "jueves" => 3, "viernes" => 4, "sábado" => 5, "domingo" => 6
            ];

            usort($clases_extraidas, function($a, $b) use ($orden_dias) {
                $dia_a = mb_strtolower($a['dia'], 'UTF-8');
                $dia_b = mb_strtolower($b['dia'], 'UTF-8');

                $val_a = isset($orden_dias[$dia_a]) ? $orden_dias[$dia_a] : 7;
                $val_b = isset($orden_dias[$dia_b]) ? $orden_dias[$dia_b] : 7;

                if ($val_a === $val_b) {
                    return strcmp($a['hora_inicio'], $b['hora_inicio']);
                }
                return $val_a <=> $val_b;
            });

            // 5. Devolvemos los datos a una nueva vista de React (ej. 'Resultados')
            // return response()->json([
            //     'clases' => $clases_extraidas
            // ]);

            return redirect()->route('confirmacion', [
                'clases' => $clases_extraidas
            ]);

        } catch (\Exception $e) {
            // Si algo falla, regresamos a la vista anterior con un mensaje de error
            return back()->withErrors(['archivo' => 'Error al leer el PDF: ' . $e->getMessage()]);
        }
    }

    private function extraerDato(string $patron, string $texto): string
    {
        if (preg_match($patron, $texto, $matches)) {
            return trim($matches[1]);
        }
        return "No encontrado";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function confirm(Request $request)
    {
        return Inertia::render('import/confirm', [
            'clases' => $request->clases
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
