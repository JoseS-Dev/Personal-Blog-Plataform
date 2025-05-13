import zod from 'zod';

export const SchemaNotes = zod.object({
    title: zod.string({
        required_error: 'El título es requerido',
        invalid_type_error: 'El título debe ser un string'
    }),
    content: zod.string({
        required_error: 'El contenido es requerido',
        invalid_type_error: 'El contenido debe ser un string'
    }),
    category: zod.string({
        required_error: 'La categoría es requerida',
        invalid_type_error: 'La categoría debe ser un string'
    }),
    tags: zod.string().array({
        required_error: 'Las etiquetas son requeridas',
        invalid_type_error: 'Las etiquetas deben ser un array de strings'
    }),
    createdNotes: zod.string({
        required_error: 'La fecha de creación es requerida',
        invalid_type_error: 'La fecha de creación debe ser un string'
    }).refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }),
    updatedNotes : zod.string({
        required_error: 'La fecha de actualización es requerida',
        invalid_type_error: 'La fecha de actualización debe ser un string'
    }).refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    })
})

// Funcion para validar la creación de una nota o blog
export function validateNotes(Note){
    return SchemaNotes.safeParse(Note);
}

// Fucnion para validar la actualización de una nota o blog
export function ValidateUpdateNotes(note){
    return SchemaNotes.partial().safeParse(note);
}