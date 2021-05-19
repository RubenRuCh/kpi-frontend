FROM node:14 as build-stage

# instalar un simple servidor http para servir nuestro contenido estático
#RUN npm install -g http-server

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN npm run build

# produccion / nginx
FROM httpd:2.4 as production-stage
COPY --from=build-stage /app/dist/ /usr/local/apache2/htdocs/


EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]