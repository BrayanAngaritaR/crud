@extends('user.app')

@section('content')


<form method="POST" action="{{ route('user.users.store') }}">

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

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>

	axios.post("https://crud.test/user/create", {
		name: "test",
		email: "daniel@gmail.com"
	})
	.then( console.log )

</script>

@endsection