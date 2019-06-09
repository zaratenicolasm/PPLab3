namespace Entidades
{
    export class Mascota
    {
        protected _tamanio:string;
        protected _edad:number;
        protected _precio:number;

        public constructor( tamanio:string, edad:number, precio:number)
        {
            this._tamanio=tamanio;
            this._edad=edad;
            this._precio=precio;
        }

        public ToString():string
        {
            var str:string = '"tamanio" : "'+this._tamanio+'", "edad" : '+this._edad+', "precio" : '+this._precio;
            return str;
        }
    }
}