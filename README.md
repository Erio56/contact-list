# Cómo ejecutar
## Requerimientos
 - Docker
 - Nodejs
 - NPM

### Método 1 (Recomendado)
* Clone el proyecto `git clone https://github.com/Erio56/contact-list`
* Ejecute el comando `docker-compose up --build` y docker se encargará de realizar el despliegue

Podrá acceder a la aplicación en `http://localhost:4200/` (La aplicación se despliega en el servidor de desarrollo de Angular ya que tuve problemas con Nginx y Docker)

### Método 2 Despliegue manual:

* Clone el proyecto `git clone https://github.com/Erio56/contact-list`
* Ingrese a backend y ejecute `npm install` luego ejecute `npm start`
* Abra otra consola y esta vez ingrese a `frontend` y ejecute `npm install` luego `ng serve`
