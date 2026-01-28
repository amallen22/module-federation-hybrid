# 📋 Propuesta: Custom Domain Docker Staging Environment

## 🎯 Objetivo

Transformar el entorno Docker Staging actual de `http://localhost:8080/` a `https://local.resumecoach.com/` para:

- ✅ Replicar exactamente el comportamiento del proyecto legacy
- ✅ Facilitar debugging de problemas específicos de dominio/CORS
- ✅ Mejorar onboarding de nuevos desarrolladores
- ✅ Testing más realista (cookies, HTTPS, security headers)
- ✅ Consistencia con tests existentes (Jest usa `local.resumecoach.com`)

## 📊 Situación Actual

### Entornos Existentes

| Entorno | URL Base | Puerto | HTTPS | Uso |
|---------|----------|--------|-------|-----|
| **Dev (Vite)** | `localhost` | 5000-5006 | ❌ | Desarrollo diario |
| **Staging Docker** | `localhost` | 8080 | ❌ | Testing pre-deploy |
| **Legacy Local** | `local.resumecoach.com` | 80/443 | ✅ | Referencia actual |
| **Stage Production** | `stage.resumecoach.com` | 443 | ✅ | Pre-producción |

### Referencias Código Existente

```javascript
// apps/login/src/app/config/appConfig.js
const hostname = (window.location.hostname === 'localhost')
    ? 'local.resumecoach.com'  // ← Ya usa este dominio
    : window.location.hostname;

// apps/login/jest.config.js
testURL: 'http://local.resumecoach.com',  // ← Tests esperan este dominio
```

---

## 🔧 Cambios Necesarios

### 1️⃣ Certificado SSL Local (mkcert)

#### Instalación mkcert

```bash
# Linux (Ubuntu/Debian)
sudo apt install libnss3-tools
sudo snap install mkcert

# Linux (Fedora)
sudo dnf install nss-tools mkcert

# macOS
brew install mkcert

# Windows
choco install mkcert
```

#### Generación de Certificados

```bash
# Instalar CA raíz local (una sola vez por máquina)
mkcert -install

# Generar certificados para el dominio
mkdir -p nginx/certs
cd nginx/certs
mkcert local.resumecoach.com "*.local.resumecoach.com"

# Resultado:
# ✅ local.resumecoach.com+1.pem      (certificado)
# ✅ local.resumecoach.com+1-key.pem  (clave privada)
```

#### Ventajas de mkcert

- ✅ **Confiable por el navegador**: Sin warnings de certificado
- ✅ **Simple**: Un comando y listo
- ✅ **Cross-platform**: Funciona en Linux, macOS, Windows
- ✅ **Desarrollo local**: Ideal para staging local
- ✅ **Sin configuración adicional**: El navegador confía automáticamente

---

### 2️⃣ Configuración /etc/hosts

#### Modificación Manual

```bash
# Añadir entrada
sudo sh -c 'echo "127.0.0.1 local.resumecoach.com" >> /etc/hosts'

# Verificar
ping local.resumecoach.com
# → debe responder desde 127.0.0.1
```

#### Script Automatizado (recomendado)

Crear `scripts/setup-hosts.sh`:

```bash
#!/bin/bash

DOMAIN="local.resumecoach.com"
HOSTS_FILE="/etc/hosts"

# Verificar si ya existe
if grep -q "$DOMAIN" "$HOSTS_FILE"; then
    echo "✅ Dominio $DOMAIN ya configurado en $HOSTS_FILE"
    exit 0
fi

# Añadir entrada
echo "127.0.0.1 $DOMAIN" | sudo tee -a "$HOSTS_FILE" > /dev/null
echo "✅ Dominio $DOMAIN añadido a $HOSTS_FILE"

# Verificar DNS
if ping -c 1 "$DOMAIN" &> /dev/null; then
    echo "✅ DNS resuelve correctamente"
else
    echo "⚠️  Advertencia: DNS no resuelve inmediatamente, puede tardar unos segundos"
fi
```

---

### 3️⃣ Actualizar docker-compose.staging.yml

