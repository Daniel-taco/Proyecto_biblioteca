<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->name = 'Oscar Daniel';
        $user->email = 'daniel@gmail.com';
        $user->password = bcrypt('040502osc');
        $user->address = 'Calle Azteca #218';
        $user->phone_number = '4491102262';
        $user->id_rol = 1;
        $user->save();
    }
}
