# 🐳 Docker Staging Environment

> **Entorno de testing/staging local para validación pre-deploy**

## 📚 Documentación Completa

👉 **[Ver Guía Completa](./docs/docker-staging-guide.md)**

## ⚡ Quick Start

```bash
# Setup inicial completo (build + start)
make docker-setup

# O usando el script directamente
./scripts/docker-staging.sh setup
```

Una vez iniciado, abre: **http://localhost:8080**

## 🎯 Comandos Rápidos

```bash
# Via Makefile (recomendado)
make docker-start      # Iniciar
make docker-stop       # Detener
make docker-logs       # Ver logs
make docker-rebuild    # Rebuild + restart
make docker-health     # Health check
make docker-clean      # Limpiar todo

# Via script directo
./scripts/docker-staging.sh start
./scripts/docker-staging.sh stop
./scripts/docker-staging.sh logs
```

## 📊 URLs Disponibles

| Servicio | URL |
|----------|-----|
| **Shell (Host)** | http://localhost:8080/ |
| **Login** | http://localhost:8080/login |
| **Product** | http://localhost:8080/product |
| **User** | http://localhost:8080/user |
| **UI Components** | http://localhost:8080/ui |
| **Migration Plan** | http://localhost:8080/migration-plan |

## 🔧 Casos de Uso

✅ **Usar para:**
- Testing de builds de producción
- Validación de Module Federation
- Tests E2E con Playwright
- Demo a stakeholders
- Debugging de problemas de producción

❌ **NO usar para:**
- Desarrollo diario (usa `make dev` o `pnpm dev`)

## 📁 Archivos Creados

```
cv-hibrid/
├── docker-compose.staging.yml    # Definición de servicios Docker
├── nginx/
│   └── nginx.conf                # Configuración Nginx optimizada
├── scripts/
│   └── docker-staging.sh         # Script helper con comandos
├── docs/
│   └── docker-staging-guide.md   # Documentación completa
└── .dockerignore                 # Exclusiones para Docker
```

## 🐛 Troubleshooting

```bash
# Verificar salud
make docker-health

# Ver logs de Nginx
make docker-logs-nginx

# Limpiar y empezar de cero
make docker-clean
make docker-setup
```

## 📖 Más Información

- **[Guía Completa de Docker Staging](./docs/docker-staging-guide.md)** - Documentación exhaustiva
- **[Plan de Migración](./plan_migracion.md)** - Contexto del proyecto
- **[Comandos Make](./Makefile)** - Todos los comandos disponibles

## 🎉 ¡Listo!

El entorno Docker staging está completamente configurado. Revisa la [guía completa](./docs/docker-staging-guide.md) para más detalles.
