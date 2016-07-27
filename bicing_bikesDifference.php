<?php

$parametros_conexion ="pgsql:dbname=bicing;host=localhost";
$pdo = new PDO($parametros_conexion, 'usr', 'pswd');

$sql ="select id,hora,hora_ant from bicing";
$sql1 = "SELECT EXTRACT (minute from hora) from bicing";

for($numero=2 ; $numero<5 ; $numero=$numero+1){
	$sql2 = "select id, idestacio,bikes from bicing where idestacio=$numero";
	
	
	foreach ($pdo -> query($sql2) as $fila){
		
		$idant = $fila[0] - 100;
		echo "<br/>$fila[0] - $fila[1] - $fila[2] - $idant";
		$sql3 = "update bicing set bikes_ant = (select bikes from bicing where id =$idant) where id=$fila[0]";
		$resultado = $pdo -> query($sql3);
	}
}

?>



