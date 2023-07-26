{{--$order collection is available here--}}

@component('mail::message')
# Order Placed Successfully!

Your order have been placed successfully. Order tracking id {{$order->tracking_number}}

@component('mail::button', ['url' => $url ])
View Order
@endcomponent

Thanks,<br>
Satya Wholesale
@endcomponent