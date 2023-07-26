@component('mail::message')
# {{ $mailData['title'] }}
@component('mail::button', ['url' => $mailData['url']])
VerifyEmail
@endcomponent
@endcomponent