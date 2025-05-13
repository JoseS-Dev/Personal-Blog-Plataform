
// Utils para leer el JSON
import {CreateRequire} from 'module';
const require = CreateRequire(import.meta.url);
export const READJSON = (path) => require(path);