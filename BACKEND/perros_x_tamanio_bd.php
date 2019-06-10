<?php
include_once ("./AccesoDatos.php");
include_once ("./perro.php");

$string = "";
$perros = perro::TraerTodosLosPerros();
$chico = 0;
$mediano = 0;
$grande = 0;
$msj = "";

foreach ($perros as $perro) {
    if($perro->tamanio == "Chico"){
        $chico ++;
    }else if($perro->tamanio == "Mediano"){
        $mediano ++;
    }else{
        $grande ++;
    }    
}

//EL MAYOR
if($chico>$mediano && $chico>$grande)
{
    $msj .= "El tamaño con mayor cantidad de perros es el chico con: ".$chico;
    if($chico == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($mediano>$chico && $mediano>$grande)
{
    $msj .= "El tamaño con mayor cantidad de perros es el mediano con: ".$mediano;
    if($mediano == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($grande>$chico && $grande>$mediano)
{
    $msj .= "El tamaño con mayor cantidad de perros es el grande con: ".$grande;
    if($grande == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($mediano==$chico && $mediano>$grande){
    $msj .= "Los tamaños con mayor cantidad de perros son el chico y el mediano con: ".$chico;
    if($chico == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}else if($mediano==$grande && $mediano>$chico){
    $msj .= "Los tamaños con mayor cantidad de perros son el mediano y el grande con: ".$mediano;
    if($mediano == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}else if($grande==$chico && $grande>$mediano){
    $msj .= "Los tamaños con mayor cantidad de perros son el chico y el grande con: ".$grande;
    if($grande == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}
//EL MENOR
if($chico<$mediano && $chico<$grande)
{
    $msj .= "Y el tamaño con menor cantidad de perros es el chico con: ".$chico;
    if($chico == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($mediano<$chico && $mediano<$grande)
{
    $msj .= "Y el tamaño con menor cantidad de perros es el mediano con: ".$mediano;
    if($mediano == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($grande<$chico && $grande<$mediano)
{
    $msj .= "Y el tamaño con menor cantidad de perros es el grande con: ".$grande;
    if($grande == 1){
        $msj .= " perro.";
    }else{
        $msj .= " perros.";
    }
}else if($mediano==$chico && $mediano<$grande){
    $msj .= "Y los tamaños con menor cantidad de perros son el chico y el mediano con: ".$chico;
    if($chico == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}else if($mediano==$grande && $mediano<$chico){
    $msj .= "Y los tamaños con menor cantidad de perros son el mediano y el grande con: ".$mediano;
    if($mediano == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}else if($grande==$chico && $grande<$mediano){
    $msj .= "Y los tamaños con menor cantidad de perros son el chico y el grande con: ".$grande;
    if($grande == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}
//SI LOS 3 SON IGUALES
if($chico == $mediano && $chico == $grande){
    $msj .= "Los tres tamaños tienen la misma cantidad: ".$chico;
    if($chico == 1){
        $msj .= " perro c/u.";
    }else{
        $msj .= " perros c/u.";
    }
}

echo $msj;

?>