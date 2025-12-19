# 🎮 Cursor AI Commands - Quick Reference

## 🚀 Comandos Principales

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 TESTING Y BUILD                                         │
├─────────────────────────────────────────────────────────────┤
│  test and build all        → Pipeline completo              │
│  quick check               → Tests rápidos (solo unit)      │
│  run ci pipeline           → Simula CI/CD completo          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🧪 TESTS UNITARIOS                                         │
├─────────────────────────────────────────────────────────────┤
│  run unit tests            → Ejecuta tests con Vitest       │
│  test watch                → Tests en modo watch            │
│  test coverage             → Tests + reporte cobertura      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🎭 TESTS E2E                                               │
├─────────────────────────────────────────────────────────────┤
│  run e2e tests             → Tests con Playwright           │
│  test e2e                  → Alias de lo anterior           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🏗️  BUILD                                                  │
├─────────────────────────────────────────────────────────────┤
│  build all apps            → Build todas las aplicaciones   │
│  build everything          → Alias de lo anterior           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔧 MANTENIMIENTO                                           │
├─────────────────────────────────────────────────────────────┤
│  clean project             → Limpia node_modules y dist     │
│  start dev                 → Inicia dev servers             │
│  stop all                  → Detiene todos los servidores   │
│  update dependencies       → Actualiza deps (¡cuidado!)     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  📝 GIT Y CHANGELOG                                         │
├─────────────────────────────────────────────────────────────┤
│  update changelog          → Actualiza CHANGELOG.md         │
│  publish changelog         → Update + commit + push         │
└─────────────────────────────────────────────────────────────┘
```

## ⚡ Scripts de pnpm (Terminal)

```bash
# Desarrollo
pnpm dev                    # Inicia dev servers
pnpm dev:minimal            # Minimal dev setup

# Tests
pnpm test                   # Tests unitarios
pnpm test:watch             # Tests en watch mode
pnpm test:coverage          # Tests + coverage
pnpm test:e2e              # Tests E2E
pnpm test:e2e:ui           # E2E con UI
pnpm test:all              # Unit + E2E

# Build
pnpm build:all             # Build todas las apps
pnpm preview:all           # Preview builds

# CI
pnpm ci                    # Pipeline completo CI/CD
```

## 🎯 Flujos de Trabajo Recomendados

### 💻 Durante Desarrollo
```
1. pnpm dev                    # Terminal 1: Dev servers
2. test watch                  # Terminal 2: Tests en watch
3. [Desarrollar features]
4. quick check                 # Antes de commit
```

### 🚀 Antes de Push
```
1. test and build all          # Pipeline completo
2. [Verificar que todo pase]
3. git push
```

### 🔍 Pre-Deploy
```
1. run ci pipeline             # Simula CI completo
2. [Verificar métricas]
3. [Deploy si todo OK]
```

### 🐛 Debugging
```
# Problema con dependencias
clean project

# Tests fallan
test watch                     # Ver errores en real-time

# E2E fallan
pnpm test:e2e:headed          # Ver en navegador
pnpm test:e2e:debug           # Modo debug
```

## 📊 Tiempos Estimados

| Comando | Tiempo | Cuándo Usar |
|---------|--------|-------------|
| `quick check` | ~30s | Commits pequeños |
| `run unit tests` | ~30s | Durante desarrollo |
| `test coverage` | ~45s | Weekly/antes PR |
| `run e2e tests` | ~2-3min | Antes de push |
| `build all apps` | ~1.5min | Antes de deploy |
| `test and build all` | ~4-5min | Pre-push/pre-deploy |
| `run ci pipeline` | ~5-6min | Pre-deploy crítico |

## 🎨 Formato de Comandos

Los comandos de Cursor usan lenguaje natural:

✅ **CORRECTO**:
- "test and build all"
- "run unit tests"
- "quick check"

❌ **INCORRECTO**:
- "test-and-build-all" (no usar guiones)
- "runUnitTests" (no usar camelCase)

## 🔔 Notificaciones

Todos los comandos muestran:
- ✅ Éxito con resumen
- ❌ Errores con detalles
- 📊 Métricas cuando aplica
- ⏱️ Tiempo de ejecución

## 📚 Documentación Completa

Ver `.cursor/CURSOR_COMMANDS.md` para:
- Detalles de cada comando
- Troubleshooting
- Configuración avanzada
- Crear nuevos comandos

---

**💡 Tip**: Usa `test watch` + `pnpm dev` en terminales separadas para máxima productividad!


