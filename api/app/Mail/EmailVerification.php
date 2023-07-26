<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $mailData;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mailData)
    {
        //
        $this->mailData = $mailData;
        // return response()->json($this->mailData);

        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('Email.demoEmail')->with('mailData', $this->mailData);
    }
}
