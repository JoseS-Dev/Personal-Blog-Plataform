
// Utils para leer el JSON
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
export const READJSON = (path) => require(path);

// Convertir Buffers a strings
export function ConverterBuffers(obj){
    for (const key in obj){
        if(Buffer.isBuffer(obj[key])){
            obj[key] = obj[key].toString('utf-8');
        }
    }
    return obj
}