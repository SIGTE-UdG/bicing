<?php


$id;
$latitud;
$longitud;
$bikes;
$slots;


//decodificació del json 
$json_string = 'http://wservice.viabicing.cat/v2/stations';
$jsondata = file_get_contents($json_string);
$obj = json_decode($jsondata,true);
echo "<pre>";




//parametres per a la codificació
$parametros_conexion ="pgsql:dbname=bicing;host=localhost";
$pdo = new PDO($parametros_conexion, 'postgres', 'postgres');
$sql = "select current_timestamp";
$sqlHoraAnt = "select current_timestamp - (1 ||' minutes')::interval";
//extreure info ex --> SELECT EXTRACT (DAY FROM CURRENT_TIMESTAMP); 
//select current_timestamp - (5 ||' minutes')::interval
$sql1 = "insert into bicing (id,carretera, km, ciutat) values ($id, $carretera, $km, $ciutat)";


//funció per a posar en una variable els valors del json
for($numero=0 ; $numero<100 ; $numero=$numero+1)
{
	$element = $obj['stations'][$numero];
	$matriu = array($element);

	foreach($matriu as $valor){
		$id = $valor['id'];
		$latitud = $valor['latitude'];
		$longitud = $valor['longitude'];
		$slots = $valor['slots'];
		$bikes = $valor['bikes'];

	
		$hora = date('Y-m-d H:i:s');
		$horaAnt = date('Y-m-d H:i:s', strtotime('-1 minutes'));
	
		echo "</br> $id </br>$latitud </br> $longitud </br> $slots </br>$bikes</br>$hora</br>$horaAnt";

		$parametros_conexion ="pgsql:dbname=bicing;host=localhost";
		$pdo = new PDO($parametros_conexion, 'postgres', 'postgres');

		
		
		
		$sql1 = "insert into bicing (idestacio, latitude, longitude, slots, bikes,hora,hora_ant) values ($id, '".$latitud."', '".$longitud."',$slots,$bikes,'".$hora."','".$horaAnt."')";

		$resultado = $pdo -> query($sql1);
 
	}
}

?>



