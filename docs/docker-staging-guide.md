# 🐳 Docker Staging Environment - Guía de Uso

## 📋 Descripción

Este entorno Docker está diseñado para **testing y validación local** que simula el entorno de staging/producción. **NO** está pensado para desarrollo diario (usa `pnpm dev` para eso).

## 🎯 Casos de Uso

✅ **Cuándo usar Docker Staging:**
- Testing de builds de producción antes de deploy
- Validación de Module Federation en modo build
- Testing E2E con Playwright/Cypress en entorno "real"
- Debugging de problemas específicos de producción
- Validación de configuración de Nginx/CORS
- Demo a stakeholders o PO

❌ **Cuándo NO usarlo:**
- Desarrollo diario (usa `pnpm dev` - es mucho más rápido)
- Hot reload durante desarrollo
- Debugging de código en desarrollo

## 🚀 Quick Start

### 1. Setup Inicial (Primera vez)

```bash
# Configuración completa automática
./scripts/docker-staging.sh setup
```

Esto hará:
1. ✅ Verificar que Docker está corriendo
2. 🔨 Construir todas las apps (`pnpm build`)
3. 🐳 Iniciar contenedores Docker
4. 🌐 Levantar Nginx en `http://localhost:8080`

### 2. Acceder al Entorno

Una vez iniciado, abre tu navegador:

- **Shell (Host)**: http://localhost:8080/
- **Login**: http://localhost:8080/login
- **Product**: http://localhost:8080/product
- **User**: http://localhost:8080/user
- **UI Components**: http://localhost:8080/ui
- **Migration Plan**: http://localhost:8080/migration-plan

## 📚 Comandos Disponibles

### Setup y Build

```bash
# Setup completo (build + start)
./scripts/docker-staging.sh setup

# Solo build (sin iniciar Docker)
./scripts/docker-staging.sh build

# Rebuild después de cambios + restart
./scripts/docker-staging.sh rebuild
```

### Control de Servicios

```bash
# Iniciar servicios
./scripts/docker-staging.sh start

# Detener servicios
./scripts/docker-staging.sh stop

# Reiniciar servicios
./scripts/docker-staging.sh restart

# Ver estado
./scripts/docker-staging.sh status
```

### Logs y Debugging

```bash
# Ver todos los logs (seguimiento en tiempo real)
./scripts/docker-staging.sh logs

# Ver logs de un servicio específico
./scripts/docker-staging.sh logs nginx
./scripts/docker-staging.sh logs shell

# Ver logs sin seguimiento (Ctrl+C para salir)
docker-compose -f docker-compose.staging.yml logs --tail=100 nginx
```

### Health Check

```bash
# Verificar salud del sistema
./scripts/docker-staging.sh health
```

### Limpieza

```bash
# Limpiar todo (contenedores + builds)
./scripts/docker-staging.sh clean

# Limpiar solo contenedores (mantener builds)
docker-compose -f docker-compose.staging.yml down
```

## 🔧 Arquitectura

### Estructura

```
cv-hibrid/
├── docker-compose.staging.yml    # Definición de servicios
├── nginx/
│   └── nginx.conf                # Configuración del reverse proxy
└── scripts/
    └── docker-staging.sh         # Script helper
```

### Servicios

```yaml
┌─────────────────────────────────────┐
│   Nginx Reverse Proxy (Puerto 8080) │
│   • Sirve todos los microfrontends   │
│   • Maneja CORS para Module Fed      │
│   • Cache control optimizado         │
└─────────────┬───────────────────────┘
              │
    ┌─────────┼─────────┬─────────┬─────────┐
    │         │         │         │         │
┌───▼───┐ ┌──▼───┐ ┌──▼────┐ ┌──▼───┐ ┌──▼──┐
│ Shell │ │Login │ │Product│ │ User │ │ UI  │
│ :5000 │ │:5003 │ │ :5001 │ │:5004 │ │:5002│
└───────┘ └──────┘ └───────┘ └──────┘ └─────┘
   (builds servidos desde volúmenes montados)
```

### Module Federation

El Nginx está configurado para:
- Servir `remoteEntry.js` de cada microfrontend con CORS habilitado
- Cache control apropiado (no-cache para remoteEntry, inmutable para chunks)
- Headers CORS para permitir carga de módulos entre microfrontends

## 🐛 Troubleshooting

### Error: "Docker no está corriendo"

```bash
# Verificar estado de Docker
docker info

# Iniciar Docker Desktop (Mac/Windows)
# O iniciar servicio Docker (Linux)
sudo systemctl start docker
```

### Error: "Puerto 8080 ya está en uso"

```bash
# Ver qué está usando el puerto
lsof -i :8080
# o
netstat -tuln | grep 8080

# Cambiar puerto en docker-compose.staging.yml
# Cambiar "8080:80" por "8081:80" (o el puerto que prefieras)
```

### Error: "Build failed"

```bash
# Limpiar y reconstruir desde cero
./scripts/docker-staging.sh clean
pnpm install
./scripts/docker-staging.sh setup
```

