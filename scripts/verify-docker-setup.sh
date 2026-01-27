#!/bin/bash

# ==============================================
# Quick Test - Verifica que Docker Staging funciona
# ==============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

echo -e "${BLUE}🧪 Verificando configuración de Docker Staging...${NC}"
echo ""

# 1. Verificar que los archivos existen
print_info "1. Verificando archivos necesarios..."

files=(
    "docker-compose.staging.yml"
    "nginx/nginx.conf"
    "scripts/docker-staging.sh"
    "Makefile"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file existe"
    else
        print_error "$file NO existe"
        all_exist=false
    fi
done

echo ""

# 2. Verificar permisos del script
print_info "2. Verificando permisos del script..."
if [ -x "scripts/docker-staging.sh" ]; then
    print_success "Script tiene permisos de ejecución"
else
    print_error "Script NO tiene permisos de ejecución"
    echo "   Ejecuta: chmod +x scripts/docker-staging.sh"
    all_exist=false
fi

echo ""

# 3. Verificar Docker
print_info "3. Verificando Docker..."
if command -v docker &> /dev/null; then
    print_success "Docker está instalado"
    
    if docker info > /dev/null 2>&1; then
        print_success "Docker está corriendo"
    else
        print_error "Docker no está corriendo"
        echo "   Por favor inicia Docker Desktop"
        all_exist=false
    fi
else
    print_error "Docker NO está instalado"
    all_exist=false
fi

echo ""

# 4. Verificar docker-compose
print_info "4. Verificando docker compose..."
if docker compose version > /dev/null 2>&1; then
    print_success "docker compose está disponible ($(docker compose version --short))"
elif command -v docker-compose &> /dev/null; then
    print_success "docker-compose está instalado ($(docker-compose version --short))"
else
    print_error "docker compose NO está disponible"
    echo "   Docker Desktop debería incluirlo automáticamente"
    all_exist=false
fi

echo ""

# 5. Verificar estructura de directorios
print_info "5. Verificando estructura de apps..."

apps=(
    "apps/shell"
    "apps/login"
    "apps/product"
    "apps/user"
    "packages/ui"
)

for app in "${apps[@]}"; do
    if [ -d "$app" ]; then
        print_success "$app existe"
    else
        print_error "$app NO existe"
    fi
done

echo ""

# 6. Verificar que pnpm está instalado
print_info "6. Verificando pnpm..."
if command -v pnpm &> /dev/null; then
    print_success "pnpm está instalado ($(pnpm --version))"
else
    print_error "pnpm NO está instalado"
    echo "   Instala con: curl -fsSL https://get.pnpm.io/install.sh | sh -"
    all_exist=false
fi

echo ""

# 7. Verificar puertos disponibles
print_info "7. Verificando puertos..."

check_port() {
    if lsof -i :"$1" > /dev/null 2>&1; then
        print_error "Puerto $1 está en uso"
        lsof -i :"$1"
        return 1
    else
        print_success "Puerto $1 está libre"
        return 0
    fi
}

check_port 8080

echo ""
echo "========================================"

if [ "$all_exist" = true ]; then
    print_success "Todos los checks pasaron! 🎉"
    echo ""
    print_info "Próximos pasos:"
    echo "  1. Build de las apps:"
    echo "     ${GREEN}make build${NC} o ${GREEN}pnpm build:all${NC}"
    echo ""
    echo "  2. Iniciar Docker Staging:"
    echo "     ${GREEN}make docker-setup${NC}"
    echo ""
    echo "  3. Abrir en navegador:"
    echo "     ${GREEN}http://localhost:8080${NC}"
    echo ""
else
    print_error "Algunos checks fallaron. Por favor revisa los errores arriba."
    exit 1
fi
