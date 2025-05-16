import { connectionDb } from "../../Config.mjs";
import { ConverterBuffers } from "../Componets/Utils.mjs";
import { TAGS_NOTES } from "../Componets/Constants.mjs";
export class NotesModels {
    // Funcion que obtiene todas las notas
    static async getAll(){
        // Se obtiene los tags que tiene cada nota
        const ContentNotes = TAGS_NOTES.map(() => '?').join(', ');
        console.log(TAGS_NOTES);
        const [Notes] = await connectionDb.query(
            `SELECT a.title, a.content, a.createdNotes, b.category_name, c.name_tag FROM content_notes AS a
            INNER JOIN notes_category AS d ON a.id_notes = d.id_notes INNER JOIN names_category AS b
            ON d.id_category = b.id_category INNER JOIN notes_tags AS e ON a.id_notes = e.id_notes
            INNER JOIN names_tags AS c ON e.id_tags = c.id_tags WHERE c.name_tag IN (${ContentNotes})`, TAGS_NOTES);
        
        if(Notes.length <= 0){
            console.log("No hay datos en la tabla")
        }
        
        const cleanBuffers = Notes.map((note) => ConverterBuffers(note));
        return cleanBuffers;
    }

    // Obtener una nota pr su id
    static async getByID({id}){
        if(id){
            const [noteID] = await connectionDb.query(`SELECT * FROM content_notes WHERE id = ?`, [id]);
            if(noteID.length <= 0){
                console.log("No hay datos en la tabla")
            }
            const cleanBuffers = noteID.map((note) => ConverterBuffers(note));
            return cleanBuffers;
        }
        else{
            console.log("No se ha proporcionado un id");
            return null;
        }
    }

    // Obtener una nota por su titulo
    static async getByTitle({title}){
        if(title){
            const [noteTitle] = await connectionDb.query(`SELECT * FROM content_notes WHERE title = ?`, [title]);
            if(noteTitle.length <= 0){
                console.log("No hay datos en la tabla")
            }
            const cleanBuffersTitle = noteTitle.map((note) => ConverterBuffers(note));
            return cleanBuffersTitle;
        }
        else{
            console.log("No se ha proporcionado un titulo");
            return null;
        }
    }

    // Obtener una nota por su contenido
    static async getByContent({content}){
        if(content){
            const [NotesContent] = await connectionDb.query(`SELECT * FROM content_notes WHERE content = ?`, [content]);
            if(NotesContent.length <= 0){
                console.log("No hay datos en la tabla");
            }
            return NotesContent.map((note) => ConverterBuffers(note));
        }
        else{
            console.log("No se ha proporcionado un contenido");
            return null;
        }
    }

    // Obtener una nota o blog por su categoria
    static async getByCategory({category}){
        if(category){
            const [NotesCategory] = await connectionDb.query(
                `SELECT a.title, a.content, a.createdNotes, a.updatedNotes, b.category_name FROM content_notes
                AS a INNER JOIN notes_category AS c ON a.id_notes = c.id_notes INNER JOIN names_category AS b 
                ON c.id_category = b.id_category WHERE b.category_name = ?`, [category]);
            
            if(NotesCategory.length <= 0){
                console.log("No hay datos en la tabla");
                return null;
            }
            return NotesCategory.map((note) => ConverterBuffers(note));
        }
    }

    // Obtener una nota o blog por su etiqueta
    static async getByTags({tags}){
        if(tags){
            const allNotes = [];
            for(const tag of tags){
                const [NotesTags] = await connectionDb.query(
                    `SELECT a.title, a.content, a.createdNotes, a.updatedNotes, b.name_tag FROM content_notes AS a 
                    INNER JOIN notes_tags AS c ON a.id_notes = c.id_notes INNER JOIN names_tags AS b ON c.id_tags = b.id_tags
                    WHERE b.name_tag = ?`, [tag]);
                
                if(NotesTags.length <= 0){
                    console.log("No hay datos en la tabla");
                    return null;
                }
                const cleanBuffersTags = NotesTags.map((note) => ConverterBuffers(note));
                allNotes.push(...cleanBuffersTags);
            }
            return allNotes.length > 0 ? allNotes : null;
        }
    }

