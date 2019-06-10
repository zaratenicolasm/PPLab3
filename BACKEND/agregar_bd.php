<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
$objJSON = json_decode($cadenaJSON);

$miPerro = new perro();
$miPerro->tamanio = $objJSON->tamanio;
$miPerro->edad = $objJSON->edad;
$miPerro->precio = $objJSON->precio;
$miPerro->nombre = $objJSON->nombre;
$miPerro->raza = $objJSON->raza;
$miPerro->path_foto = "./fotos/" . $objJSON->foto . ".jpg";

$miPerro->InsertarElPerro();

if( ! move_uploaded_file($_FILES["foto"]["tmp_name"], $miPerro->path_foto) ){
    $resultado["FotoOK"] = false;
}
else{
    $resultado["FotoOK"] = true;
}

echo json_encode($resultado);

?>