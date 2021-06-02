@extends('user.app')

@section('content')


<form method="POST" action="{{ route('user.users.store') }}">
	@csrf

	<div class="form-group">
		<label>Nombre completo</label>
		<input type="text" name="name" class="form-control" placeholder="Nombre completo">
	</div>

	<div class="form-group mt-5">
		<label>Correo electrónico</label>
		<input type="email" name="email" class="form-control" placeholder="Correo electrónico">
	</div>

	<button type="submit" class="mt-5 btn btn-outline-dark">
		Guardar
	</button>
	
</form>


@endsection