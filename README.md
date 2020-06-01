# Toroto Api 

_Este desarrollo está enfocado en el registro de nuevos usuarios en la plataforma y poder, a cada uno de ellos asignarle una de las suscripciones que se ofrecen en Toroto para la reducción o erradicación de su huella de carbono_

## Comenzando 🚀

_Para comenzar, clonamos el repositorio en una carpeta nueva dentro de nuestro directorio ejecutando el comando clone en nuestra terminal (posicionados en la ruta del directorio)._
```
git clone 'url'
```

### Pre-requisitos 📋

_Para correr este proyecto, ten en cuenta que necesitaremos instalado Nodejs y npm el cual puedes instalar de la siguiente manera_

```
nvm install node 
```

### Instalación 🔧

_Ya descargado, en la misma ruta utilizaremos el siguiente comando para instalar todas las dependencias necesarias del proyecto._

```
npm install
```
 
_Una vez que termine la instalación inicializamos nuestro proyecto y estará corriendo de manera local en nuestra Pc_

```
npm start
```

## Ejecutando las pruebas ⚙️

_Para ejecutar las pruebas recomendamos utilizar Postman un cliente HTTP que nos permitirá realizar las peticiones al API y analizar las respuestas de manera sencilla_
_Para esto puede descargar el documento torotoApi.json e importarlo en Postman_

### Pruebas de usuario 🔩

_Dentro de Postman podremos observar que existen diversos endpoints para usuario y explicaremos brevemente la funcionalidad de algunos_

_Debemos tener en cuenta que dentro de nuestra API manejamos dos roles: el de usuario y el de administrador, por lo cual lo primero que tendremos que hacer es un registro, (solo cuentas de administrador tienen acceso a todas las funcionalidades)
_User_
```
Registro
```
_funcionalidad para usuarios que agregará su información a la base de datos_

_Para crear un nuevo Admin_
```
Create
```
_Administrador y usuario:_
```
Login
```
_Ya Registrados y logeados podemos ver informacion de registro y modificarla con_

```
Get all users
```

```
Get user by Id
```

_modificarla_
```
UpdateUser o Update User Subscription
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [NodeJs](https://nodejs.org/es/) - Entorno de tiempo de ejecución
* [Express](https://expressjs.com/es/) - Framework web usadomane
* [NPM](https://www.npmjs.com/) - Manejador de dependencias 
