import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  // Tablas sin dependencias
  tablaCupones: string = `
   CREATE TABLE IF NOT EXISTS CUPONES (
     cupon_id INTEGER PRIMARY KEY AUTOINCREMENT,
     nombre_cupon TEXT NOT NULL
   );
 `;

  tablaRol: string = `
   CREATE TABLE IF NOT EXISTS ROL (
     rol_id INTEGER PRIMARY KEY AUTOINCREMENT,
     nombre_rol TEXT NOT NULL
   );
 `;

  tablaEstados: string = `
   CREATE TABLE IF NOT EXISTS ESTADOS (
     estado_id INTEGER PRIMARY KEY AUTOINCREMENT,
     nombre_estado TEXT NOT NULL
   );
 `;

  tablaCategoria: string = `
   CREATE TABLE IF NOT EXISTS CATEGORIA (
     categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
     nombre_categoria TEXT NOT NULL
   );
 `;

  // Tablas con dependencias
  tablaUsuario: string = `
   CREATE TABLE IF NOT EXISTS USUARIO (
     iduser INTEGER PRIMARY KEY AUTOINCREMENT,
     nombres TEXT NOT NULL,
     apellidos TEXT NOT NULL,
     nombuser TEXT NOT NULL,
     correo TEXT NOT NULL,
     contraseña TEXT NOT NULL,
     rut TEXT NOT NULL
   );
 `;

  tablaProducto: string = `
   CREATE TABLE IF NOT EXISTS PRODUCTO (
     producto_id INTEGER PRIMARY KEY AUTOINCREMENT,
     precio_producto REAL NOT NULL,
     nombre_producto TEXT NOT NULL,
     descripcion_producto TEXT,
     status TEXT,
     stock_producto INTEGER NOT NULL,
     foto_producto TEXT,
     categoria_id INTEGER,
     FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id)
   );
 `;

  tablaVenta: string = `
   CREATE TABLE IF NOT EXISTS VENTA (
     venta_id INTEGER PRIMARY KEY AUTOINCREMENT,
     iduser INTEGER,
     f_venta TEXT NOT NULL,
     total_venta REAL NOT NULL,
     FOREIGN KEY (iduser) REFERENCES USUARIO(iduser)
   );
 `;

  tablaDetalle: string = `
   CREATE TABLE IF NOT EXISTS DETALLE (
     detalle_id INTEGER PRIMARY KEY AUTOINCREMENT,
     venta_id INTEGER,
     producto_id INTEGER,
     cantidad INTEGER NOT NULL,
     subtotal REAL NOT NULL,
     FOREIGN KEY (venta_id) REFERENCES VENTA(venta_id),
     FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
   );
 `;

  tablaDireccion: string = `
   CREATE TABLE IF NOT EXISTS DIRECCION (
     iduser INTEGER,
     calle TEXT NOT NULL,
     comuna TEXT NOT NULL,
     numero_casa INTEGER NOT NULL,
     FOREIGN KEY (iduser) REFERENCES USUARIO(iduser)
   );
 `;


  constructor() { }
}