#### Cambios en Service Nginx

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: cv-hibrid-nginx
    ports:
      - "80:80"       # HTTP → HTTPS redirect
      - "443:443"     # HTTPS principal
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro  # ← NUEVO: Certificados SSL
      - ./apps/shell/dist:/usr/share/nginx/html/shell:ro
      - ./apps/login/dist:/usr/share/nginx/html/login:ro
      - ./apps/product/dist:/usr/share/nginx/html/product:ro
      - ./apps/user/dist:/usr/share/nginx/html/user:ro
      - ./packages/ui/dist:/usr/share/nginx/html/ui:ro
      - ./apps/migration-plan/dist:/usr/share/nginx/html/migration-plan:ro
    environment:
      - DOMAIN=local.resumecoach.com  # ← NUEVO
    networks:
      - cv-network
    depends_on:
      - shell
      - login
      - product
      - user
      - ui
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "https://localhost/health"]  # ← HTTPS
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
```

---

### 4️⃣ Actualizar nginx/nginx.conf

#### Server Block HTTP → HTTPS Redirect

```nginx
http {
    # ... configuración existente ...
    
    # ============================================
    # HTTP → HTTPS Redirect
    # ============================================
    server {
        listen 80;
        server_name local.resumecoach.com;
        
        # Redirect all HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }
    
    # ============================================
    # Main HTTPS Server Block
    # ============================================
    server {
        listen 443 ssl http2;
        server_name local.resumecoach.com;
        
        # SSL Configuration
        ssl_certificate /etc/nginx/certs/local.resumecoach.com+1.pem;
        ssl_certificate_key /etc/nginx/certs/local.resumecoach.com+1-key.pem;
        
        # SSL Protocols & Ciphers (Modern)
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
        ssl_prefer_server_ciphers off;
        
        # SSL Session Cache (Performance)
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        # HSTS (HTTP Strict Transport Security)
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        
        # Security headers (existentes)
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # CORS headers para Module Federation (existentes)
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization, Cache-Control, X-Requested-With" always;
        
        # ... resto de la configuración (locations, etc.) ...
    }
}
```

---

### 5️⃣ Script de Generación de Certificados

Crear `scripts/generate-certs.sh`:

```bash
#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CERTS_DIR="$PROJECT_ROOT/nginx/certs"
DOMAIN="local.resumecoach.com"

echo "╔════════════════════════════════════════════════════════╗"
echo "║  🔒 Generador de Certificados SSL Local (mkcert)      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 1. Verificar si mkcert está instalado
echo "🔍 Verificando instalación de mkcert..."
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert no está instalado"
    echo ""
    echo "📦 Instalar mkcert:"
    echo "  • Linux (Ubuntu/Debian):  sudo apt install libnss3-tools && sudo snap install mkcert"
    echo "  • Linux (Fedora):         sudo dnf install nss-tools mkcert"
    echo "  • macOS:                  brew install mkcert"
    echo "  • Windows:                choco install mkcert"
    echo ""
    exit 1
fi
echo "✅ mkcert instalado: $(mkcert -version)"
echo ""

# 2. Instalar CA raíz local (si no está instalado)
echo "📜 Verificando CA raíz local..."
if ! mkcert -CAROOT &> /dev/null; then
    echo "⚙️  Instalando CA raíz local..."
    mkcert -install
    echo "✅ CA raíz instalado"
else
    echo "✅ CA raíz ya está instalado: $(mkcert -CAROOT)"
fi
echo ""

# 3. Crear directorio de certificados
echo "📁 Creando directorio de certificados..."
mkdir -p "$CERTS_DIR"
echo "✅ Directorio: $CERTS_DIR"
echo ""

# 4. Generar certificados
echo "🔐 Generando certificados para $DOMAIN..."
cd "$CERTS_DIR"
mkcert "$DOMAIN" "*.$DOMAIN"

# 5. Verificar archivos generados
echo ""
echo "✅ Certificados generados exitosamente:"
ls -lh "$CERTS_DIR"/*.pem
echo ""

# 6. Instrucciones finales
echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ Certificados listos para usar                      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Próximos pasos:"
echo "  1. Configurar /etc/hosts:  sudo ./scripts/setup-hosts.sh"
echo "  2. Levantar Docker:        make docker-setup"
echo "  3. Abrir navegador:        https://local.resumecoach.com"
echo ""
```

---

### 6️⃣ Script de Configuración /etc/hosts

Crear `scripts/setup-hosts.sh`:

```bash
#!/bin/bash

set -e

DOMAIN="local.resumecoach.com"
HOSTS_FILE="/etc/hosts"

echo "╔════════════════════════════════════════════════════════╗"
echo "║  🌐 Configuración de /etc/hosts                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Verificar permisos sudo
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Este script requiere permisos de superusuario"
    echo "🔄 Relanzando con sudo..."
    exec sudo "$0" "$@"
fi

# Verificar si ya existe
echo "🔍 Verificando entrada actual en $HOSTS_FILE..."
if grep -q "^127\.0\.0\.1[[:space:]]*$DOMAIN" "$HOSTS_FILE"; then
    echo "✅ Dominio $DOMAIN ya está configurado"
    echo ""
    grep "$DOMAIN" "$HOSTS_FILE"
    echo ""
    exit 0
fi

# Backup del archivo hosts
echo "💾 Creando backup de $HOSTS_FILE..."
cp "$HOSTS_FILE" "$HOSTS_FILE.backup.$(date +%Y%m%d_%H%M%S)"
echo "✅ Backup creado"
echo ""

# Añadir entrada
echo "➕ Añadiendo entrada para $DOMAIN..."
echo "127.0.0.1 $DOMAIN" | tee -a "$HOSTS_FILE" > /dev/null
echo "✅ Entrada añadida"
echo ""

# Verificar DNS
echo "🔍 Verificando resolución DNS..."
if ping -c 1 "$DOMAIN" &> /dev/null; then
    echo "✅ DNS resuelve correctamente a 127.0.0.1"
else
    echo "⚠️  DNS no resuelve inmediatamente (puede tardar unos segundos)"
fi
echo ""

# Mostrar configuración final
echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ Configuración de /etc/hosts completada            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Entrada añadida:"
grep "$DOMAIN" "$HOSTS_FILE"
echo ""
echo "🔗 Próximos pasos:"
echo "  1. Generar certificados:   ./scripts/generate-certs.sh"
echo "  2. Levantar Docker:        make docker-setup"
echo "  3. Abrir navegador:        https://local.resumecoach.com"
echo ""
```

---

### 7️⃣ Actualizar scripts/docker-staging.sh

Añadir verificaciones en la función `setup()`:

```bash
setup() {
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║  🚀 Setup Completo de Docker Staging (SSL)            ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    
    # 1. Verificar certificados SSL
    echo "🔍 Verificando certificados SSL..."
    if [ ! -f "nginx/certs/local.resumecoach.com+1.pem" ]; then
        echo "❌ Certificados SSL no encontrados"
        echo ""
        echo "📖 Genera los certificados ejecutando:"
        echo "   ./scripts/generate-certs.sh"
        echo ""
        exit 1
    fi
    echo "✅ Certificados SSL encontrados"
    echo ""
    
    # 2. Verificar /etc/hosts
    echo "🔍 Verificando configuración /etc/hosts..."
    if ! grep -q "local.resumecoach.com" /etc/hosts; then
        echo "❌ Dominio no configurado en /etc/hosts"
        echo ""
        echo "📖 Configura el dominio ejecutando:"
        echo "   sudo ./scripts/setup-hosts.sh"
        echo ""
        exit 1
    fi
    echo "✅ Dominio configurado en /etc/hosts"
    echo ""
    
    # 3. Build de todas las apps
    build
    
    # 4. Levantar Docker
    start
    
    # 5. Health check
    health
    
    echo ""
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║  ✅ Docker Staging listo con SSL                      ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "🌐 URLs disponibles:"
    echo "  • Shell:    https://local.resumecoach.com/"
    echo "  • Login:    https://local.resumecoach.com/login"
    echo "  • Product:  https://local.resumecoach.com/product"
    echo "  • User:     https://local.resumecoach.com/user"
    echo ""
}
```

---

### 8️⃣ Actualizar .gitignore

```gitignore
# SSL certificates (no commitear certificados locales)
nginx/certs/*.pem
nginx/certs/*.key

# Mantener directorio pero excluir contenido
!nginx/certs/.gitkeep

# Backups de /etc/hosts (por si scripts crean backups)
*.hosts.backup.*
```

---

### 9️⃣ Actualizar Makefile

```makefile
# ============================================
# Docker Staging con SSL
# ============================================

.PHONY: docker-setup-ssl docker-certs docker-hosts

docker-setup-ssl: docker-certs docker-hosts docker-setup
	@echo "✅ Docker Staging con SSL configurado"

docker-certs:
	@echo "🔐 Generando certificados SSL..."
	@./scripts/generate-certs.sh

docker-hosts:
	@echo "🌐 Configurando /etc/hosts..."
	@sudo ./scripts/setup-hosts.sh

# Verificar setup SSL
docker-verify-ssl:
	@echo "🔍 Verificando configuración SSL..."
	@./scripts/verify-docker-setup.sh --ssl

docker-help:
	@echo "Docker Staging Commands:"
	@echo ""
	@echo "  Setup inicial con SSL:"
	@echo "    make docker-setup-ssl      # Setup completo (certs + hosts + docker)"
	@echo "    make docker-certs          # Solo generar certificados"
	@echo "    make docker-hosts          # Solo configurar /etc/hosts"
	@echo ""
	@echo "  Comandos existentes:"
	@echo "    make docker-setup          # Setup sin SSL (localhost:8080)"
	@echo "    make docker-start          # Iniciar contenedores"
	@echo "    make docker-stop           # Detener contenedores"
	@echo "    ...resto de comandos"
```

---

### 🔟 Actualizar scripts/verify-docker-setup.sh

Añadir verificación SSL:

```bash
#!/bin/bash

# ... código existente ...

# Nueva función: verificar SSL
check_ssl() {
    echo "🔍 Verificando SSL..."
    
    # Certificados
    if [ ! -f "nginx/certs/local.resumecoach.com+1.pem" ]; then
        echo "❌ Certificados SSL no encontrados"
        ERRORS=$((ERRORS+1))
    else
        echo "✅ Certificados SSL: OK"
    fi
    
    # /etc/hosts
    if ! grep -q "local.resumecoach.com" /etc/hosts; then
        echo "❌ Dominio no configurado en /etc/hosts"
        ERRORS=$((ERRORS+1))
    else
        echo "✅ /etc/hosts configurado: OK"
    fi
    
    # DNS resolution
    if ping -c 1 local.resumecoach.com &> /dev/null; then
        echo "✅ DNS resuelve correctamente"
    else
        echo "⚠️  DNS no resuelve (puede tardar unos segundos)"
    fi
}

# Llamar a check_ssl si se pasa --ssl
if [ "$1" == "--ssl" ]; then
    check_ssl
fi
```

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Antes (localhost) | Después (custom domain) |
|---------|-------------------|-------------------------|
| **URL** | `http://localhost:8080` | `https://local.resumecoach.com` |
| **HTTPS** | ❌ No | ✅ Sí (mkcert) |
| **Warnings SSL** | N/A | ✅ Sin warnings |
| **Cookies Secure** | ❌ No funciona | ✅ Funciona |
| **CORS** | Configurado | ✅ Igual funcionalidad |
| **Realismo** | Medio | ✅ Alto (idéntico a legacy) |
| **Onboarding** | Bueno | ✅ Mejor (una sola URL) |
| **Testing** | Funcional | ✅ Más realista |
| **Consistencia** | Parcial | ✅ Total con Jest/legacy |

---

## ⚠️ Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| **Certificados no confiables** | Baja | Alto | Scripts automáticos + docs |
| **/etc/hosts no configurado** | Media | Alto | Script setup-hosts.sh + verificación |
| **Puerto 443 ocupado** | Baja | Medio | Health check + docs troubleshooting |
| **mkcert no instalado** | Media | Alto | Verificación previa + instrucciones |
| **Permisos sudo** | Media | Medio | Scripts solicitan sudo cuando necesario |

---

## 🎯 Criterios de Aceptación

### AC1: SSL Configurado y Funcional
- [ ] Certificados generados con mkcert
- [ ] Nginx configurado con SSL
- [ ] Navegador confía en certificados (sin warnings)
- [ ] HTTP redirect a HTTPS funciona

### AC2: Domain Resolution
- [ ] /etc/hosts configurado
- [ ] DNS resuelve `local.resumecoach.com` a 127.0.0.1
- [ ] Ping funciona correctamente

### AC3: Docker Compose Actualizado
- [ ] Puertos 80 y 443 expuestos
- [ ] Volumen de certificados montado
- [ ] Health check usa HTTPS

### AC4: Scripts de Automatización
- [ ] `scripts/generate-certs.sh` funcional
- [ ] `scripts/setup-hosts.sh` funcional
- [ ] `scripts/docker-staging.sh` con verificaciones SSL
- [ ] `scripts/verify-docker-setup.sh` verifica SSL

### AC5: Makefile Actualizado
- [ ] Comando `make docker-setup-ssl` funcional
- [ ] Comandos individuales (`docker-certs`, `docker-hosts`)
- [ ] Help actualizado

### AC6: Documentación Completa
- [ ] README con instrucciones SSL
- [ ] Troubleshooting de problemas comunes
- [ ] Guía de setup inicial
- [ ] CHANGELOG actualizado

### AC7: Testing Manual
- [ ] Acceso a `https://local.resumecoach.com` funcional
- [ ] Todos los microfrontends accesibles
- [ ] Module Federation carga remotes sin errores
- [ ] HTTPS en navegador (candado verde)
- [ ] No hay warnings de certificado

---

## 📝 Story Points Estimados

| Tarea | Complejidad | SP |
|-------|-------------|-----|
| Generar certificados SSL (mkcert) | Baja | 1 |
| Configurar Nginx SSL | Media | 2 |
| Actualizar docker-compose.yml | Baja | 1 |
| Scripts automatización (certs + hosts) | Media | 2 |
| Actualizar scripts existentes | Baja | 1 |
| Makefile + integración | Baja | 1 |
| Documentación completa | Media | 2 |
| Testing + troubleshooting | Media | 2 |
| **TOTAL** | | **12 SP** |

*Nota: Puede dividirse en 2 stories de 6 SP si es necesario*

---

## 🚀 Plan de Implementación Sugerido

### Fase 1: Setup SSL (6 SP)
1. Crear scripts de generación de certificados
2. Crear script de configuración /etc/hosts
3. Actualizar nginx/nginx.conf con SSL
4. Actualizar docker-compose.staging.yml
5. Testing básico SSL

### Fase 2: Automatización y Docs (6 SP)
1. Actualizar scripts/docker-staging.sh con verificaciones
2. Actualizar scripts/verify-docker-setup.sh
3. Actualizar Makefile con comandos SSL
4. Documentación completa
5. Testing exhaustivo
6. Troubleshooting guide

---

## 🔄 Alternativas Consideradas

### Opción 1: Mantener localhost (Descartada)
- ❌ No replica comportamiento legacy
- ❌ No permite testing realista de HTTPS
- ❌ Inconsistente con tests Jest

### Opción 2: Self-signed certificates (Descartada)
- ❌ Warnings de certificado en navegador
- ❌ Require excepciones manuales
- ❌ Experiencia de desarrollo pobre

### Opción 3: mkcert + custom domain (✅ Seleccionada)
- ✅ Sin warnings de certificado
- ✅ Replicación exacta de legacy
- ✅ Experiencia de desarrollo óptima
- ✅ Fácil setup con scripts

---

## 📖 Referencias

- [mkcert Documentation](https://github.com/FiloSottile/mkcert)
- [Nginx SSL Configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [Docker Compose Networks](https://docs.docker.com/compose/networking/)
- Legacy project: `apps/login/src/app/config/appConfig.js`

---

## ✅ Checklist Pre-Implementación

Antes de crear el Tech Story en Jira, verificar:

- [ ] Propuesta revisada y aprobada por el equipo
- [ ] Story Points acordados (12 SP o dividir en 2x6 SP)
- [ ] Criterios de Aceptación validados
- [ ] Riesgos identificados y mitigaciones claras
- [ ] Plan de implementación definido
- [ ] Documentación necesaria identificada

---

**Fecha**: 27 Enero 2026  
**Autor**: Cursor AI + Alejandro Mallen  
**Estado**: 📋 Propuesta para revisión
