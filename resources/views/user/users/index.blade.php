@extends('user.app')

@section('content')

  	<div class="container mt-5">
  		<div class="row">
  			<div class="col-sm-12">
  				<a href="{{ route('user.users.create') }}" class="btn btn-outline-dark">
  					Agregar usuario
  				</a>
  			</div>
  		</div>
  	</div>
    

    <div class="container mt-5 table-responsive">
	<table class="table">
	  <thead>
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">Nombre completo</th>
	      <th scope="col">Correo electrónico</th>
	      <th scope="col">Fecha de creación</th>
	      <th scope="col">Ver</th>
	      <th scope="col">Editar</th>
	      <th scope="col">Eliminar</th>
	      
	    </tr>
	  </thead>
	  <tbody>
	  	@foreach($users as $user)
	    <tr>
	      <th scope="row">{{ $user->id }}</th>
	      <td>{{ $user->name }}</td>
	      <td>{{ $user->email }}</td>
	      <td>{{ $user->created_at->format('d/m/Y') }}</td>
	      <td>
	      	<a href="{{ route('user.users.show', $user) }}">
	      		Ver
	      	</a>
	      </td>
	      <td>
	      	<a href="{{ route('user.users.edit', $user) }}">
	      		Editar
	      	</a>
	      </td>
	      <td>
	      	<form action="{{ route('user.users.destroy', $user) }}" method="POST" onsubmit="return deleteUser( event )" user-id="{{ $user->id }}">
	      		@csrf
	      		@method('DELETE')

	      		<button type="submit" class="btn btn-danger">
	      			Borrar
	      		</button>
	      	</form>
	      	
	      </td>
	      
	    </tr>
	    @endforeach
	  </tbody>
	</table>
</div>


<script>

	function deleteUser( e )
	{
		e.preventDefault();

		const userId = e.srcElement.getAttribute("user-id");

		axios.post( `/users/${userId}/delete`, {
			method: 'DELETE',
			userId
		})
		.then( window.location.replace("/users") );
	}

</script>
@stop