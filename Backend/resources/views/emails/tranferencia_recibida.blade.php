@extends('emails.index_email')
@section('title', 'Haz recibido una transferencia')

@section('content')
    <div class="header">        
        <h1>Informacion sobre la transferencia recibida</h1>
    </div>
    <div class="content">
        <p><b>{{$data["from"]["name"]}}</b></p>
        <p>Te enviamos informacion sobre esta transferencia que haz recibido</p>

        <p>Infomacion:</p><br>
        <p>La persona: <b>{{$data["to"]["name"]}}</b> te envio esta transferencia</p>
        <p>De: {{$data["monto"]}}</p>
        <p>El dia: {{date("d-m-Y H:m:i", strtotime($data["movimiento"]["created_at"]))}}</p>
    </div>
    <div class="footer">
        <p>Entra en tu home banking para tener mas informacion <a href="">click aqui</a>.</p>
    </div>
@endsection