<?php
class perro
{
    public $id;
    public $tamanio;
    public $edad;
    public $precio;
    public $nombre;
    public $raza;
    public $path_foto;

    public function MostrarDatos()
    {
            return '{ "id" : "'.$this->id.'", "tamanio" : "'.$this->tamanio.'", "edad" : "'.$this->edad.'", "precio" : "'.$this->precio.'", "nombre" : "'.$this->nombre.'", "raza" : "'.$this->raza.'", "foto" : "'.$this->path_foto.'" }';
    }
    
    public static function TraerTodosLosPerros()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, tamanio , edad, precio, nombre, raza, path_foto FROM perros");        
        
        $consulta->execute();
        
        $consulta->setFetchMode(PDO::FETCH_INTO, new perro);                                                

        return $consulta; 
    }
    
    public function InsertarElPerro()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO perros (id, tamanio, edad, precio, nombre, raza, path_foto)"
                                                    . "VALUES(:id, :tam, :edad, :precio, :nom, :raza, :foto)");
        
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':tam', $this->tamanio, PDO::PARAM_STR);
        $consulta->bindValue(':edad', $this->edad, PDO::PARAM_INT);
        $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
        $consulta->bindValue(':nom', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':raza', $this->raza, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $this->path_foto, PDO::PARAM_STR);

        $consulta->execute();   

    }

    public static function CompararPerros( $edadAC, $razaAC)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM perros WHERE edad LIKE :ed AND raza LIKE :ra");        
        
        $consulta->bindValue(':ed', $edadAC, PDO::PARAM_INT);
        $consulta->bindValue(':ra', $razaAC, PDO::PARAM_STR);
        
        $consulta->execute();

        $consulta->setFetchMode(PDO::FETCH_INTO, new perro);

        return $consulta;
    }

    public static function CompararPerrosPorNombre( $nombreAC )
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM perros WHERE nombre LIKE :nom");        
        
        $consulta->bindValue(':nom', $nombreAC, PDO::PARAM_STR);
        
        $consulta->execute();

        $consulta->setFetchMode(PDO::FETCH_INTO, new perro);

        return $consulta;
    }
    
    public static function ModificarPerro($tamanio, $edad, $precio, $nombre, $raza, $foto)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE perros SET tamanio = :tamanio, edad = :edad, 
                                                        precio = :precio, raza = :raza, path_foto = :foto WHERE nombre LIKE :nombre");
        
        $consulta->bindValue(':edad', $edad, PDO::PARAM_INT);
        $consulta->bindValue(':tamanio', $tamanio, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $precio, PDO::PARAM_INT);
        $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
        $consulta->bindValue(':raza', $raza, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $foto, PDO::PARAM_STR);

        return $consulta->execute();

    }

    public static function EliminarPerro($perro)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM perros WHERE nombre LIKE :nombre AND raza LIKE :raza" );
        
        $consulta->bindValue(':nombre', $perro->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':raza', $perro->raza, PDO::PARAM_STR);;

        return $consulta->execute();

    }
    
}