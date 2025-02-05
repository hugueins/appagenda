export interface User {
    codigo?: number;
    cedula: string;
    nombre: string;
    apellido: string;
    correo: string;
    estado_cuenta?: string;
    fraseSecreta?: string;
}