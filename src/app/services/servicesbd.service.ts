import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../model/rol';
import { Producto } from '../model/producto';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas en el orden correcto

  // Tablas sin dependencias


  tablaCupones: string = "CREATE TABLE IF NOT EXISTS CUPONES (cupon_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cupon TEXT NOT NULL);";

  tablaComuna: string = "CREATE TABLE IF NOT EXISTS COMUNA (comuna_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comuna TEXT NOT NULL, calle TEXT NOT NULL);";

  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL (rol_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol TEXT NOT NULL);";

  tablaEstados: string = "CREATE TABLE IF NOT EXISTS ESTADOS (estado_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_estado TEXT NOT NULL);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS PRODUCTO (producto_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_producto TEXT NOT NULL, descripcion_producto TEXT NOT NULL, foto_producto TEXT NOT NULL, precio_producto REAL NOT NULL, stock_producto INTEGER NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO (iduser INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, telefono INTEGER NOT NULL, correo TEXT NOT NULL, contra TEXT NOT NULL, comuna_id INTEGER NOT NULL, rol_id INTEGER NOT NULL DEFAULT 1, FOREIGN KEY (comuna_id) REFERENCES COMUNA(comuna_id), FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS VENTA (venta_id INTEGER PRIMARY KEY AUTOINCREMENT, iduser INTEGER NOT NULL, estado_id INTEGER NOT NULL, f_venta TEXT NOT NULL, total_venta REAL NOT NULL, FOREIGN KEY (iduser) REFERENCES USUARIO(iduser), FOREIGN KEY (estado_id) REFERENCES ESTADOS(estado_id));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS DETALLE (detalle_id INTEGER PRIMARY KEY AUTOINCREMENT, venta_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal REAL NOT NULL, FOREIGN KEY (venta_id) REFERENCES VENTA(venta_id), FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id));";

  tablaIngredientes: string = "CREATE TABLE IF NOT EXISTS INGREDIENTES (id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT, nombre_ingrediente TEXT NOT NULL, producto_id INTEGER NOT NULL, FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id));";

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(iduser, nombre, apellido, telefono, correo, contra, comuna_id, rol_id) VALUES (1,'Martin', 'Campos', '990801152', 'admin@gmail.com', 'Admin12345@', '1', '2');";



  listado = new BehaviorSubject([]);
  listadoProducto = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);

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
  fetchUsuario(): Observable<Usuario[]> {
    return this.listado.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listado.asObservable();
  }

  fetchProducto(): Observable<Producto[]> {
    return this.listadoProducto.asObservable();
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
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaCupones, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaEstados, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaIngredientes, []);


      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroUsuario, []);

      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert(
        'Creación de Tablas',
        'Error en crear las tablas: ' + JSON.stringify(e)
      );
    }
  }


  //Creacion del crud
  seleccionarProducto() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      //variable para almacenar el resultado de la consulta
      let items: Producto[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({
            producto_id: res.rows.item(i).producto_id,
            precio_producto: res.rows.item(i).precio_producto,
            nombre_producto: res.rows.item(i).nombre_producto,
            descripcion_producto: res.rows.item(i).descripcion_producto,
            stock_producto: res.rows.item(i).stock_producto,
            foto_producto: res.rows.item(i). foto_producto
          })
        }

      }
      //actualizar el observable
      this.listadoProducto.next(items as any);

    })
  }

  insertarProducto(nombre_producto: string, descripcion_producto: string, foto_producto: string, precio_producto: number, stock_producto: number) {
    return this.database.executeSql('INSERT INTO producto(nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto) VALUES (?,?,?,?,?)',
      [nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto]).then(res => {
        this.presentAlert("Insertar", "Producto Registrado");
        this.seleccionarProducto();
      }).catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      })
  }


  eliminarProducto(id: string) {
    return this.database.executeSql('DELETE FROM producto WHERE producto_id = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Producto Eliminado");
      this.seleccionarProducto();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarProducto(id: string, nombre_producto: string, descripcion_producto: string, foto_producto: string, precio_producto: number, stock_producto: number) {
    this.presentAlert("service", "ID: " + id);
    return this.database.executeSql('UPDATE producto SET nombre_producto = ?, descripcion_producto = ?, foto_producto = ?, precio_producto = ?, stock_producto = ? WHERE producto_id = ?',
      [nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto, id]).then(res => {
        this.presentAlert("Modificar", "Producto Modificado");
        this.seleccionarProducto();
      }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      })

  }


  //Insertar usuario register
  insertarUsuario(nombre: string, apellido: string, telefono: number, correo: string, contra: string, comuna_id: number, rol_id: number) {
    return this.database.executeSql('INSERT INTO usuario(nombre, apellido, telefono, correo, contra, comuna_id, rol_id) VALUES (?,?,?,?,?,1,?)',
      [nombre, apellido, telefono, correo, contra, rol_id]).then(res => {
        this.presentAlert("Insertar", "Usuario Registrado");
        
      }).catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      })
  }

  verificarUsuario(correo: string, contra: string) {
    return this.database.executeSql('SELECT iduser FROM USUARIO WHERE correo = ? AND contra = ?', [correo, contra]).then(res => {
      if (res.rows.length > 0) {
        const iduser = res.rows.item(0).iduser; // Obtener el iduser del primer registro encontrado
        this.presentAlert("Login", "Usuario verificado. ID: " + iduser);
        return iduser; // Retorna el iduser si se verifica correctamente
      } else {
        this.presentAlert("Login", "Credenciales incorrectas. Intente de nuevo.");
        return null; // No se encontró el usuario
      }
    }).catch(e => {
      this.presentAlert('Login', 'Error: ' + JSON.stringify(e));
      return null; // Manejo de errores
    });
  }














}