<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
$objJSON = json_decode($cadenaJSON);

$miPerro = new perro();
$miPerro->nombre = $objJSON->nombre;
$miPerro->raza = $objJSON->raza;

$perro = perro::CompararPerros($objJSON->edad, $objJSON->raza);
$consulta = perro::EliminarPerro($miPerro);

if($consulta == 1)
{
    if(unlink($perro->path_foto)){
        $resultado["TodoOK"] = true;
    }else{
        $resultado["TodoOK"] = false;
    }
    
}else{
    $resultado["TotoOK"] = false;
}

echo json_encode($resultado);

?>