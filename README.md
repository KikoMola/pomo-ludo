<div align="center">

# ☕ PomoLudo 🃏

**Study focused. Rest in style. Play what you've earned.**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-enabled-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

</div>

---

> PomoLudo is a productivity web app that combines the **Pomodoro Technique** with **Blackjack**. Complete focus sessions to earn chips, then spend them at the card table during your well-deserved breaks.

---

## ✨ Features

### 🍅 Pomodoro Timer
- **Three modes**: Focus (🔴), Short Break (🟢), and Long Break (🔵)
- Circular SVG progress ring with smooth animations
- Inline time editing — click the clock to set a custom duration
- Keyboard-accessible controls

### 🃏 Blackjack
- Full Blackjack game with realistic card dealing
- **Chip economy**: earn chips by completing focus sessions and spend them by placing bets
- Phases: Idle → Betting → Playing → Result
- Dealer follows standard casino rules (stands on 17+)

### 🎨 Design & UX
- **Dark / Light mode** with seamless toggle, persisted per user
- Glassmorphism UI with cozy warm tones (stone, orange, rose, amber)
- Fully responsive — mobile-first layout
- **Progressive Web App (PWA)** — installable on any device
- Per-user profiles stored in `localStorage` (no backend required)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Angular 21](https://angular.dev) — Standalone Components, Signals |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Primitives | [ng-primitives](https://ng-primitives.pages.dev/) |
| Icons | [lucide-angular](https://lucide.dev/) |
| Reactive | [RxJS 7](https://rxjs.dev/) |
| PWA | [Angular Service Worker](https://angular.dev/ecosystem/service-workers) |
| Testing | [Vitest](https://vitest.dev/) |
| Formatting | [Prettier](https://prettier.io/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>=20`
- [npm](https://www.npmjs.com/) `>=10`

### Installation

```bash
# Clone the repository
git clone https://github.com/KikoMola/pomo-ludo.git
cd pomo-ludo

# Install dependencies
npm install
```

### Development server

```bash
npm start
```

Open your browser at `http://localhost:4200/`. The app hot-reloads on every file change.

### Production build

```bash
npm run build
```

Artifacts are generated in the `dist/` folder, fully optimised for performance.

### Run tests

```bash
npm test
```

### Format code

```bash
npm run format        # Write formatting changes
npm run format:check  # Check without writing
```

---

## 📁 Project Structure

```
src/app/
├── core/
│   ├── guards/          # Route guards (auth)
│   ├── models/          # TypeScript interfaces & types
│   └── services/        # Business logic (Blackjack, User, Theme, Deck)
└── features/
    ├── dashboard/        # Main view with section tabs
    │   └── components/
    │       ├── pomodoro-timer/   # Timer ring + controls
    │       └── blackjack/        # Game UI + card/chip sub-components
    └── login/            # Name entry & profile selection
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open a pull request or an issue.

1. Fork the project
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with ☕ and 🃏 by [KikoMola](https://github.com/KikoMola)

</div>

---
---

<div align="center">

# ☕ PomoLudo 🃏 — Versión en Español

**Estudia con enfoque. Descansa con estilo. Juega lo que te has ganado.**

</div>

---

> PomoLudo es una aplicación web de productividad que combina la **Técnica Pomodoro** con el **Blackjack**. Completa sesiones de enfoque para ganar fichas y gástalas en la mesa de cartas durante tus merecidos descansos.

---

## ✨ Características

### 🍅 Temporizador Pomodoro
- **Tres modos**: Enfoque (🔴), Descanso corto (🟢) y Descanso largo (🔵)
- Anillo de progreso SVG circular con animaciones suaves
- Edición de tiempo en línea — haz clic en el reloj para configurar una duración personalizada
- Controles accesibles por teclado

### 🃏 Blackjack
- Juego de Blackjack completo con reparto de cartas realista
- **Economía de fichas**: gana fichas completando sesiones de enfoque y gástalas haciendo apuestas
- Fases: Inactivo → Apuesta → Jugando → Resultado
- El crupier sigue las reglas estándar del casino (se planta con 17+)

### 🎨 Diseño y UX
- **Modo oscuro / claro** con cambio fluido, persistido por usuario
- Interfaz glassmorphism con tonos cálidos y acogedores (stone, orange, rose, amber)
- Completamente responsive — diseño mobile-first
- **Progressive Web App (PWA)** — instalable en cualquier dispositivo
- Perfiles de usuario almacenados en `localStorage` (sin backend necesario)

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | [Angular 21](https://angular.dev) — Standalone Components, Signals |
| Lenguaje | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) |
| Primitivas UI | [ng-primitives](https://ng-primitives.pages.dev/) |
| Iconos | [lucide-angular](https://lucide.dev/) |
| Reactivo | [RxJS 7](https://rxjs.dev/) |
| PWA | [Angular Service Worker](https://angular.dev/ecosystem/service-workers) |
| Testing | [Vitest](https://vitest.dev/) |
| Formato | [Prettier](https://prettier.io/) |

---

## 🚀 Primeros Pasos

### Requisitos previos

- [Node.js](https://nodejs.org/) `>=20`
- [npm](https://www.npmjs.com/) `>=10`

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/KikoMola/pomo-ludo.git
cd pomo-ludo

# Instalar dependencias
npm install
```

### Servidor de desarrollo

```bash
npm start
```

Abre tu navegador en `http://localhost:4200/`. La aplicación se recarga automáticamente con cada cambio.

### Build de producción

```bash
npm run build
```

Los artefactos se generan en la carpeta `dist/`, completamente optimizados para rendimiento.

### Ejecutar tests

```bash
npm test
```

### Formatear código

```bash
npm run format        # Aplica el formato
npm run format:check  # Comprueba sin modificar
```

---

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   ├── guards/          # Guards de rutas (auth)
│   ├── models/          # Interfaces y tipos TypeScript
│   └── services/        # Lógica de negocio (Blackjack, Usuario, Tema, Baraja)
└── features/
    ├── dashboard/        # Vista principal con pestañas de sección
    │   └── components/
    │       ├── pomodoro-timer/   # Anillo del temporizador + controles
    │       └── blackjack/        # UI del juego + sub-componentes carta/ficha
    └── login/            # Entrada de nombre y selección de perfil
```

---

## 🤝 Contribuir

Las contribuciones, problemas y solicitudes de funcionalidades son bienvenidas. No dudes en abrir un pull request o un issue.

1. Haz un fork del proyecto
2. Crea tu rama de funcionalidad: `git checkout -b feat/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Sube la rama: `git push origin feat/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Distribuido bajo la **Licencia MIT**. Consulta [`LICENSE`](LICENSE) para más información.

---

<div align="center">

Hecho con ☕ y 🃏 por [KikoMola](https://github.com/KikoMola)

</div>
