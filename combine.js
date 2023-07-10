const concat = require('concat');
const glob = require('glob');
const fs = require('fs');

const folderPath = 'C:\\Users\\Nico\\Desktop\\MexpressApp\\MayoristasMobileSupabase'; // Ruta de la carpeta principal que contiene los archivos .js
const outputFile = 'archivo-combinado.js'; // Nombre del archivo de salida combinado

// Nombres de archivos específicos que se deben buscar
const fileNames = ['Account.js',
  'Auth.js',
  'imageSliderItems.js',
  'MayoristasCarousel.js',
  'OfertCarouselHome.js',
  'DraweConfig.js',
  'MenuHamburguesa.js',
  'Adress.js',
  'Avatar.js',
  'Email.js',
  'FullName.js',
  'Pass.js',
  'UsersName.js',
  'Loading.js',
  'Search.js',
  'AppContext.js',
  'context.js',
  'LocationContext.js',  
  'Config.js',
  'Home.js',
  'Mayoristas.js',
  'Notificaciones.js',
  'App.js'];

// Buscar archivos .js de manera recursiva en la carpeta principal y sus subcarpetas que coincidan con los nombres especificados
const filesToCombine = fileNames.map((fileName) =>
  glob.sync(`${folderPath}/**/${fileName}`, { nodir: true })
).flat();

concat(filesToCombine, outputFile)
  .then(() => {
    console.log('Archivos combinados exitosamente.');
  })
  .catch((error) => {
    console.error('Error al combinar archivos:', error);
  });
