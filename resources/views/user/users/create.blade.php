@extends('user.app')

@section('content')


<form method="POST" action="{{ route('user.users.store') }}" onsubmit="return createUser( event )">

	<div class="form-group">
		<label>Nombre completo</label>
		<input type="text" id="name" name="name" class="form-control" placeholder="Nombre completo">
	</div>

	<div class="form-group mt-5">
		<label>Correo electrónico</label>
		<input type="email" id="email" name="email" class="form-control" placeholder="Correo electrónico">
	</div>

	<button type="submit" class="mt-5 btn btn-outline-dark">
		Guardar
	</button>
	
</form>

<script>

	function createUser( e ){

		e.preventDefault();
		
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;

		axios.post("/user/create", {
			method: "POST",
			name,
			email
		})
		.then( window.location.replace("/users") );
	}

</script>

@endsection