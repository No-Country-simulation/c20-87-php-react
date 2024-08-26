<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(1)->create();

        \App\Models\Type_user::create([
            'type_user' => "CLIENTE",
            'estado' => 1,
        ]);

        \App\Models\Type_user::create([
            'type_user' => "EMPRESA",
            'estado' => 1,
        ]);

        \App\Models\Type_user::create([
            'type_user' => "ADMINISTRADOR",
            'estado' => 1,
        ]);

    }
}
