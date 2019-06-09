<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
$objJSON = json_decode($cadenaJSON);

$string = "";
$seAgrego = "";
$perros = perro::CompararPerros($objJSON->edad, $objJSON->raza);

foreach ($perros as $perro) {
    $linea = $perro->MostrarDatos();
    
    if(strlen($linea) > 0)
    {
        $string .=  $linea . ',';
    }
}

if($string == "")
{
    $miPerro = new perro();
    $miPerro->tamanio = $objJSON->tamanio;
    $miPerro->edad = $objJSON->edad;
    $miPerro->precio = $objJSON->precio;
    $miPerro->nombre = $objJSON->nombre;
    $miPerro->raza = $objJSON->raza;
    $miPerro->path_foto = $objJSON->foto;

    $miPerro->InsertarElPerro();

    $destino = "./fotos/" . $objJSON->foto;

    if( ! move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
        $resultado["FotoOK"] = false;
    }
    else{
       $resultado["FotoOK"] = true;
    }
     
    $resultado["SeAgrego"] = true;
}else{
    $resultado["SeAgrego"] = false;
}

echo json_encode($resultado);
?>