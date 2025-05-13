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
            return res.status(500).json({
                message: 'Error al obtener las notas',
                error: err.message
            })
        }
    }
}