import { READJSON } from "../Componets/Utils.mjs";
const Notes = READJSON('../Notes.json');

export class NotesModels {
    // Funcion que obtiene todas las notas
    static async getAll(){
        return Notes;
    }

    // Obtener una nota pr su id
    static async getByID({id}){
        if(id){
            return Notes.find((note) => note.id === parseInt(id));
        }
        else{
            console.log('No se ha proporcionado un id');
            return null
        }
    }

    // Obtener una nota por su titulo
    static async getByTitle({title}){
        if(title){
            return Notes.find((note) => note.title === title);
        }
        else{
            console.log('No se ha proporcionado un titulo');
            return null
        }
    }
}