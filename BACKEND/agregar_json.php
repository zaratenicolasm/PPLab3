<?php
$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
$objJSON = json_decode($cadenaJSON);

$ar = fopen("./perro.json", "a");

$cant = fwrite($ar, $cadenaJSON . "\r\n");

fclose($ar);

$destino = "./fotos/" . $objJSON->foto;

if( ! move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
    $resultado["FotoOK"] = false;
}
else{
    $resultado["FotoOK"] = true;
}

$resultado["TodoOK"] = $cant > 0 ? true : false;

echo json_encode($resultado);
?>