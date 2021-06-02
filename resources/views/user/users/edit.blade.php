@extends('user.app')

@section('content')


<form method="POST" action="{{ route('user.users.update', $user) }}">
	@csrf

	<div class="form-group">
		<label>Nombre completo</label>
		<input type="text" name="name" class="form-control" placeholder="Nombre completo" value="{{ $user->name }}">
	</div>

	<div class="form-group mt-5">
		<label>Correo electrónico</label>
		<input type="email" name="email" class="form-control" placeholder="Correo electrónico" value="{{ $user->email }}">
	</div>

	<button type="submit" class="mt-5 btn btn-outline-dark">
		Actualizar
	</button>
	
</form>


@endsection