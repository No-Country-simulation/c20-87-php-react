@extends('emails.index_email')
@section('title', '¡¡Felicitaciones!!')

@section('content')
    <div class="header">
        <h1>¡¡Muchas gracias por la confianza!!</h1>
    </div>
    <div class="content">
        <p>Hola <b>{{ $details->name }} {{ $details->lastname }}</b>,</p>
        <p>Queremos agredecerte por preferirnos y confiar en nosotros, por esta razon te queremos ofrecer un prestamo.</p>
        <div style="display:flex; justify-content:center;">
            <h1>$100.000</h1>
        </div>
        <p>Desde ahora al ingresar en tu <b>Home Banking</b> podras solicitar tu credito con un solo click.</p>
        <p>Alli te informaremos todo lo necesario sobre tu credito.</p>
    </div>
    <div class="footer">
        <p>Si necesitas ayuda, por favor contacta a nuestro <a href="">soporte</a>.</p>
    </div>
@endsection