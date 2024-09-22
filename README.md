# Cómo ejecutar
## Requerimientos
 - Docker
 - Nodejs
 - NPM

### Método 1 (Recomendado)
* Clone el proyecto `git clone https://github.com/Erio56/contact-list`.
* Ejecute el comando `docker-compose up --build` y docker se encargará de realizar el despliegue.

Podrá acceder a la aplicación en `http://localhost:4200/` (La aplicación se despliega en el servidor de desarrollo de Angular ya que tuve problemas con Nginx y Docker).

### Método 2 Despliegue manual:

* Clone el proyecto `git clone https://github.com/Erio56/contact-list`.
* Ingrese a backend y ejecute `npm install` luego ejecute `npm start`.
* Abra otra consola y esta vez ingrese a `frontend` y ejecute `npm install` luego `ng serve`.
  
# Documentación código
## Backend
 Se usa el patrón de arquitectura MVC.
 `
  -controllers
   - ContactsController: Encargado de crear, listar, modificar y eliminar los contactos.
   - UserController: Encargado de crear, autenticar los usuarios (Autenticación por token JWT y cifrado de contraseñas bcrypt).
  -models
   - User: Modelo del usuario.
   - Contacs: Modelo de los contactos.
  -views
   - ContactEndpoints: Aquí están definidas las rutas de los enpoints de Contactos.
   - UserEndpoints: Aquí están definidas las rutas de los endpoints de los usuarios.
  -lib: Esta carpeta contiene configuraciones del servidor (configuración del ORM Sequalize y el middleware para las peticiones autenticadas ).
 `

Dependencias
 - TypeScript
 - Sequalize Typescript
 - Nodejs
 - Tsnode
 - JWT

## Fronted
 Se usa la estructura de `features` para la organización de las carpetas.
 `
  -core
   - Guards: Encargado de verificar que el usuario esté correctamente loggado, este guard es usado para la protección de las rutas.
   - Interceptors: Encargado de añadir a todas las request el token JWT.
   - Services: Servicios API Rest de los contactos y los usuarios.
  -features
   - Auth: aquí se almacenan los componentes de la feature de autenticación (Login y creación de cuentas).
   - Contacs: aquí se almacenan los componentes de la feature de contacts.
  -Shared
   - components: Componentes que no pertenecen a ninguna feature (Navbar).
   - Stores: Usando el concepto de store para llevar un estado global (Redux), aquí se almacena la Signal de la lista de contactos del usuario.
 `

Dependencias
 - TypeScript
 - Angular 18
