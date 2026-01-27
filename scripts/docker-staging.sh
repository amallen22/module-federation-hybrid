#!/bin/bash

# ==============================================
# CV-Hibrid Docker Staging Environment Manager
# ==============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_step() { echo -e "${BLUE}🔄 $1${NC}"; }

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker no está corriendo. Por favor inicia Docker Desktop."
        exit 1
    fi
    print_success "Docker está corriendo"
}

# Build all apps
build_all() {
    print_step "Construyendo todas las aplicaciones..."
    
    print_info "Building UI package..."
    pnpm --filter ui build || { print_error "UI build failed"; exit 1; }
    
    print_info "Building Product..."
    pnpm --filter product build || { print_error "Product build failed"; exit 1; }
    
    print_info "Building Login..."
    pnpm --filter login build || { print_error "Login build failed"; exit 1; }
    
    print_info "Building User..."
    pnpm --filter user build || { print_error "User build failed"; exit 1; }
    
    print_info "Building Shell..."
    pnpm --filter shell build || { print_error "Shell build failed"; exit 1; }
    
    print_success "Todas las aplicaciones construidas exitosamente"
}

# Start Docker Compose
start_docker() {
    print_step "Iniciando entorno Docker staging..."
    docker compose -f docker-compose.staging.yml up -d
    print_success "Entorno Docker iniciado"
    
    print_info "Esperando a que Nginx esté listo..."
    sleep 3
    
    # Check if nginx is healthy
    if docker ps | grep -q cv-hibrid-nginx; then
        print_success "Nginx está corriendo"
        print_info ""
        print_info "🎉 Entorno staging disponible en: ${GREEN}http://localhost:8080${NC}"
        print_info ""
        print_info "📊 Microfrontends disponibles:"
        print_info "   • Shell (Host):       http://localhost:8080/"
        print_info "   • Login:              http://localhost:8080/login"
        print_info "   • Product:            http://localhost:8080/product"
        print_info "   • User:               http://localhost:8080/user"
        print_info "   • UI Components:      http://localhost:8080/ui"
        print_info "   • Migration Plan:     http://localhost:8080/migration-plan"
        print_info ""
        print_info "📝 Ver logs: ./scripts/docker-staging.sh logs"
        print_info "🛑 Detener:  ./scripts/docker-staging.sh stop"
    else
        print_error "Nginx no se inició correctamente"
        docker-compose -f docker-compose.staging.yml logs nginx
        exit 1
    fi
}

# Stop Docker Compose
stop_docker() {
    print_step "Deteniendo entorno Docker staging..."
    docker compose -f docker-compose.staging.yml down
    print_success "Entorno Docker detenido"
}

# Show logs
show_logs() {
    if [ -z "$2" ]; then
        docker compose -f docker-compose.staging.yml logs -f
    else
        docker compose -f docker-compose.staging.yml logs -f "$2"
    fi
}

# Restart services
restart_docker() {
    print_step "Reiniciando entorno Docker staging..."
    docker compose -f docker-compose.staging.yml restart
    print_success "Entorno Docker reiniciado"
}

# Show status
show_status() {
    print_info "Estado de los contenedores:"
    docker compose -f docker-compose.staging.yml ps
}

# Clean everything
clean_all() {
    print_warning "Limpiando entorno Docker y builds..."
    docker compose -f docker-compose.staging.yml down -v
    print_info "Limpiando carpetas dist..."
    rm -rf apps/shell/dist
    rm -rf apps/login/dist
    rm -rf apps/product/dist
    rm -rf apps/user/dist
    rm -rf packages/ui/dist
    rm -rf apps/migration-plan/dist
    print_success "Limpieza completada"
}

# Full setup (build + start)
full_setup() {
    print_info "🚀 Configuración completa del entorno staging..."
    check_docker
    build_all
    start_docker
}

# Rebuild and restart
rebuild() {
    print_step "Reconstruyendo y reiniciando..."
    build_all
    docker compose -f docker-compose.staging.yml restart nginx
    print_success "Reconstrucción completada"
}

# Health check
health_check() {
    print_step "Verificando salud de los servicios..."
    
    # Check if containers are running
    if ! docker ps | grep -q cv-hibrid-nginx; then
        print_error "Nginx no está corriendo"
        return 1
    fi
    
    # Check HTTP endpoint
    if curl -f -s http://localhost:8080/health > /dev/null; then
        print_success "Health check passed - Nginx respondiendo correctamente"
    else
        print_error "Health check failed - Nginx no responde"
        return 1
    fi
    
    # Check if builds exist
    print_info "Verificando builds..."
    [ -d "apps/shell/dist" ] && print_success "Shell build existe" || print_warning "Shell build no existe"
    [ -d "apps/login/dist" ] && print_success "Login build existe" || print_warning "Login build no existe"
    [ -d "apps/product/dist" ] && print_success "Product build existe" || print_warning "Product build no existe"
    [ -d "apps/user/dist" ] && print_success "User build existe" || print_warning "User build no existe"
    [ -d "packages/ui/dist" ] && print_success "UI build existe" || print_warning "UI build no existe"
}

# Show help
show_help() {
    cat << EOF
${BLUE}CV-Hibrid Docker Staging Environment Manager${NC}

${YELLOW}Uso:${NC}
  ./scripts/docker-staging.sh [comando]

${YELLOW}Comandos disponibles:${NC}
  ${GREEN}setup${NC}          - Configuración completa (build + start)
  ${GREEN}build${NC}          - Construir todas las aplicaciones
  ${GREEN}start${NC}          - Iniciar entorno Docker
  ${GREEN}stop${NC}           - Detener entorno Docker
  ${GREEN}restart${NC}        - Reiniciar servicios
  ${GREEN}rebuild${NC}        - Reconstruir apps y reiniciar
  ${GREEN}logs${NC} [service] - Ver logs (opcional: especificar servicio)
  ${GREEN}status${NC}         - Ver estado de contenedores
  ${GREEN}health${NC}         - Verificar salud de servicios
  ${GREEN}clean${NC}          - Limpiar todo (contenedores y builds)
  ${GREEN}help${NC}           - Mostrar esta ayuda

${YELLOW}Ejemplos:${NC}
  # Setup inicial completo
  ./scripts/docker-staging.sh setup

  # Reconstruir después de cambios
  ./scripts/docker-staging.sh rebuild

  # Ver logs de Nginx
  ./scripts/docker-staging.sh logs nginx

  # Verificar salud
  ./scripts/docker-staging.sh health

${YELLOW}URLs disponibles:${NC}
  • Shell:          http://localhost:8080/
  • Login:          http://localhost:8080/login
  • Product:        http://localhost:8080/product
  • User:           http://localhost:8080/user
  • UI:             http://localhost:8080/ui
  • Migration Plan: http://localhost:8080/migration-plan

EOF
}

# Main command handler
case "${1:-help}" in
    setup)
        full_setup
        ;;
    build)
        check_docker
        build_all
        ;;
    start)
        check_docker
        start_docker
        ;;
    stop)
        stop_docker
        ;;
    restart)
        restart_docker
        ;;
    rebuild)
        check_docker
        rebuild
        ;;
    logs)
        show_logs "$@"
        ;;
    status)
        show_status
        ;;
    health)
        health_check
        ;;
    clean)
        clean_all
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Comando desconocido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