    // Obtener una nota o blog por su fecha de creación
    static async getCreatedNote({createdNotes}){
        if(createdNotes){
            const [NotesCreatedDate] = await connectionDb.query(`SELECT * FROM content_notes WHERE createdNotes = ?`, [createdNotes]);
            if(NotesCreatedDate.length <= 0){
                console.log("No hay datos en la tabla");
            }
            return NotesCreatedDate.map((note) => ConverterBuffers(note));
        }
        else{
            console.log("No se ha proporcionado una fecha de creación");
            return null;
        }
    }

    // Obtener una nota o blog por su fecha de actualización
    static async getUpdatedNote({updatedNotes}){
        if(updatedNotes){
            const [NotesUpdateDate] = await connectionDb.query(`SELECT * FROM content_notes WHERE updatedNotes = ?`, [updatedNotes]);
            if(NotesUpdateDate.length <= 0){
                console.log("No hay datos en la tabla");
            }
            return NotesUpdateDate.map((note) => ConverterBuffers(note)); 
        }
        else{
            console.log("No se ha proporcionado una fecha de actualización");
            return null;
        }
    }

    // Crear una nota o blog
    static async createNotes({notes}){
        if(notes){
            const {title, content, category, tags, createdNotes, updatedNotes} = notes;
            // Se verifica si la categoria existen
            const [categoryResult] = await connectionDb.query(`SELECT * FROM names_category WHERE category_name = ?`, [category]);
            let categoryID = categoryResult.length > 0 ? categoryResult[0].id_category : null;

            // Se verifica si la etiqueta existen
            const tagsID = []
            console.log(tags)
            for (const tag of tags){
                const [tagsResult] = await connectionDb.query(`SELECT * FROM names_tags WHERE name_tag = ?`, [tag]);
                if(tagsResult.length > 0){
                    tagsID.push(tagsResult[0].id_tags);
                }
                else{
                    console.log(`No existe la etiqueta ${tag}, se creara una nueva`);
                    const [insertTag] = await connectionDb.query(`INSERT INTO names_tags (name_tag) VALUES (?)`, [tag]);
                    if(insertTag.affectedRows > 0){
                        console.log(`Etiqueta ${tag} creada`);
                        tagsID.push(insertTag.insertId);
                    }
                }
            }
            // Si la categoria no existe, se crea una nueva
            if(!categoryID){
                const [insertCategory] = await connectionDb.query(`INSERT INTO names_category (category_name) VALUES (?)`, [category]);
                if(insertCategory.affectedRows > 0){
                    console.log(`Categoria ${category} creada`);
                    categoryID = insertCategory.insertId;
                }
            }

            // Se Inserta la nota
            const [insertNote] = await connectionDb.query(`INSERT INTO content_notes (title, content,  createdNotes, updatedNotes) VALUES (?, ?, ?, ?)`, [title, content, createdNotes, updatedNotes]);
            if(insertNote.affectedRows > 0){
                console.log("Nota o Blog creado");

                // Relacionar la nota con la categoria
                const [insertNoteCategory] = await connectionDb.query(`INSERT INTO notes_category (id_notes, id_category) VALUES (?, ?)`, [insertNote.insertId, categoryID]);
                if(insertNoteCategory.affectedRows > 0){
                    console.log("Nota o Blog relacionado con la categoria");
                }

                // Relacionar la nota con la categoria y las etiquetas
                for(const tagID of tagsID){
                    const [insertNoteTags] = await connectionDb.query(`INSERT INTO notes_tags(id_notes, id_category, id_tags) VALUES(?,?,?)`, [insertNote.insertId, categoryID, tagID]);
                    if(insertNoteTags.affectedRows > 0){
                        console.log("Nota o Blog relacionado con la etiqueta");
                    }
                }
                return {
                    message: "Nota o Blog creado",
                    id: insertNote.insertId,
                    title,
                    content,
                    category,
                    tags,
                    createdNotes,
                    updatedNotes
                }
            }

        }
        else{
            console.log("No se ha proporcionado una nota o blog");
            return null;
        }
    }

