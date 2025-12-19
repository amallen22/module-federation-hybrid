# 🤖 Cursor AI Commands - CV-Hibrid

Comandos automatizados configurados para el proyecto CV-Hibrid.

## 📋 Comandos de Testing y Build

### 🎯 Comando Principal

#### `test and build all` / `run all tests and build`
Ejecuta el ciclo completo de testing y build:
1. ✅ Instala/verifica dependencias
2. 🧪 Tests unitarios (Vitest)
3. 🏗️ Build de todas las apps
4. 🎭 Tests E2E (Playwright)

**Uso**: Antes de commits importantes o deploys.

---

### 🧪 Tests Unitarios

#### `run unit tests` / `test unit`
- Ejecuta solo tests unitarios con Vitest
- Rápido (~30 segundos)
- Útil durante desarrollo

#### `test watch` / `watch tests`
- Tests en modo watch (recarga automática)
- Ideal para TDD
- Se ejecuta en background

#### `test coverage` / `check test coverage`
- Tests unitarios + reporte de cobertura
- Genera reporte en HTML
- Objetivo: >85% coverage

---

### 🎭 Tests E2E

#### `run e2e tests` / `test e2e`
- Ejecuta tests de integración con Playwright
- Más lento (~2-5 minutos)
- Simula comportamiento de usuario real

**Scripts disponibles**:
```bash
pnpm test:e2e          # Headless
pnpm test:e2e:ui       # Con interfaz gráfica
pnpm test:e2e:headed   # Muestra el navegador
pnpm test:e2e:debug    # Modo debug
```

---

### 🏗️ Builds

#### `build all apps` / `build everything`
- Compila todas las aplicaciones del monorepo
- Orden: ui → product → shell → user → login
- Genera archivos en `/dist` de cada app

---

### ⚡ Verificaciones Rápidas

#### `quick check` / `fast test`
- Solo tests unitarios (sin build ni E2E)
- Verificación rápida antes de commits pequeños
- ~30 segundos

#### `pre-commit check`
- Alias de `quick check`
- Ideal para hooks de pre-commit

---

### 🔄 Pipeline CI/CD

#### `run ci pipeline` / `simulate ci`
Simula exactamente lo que se ejecuta en CI/CD:
1. 📦 Install dependencies (frozen-lockfile)
2. 🔍 Lint check (pendiente configurar)
3. 🧪 Unit tests
4. 🏗️ Build all apps
5. 🎭 E2E tests

**Uso**: Antes de hacer push o crear PR.

---

## 📦 Scripts de Package.json

Puedes ejecutar estos scripts directamente con pnpm:

```bash
# Tests
pnpm test              # Tests unitarios
pnpm test:watch        # Tests en modo watch
pnpm test:coverage     # Tests + coverage
pnpm test:unit         # Alias de test
pnpm test:all          # Unit + E2E
pnpm test:e2e          # Solo E2E

# Build
pnpm build:all         # Build todas las apps

# CI
pnpm ci                # Pipeline completo
```

---

## 🎬 Ejemplos de Uso

### Flujo de Desarrollo Diario

```bash
# Al empezar el día
pnpm dev

# Mientras desarrollas (otra terminal)
pnpm test:watch

# Antes de commit
quick check

# Antes de push
test and build all
```

### Antes de un Deploy

```bash
# Simulación completa de CI
run ci pipeline

# Si todo pasa, hacer deploy
git push origin main
```

### Debugging de Tests

```bash
# Tests E2E con UI
pnpm test:e2e:ui

# Tests E2E con debug
pnpm test:e2e:debug

# Tests unitarios de app específica
pnpm --filter login test
```

---

## 📊 Métricas Objetivo

| Métrica | Target | Actual |
|---------|--------|--------|
| Test Coverage | >85% | TBD |
| Unit Tests Time | <1 min | ~30s |
| E2E Tests Time | <5 min | ~2-3 min |
| Build Time | <2 min | ~1.5 min |

---

## 🔧 Configuración

### Vitest Workspace

Los tests unitarios están configurados en `vitest.workspace.ts`:
- `apps/product`
- `apps/shell`
- `apps/login`
- `packages/ui`

### Playwright Config

Tests E2E configurados en `playwright.config.ts`:
- Browser: Chromium, Firefox, Webkit
- Retry: 2 intentos
- Timeout: 30s por test

---

## 📝 Añadir Nuevos Comandos

Para crear un nuevo comando de Cursor:

1. Crear archivo en `.cursor/git/tu-comando.yaml`
2. Definir estructura:

```yaml
rules:
  - id: mi-comando
    description: Descripción del comando
    triggers:
      - "palabra clave 1"
      - "palabra clave 2"
    steps:
      - name: Paso 1
        run: |
          echo "Ejecutando..."
          comando-a-ejecutar
```

3. Usar en Cursor con: "palabra clave 1"

---

## 🐛 Troubleshooting

### Tests fallan después de actualizar dependencias
```bash
rm -rf node_modules
pnpm install
pnpm test
```

### E2E tests fallan en headless
```bash
# Ejecutar con navegador visible para debug
pnpm test:e2e:headed
```

### Build falla por falta de memoria
```bash
# Aumentar memoria de Node
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build:all
```

---

## 📚 Referencias

- [Vitest Docs](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [Cursor AI Commands](https://cursor.sh/docs)

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0


