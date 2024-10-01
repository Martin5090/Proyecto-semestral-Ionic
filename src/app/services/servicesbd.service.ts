import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas en el orden correcto

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


  tablaUsuario: string = `
    CREATE TABLE IF NOT EXISTS USUARIO (
      iduser INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      telefono INTERGER NOT NULL,
      correo TEXT NOT NULL,
      contraseña TEXT NOT NULL,
      rut TEXT NOT NULL,
      region_id INTEGER NOT NULL, 
      FOREIGN KEY (region_id) REFERENCES REGIONES(region_id)
    );
  `;

  tablaProducto: string = `
    CREATE TABLE IF NOT EXISTS PRODUCTO (
      producto_id INTEGER PRIMARY KEY AUTOINCREMENT,
      precio_producto REAL NOT NULL,
      nombre_producto TEXT NOT NULL,
      descripcion_producto TEXT NOT NULL,
      status TEXT NOT NULL,
      stock_producto INTEGER NOT NULL,
      foto_producto TEXT NOT NULL,
      categoria_id INTEGER NOT NULL,
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
      venta_id INTEGER NOT NULL,
      producto_id INTEGER NOT NULL,
      cantidad INTEGER NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (venta_id) REFERENCES VENTA(venta_id),
      FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
    );
  `;

  
  tablaRegiones: string = `
    CREATE TABLE IF NOT EXISTS REGIONES (
      region_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_region TEXT NOT NULL
    );
  `;

  
  tablaComuna: string = `
    CREATE TABLE IF NOT EXISTS COMUNA (
      comuna_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_comuna TEXT NOT NULL,
      region_id INTEGER,
      FOREIGN KEY (region_id) REFERENCES REGIONES(region_id)
    );
  `;
  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";


  listadoRol = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchNoticias(): Observable<Rol[]> {
    return this.listadoRol .asObservable();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  createBD() {
    //varificar si la plataforma esta disponible
    this.platform.ready().then(() => {
      //crear la Base de Datos
      this.sqlite
        .create({
          name: 'noticias.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          //capturar la conexion a la BD
          this.database = db;
          //llamamos a la función para crear las tablas
          this.crearTablas();
        })
        .catch((e) => {
          this.presentAlert(
            'Base de Datos',
            'Error en crear la BD: ' + JSON.stringify(e)
          );
        });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql("DROP TABLE IF EXISTS rol", []);
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaCupones, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaEstados, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);
      await this.database.executeSql(this.tablaRegiones, []);
      await this.database.executeSql(this.tablaComuna, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert(
        'Creación de Tablas',
        'Error en crear las tablas: ' + JSON.stringify(e)
      );
    }
  }
}