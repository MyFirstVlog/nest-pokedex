<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el archivo **.env.template** y renombrar la copa a `.env`

6. Llenar las variables de entorno definidas en el `.env`

7. Ejecutar la aplicación en dev

```
  yarn start:dev
```

8. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```

## Stack usado

- MongoDB
- Nest

# Production Build

1. Create `.env.prod` file
2. Fill out env variables
3. Create image

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

4. Si no funciona puede ser por docker desktop desactualizado

# Notas

Heroku redeploy sin cambios en git

```
git commit --allow-empty -m "trigger heroku desploy"
git push heroku <master/main>
```

Gist para preparar un archivo Dockerfile o generar una imágen

```
https://gist.github.com/Klerith/e7861738c93712840ab3a38674843490
```
