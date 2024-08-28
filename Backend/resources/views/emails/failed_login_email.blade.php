@extends('emails.index_email')
@section('title', 'Notificación de Intento de Inicio de Sesión')

@section('content')
    <div class="header">
        <h1>Notificación de Seguridad</h1>
    </div>
    <div class="content">
        <p>Hola {{ $details[0]['name'] }},</p>
        <p>Recientemente se ha intentado iniciar sesión en tu cuenta.</p>
        <p>Por medidas de seguridad bloqueamos el usuario, para desbloquerlo haz clic en el siguiente enlace:</p>
        <p><a href="{{route("desbloquear.usuario", $details[0]["id"])}}">Desbloquear usuario</a></p>
    </div>
    <div class="footer">
        <p>Si necesitas ayuda, por favor contacta a nuestro <a href="">soporte</a>.</p>
    </div>
@endsection
