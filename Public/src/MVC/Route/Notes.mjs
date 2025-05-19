import { Router } from "express";
import { NotesController } from "../Controller/Notes.mjs";
import { NotesModels } from "../Models/NoteDB.mjs";


const router = Router();
const controllerNotes = new NotesController({NotesModels: NotesModels});
export const RouterNotes = router;

// GET
RouterNotes.get('/', controllerNotes.getAll);
RouterNotes.get('/title/:title', controllerNotes.getByTitle);
RouterNotes.get('/content/:content', controllerNotes.getByContent);
RouterNotes.get('/:id', controllerNotes.getByID);
RouterNotes.get('/category/:category', controllerNotes.getByCategory);
RouterNotes.get('/tags/:tags', controllerNotes.getByTags);
RouterNotes.get('/createDate/:createdNotes', controllerNotes.getCreatedNote);
RouterNotes.get('/updateDate/:updatedNotes', controllerNotes.getUpdatedNote);

// POST
RouterNotes.post('/Create', controllerNotes.createNotes);

// PATCH
RouterNotes.patch('/:id', controllerNotes.UpdateNotes);

// DELETE
RouterNotes.delete('/:id', controllerNotes.deleteNotes);