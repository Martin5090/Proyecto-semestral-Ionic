import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../model/rol';
import { Producto } from '../model/producto';
import { Usuario } from '../model/usuario';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';
import { Comuna } from '../model/comuna';
import { Categoria } from '../model/categoria';
import { Ingredientes } from '../model/ingredientes';
import { Cupones } from '../model/cupones';
import { Detalle } from '../model/detalle';

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

  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS CATEGORIA (categoria_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_categoria TEXT NOT NULL);"

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS PRODUCTO (producto_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_producto TEXT NOT NULL, descripcion_producto TEXT NOT NULL, foto_producto TEXT NOT NULL, precio_producto REAL NOT NULL, stock_producto INTEGER NOT NULL, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO (iduser INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, telefono INTEGER NOT NULL, correo TEXT NOT NULL, contra TEXT NOT NULL, comuna_id INTEGER NOT NULL, rol_id INTEGER NOT NULL DEFAULT 1, respuesta TEXT NOT NULL, FOREIGN KEY (comuna_id) REFERENCES COMUNA(comuna_id), FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS VENTA (venta_id INTEGER PRIMARY KEY AUTOINCREMENT, iduser INTEGER NOT NULL, estado_id INTEGER NOT NULL, f_venta TEXT NOT NULL, total_venta REAL NOT NULL, FOREIGN KEY (iduser) REFERENCES USUARIO(iduser), FOREIGN KEY (estado_id) REFERENCES ESTADOS(estado_id));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS DETALLE (detalle_id INTEGER PRIMARY KEY AUTOINCREMENT, venta_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal REAL NOT NULL, FOREIGN KEY (venta_id) REFERENCES VENTA(venta_id), FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id));";

  tablaIngredientes: string = "CREATE TABLE IF NOT EXISTS INGREDIENTES (id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT, nombre_ingrediente TEXT NOT NULL, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id));";

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroComunas: string = "INSERT OR IGNORE INTO comuna (nombre_comuna, calle) VALUES ('Santiago','Av Providencia 123'), ('Cerrillos', 'Avenida General Velásquez'), ('Cerro Navia', 'Avenida José Joaquín Pérez'), ('Conchalí', 'Avenida Independencia'), ('El Bosque', 'Gran Avenida José Miguel Carrera'), ('Estación Central', 'Avenida Alameda Libertador Bernardo OHiggins'), ('Huechuraba', 'Avenida Recoleta'), ('Independencia', 'Avenida Independencia'), ('La Cisterna', 'Gran Avenida José Miguel Carrera'),('La Florida', 'Avenida Vicuña Mackenna'),('La Granja', 'Avenida Santa Rosa'),('La Pintana', 'Avenida Santa Rosa'),('La Reina', 'Avenida Larraín'),('Las Condes', 'Avenida Apoquindo'),('Lo Barnechea', 'Avenida Lo Barnechea'),('Lo Espejo', 'Avenida Central'),('Lo Prado', 'Avenida San Pablo'),('Macul', 'Avenida Macul'),('Maipú', 'Avenida Pajaritos'),('Ñuñoa', 'Avenida Irarrázaval'), ('Pedro Aguirre Cerda', 'Avenida Departamental'),('Peñalolén', 'Avenida Grecia'),('Providencia', 'Avenida Providencia'), ('Pudahuel', 'Avenida San Pablo'),('Quilicura', 'Avenida Matta'),('Quinta Normal', 'Avenida Carrascal'),('Recoleta', 'Avenida Recoleta'),('Renca', 'Avenida Domingo Santa María'),('San Joaquín', 'Avenida Vicuña Mackenna'),('San Miguel', 'Gran Avenida José Miguel Carrera'),('San Ramón', 'Avenida Santa Rosa'),('Santiago', 'Avenida Alameda Libertador Bernardo OHiggins'),('Vitacura', 'Avenida Vitacura'),('Puente Alto', 'Avenida Concha y Toro'),('Pirque', 'Avenida Virginia Subercaseaux'),('San José de Maipo', 'Camino al Volcán'),('Colina', 'Avenida General San Martín'),('Lampa', 'Avenida Lampa'),('Tiltil', 'Avenida Tiltil'),('San Bernardo', 'Avenida Colón'),('Buin', 'Avenida San Martín'),('Calera de Tango', 'Avenida Calera de Tango'),('Paine', 'Avenida Paine'),('Melipilla', 'Avenida Vicuña Mackenna'),('Alhué', 'Calle Principal Alhué'),('Curacaví', 'Avenida OHiggins'),('Maria Pinto', 'Calle Maria Pinto'),('San Pedro', 'Calle San Pedro'),('Talagante', 'Avenida Bernardo OHiggins'),('El Monte', 'Avenida Los Libertadores'),('Isla de Maipo', 'Avenida Jaime Guzmán'),('Padre Hurtado', 'Avenida Padre Hurtado'),('Peñaflor', 'Avenida Vicuña Mackenna');";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(iduser, nombre, apellido, telefono, correo, contra, comuna_id, rol_id, respuesta) VALUES (1,'admin', 'admin', '990801152', 'admin@gmail.com', 'Admin12345@', '1', '2', 'admin');";
  registroCategoria: string = "INSERT or IGNORE INTO categoria(categoria_id, nombre_categoria) VALUES (1, 'combo'), (2, 'snack');";
  registroIngredientes: string = "INSERT or IGNORE INTO ingredientes(id_ingrediente, nombre_ingrediente, categoria_id) VALUES (1, 'pepinillos', 1), (2, 'mayo', 1), (3, 'tomate', 1), (4, 'ketchup', 1), (5, 'cebolla', 1), (6, 'agua', 1), (7, 'bebida', 1), (8, 'jugo', 1);";
  registroCupon: string = "INSERT or IGNORE INTO cupones(cupon_id, nombre_cupon) VALUES (1, 'DESCUENTO10'), (2, 'DESCUENTO30'), (3, 'DESCUENTO50');";
  registroEstado: string = "INSERT or IGNORE INTO estados (estado_id, nombre_estado) VALUES (1, 'presencial'), (2, 'delivery');";
  registroProducto: string = "INSERT or IGNORE INTO producto (producto_id, nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto, categoria_id) VALUES (1, 'COMPLETO ITALIANO', 'hot dog el cual se sirve con palta, tomate y mayonesa, ofreciendo una combinación deliciosa.', 'https://cocinachilena.cl/wp-content/uploads/2009/06/completos-chilenos-6-scaled.jpg', 2500, 50, 1), (2, 'CHACARERO', 'Está hecho con carne de vacuno, porotos verdes, tomate y ají verde. lo mejor de la gastronomía local.', 'https://cocinachilena.cl/wp-content/uploads/2011/11/chacarero-1.jpg', 4500, 50, 1), (3, 'EMPANADA DE PINO', 'Están rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. Perfectas para cualquier ocasión.', 'https://cocinachilena.cl/wp-content/uploads/2008/09/empanadas-pino-carne-2-scaled.jpg', 2500, 50, 2), (4, 'CHURRASCO ITALIANO', 'Sándwich que se prepara con carne de vacuno, acompañado de tomate, lechuga y mayonesa en un delicioso pan.', 'https://cocinachilena.cl/wp-content/uploads/2015/10/churrasco-italiano-h.jpg', 3000, 50, 1), (5, 'BARROS LUCO', 'Este sándwich que lleva carne de vacuno y queso derretido, una combinación simple pero increíblemente sabrosa.', 'https://cocinachilena.cl/wp-content/uploads/2012/10/barros-luco-2.jpg', 2000, 50, 1), (6, 'SOPAIPILLA', 'Es una masa frita tradicionalmente servida con pebre o con un toque de azúcar para un bocado dulce y crujiente.', 'https://cocinachilena.cl/wp-content/uploads/2012/10/sopaipillas-chilenas-8-scaled.jpg', 500, 50, 2), (7, 'PAPAS FRITAS', 'Las papas fritas caseras son un acompañamiento perfecto para cualquier comida rápida.', 'https://phantom-marca.unidadeditorial.es/813d16708dc72860fd3cf319c9a245b5/resize/828/f/jpg/assets/multimedia/imagenes/2023/08/04/16911461030527.jpg', 1500, 60, 2), (8, 'EMPANADA DE QUESO', 'Empanada hecha con una masa crujiente y un relleno de queso fundido.', 'https://i.blogs.es/eb58d2/empanadas-de-queso-2-/650_1200.jpg', 2100, 60, 2), (9, 'Chemilico', 'Un sándwich chileno delicioso con carne asada, lechuga fresca, tomate, cebolla y una salsa especial.', 'https://cocinachilena.cl/wp-content/uploads/2013/10/chemilico-sandwich-2-scaled.jpg', 3000, 60, 1);";



  listado = new BehaviorSubject([]);
  listadoProducto = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoComunas = new BehaviorSubject([]);
  listadoCategoria = new BehaviorSubject([]);
  listadoIngredientes = new BehaviorSubject([]);
  listadoCupones = new BehaviorSubject([]);
  listadoProductoT = new BehaviorSubject<Producto[]>([]);
  listadoDetalle = new BehaviorSubject<Detalle[]>([]);


  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
    private storage: NativeStorage,
    private router: Router
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

  fetchProductoT(): Observable<Producto[]> {
    return this.listadoProductoT.asObservable();
  }

  fetchComuna(): Observable<Comuna[]> {
    return this.listadoComunas.asObservable();
  }
  fetchCategoria(): Observable<Categoria[]> {
    return this.listadoCategoria.asObservable();
  }

  fetchIngredientes(): Observable<Ingredientes[]> {
    return this.listadoIngredientes.asObservable();
  }

  fetchCupones(): Observable<Cupones[]> {
    return this.listadoCupones.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]> {
    return this.listadoDetalle.asObservable();
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
          name: 'DeliFast.db',
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
      //await this.database.executeSql('DROP TABLE IF EXISTS venta', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS comuna', []);


      await this.database.executeSql(this.tablaCupones, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaEstados, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalle, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaIngredientes, []);


      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroComunas, []);
      await this.database.executeSql(this.registroCategoria, []);
      await this.database.executeSql(this.registroIngredientes, []);
      await this.database.executeSql(this.registroCupon, []);
      await this.database.executeSql(this.registroEstado, []);
      await this.database.executeSql(this.registroProducto, []);

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
      let items: Producto[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            producto_id: res.rows.item(i).producto_id,
            precio_producto: res.rows.item(i).precio_producto,
            nombre_producto: res.rows.item(i).nombre_producto,
            descripcion_producto: res.rows.item(i).descripcion_producto,
            stock_producto: res.rows.item(i).stock_producto,
            foto_producto: res.rows.item(i).foto_producto,
            categoria_id: res.rows.item(i).categoria_id,
          });
        }
      }
      // Actualizar el observable
      this.listadoProducto.next(items as any);

    }).catch(e => {
      this.presentAlert('Seleccionar', 'Error al obtener productos: ' + JSON.stringify(e));
    });
  }

  seleccionarProductoT() {
    return this.database.executeSql('SELECT * FROM producto WHERE stock_producto > 0', []).then(res => {
      let items: Producto[] = [];
  
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            producto_id: res.rows.item(i).producto_id,
            precio_producto: res.rows.item(i).precio_producto,
            nombre_producto: res.rows.item(i).nombre_producto,
            descripcion_producto: res.rows.item(i).descripcion_producto,
            stock_producto: res.rows.item(i).stock_producto,
            foto_producto: res.rows.item(i).foto_producto,
            categoria_id: res.rows.item(i).categoria_id,
          });
        }
      }
     
      this.listadoProductoT.next(items as any);
  
    }).catch(e => {
      this.presentAlert('Seleccionar', 'Error al obtener productos: ' + JSON.stringify(e));
    });
  }

  insertarProducto(nombre_producto: string, descripcion_producto: string, foto_producto: string, precio_producto: number, stock_producto: number, categoria_id: number) {
    return this.database.executeSql('INSERT INTO producto(nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto, categoria_id) VALUES (?,?,?,?,?,?)',
      [nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto, categoria_id]).then(res => {
        this.presentAlert("Insertar", "Producto Registrado");
        this.seleccionarProducto();
      }).catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      })
  }


  marcarProductoSinStock(id: string) {
    return this.database.executeSql('UPDATE PRODUCTO SET stock_producto = 0 WHERE producto_id = ?', [id]).then(res => {
      this.presentAlert("Estado del Producto", "Producto marcado como sin stock.");
      this.seleccionarProducto(); 
    }).catch(e => {
      this.presentAlert('Error', 'Error al actualizar el producto: ' + JSON.stringify(e));
    });
  }

  modificarProducto(id: string, nombre_producto: string, descripcion_producto: string, foto_producto: string, precio_producto: number, stock_producto: number, categoria_id: number) {
    return this.database.executeSql('UPDATE producto SET nombre_producto = ?, descripcion_producto = ?, foto_producto = ?, precio_producto = ?, stock_producto = ?, categoria_id = ? WHERE producto_id = ?',
      [nombre_producto, descripcion_producto, foto_producto, precio_producto, stock_producto, categoria_id, id]).then(res => {
        this.presentAlert("Modificar", "Producto Modificado");
        this.seleccionarProducto();
      }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      })

  }

  MostrarCategoria() {
    return this.database.executeSql('SELECT * FROM categoria', []).then(res => {
      let items: Categoria[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            categoria_id: res.rows.item(i).categoria_id,
            nombre_categoria: res.rows.item(i).nombre_categoria,
          });
        }
      }
      this.listadoCategoria.next(items as any);
    }).catch(e => {
      console.error('Error al mostrar categorías:', e);
    });
  }

  getProductoById(id: string) {
    return this.database.executeSql('SELECT * FROM producto WHERE producto_id = ?', [id]).then(data => {
      let producto = {};
      if (data.rows.length > 0) {
        producto = {
          producto_id: data.rows.item(0).producto_id,
          nombre_producto: data.rows.item(0).nombre_producto,
          descripcion_producto: data.rows.item(0).descripcion_producto,
          foto_producto: data.rows.item(0).foto_producto,
          precio_producto: data.rows.item(0).precio_producto,
          stock_producto: data.rows.item(0).stock_producto,
          categoria_id: data.rows.item(0).categoria_id
        };
      }
      return producto;
    });
  }




  //Insertar usuario register
  insertarUsuario(nombre: string, apellido: string, telefono: number, correo: string, contra: string, comuna_id: number, rol_id: number, respuesta: string) {
    return this.database.executeSql('INSERT INTO usuario(nombre, apellido, telefono, correo, contra, comuna_id, rol_id, respuesta) VALUES (?,?,?,?,?,1,?,?)',
      [nombre, apellido, telefono, correo, contra, rol_id, respuesta])
      .then(res => {

        this.presentAlert("Insertar", "Usuario Registrado");


        const userId = res.insertId;
        return this.storage.setItem('usuario', {
          iduser: userId,
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          telefono: telefono,
          comuna_id: comuna_id,
          rol_id: rol_id,
          respuesta: respuesta
        });
      })
      .catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      });
  }



  verificarUsuario(correo: string, contra: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contra = ?', [correo, contra]).then(res => {
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0);

        return this.storage.setItem('usuario', {
          iduser: usuario.iduser,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono,
          comuna_id: usuario.comuna_id,
          rol_id: usuario.rol_id,
          respuesta: usuario.respuesta
        }).then(() => {
          return usuario.iduser;
        });

      } else {
        this.presentAlert("Login", "Credenciales incorrectas. Intente de nuevo.");
        return null;
      }
    }).catch(e => {
      this.presentAlert('Login', 'Error: ' + JSON.stringify(e));
      return null;
    });
  }



  modificarUsuario(iduser: number, nombre: string, apellido: string, telefono: number, correo: string, rol_id: number) {
    return this.database.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, correo = ?, rol_id =? WHERE iduser = ?',
      [nombre, apellido, telefono, correo, rol_id, iduser]).then(async res => {
        this.presentAlert("Modificar", "Perfil Modificado");


        this.storage.setItem('usuario', { iduser, nombre, apellido, telefono, correo, rol_id });
      }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }

  eliminarUsuario(iduser: string) {
    return this.database.executeSql('DELETE FROM usuario WHERE iduser = ?', [iduser]).then(res => {
      this.presentAlert("Eliminar", "Cuenta Eliminada");


      this.router.navigate(['/login']);
      this.storage.remove('usuario').then(() => {
      }).catch(err => {
        console.error('Error al eliminar del local storage:', err);
      });
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    });
  }

  obtenerRolUsuarioPorId(iduser: number) {
    return this.database.executeSql('SELECT rol_id FROM usuario WHERE iduser = ?', [iduser])
      .then(res => {
        if (res.rows.length > 0) {
          return res.rows.item(0).rol_id;
        } else {
          return null;
        }
      })
      .catch(e => {
        console.error('Error al obtener el rol del usuario:', JSON.stringify(e));
        return null;
      });
  }

  verificarCorreo(correo: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ?', [correo]).then(res => {
      if (res.rows.length > 0) {
        return true;
      } else {
        return false;
      }
    }).catch(e => {
      console.error('Error al verificar el correo:', e);
      return false;
    });
  }

  verificarRespuesta(correo: string, respuesta: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND respuesta = ?', [correo, respuesta])
      .then(res => res.rows.length > 0)
      .catch(e => {
        console.error('Error al verificar la respuesta:', e);
        return false;
      });
  }

  actualizarContra(correo: string, contra: string): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET contra = ? WHERE correo = ?', [contra, correo])
      .then(res => {
        if (res.rowsAffected > 0) {
          this.presentAlert("Actualización", "Contraseña actualizada exitosamente.");
        } else {
          this.presentAlert("Error", "No se encontró un usuario con ese correo.");
        }
      })
      .catch(e => {
        this.presentAlert('Actualizar', 'Error: ' + JSON.stringify(e));
      });
  }


  //Insertar comunas al usuario

  seleccionarComuna() {
    return this.database.executeSql('SELECT * FROM comuna', []).then(res => {

      let items: Comuna[] = [];

      if (res.rows.length > 0) {

        for (var i = 0; i < res.rows.length; i++) {

          items.push({
            comuna_id: res.rows.item(i).comuna_id,
            nombre_comuna: res.rows.item(i).nombre_comuna,
            calle: res.rows.item(i).calle
          })
        }

      }
      this.listadoComunas.next(items as any);

    })
  }

  seleccionarIngredientes() {
    return this.database.executeSql('SELECT * FROM ingredientes', []).then(res => {
      let items: Ingredientes[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_ingrediente: res.rows.item(i).id_ingrediente,
            nombre_ingrediente: res.rows.item(i).nombre_ingrediente,
            categoria_id: res.rows.item(i).categoria_id,
            seleccionado: false
          });
        }
      }

      this.listadoIngredientes.next(items as any);
    });
  }

  actualizarComunaUsuario(usuarioId: number, comunaId: number): Promise<void> {
    return this.database.executeSql('UPDATE usuario SET comuna_id = ? WHERE iduser = ?', [comunaId, usuarioId])
      .then(() => {
        console.log('Comuna actualizada con éxito');
      })
      .catch(error => {
        console.error('Error al actualizar la comuna:', error);
        throw error; // Lanzar el error para manejarlo en el componente
      });
  }
  // listar cupones
  seleccionarCupones() {
    return this.database.executeSql('SELECT * FROM cupones', []).then(res => {
      let items: Cupones[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            cupon_id: res.rows.item(i).cupon_id,
            nombre_cupon: res.rows.item(i).nombre_cupon
          });
        }
      }
      // Emitir los datos al observable
      this.listadoCupones.next(items as any);
    }).catch(e => {
      console.error('Error al seleccionar cupones', e);
    });
  }

  //VENTA

  insertarVenta(iduser: number, estado_id: number): Promise<any> {
    const fechaVenta = new Date().toISOString();
    const query = 'INSERT INTO VENTA (iduser, estado_id, f_venta, total_venta) VALUES (?, ?, ?, 0)';
    return this.database.executeSql(query, [iduser, estado_id, fechaVenta])
      .then((res) => {
        console.log('Venta insertada correctamente.');
        return res;
      })
      .catch((error) => {
        console.error('Error al insertar venta:', error);
        throw error;
      });
  }



  actualizarTotalVenta(total: number) {
    const querySelect = 'SELECT MAX(venta_id) as ultima_venta FROM VENTA';

    return this.database.executeSql(querySelect, [])
      .then(res => {
        if (res.rows.length > 0) {
          const ultimaVentaId = res.rows.item(0).ultima_venta;

          // Si hay una venta registrada, actualizamos el total de la última venta
          const queryUpdate = 'UPDATE VENTA SET total_venta = ? WHERE venta_id = ?';
          return this.database.executeSql(queryUpdate, [total, ultimaVentaId]);
        } else {
          throw new Error('No se encontró ninguna venta registrada.');
        }
      })
      .catch(err => {
        console.error('Error al actualizar el total de la venta:', err);
        throw err;
      });
  }

  // Método para insertar el detalle de la venta
  insertarDetalleVenta(ventaId: number, productoId: number, cantidad: number, subtotal: number) {
    const queryInsertDetalle = `
      INSERT INTO DETALLE (venta_id, producto_id, cantidad, subtotal) 
      VALUES (?, ?, ?, ?)
    `;

    return this.database.executeSql(queryInsertDetalle, [ventaId, productoId, cantidad, subtotal])
      .then(() => {
        console.log('Detalle de venta insertado correctamente');
      })
      .catch(err => {
        console.error('Error al insertar detalle de venta:', err);
        throw err;
      });
  }

  // Método para obtener el ID de la última venta registrada
  obtenerUltimaVentaId() {
    const querySelect = 'SELECT MAX(venta_id) as ultima_venta FROM VENTA';

    return this.database.executeSql(querySelect, [])
      .then(res => {
        if (res.rows.length > 0) {
          return res.rows.item(0).ultima_venta;
        } else {
          throw new Error('No se encontró ninguna venta registrada.');
        }
      })
      .catch(err => {
        console.error('Error al obtener el ID de la última venta:', err);
        throw err;
      });
  }

  actualizarStockProducto(productoId: number, cantidadVendida: number) {
    const queryUpdateStock = `
      UPDATE PRODUCTO 
      SET stock_producto = stock_producto - ? 
      WHERE producto_id = ?
    `;

    return this.database.executeSql(queryUpdateStock, [cantidadVendida, productoId])
      .then(() => {
        console.log(`Stock actualizado correctamente para el producto ${productoId}`);
      })
      .catch(err => {
        console.error(`Error al actualizar el stock para el producto ${productoId}:`, err);
        throw err;
      });
  }


  //BOLETA
  obtenerDatosUsuario(iduser: number) {
    const query = `
      SELECT u.nombre, u.apellido, u.telefono, c.nombre_comuna, c.calle
      FROM usuario u
      JOIN comuna c ON u.comuna_id = c.comuna_id
      WHERE u.iduser = ?
    `;

    return this.database.executeSql(query, [iduser]).then(res => {
      if (res.rows.length > 0) {
        const usuario = {
          nombre: res.rows.item(0).nombre,
          apellido: res.rows.item(0).apellido,
          telefono: res.rows.item(0).telefono,
          comuna: res.rows.item(0).nombre_comuna,
          calle: res.rows.item(0).calle
        };
        return usuario;
      } else {
        return null;
      }
    }).catch(e => {
      console.error('Error al obtener los datos del usuario:', JSON.stringify(e));
      return null;
    });
  }

  obtenerVentasPorUsuario(iduser: number): Promise<{ total_venta: number; venta_id: number; productos: { producto_id: number; nombre_producto: string; foto_producto: string; cantidad: number; }[] }[] | null> {
    const query = `
      SELECT v.venta_id, v.total_venta
      FROM VENTA v
      WHERE v.iduser = ? AND v.total_venta > 0
      ORDER BY v.f_venta DESC;
    `;

    return this.database.executeSql(query, [iduser]).then(async res => {
      const ventas = [];

      for (let i = 0; i < res.rows.length; i++) {
        const venta_id = res.rows.item(i).venta_id;
        const total_venta = res.rows.item(i).total_venta;

        // Obtener los detalles de cada venta
        const detallesQuery = `
          SELECT d.cantidad, p.producto_id, p.nombre_producto, p.foto_producto
          FROM DETALLE d
          JOIN PRODUCTO p ON d.producto_id = p.producto_id
          WHERE d.venta_id = ?;
        `;

        const detallesRes = await this.database.executeSql(detallesQuery, [venta_id]);
        const productos = [];
        
        for (let j = 0; j < detallesRes.rows.length; j++) {
          productos.push({
            producto_id: detallesRes.rows.item(j).producto_id,
            nombre_producto: detallesRes.rows.item(j).nombre_producto,
            foto_producto: detallesRes.rows.item(j).foto_producto,
            cantidad: detallesRes.rows.item(j).cantidad,
          });
        }

        ventas.push({
          total_venta: total_venta,
          venta_id: venta_id,
          productos: productos,
        });
      }

      return ventas;
    }).catch(e => {
      console.error('Error al obtener las ventas del usuario:', JSON.stringify(e));
      return null;
    });
  }


  seleccionarTodosLosDetalles() {
    return this.database.executeSql(
        `SELECT 
            DETALLE.*, 
            VENTA.f_venta, 
            VENTA.total_venta, 
            VENTA.iduser, 
            ESTADOS.nombre_estado, 
            PRODUCTO.nombre_producto, 
            USUARIO.nombre AS nombre_usuario 
        FROM 
            DETALLE 
        INNER JOIN 
            VENTA ON DETALLE.venta_id = VENTA.venta_id 
        INNER JOIN 
            ESTADOS ON VENTA.estado_id = ESTADOS.estado_id 
        INNER JOIN 
            PRODUCTO ON DETALLE.producto_id = PRODUCTO.producto_id 
        INNER JOIN 
            USUARIO ON VENTA.iduser = USUARIO.iduser`, 
        []
    ).then(res => {
        let items: Detalle[] = [];

        if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
                items.push({
                    detalle_id: res.rows.item(i).detalle_id,
                    venta_id: res.rows.item(i).venta_id,
                    nombre_producto: res.rows.item(i).nombre_producto,
                    cantidad: res.rows.item(i).cantidad,
                    subtotal: res.rows.item(i).subtotal,
                    f_venta: res.rows.item(i).f_venta, 
                    total_venta: res.rows.item(i).total_venta,
                    nombre_usuario: res.rows.item(i).nombre_usuario, 
                    nombre_estado: res.rows.item(i).nombre_estado, 
                    
                });
            }
        }
        this.listadoDetalle.next(items); // Actualiza el observable de detalles
    }).catch(e => {
        this.presentAlert('Seleccionar Detalles', 'Error al obtener detalles: ' + JSON.stringify(e));
    });
}






}