### Error: Module Federation no carga remotes

```bash
# Verificar que remoteEntry.js está accesible
curl http://localhost:8080/login/assets/remoteEntry.js
curl http://localhost:8080/product/assets/remoteEntry.js

# Verificar logs de Nginx
./scripts/docker-staging.sh logs nginx

# Verificar CORS headers
curl -I http://localhost:8080/login/assets/remoteEntry.js
```

### Página en blanco o error 404

```bash
# Verificar que el build existe
ls -la apps/shell/dist/
ls -la apps/login/dist/

# Si no existe, rebuild
./scripts/docker-staging.sh build

# Verificar configuración de Nginx
docker exec cv-hibrid-nginx cat /etc/nginx/nginx.conf
```

## 🔄 Workflow Recomendado

### Desarrollo Diario (SIN Docker)

```bash
# Desarrollo normal con hot reload
pnpm dev

# Hacer cambios, ver resultados inmediatamente
# Commit cuando esté listo
```

### Testing Pre-Deploy (CON Docker)

```bash
# 1. Build de producción
pnpm build:all

# 2. Iniciar staging
./scripts/docker-staging.sh start

# 3. Testing manual/automático
# - Navegar a http://localhost:8080
# - Probar flujos críticos
# - Ejecutar E2E tests: pnpm test:e2e

# 4. Si encuentras bugs, detener Docker
./scripts/docker-staging.sh stop

# 5. Volver a desarrollo normal
pnpm dev

# 6. Fix bugs, hacer cambios

# 7. Rebuild y test de nuevo
./scripts/docker-staging.sh rebuild
```

### CI/CD Integration

```yaml
# Ejemplo para GitHub Actions / GitLab CI
test-staging:
  script:
    - pnpm install
    - ./scripts/docker-staging.sh setup
    - pnpm test:e2e
    - ./scripts/docker-staging.sh stop
```

## 📊 Comparación: Dev vs Staging

| Aspecto | `pnpm dev` (Desarrollo) | Docker Staging |
|---------|-------------------------|----------------|
| **Hot Reload** | ✅ Instantáneo | ❌ Requiere rebuild |
| **Velocidad** | ⚡ Muy rápido | 🐢 Más lento (build + docker) |
| **Uso** | 💻 Desarrollo diario | 🧪 Testing pre-deploy |
| **Simula Producción** | ❌ No | ✅ Sí |
| **CORS** | ✅ Ya configurado | ✅ Nginx maneja |
| **Module Federation** | ✅ Dev mode | ✅ Build mode (real) |
| **Recursos** | 💚 Bajo | 🟡 Medio (Docker) |

## 🎯 Best Practices

### DO ✅

- Usar `pnpm dev` para desarrollo diario
- Usar Docker staging antes de merge a `main`
- Ejecutar E2E tests en Docker staging en CI/CD
- Verificar Module Federation funciona en staging antes de deploy
- Hacer `./scripts/docker-staging.sh clean` periódicamente

### DON'T ❌

- No usar Docker para desarrollo diario (es innecesariamente lento)
- No hacer cambios directamente en `nginx.conf` sin documentar
- No commitear carpetas `dist/` al repo (están en `.gitignore`)
- No asumir que funciona en dev → funciona en staging
- No olvidar detener Docker cuando termines (`./scripts/docker-staging.sh stop`)

## 🔐 Configuración de CORS

La configuración de CORS en Nginx permite:

```nginx
# Headers configurados para Module Federation
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

**Importante**: En producción real, cambiar `*` por dominios específicos.

## 📈 Próximos Pasos

Una vez que este entorno funcione correctamente:

1. **Integrar en CI/CD**: Automatizar testing con Docker staging
2. **E2E Tests**: Configurar Playwright/Cypress para correr contra staging
3. **Performance Testing**: Lighthouse CI contra staging
4. **Security Scanning**: Añadir escaneo de vulnerabilidades
5. **Staging Real**: Replicar configuración en AWS/GCP/Azure

## 🆘 Ayuda

```bash
# Ver ayuda del script
./scripts/docker-staging.sh help

# Ver logs en tiempo real
./scripts/docker-staging.sh logs

# Health check
./scripts/docker-staging.sh health
```

## 📝 Notas Adicionales

### Performance

- Primera vez: ~2-3 minutos (build + docker up)
- Rebuilds subsecuentes: ~1 minuto
- Start/Stop: ~5-10 segundos

### Recursos

- RAM: ~500MB (Nginx es ligero)
- Disco: ~500MB (builds + imágenes Docker)
- CPU: Mínimo durante runtime (solo Nginx)

### Compatibilidad

- ✅ Linux (nativo)
- ✅ macOS (Docker Desktop)
- ✅ Windows (Docker Desktop + WSL2 recomendado)

---

**¿Preguntas?** Revisa los logs con `./scripts/docker-staging.sh logs` o el health check con `./scripts/docker-staging.sh health`.
