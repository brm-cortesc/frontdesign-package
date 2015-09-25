# Manual de supervivencia para frontend en brm

Este es un esfuerzo para que todos los diseñadores o personas que deban trabajar proyectos con html/css usen un solo esquema de trabajo y así todos estémos en la misma página.

## Pre requisitos
- [NodeJS](https://nodejs.org/) 0.10.*
- [GruntJS](https://nodejs.org/) 0.1.13
- Leer [Manual Jade](https://docs.google.com/presentation/d/1C8RBX2Dlsb3UtCsBg5teX3bROmCqHlG_dKf2d6Rpvl4/)
- Leer [Manual SMACSS](https://docs.google.com/presentation/d/1wpYDwrtWRpNgbNJtVXyclmZQ2L71cNO54Uvrs-_OQKM/)

Si no tienes instaladas estas herramientas en tu equipo busca apoyo en Help Desk.

## Instalación
1. Lo primero que debe hacer es clonar este repositorio en su equipo para poder realizar las pruebas localmente.
```bash
git clone
```
2. Luego se abre la consola de node.js se ubica la carpera donde se clono el repositori y se ejecuta el siguiente comando para descagar las librerias necesarias.
```Javascript
npm install
```

## Directorios del proyecto

**src** - Es el directorio en donde están los archivos source de preprocesadores (Jade, Stylus, Coffescript)


**publication** - Es el directorio que se entrega al desarrollador para subir al servidor

Después de instalar correctamente cada módulo en la terminal se debe ejecutar la tarea **grunt**
