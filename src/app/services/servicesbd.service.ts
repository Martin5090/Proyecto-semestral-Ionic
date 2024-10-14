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

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO (iduser INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, telefono INTEGER NOT NULL, correo TEXT NOT NULL, contra TEXT NOT NULL, comuna_id INTEGER NOT NULL, rol_id INTEGER NOT NULL DEFAULT 1, FOREIGN KEY (comuna_id) REFERENCES COMUNA(comuna_id), FOREIGN KEY (rol_id) REFERENCES ROL(rol_id));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS VENTA (venta_id INTEGER PRIMARY KEY AUTOINCREMENT, iduser INTEGER NOT NULL, estado_id INTEGER NOT NULL, f_venta TEXT NOT NULL, total_venta REAL NOT NULL, FOREIGN KEY (iduser) REFERENCES USUARIO(iduser), FOREIGN KEY (estado_id) REFERENCES ESTADOS(estado_id));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS DETALLE (detalle_id INTEGER PRIMARY KEY AUTOINCREMENT, venta_id INTEGER NOT NULL, producto_id INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal REAL NOT NULL, FOREIGN KEY (venta_id) REFERENCES VENTA(venta_id), FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id));";

  tablaIngredientes: string = "CREATE TABLE IF NOT EXISTS INGREDIENTES (id_ingrediente INTEGER PRIMARY KEY AUTOINCREMENT, nombre_ingrediente TEXT NOT NULL, categoria_id INTEGER NOT NULL, FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id));";

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(rol_id, nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroComunas: string = "INSERT OR IGNORE INTO comuna (nombre_comuna, calle) VALUES ('Cerrillos', 'Avenida General Velásquez'), ('Cerro Navia', 'Avenida José Joaquín Pérez'), ('Conchalí', 'Avenida Independencia'), ('El Bosque', 'Gran Avenida José Miguel Carrera'), ('Estación Central', 'Avenida Alameda Libertador Bernardo OHiggins'), ('Huechuraba', 'Avenida Recoleta'), ('Independencia', 'Avenida Independencia'), ('La Cisterna', 'Gran Avenida José Miguel Carrera'),('La Florida', 'Avenida Vicuña Mackenna'),('La Granja', 'Avenida Santa Rosa'),('La Pintana', 'Avenida Santa Rosa'),('La Reina', 'Avenida Larraín'),('Las Condes', 'Avenida Apoquindo'),('Lo Barnechea', 'Avenida Lo Barnechea'),('Lo Espejo', 'Avenida Central'),('Lo Prado', 'Avenida San Pablo'),('Macul', 'Avenida Macul'),('Maipú', 'Avenida Pajaritos'),('Ñuñoa', 'Avenida Irarrázaval'), ('Pedro Aguirre Cerda', 'Avenida Departamental'),('Peñalolén', 'Avenida Grecia'),('Providencia', 'Avenida Providencia'), ('Pudahuel', 'Avenida San Pablo'),('Quilicura', 'Avenida Matta'),('Quinta Normal', 'Avenida Carrascal'),('Recoleta', 'Avenida Recoleta'),('Renca', 'Avenida Domingo Santa María'),('San Joaquín', 'Avenida Vicuña Mackenna'),('San Miguel', 'Gran Avenida José Miguel Carrera'),('San Ramón', 'Avenida Santa Rosa'),('Santiago', 'Avenida Alameda Libertador Bernardo OHiggins'),('Vitacura', 'Avenida Vitacura'),('Puente Alto', 'Avenida Concha y Toro'),('Pirque', 'Avenida Virginia Subercaseaux'),('San José de Maipo', 'Camino al Volcán'),('Colina', 'Avenida General San Martín'),('Lampa', 'Avenida Lampa'),('Tiltil', 'Avenida Tiltil'),('San Bernardo', 'Avenida Colón'),('Buin', 'Avenida San Martín'),('Calera de Tango', 'Avenida Calera de Tango'),('Paine', 'Avenida Paine'),('Melipilla', 'Avenida Vicuña Mackenna'),('Alhué', 'Calle Principal Alhué'),('Curacaví', 'Avenida OHiggins'),('Maria Pinto', 'Calle Maria Pinto'),('San Pedro', 'Calle San Pedro'),('Talagante', 'Avenida Bernardo OHiggins'),('El Monte', 'Avenida Los Libertadores'),('Isla de Maipo', 'Avenida Jaime Guzmán'),('Padre Hurtado', 'Avenida Padre Hurtado'),('Peñaflor', 'Avenida Vicuña Mackenna');";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(iduser, nombre, apellido, telefono, correo, contra, comuna_id, rol_id) VALUES (1,'Martin', 'Campos', '990801152', 'admin@gmail.com', 'Admin12345@', '1', '2');";
  registroCategoria: string = "INSERT or IGNORE INTO categoria(categoria_id, nombre_categoria) VALUES (1, 'combo'), (2, 'snack');";
  registroIngredientes: string = "INSERT or IGNORE INTO ingredientes(id_ingrediente, nombre_ingrediente, categoria_id) VALUES (1, 'pepinillos', 1), (2, 'mayo', 1), (3, 'tomate', 1), (4, 'ketchup', 1), (5, 'cebolla', 1), (6, 'agua', 2), (7, 'bebida', 2), (8, 'jugo', 2);";

  listado = new BehaviorSubject([]);
  listadoProducto = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoComunas = new BehaviorSubject([]);
  listadoCategoria = new BehaviorSubject([]);

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

  fetchComuna(): Observable<Comuna[]> {
    return this.listadoComunas.asObservable();
  }
  fetchCategoria(): Observable<Categoria[]> {
    return this.listadoCategoria.asObservable();
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
            foto_producto: res.rows.item(i).foto_producto,
            categoria_id: res.rows.item(i).categoria_id,
            
          })
        }

      }
      //actualizar el observable
      this.listadoProducto.next(items as any);

    })
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


  eliminarProducto(id: string) {
    return this.database.executeSql('DELETE FROM producto WHERE producto_id = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Producto Eliminado");
      this.seleccionarProducto();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarProducto(id: string, nombre_producto: string, descripcion_producto: string, foto_producto: string, precio_producto: number, stock_producto: number, categoria_id:number) {
    this.presentAlert("service", "ID: " + id);
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
          stock_producto: data.rows.item(0).stock_producto
        };
      }
      return producto;
    });
  }


  //Insertar usuario register
  insertarUsuario(nombre: string, apellido: string, telefono: number, correo: string, contra: string, comuna_id: number, rol_id: number) {
    return this.database.executeSql('INSERT INTO usuario(nombre, apellido, telefono, correo, contra, comuna_id, rol_id) VALUES (?,?,?,?,?,1,?)',
      [nombre, apellido, telefono, correo, contra, rol_id])
      .then(res => {
        // Muestra un mensaje de éxito
        this.presentAlert("Insertar", "Usuario Registrado");

        // Guarda el ID del nuevo usuario y otros detalles en NativeStorage
        const userId = res.insertId;
        return this.storage.setItem('usuario', {
          iduser: userId,
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          telefono: telefono,
          comuna_id: comuna_id,
          rol_id: rol_id
        });
      })
      .catch(e => {
        this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
      });
  }



  verificarUsuario(correo: string, contra: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contra = ?', [correo, contra]).then(res => {
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0); // Obtener todos los datos del usuario encontrado
        this.presentAlert("Login", "Usuario verificado. ID: " + usuario.iduser);

        // Guardar todos los detalles del usuario en NativeStorage
        return this.storage.setItem('usuario', {
          iduser: usuario.iduser,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono,
          comuna_id: usuario.comuna_id,
          rol_id: usuario.rol_id
        }).then(() => {
          return usuario.iduser; // Retornar el iduser si el almacenamiento es exitoso
        });

      } else {
        this.presentAlert("Login", "Credenciales incorrectas. Intente de nuevo.");
        return null; // No se encontró el usuario
      }
    }).catch(e => {
      this.presentAlert('Login', 'Error: ' + JSON.stringify(e));
      return null; // Manejo de errores
    });
  }



  modificarUsuario(iduser: number, nombre: string, apellido: string, telefono: number, correo: string) {
    this.presentAlert("service", "ID: " + iduser);
    return this.database.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, correo = ? WHERE iduser = ?',
      [nombre, apellido, telefono, correo, iduser]).then(async res => {
        this.presentAlert("Modificar", "Perfil Modificado");

        // Actualiza los datos en NativeStorage
        this.storage.setItem('usuario', { iduser, nombre, apellido, telefono, correo }); // Actualiza el usuario en el local storage
      }).catch(e => {
        this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
      });
  }

  eliminarUsuario(iduser: string) {
    return this.database.executeSql('DELETE FROM usuario WHERE iduser = ?', [iduser]).then(res => {
      this.presentAlert("Eliminar", "Cuenta Eliminada");

      // Eliminar el usuario del local storage
      this.router.navigate(['/login']); // Cambia esto según tu flujo de navegación
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
          return res.rows.item(0).rol_id; // Devuelve el rol_id
        } else {
          return null; // No se encontró el usuario
        }
      })
      .catch(e => {
        console.error('Error al obtener el rol del usuario:', JSON.stringify(e));
        return null; // Manejo de errores
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
      //variable para almacenar el resultado de la consulta
      let items: Comuna[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({
            comuna_id: res.rows.item(i).comuna_id,
            nombre_comuna: res.rows.item(i).nombre_comuna,
            calle: res.rows.item(i).calle
          })
        }

      }
      //actualizar el observable
      this.listadoComunas.next(items as any);

    })
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
















}