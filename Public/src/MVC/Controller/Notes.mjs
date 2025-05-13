import { ValidateUpdateNotes, validateNotes } from "../Validations/Schema.mjs";

export class NotesController {
    constructor({NotesModels}){
        this.NotesModels = NotesModels
    }

    // Funcion que obtiene todas las notas
    getAll = async (req, res) => {
        try{
            const notes = await this.NotesModels.getAll();
            return res.status(200).json(notes);
        }
        catch(err){
            console.log(err);
        }
    }

    // Obtener una nota por su id
    getByID = async (req, res) => {
        try{
            const { id } = req.params;
            if(id){
                const noteID = await this.NotesModels.getByID({id})
                return res.status(200).json(noteID);
            }
            else{
                return res.status(400).json({
                    message: 'No se ha proporcionado un id'
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    // Obtener una nota por su titulo
    getByTitle = async (req, res) =>{
        try{
            const { title } = req.params;
            if(title){
                const noteTitle = await this.NotesModels.getByTitle({title});
                return res.status(200).json(noteTitle);
            }
            else{
                return res.status(404).json({
                    message: 'No se ha propocionado el Titulo de la nota'
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    // Obtener una nota por su contenido
    getByContent = async(req, res) => {
        try{
            const { content } = req.params;
            if(content){
                const NoteContent = await this.NotesModels.getByContent({content})
                return res.status(200).json(NoteContent);
            }
            else{
                return res.status(200).json({
                    message: 'No se ha propocionado el contenido de la nota'
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    getByCategory = async(req, res) => {
        try{
            const { category } = req.params;
            if(category){
                const NoteCategory = await this.NotesModels.getByCategory({category});
                return res.status(200).json(NoteCategory);
            }
            else{
                return res.status(404).json({
                    message: 'No se ha propocionado la categoria de la nota'
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // Obtener una nota por su etiqueta
    getByTags = async(req, res) =>{
        try{
            const { tags } = req.params;
            if(tags){
                const NoteTags = await this.NotesModels.getByTags({tags});
                return res.status(200).json(NoteTags);
            }
            else{
                return res.status(404).json({
                    message: 'No se ha propocionado la etiqueta de la nota'
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // Obtener una nota por su fecha de creación 
    getCreateNote = async(req, res) => {
        try{
            const {createNotes} = req.params
            if(createNotes){
                const NoteCreateDate = await this.NotesModels.getCreateNote({createNotes});
                return res.status(200).json(NoteCreateDate);
            }
            else{
                return res.status(404).json({
                    message: 'No se ha propocionado la fecha de creación de la nota'
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    // Obtener una nota por su fecha de actualización
    getUpdateNote = async(req, res) =>{
        try{
            const {updateNotes} = req.params;
            if(updateNotes){
                const NoteUpdateDate = await this.NotesModels.getUpdateNote({updateNotes});
                return res.status(200).json(NoteUpdateDate);
            }
            else{
                return res.status(404).json({
                    message: 'No se ha propocionado la fecha de actualiación de la nota'
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }

    createNotes = async(req, res) =>{
        try{
            const result = validateNotes(req.body);
            if(!result.success){
                return res.status(500).json({
                    message: 'Debe un dato que no esta validado'
                })
            }
            const Create = await this.NotesModels.createNotes({notes: result.data});
            return res.status(200).json(Create);
        }
        catch(err){
            console.log(err)
        }
    }

    // Actualizar una nota
    UpdateNotes = async(req, res) =>{
        try{
            const { id } = req.params
            const result = ValidateUpdateNotes(req.body);

            if(!(id && result.success)){
                return res.status(500).json({
                    message: 'Hay un dato no validado o no se ha propocionado la id'
                })
            }
            const update = await this.NotesModels.UpdateNotes({id, notes: result.data});
            return res.status(200).json(update);
        }
        catch(err){
            console.log(err);
        }
    }

    // Eliminar una Nota o blog
    deleteNotes = async(req, res) =>{
        try{
            const { id } = req.params
            if(id){
                const deleteNote = await this.NotesModels.deleteNotes({id});
                return res.status(200).json(deleteNote);
            }
            else{
                return res.status(500).json({
                    message: 'No se ha propocionado el id de la nota a eliminar'
                });
            }
        }
        catch(err){
            console.log(err);
        }
    }
}