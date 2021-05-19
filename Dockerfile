FROM node:14 as build

# instalar un simple servidor http para servir nuestro contenido estático
#RUN npm install -g http-server

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
#COPY package*.json ./
COPY package.json /app/package.json

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . /app

# construir aplicación para producción minificada
RUN npm run build

# produccion / nginx
FROM nginx:1.16.0-alpine as production
COPY --from=build /app/dist/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

