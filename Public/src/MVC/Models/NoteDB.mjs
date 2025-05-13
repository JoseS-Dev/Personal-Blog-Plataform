import { connectionDb } from "../../Config.mjs";
import { ConverterBuffers } from "../Componets/Utils.mjs";
export class NotesModels {
    // Funcion que obtiene todas las notas
    static async getAll(){
        const [Notes] = await connectionDb.query('SELECT * FROM content_notes')
        if(Notes.length <= 0){
            console.log("No hay datos en la tabla")
        }
        const cleanBuffers = Notes.map((note) => ConverterBuffers(note));
        return cleanBuffers;
    }

    // Obtener una nota pr su id
    static async getByID({id}){
        pass
    }

    // Obtener una nota por su titulo
    static async getByTitle({title}){
        pass
    }

    // Obtener una nota por su contenido
    static async getByContent({content}){
        pass
    }

    // Obtener una nota o blog por su categoria
    static async getByCategory({category}){
        pass
    }

    // Obtener una nota o blog por su etiqueta
    static async getByTags({tags}){
        pass
    }

    // Obtener una nota o blog por su fecha de creación
    static async getCreatedNote({createdNotes}){
        pass
    }

    // Obtener una nota o blog por su fecha de actualización
    static async getUpdatedNote({updatedNotes}){
        pass
    }

    // Crear una nota o blog
    static async createNotes({notes}){
        pass
    }

    // Actualizar una nota o blog
    static async UpdateNotes({id, notes}){
        pass
    }

    // Eliminar una nota o blog
    static async deleteNotes({id}){
        pass
    }
}