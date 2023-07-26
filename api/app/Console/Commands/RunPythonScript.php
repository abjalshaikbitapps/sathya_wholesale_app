<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RunPythonScript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:python3';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            // Your code logic for the cron job
            $pythonScriptPath = '/home/bitapps/new/sathya_wholesale_app/api/public/python/playwrightscript.py';
            // chdir('/home/bitapps/new/sathya_wholesale_app/api/public/python/playwrightscript.py');
            // exec('/usr/bin/python3' . $pythonScriptPath);
            exec('/usr/bin/python3 ' . $pythonScriptPath . ' >> /home/bitapps/new/logfile.log 2>&1');
    
            // exec('python3 ' . $pythonScriptPath);
            echo 'hello abjal';
            $this->info("Success");
            $data['message']='Success';
            $data['status']='processed';
            $data['created_at']=now();
            DB::table('errorlog')->insert($data);
            // Example: Execute a Python script
            // exec('python3 /path/to/your/script.py');

            // Or execute a PHP script
            // include '/path/to/your/script.php';

        } catch (\Exception $e) {
            // Handle the exception
            $data['message']=$e->getMessage();
            $data['status']='Failed';
            $data['created_at']=now();
            DB::table('errorlog')->insert($data);
            // // Log the error
            // \Log::error('Exception occurred during cron job execution: ' . $e->getMessage());

            // // You can also send an email or perform any other desired actions
            // // For example, sending an email to the administrator
            // \Mail::raw('Exception occurred during cron job execution: ' . $e->getMessage(), function ($message) {
            //     $message->to('admin@example.com')->subject('Cron Job Exception');
            // });
        }


        
        
        // You can also pass arguments to the Python script using exec('python ' . $pythonScriptPath . ' argument1 argument2');
    }
    
}
