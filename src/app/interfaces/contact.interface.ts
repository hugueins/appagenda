export interface Contact {
    codigo?: number;
    codigo_persona: number;
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    direccion?: string;
    fecha_nacimiento?: string;
    notas?: string;
    categorias?: number[];
}
//TODO: Se aumenta para presentar contactos en home
export interface ContactResponse {
    estado: boolean;
    mensaje: string;
    datos: Contact[];
    totalPages?: number;
  }