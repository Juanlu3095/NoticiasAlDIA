NOTICIAS AL DÍA APP

Noticias al día es una aplicación móvil hecha con Angular e Ionic y Firebase para el back-end. Se trata de una aplicación para ver noticias con una serie de filtros y el tiempo en España.
Para ello, cuenta con dos APIs distintas:

- World News Api, para las noticias.
- AEMET OpenData, para la información del tiempo.

INSTALACIÓN

Para instalar la aplicación es necesario realizar el siguiente procedimiento:

- Creación de la base de datos en Firebase, en este caso, Firestore. Añadir las claves del proyecto de Firebase a environment en la aplicación para conectar con la base de datos.
- Compilar la aplicación. Usar en la terminal el comando "ionic build". Esto creará una carpeta 'www' con nuestro poryecto.
- Instalar capacitor para crear la app móvil. Por medio del comando "npm install@capacitor/android" o "npm install@capacitor/ios" añadimos android o ios según convenga. Recuerda que
  debemos instalar la version que nos ponga 'package.json'. Para ello sería por ejemplo: "npm install@capacitor/android@6.0.0".
- Creamos la versión móvil de ios/android: Ejecutamos "npx cap add android" o "npx cap add ios".
- Visualiza tu aplicación en tu IDE para aplicaciones móviles: Xcode en Ios y Android Studio. Usa el comando "npx cap open android" o "npx cap open ios" para abrir el proyecto con su
  respectivo editor de código para aplicaciones móviles.
- Compila la aplicación en el editor de código para apps móviles.
