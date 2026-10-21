# Gummy World - Sistema de línea de producción

Aplicación web hecha con React + Vite para registrar lotes de gomitas, simular las etapas de producción, contabilizar unidades terminadas y defectuosas, y calcular la eficiencia.

## Ejecutar en local

```
npm install
npm run dev
```

## Docker

```
docker build -t ruirui18/gummy-world:v1.0 .
docker run -it -p 5173:5173 ruirui18/gummy-world:v1.0
```

Abrir http://localhost:5173

## Docker Hub

```
docker login
docker push ruirui18/gummy-world:v1.0
```
