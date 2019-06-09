<?php
$a = fopen("./perro.json", "r");

$string = "";

while(!feof($a)){

    $linea = trim(fgets($a));

    if(strlen($linea) > 0)
        $string .=  $linea . ',';        
}

fclose($a);

$string = substr($string, 0, strlen($string)-1);        

echo ('['.$string.']');
?>