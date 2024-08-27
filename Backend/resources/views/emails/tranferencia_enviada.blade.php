@extends('emails.index_email')
@section('title', 'Transferencia realizada correctamente')

@section('content')
    <div class="header">        
        <h1>Informacion sobre tu transferencia</h1>
    </div>
    <div class="content">
        <p><b>{{$data["to"]["name"]}}</b></p>
        <p>Te enviamos informacion sobre tu transferencia realizada</p>

        <p>Infomacion:</p><br>
        <p>Tu transferencia para: <b>{{$data["from"]["name"]}}</b></p>
        <p>De: {{$data["monto"]}}</p>
        <p>El dia: {{date("d-m-Y H:m:i", strtotime($data["movimiento"]["created_at"]))}}</p>
    </div>
    <div class="footer">
        <p>Si tu no realizaste este movimiento comunicate con soporte haciendo <a href="">click aqui</a>.</p>
    </div>
@endsection