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
            "type_user" => "CLIENTE",
            "estado" => 1
        ]);

        \App\Models\Type_user::create([
            "type_user" => "EMPRESA",
            "estado" => 1
        ]);

        \App\Models\Type_user::create([
            "type_user" => "ADMINISTRADOR",
            "estado" => 1
        ]);

        \App\Models\Bank_account::create([
            "user_id" => "1",
            "account_number" => "123456789",
            "balance" => "250230",
            "currency" => "PESO"
        ]);

        \App\Models\Notification::create([
            'name_notification' => "Fail login",
            'status' => 1
        ]);

        \App\Models\Notification::create([
            'name_notification' => "Transferencia realizada",
            'status' => 1
        ]);

        \App\Models\Notification::create([
            'name_notification' => "Transferencia recibida",
            'status' => 1
        ]);

        \App\Models\Notification::create([
            'name_notification' => "aprobacion credito 100mil",
            'status' => 1
        ]);

        \App\Models\Service::create([
            'name_service' => 'Edesur',
            'status' => 1
        ]);

        \App\Models\Service::create([
            'name_service' => 'MetroGas',
            'status' => 1
        ]);

        \App\Models\Service::create([
            'name_service' => 'Movistar',
            'status' => 1
        ]);
    }
}
