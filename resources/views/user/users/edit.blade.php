@extends('user.app')

@section('content')


<form method="POST" action="{{ route('user.users.update', $user) }}" onsubmit="return updateUser( event )" user-id="{{ $user->id }}">
	@csrf

	<div class="form-group">
		<label>Nombre completo</label>
		<input type="text" id="name" name="name" class="form-control" placeholder="Nombre completo" value="{{ $user->name }}">
	</div>

	<div class="form-group mt-5">
		<label>Correo electrónico</label>
		<input type="email" id="email" name="email" class="form-control" placeholder="Correo electrónico" value="{{ $user->email }}">
	</div>

	<button type="submit" class="mt-5 btn btn-outline-dark">
		Actualizar
	</button>
	
</form>


<script>

	function updateUser( e ){

		e.preventDefault();

		cconst userId = e.srcElement.getAttribute("user-id");
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		axios.post(`/users/${userId}/edit`, {
			method: "POST",
			name,
			email
		})
		.then( window.location.replace("/users") );
	}

</script>

@endsection