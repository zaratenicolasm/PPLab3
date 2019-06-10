<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$string = "";
$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
$objJSON = json_decode($cadenaJSON);
$foto = "./fotos_modif/".$objJSON->foto."_MODIF.jpg";
//TRAIGO EL PERRO A ELIMINAR
$perros = perro::CompararPerros($objJSON->edad, $objJSON->raza);
foreach ($perros as $perro) {
    $string = $perro->MostrarDatos();    
}
$perro = json_decode($string);
//============================================================================================================================== 
$consulta = perro::ModificarPerro($objJSON->tamanio, $objJSON->edad, $objJSON->precio, $objJSON->nombre, $objJSON->raza, $foto);

if($consulta == 1)
{
    if(rename($perro->foto, $foto)){
        $resultado["TodoOK"] = true;
    }else{
        $resultado["TodoOK"] = true;
    }
}else{
    $resultado["TodoOK"] = false;
}

echo json_encode($resultado);
?>