<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$string = "";
$perros = perro::TraerTodosLosPerros();

foreach ($perros as $perro) {
    $linea = $perro->MostrarDatos();
    
    if(strlen($linea) > 0)
    {
        $string .=  $linea . ',';
    }
}

$string = substr($string, 0, strlen($string)-1);        

echo ('['.$string.']');
?>