# SkinHub
Aplicação desenvolvida com Angular 17 no frontend e Node.js + Express no backend, com renderização do frontend via SSR (Server-Side Rendering) para melhor performance, SEO e distribuição no Firebase Hosting + Cloud Functions.

## Como rodar o projeto localmente
### Requisitos
- Node.js 20+
- npm 9+
- Angular CLI instalado globalmente:
```bash
npm install -g @angular/cli
```

## Rodando o Frontend (Angular 17)
Instalar dependências
```bash
cd skinhub
npm install
```

Rodar a aplicação no modo desenvolvedor
```bash
ng serve
```

Acesse:
➡️ http://localhost:4200

## Rodando o Backend (Node.js + Express)
Dentro da pasta /functions:

Instalar dependências
```bash
cd functions
npm install
```

Rodar localmente
```bash
npm run serve
```

Ou se estiver usando Firebase Tools:
```bash
firebase emulators:start
```

A API rodará em algo como:
➡️ http://localhost:5001

## Tecnologias utilizadas
Frontend – Angular 17
- Angular 17 com:
    - Standalone Components
    - SSR (Server-Side Rendering)
    - Prerendering parcial
    - Angular Router
    - HttpClient
- SCSS
- TypeScript
- RxJS

## Backend – Node.js
- Node.js 20
- Express 4
- Firebase Functions v2
- Firebase Admin SDK

## Infraestrutura
- Firebase Hosting
- Firebase Cloud Functions (para SSR)
- Firebase Emulators (desenvolvimento local)
