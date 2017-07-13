![Manual de supervivencia frontend](https://www.brm.com.co/logo-manual-frontend.jpg "Manual de supervivencia frontend en brm")

Este es un esfuerzo para que todos los diseñadores o personas que deban trabajar proyectos con html/css usen un solo esquema de trabajo y así todos estemos en la misma página.

## Pre requisitos
- [NodeJS](https://nodejs.org/) 6.10.*
- [GulpJS](http://gulpjs.com/)
- Snippets brm para sintaxis de lenguajes en ST2
- Leer [Manual Pug](https://docs.google.com/presentation/d/1C8RBX2Dlsb3UtCsBg5teX3bROmCqHlG_dKf2d6Rpvl4/)
- Leer [Manual SMACSS](https://docs.google.com/a/brm.com.co/presentation/d/18GzVbLxmasYLi2GetJxAgoBe55L7_c0Bi1GHi6OoO0o/)
- Leer [Bootstrap v 3.3.7 with Stylus](https://docs.google.com/presentation/d/1pLtMWlq4TZcTz2gsjLVoUZN75H9F-fF0BcvwAfPVzyo/)

Si no tiene instaladas estas herramientas en tu equipo busca apoyo en Help Desk.

## Instalación
- Lo primero que debe hacer es clonar este repositorio en su equipo para poder realizar las pruebas localmente.
```
git clone https://github.com/brm-cortesc/frontdesign-package.git
```
- Luego se abre la consola, se ubica la carpera donde clonó el repositorio.
- Se ejecuta el siguiente comando en la consola para descagar las librerías necesarias.
```
npm install
```

## Directorios del proyecto

**src** - Es el directorio en donde están los archivos source de preprocesadores (Pug, Stylus, JS:ES5)


**publication** - Es el directorio que se entrega al desarrollador para subir al servidor

Después de instalar correctamente cada módulo abra los archivos **package.json** y **frontend.jquery.json** y reemplace los datos con los de su proyecto.


## Tareas

### Principales

```
npm start
```
Se crea  http://localhost:3000/ donde podrá ver el corte, css y js que va generando y la tarea se queda escuchando cambios en los archivos para refrescar automaticamente el navegador.


```
npm run finalizar
```

Genera archivos compilados y el html con los respectivos archivos vinculados

```
npm run js:watch
```

Escucha únicamente archivos de JS:ES5, los compila a ES4 y los minifica



### Secundarias / individuales

Estas mismas tareas se corren al ejecutar las tareas `npm start`, `npm run finalizar` y `npm run js:watch` 


```
gulp libs
```
Genera un archivo **libs.min.js** que contiene los plugins/frameworks que utiliza en el proyecto, estos archivos se agregan en el arreglo **jsLibs** en el **gulpfile.js**

```
gulp css
```
Procesa archivos .styl a .css usando nib para generar soporte con propiedades css3 (las nuevas propiedades como flex & calc aún no se da soporte)

```
gulp csslint
```
Evalua archivos .styl para para reportar errores de sintaxis


```
gulp minicss
```
Recoge en orden alfabético los archivos .css en la carpeta publication/css y genera un archivo minificado de css


```
gulp views
```
Procesa archivos .pug a .html


```
gulp watch
```
Crea http://localhost:3000/ que se escucha cambios en los archivos para refrescar automaticamente el navegador corriendo las tareas de views, css, csslint, js


```
gulp js:watch
```
Escucha y procesa archivos JS sintaxis ES5 a JS sintaxis ES4 y los genera minificados.














