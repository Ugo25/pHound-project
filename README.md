<div align="center">
  <img src="public/logo.png" alt="pHound Logo" width="120" />
  <h1>pHound</h1>
  <p><strong>Suite integrada de auditoría de ciberseguridad</strong></p>
  <p>OSINT · Escaneo Activo · IA Local · Docker</p>

  <br />

  <a href="#instalación"><img src="https://img.shields.io/badge/Instalación-000000?style=for-the-badge&logo=npm&logoColor=white" /></a>&nbsp;
  <a href="#documentación"><img src="https://img.shields.io/badge/Documentación-000000?style=for-the-badge&logo=readthedocs&logoColor=white" /></a>&nbsp;
  <a href="#licencia"><img src="https://img.shields.io/badge/Licencia-Propietaria-red?style=for-the-badge" /></a>

  <br />
  <br />

  <img src="https://img.shields.io/badge/react-18.3-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-5.4-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/idiomas-ES%20%7C%20EN-orange" />

</div>

<br />

---

## Tabla de Contenidos

- [**Acerca de**](#acerca-de)
- [**Características**](#características)
- [**Arquitectura**](#arquitectura)
- [**Requisitos Previos**](#requisitos-previos)
- [**Instalación**](#instalación)
- [**Uso**](#uso)
- [**Estructura del Proyecto**](#estructura-del-proyecto)
- [**Stack Tecnológico**](#stack-tecnológico)
- [**Seguridad**](#seguridad)
- [**Documentación**](#documentación)
- [**Equipo**](#equipo)
- [**Contexto Académico**](#contexto-académico)
- [**Licencia**](#licencia)
- [**Aviso Legal**](#aviso-legal)

---

## Acerca de

**pHound** es una suite de auditoría de ciberseguridad que integra herramientas de reconocimiento pasivo (OSINT), escaneo activo y generación automatizada de reportes mediante un modelo de IA local, todo orquestado dentro de una arquitectura Docker.

Este repositorio contiene el **panel de control web** (dashboard) del proyecto — la interfaz desde la cual el auditor configura, ejecuta y supervisa las auditorías de seguridad.

> [!IMPORTANT]
> Esta herramienta está diseñada **exclusivamente para entornos autorizados**. El uso de pHound contra sistemas sin consentimiento explícito y por escrito del propietario constituye una actividad ilegal bajo los artículos 211 Bis 1–7 del Código Penal Federal de México.

---

## Características

| Módulo | Descripción |
|---|---|
| **OSINT Pasivo** | WHOIS, DNS, GeoIP, enumeración de subdominios, integración con Shodan |
| **Escaneo Activo** | Nmap (puertos/servicios), Gobuster (directorios), Nikto (vulnerabilidades web) |
| **pHound AI** | Modelo de IA local para correlación de hallazgos y generación de reportes ejecutivos |
| **Modos de escaneo** | Pasivo, Activo y Personalizado — herramientas predefinidas configurables |
| **Reportes** | Generación automática en formato Técnico, Ejecutivo o Mixto (ES/EN) |
| **Dashboard** | Métricas en tiempo real, historial de escaneos, gestión de vulnerabilidades |
| **Gestión de objetivos** | Registro y seguimiento de targets con historial de auditorías |
| **Stealth Mode** | Perfiles de anonimato, proxy SOCKS5/HTTP, rate limiting, validación de VPN |
| **Internacionalización** | Interfaz completa en Español e Inglés (react-i18next) |
| **Temas** | Modo claro y oscuro con cambio en tiempo real |

---

## Arquitectura

```
┌──────────────────────────────────────────────────┐
│                  Panel Web (React)                │  ← Este repositorio
│  Dashboard · Escaneos · OSINT · Reportes · Config │
└──────────────┬───────────────────────────────────┘
               │ API REST
┌──────────────▼───────────────────────────────────┐
│              Backend (Docker)                     │
│  ┌─────────┐ ┌──────────┐ ┌───────────────────┐  │
│  │  Nmap   │ │ Gobuster │ │    Nikto           │  │
│  └─────────┘ └──────────┘ └───────────────────┘  │
│  ┌─────────────────┐ ┌───────────────────────┐   │
│  │  Módulo OSINT   │ │    pHound AI (Local)   │   │
│  └─────────────────┘ └───────────────────────┘   │
│  ┌─────────────────────────────────────────────┐ │
│  │         JSON Unificado (Esquema Normalizado) │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## Requisitos Previos

| Requisito | Versión mínima |
|---|---|
| [Node.js](https://nodejs.org/) | `>= 18.0` |
| npm | `>= 9.0` |

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Ugo25/pHound-project.git
cd phound-website

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El panel estará disponible en `http://localhost:5173/`.

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo (HMR) |
| `npm run build` | Genera el build optimizado para producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## Uso

### Credenciales de prueba

El panel incluye un modo de demostración con autenticación simulada:

| Campo | Valor |
|---|---|
| Email | `hugo@phound.io` |
| Contraseña | `Password123!` |

> [!NOTE]
> La autenticación opera completamente en memoria (React state). No se almacenan tokens ni credenciales en `localStorage` ni cookies por motivos de seguridad.

### Flujo de auditoría

```
1. Iniciar sesión
2. Dashboard → "Nuevo Escaneo"
3. Seleccionar modo: Pasivo / Activo / Personalizado
4. Ingresar objetivo (dominio o IP)
5. Configurar opciones según el modo
6. Ejecutar escaneo
7. Revisar resultados en el detalle del escaneo
8. Generar reporte con pHound AI
```

---

## Estructura del Proyecto

```
phound-website/
├── public/
│   └── logo.png                  # Logo de pHound
├── src/
│   ├── components/
│   │   ├── app/                  # Componentes del dashboard (StatCard, ChartWidget, etc.)
│   │   └── common/               # Componentes compartidos (Navbar, Footer, Modal, etc.)
│   ├── hooks/
│   │   ├── useAutoLogout.js      # Cierre de sesión por inactividad
│   │   └── useTheme.js           # Gestión de tema claro/oscuro
│   ├── layouts/
│   │   ├── AppLayout.jsx         # Layout del dashboard (sidebar + topbar)
│   │   ├── AuthLayout.jsx        # Layout de autenticación
│   │   └── PublicLayout.jsx      # Layout público (navbar + footer)
│   ├── locales/
│   │   ├── en/                   # Traducciones en inglés (9 namespaces)
│   │   └── es/                   # Traducciones en español (9 namespaces)
│   ├── pages/
│   │   ├── app/                  # Páginas internas (Dashboard, Scans, OSINT, Reports, etc.)
│   │   ├── auth/                 # Login, Register, ForgotPassword
│   │   └── public/               # Landing, Features, Docs, Pricing, Legal, etc.
│   ├── security/
│   │   ├── auth.jsx              # AuthProvider + contexto de autenticación
│   │   ├── constants.js          # Constantes de seguridad (rate limits, regex, timeouts)
│   │   ├── sanitize.js           # Wrapper de DOMPurify (XSS prevention)
│   │   └── validate.js           # Validación de inputs (email, password, targets, IPs)
│   ├── styles/
│   │   └── globals.css           # Variables CSS, sistema de temas, reset global
│   ├── App.jsx                   # Router principal (React Router v6)
│   ├── i18n.js                   # Configuración de internacionalización
│   └── main.jsx                  # Punto de entrada de la aplicación
├── index.html                    # HTML base
├── package.json                  # Dependencias y scripts
└── vite.config.js                # Configuración de Vite
```

---

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router v6 |
| Internacionalización | react-i18next |
| Iconos | Lucide React |
| Gráficos | Recharts |
| Sanitización | DOMPurify |
| Tipografía | Clash Display, Figtree, Fira Code |

---

## Seguridad

pHound implementa las siguientes medidas de seguridad en el frontend:

- **Tokens en memoria** — Las credenciales de sesión se mantienen exclusivamente en React state, nunca en `localStorage` o cookies.
- **Sanitización HTML** — Todo contenido dinámico pasa por DOMPurify antes de renderizarse (prevención de XSS).
- **Validación de inputs** — Email, contraseñas y objetivos se validan con expresiones regulares estrictas.
- **Rechazo de IPs privadas** — El validador de objetivos bloquea rangos RFC 1918 (`10.x.x.x`, `192.168.x.x`, `172.16-31.x.x`).
- **Rate limiting en login** — Bloqueo temporal tras 5 intentos fallidos (lockout de 5 minutos).
- **Auto-logout** — Cierre de sesión automático tras 30 minutos de inactividad.
- **Sin meta X-Frame-Options** — Las cabeceras de seguridad se configuran a nivel de servidor HTTP, no en el HTML.

---

## Documentación

La documentación completa está integrada en el propio panel web bajo la ruta `/docs`, incluyendo:

- Requisitos del sistema
- Guía de instalación con Docker Compose
- Configuración inicial
- Ejecución del primer escaneo
- Referencia de API endpoints

---

## Contexto Académico

Este proyecto fue desarrollado como parte del programa de Ingeniería en Tecnologías de la Información en la **Universidad Politécnica de Sinaloa (UPSIN)**, ubicada en Mazatlán, Sinaloa, México.

**Ciclo:** 2026

---

## Licencia

**Copyright © 2026 Equipo pHound. Todos los derechos reservados.**

Este proyecto es **software propietario y de código cerrado**. Queda estrictamente prohibida la copia, modificación, distribución o uso comercial de este código sin autorización explícita y por escrito de los autores. 

Actualmente el software se encuentra en **fase de pruebas y testeo cerrado**. Una vez lanzado, operará bajo un modelo comercial de suscripción (SaaS). 

Consulta el archivo `LICENSE` para más detalles legales.

---

## Aviso Legal

> [!CAUTION]
> **pHound es una herramienta de auditoría de seguridad.** Su uso está sujeto a las leyes aplicables de tu jurisdicción.
>
> - Solo utiliza esta herramienta en sistemas para los cuales poseas **autorización explícita y por escrito**.
> - El uso no autorizado puede constituir un delito bajo el Código Penal Federal de México (Arts. 211 Bis 1–7) y la Convención de Budapest sobre Ciberdelincuencia.
> - Los autores no se hacen responsables del uso indebido de esta herramienta.
>
> Para reportar vulnerabilidades en pHound: **hugoacosta7911@gmail.com**