<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\EvaluacionCrediticia;

class EvaluacionScoreCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'evaluacion:score';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ejecuta el método evaluacion_score del controlador EvaluacionCrediticia';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Llamar al método del controlador
        $controlador = new EvaluacionCrediticia();
        $controlador->evaluacion_score();

        return 0;
    }
}
