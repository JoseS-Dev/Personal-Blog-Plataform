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

    // Obtener una nota por su contenido
    static async getByContent({content}){
        if(content){
            return Notes.find((note) => note.content === content);
        }
        else{
            console.log('No se ha proporcionado un contenido');
            return null
        }
    }

    // Obtener una nota o blog por su categoria
    static async getByCategory({category}){
        if(category){
            return Notes.filter((note) => note.category === category);
        }
        else{
            console.log('No se ha proporcionado una categoria');
            return null
        }
    }

    // Obtener una nota o blog por su etiqueta
    static async getByTags({tags}){
        if(tags){
            return Notes.filter((note) => note.tags.includes(tags));
        }
        else{
            console.log('No se ha proporcionado una etiqueta');
            return null
        }
    }

    // Obtener una nota o blog por su fecha de creación
    static async CreateNote({createNotes}){
        if(createNotes){
            return Notes.filter((note) => note.createNotes === createNotes);
        }
        else{
            console.log('No se ha proporcionado una fecha de creación');
            return null
        }
    }

    // Obtener una nota o blog por su fecha de actualización
    static async UpdateNote({updateNotes}){
        if(updateNotes){
            return Notes.filter((note) => note.updateNotes === updateNotes);
        }
        else{
            console.log('No se ha proporcionado una fecha de actualización');
            return null
        }
    }

    // Crear una nota o blog
    static async createNotes({notes}){
        if(notes){
            const newNotes = {
                id: Notes.length + 1,
                ...notes
            }
            Notes.push(newNotes),
            console.log('Nota creada con exito');
            return newNotes;
        }
        else{
            console.log('No se ha proporcionado una nota');
            return null
        }
    }

    // Actualizar una nota o blog
    static async UpdateNotes({id, notes}){
        if(id && notes){
            const indexNotes = Notes.findIndex((note) => note.id === parseInt(id));
            if(indexNotes !== -1){
                const updateNote = {
                    ...Notes[indexNotes],
                    ...notes
                }
                Notes[indexNotes] = updateNote;
                console.log('Nota actualizada con exito');
                return updateNote;
            }
            else{
                console.log('No se ha encontrado la nota');
                return null
            }
        }
        else{
            console.log('No se ha proporcionado un id o una nota');
            return null
        }
    }

    // Eliminar una nota o blog
    static async deleteNotes({id}){
        if(id){
            const IndexNotes = Notes.findIndex((note) => note.id === parseInt(id));
            if(IndexNotes !== -1){
                Notes.splice(IndexNotes, 1);
                console.log('Nota eliminada con exito');
                return Notes;
            }
            else{
                console.log('No se ha encontrado la nota');
                return null
            }
        }
        else{
            console.log('No se ha proporcionado un id');
            return null
        }
    }
}