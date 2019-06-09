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
    
    /*public static function ModificarCD($id, $titulo, $anio, $cantante)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE cds SET titel = :titulo, interpret = :cantante, 
                                                        jahr = :anio WHERE id = :id");
        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->bindValue(':titulo', $titulo, PDO::PARAM_INT);
        $consulta->bindValue(':anio', $anio, PDO::PARAM_INT);
        $consulta->bindValue(':cantante', $cantante, PDO::PARAM_STR);

        return $consulta->execute();

    }*/

    /*public static function EliminarCD($cd)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM cds WHERE id = :id");
        
        $consulta->bindValue(':id', $cd->id, PDO::PARAM_INT);

        return $consulta->execute();

    }*/
    
}