    // Actualizar una nota o blog
    static async UpdateNotes({id, notes}){
        if(id && notes){
            const { title, content, category, tags, createdNotes, updatedNotes } = notes;

            // Se verifica primero si la categoria existen
            const [CategoryResult] = await connectionDb.query(`SELECT * FROM names_category WHERE category_name = ?`, [category]);
            // Recupero el id de la categoria
            let categoryID = CategoryResult.length > 0 ? CategoryResult[0].id_category : null;

            // Se verifica si la etiqueta o las etiquetas existen
            const tagsID = []
            console.log(tags)
            for (const tag of tags){
                const [tagsResult] = await connectionDb.query(`SELECT * FROM names_tags WHERE name_tag = ?`, [tag]);
                if(tagsResult.length > 0){
                    tagsID.push(tagsResult[0].id_tags);
                }
                else{
                    console.log(`No existe la etiqueta ${tag}, se creara una nueva`);
                    const [insertTag] = await connectionDb.query(`INSERT INTO names_tags (name_tag) VALUES (?)`, [tag]);
                    if(insertTag.affectedRows > 0){
                        console.log(`Etiqueta ${tag} creada`);
                        tagsID.push(insertTag.insertId);
                    }
                }
            }

            // Si la categoria no existen , se crea una nueva
            if(!categoryID){
                const [insertCategory] = await connectionDb.query(`INSERT INTO names_category (category_name) VALUES (?)`, [category]);
                if(insertCategory.affectedRows > 0){
                    console.log(`Categoria ${category} creada`);
                    categoryID = insertCategory.insertId;
                }
            }

            // Se actualiza la nota
            const [updateNote] = await connectionDb.query(`UPDATE content_notes SET title = ?, content = ?, createdNotes = ?, updatedNotes = ? WHERE id_notes = ?`, [title, content, createdNotes, updatedNotes, id]);
            if(updateNote.affectedRows > 0){
                console.log("Nota o blog creado")

                // Se actualiza la categoria
                const [updateNoteCategory] = await connectionDb.query(`UPDATE notes_category SET id_category = ? WHERE id_notes = ?`, [categoryID, id]);
                if(updateNoteCategory.affectedRows > 0){
                    console.log("Nota o blog relacionado con la categoria");
                }
                // Se actualiza la etiqueta
                for(const tagID of tagsID){
                    const [updateNoteTags] = await connectionDb.query(`UPDATE notes_tags SET id_tags = ?, id_category = ? WHERE id_notes = ?`, [tagID,categoryID, id]);
                    if(updateNoteTags.affectedRows > 0){
                        console.log("Nota o blog relacionado con la etiqueta");
                    }
                }
                return {
                    message: "Nota o blog actualizado",
                    id,
                    title,
                    content,
                    category,
                    tags,
                    createdNotes,
                    updatedNotes
                }
            }
        }
    }

    // Eliminar una nota o blog
    static async deleteNotes({id}){
        if(id){
            await connectionDb.query(`SET FOREIGN_KEY_CHECKS=0`);
            const [deleteNote] = await connectionDb.query(`DELETE FROM content_notes WHERE id_notes = ?`, [id]);
            await connectionDb.query(`SET FOREIGN_KEY_CHECKS = 1`);
            
            if(deleteNote.affectedRows > 0){
                console.log("Nota o Blog eliminado");
                return {
                    message: "Nota o Blog eliminado",
                    id
                }
            }
        }
        else{
            console.log("No se ha proporcionado un id");
            return null;
        }
    }
}