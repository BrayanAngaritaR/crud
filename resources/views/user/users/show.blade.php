@extends('user.app')

@section('content')

  	<div class="container mt-5">
  		<div class="row">
  			<div class="col-sm-12">
  				<a href="{{ route('user.users.index') }}" class="btn btn-outline-dark">
  					Volver
  				</a>
  			</div>
  		</div>
  	</div>
    

    <div class="container mt-5 shadow-sm p-5">
		<h5>{{ $user->name }}</h5>
		<h5>{{ $user->email }}</h5>
	</div>
@stop