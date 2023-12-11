# Cube dashboard

Cube js based dashboard built with react

## Running locally

Make sure you have the `.env` file in project root and using Node 20 LTS

```bash
npm install
npm run dev
```

## Building for production

Make sure you have the `.env` file in project root and using Node 20 LTS

```bash
npm install
npm run build
```

This repo also provides a Docker compose file to start the cube API server. To start the API server, make sure you the `.env` file and run:

```bash
docker-compose up
```

ENV variables:

```sh
VITE_CUBEJS_API_URL=your_cube_js_host/cubejs-api/v1
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
VITE_API_BASE_URL=your_api_base_url

# The following variables are needed for the cube API server and won't get exposed to the client
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=your_postgres_port
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB_NAME=your_postgres_db_name
```
