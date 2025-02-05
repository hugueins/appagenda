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