import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: string = 'en';

  strings: any = {
    en: {
      contra: 'Contraseña',
      entrar: 'Entrar',
      completarNombreCorreo: 'El nombre o el correo no puede estar vacío',
      completaTodosCampos: 'Por favor, completa todos los campos',
      usuContraIncorrecta: 'Usuario y/o contraseña incorrecta',
      contrasennaCorta: 'La contraseña debe tener al menos 6 caracteres',
      contrasennaNoIguales: 'Las contraseñas no coinciden.',
      correoFormatoNoValido: 'El correo electrónico no tiene un formato válido',
      fechaNacNoValida: 'La fecha de nacimiento no es válida.',
      registroExitoso: 'Registro exitoso.',
      nombreCorreo: 'Nombre o Correo',
      nombre: 'Nombre',
      apellido: 'Apellido',
      segundoApellido: 'Segundo Apellido',
      correo: 'Correo',
      contrasena: 'Contraseña',
      confirmarContrasena: 'Confirmar contraseña',
      fechaNacimiento: 'Fecha de nacimiento'
    },
    es: {
      contra: 'Contraseña',
      entrar: 'Entrar',
      completarNombreCorreo: 'El nombre o el correo no puede estar vacío',
      completaTodosCampos: 'Por favor, completa todos los campos',
      usuContraIncorrecta: 'Usuario y/o contraseña incorrecta',
      contrasennaCorta: 'La contraseña debe tener al menos 6 caracteres',
      contrasennaNoIguales: 'Las contraseñas no coinciden.',
      correoFormatoNoValido: 'El correo electrónico no tiene un formato válido',
      fechaNacNoValida: 'La fecha de nacimiento no es válida.',
      registroExitoso: 'Registro exitoso.',
      nombreCorreo: 'Nombre o Correo',
      nombre: 'Nombre',
      apellido: 'Apellido',
      segundoApellido: 'Segundo Apellido',
      correo: 'Correo',
      contrasena: 'Contraseña',
      confirmarContrasena: 'Confirmar contraseña',
      fechaNacimiento: 'Fecha de nacimiento'
    }
  };

  getString(key: string): string {
    return (this.strings[this.language][key]) || '';
  }
}