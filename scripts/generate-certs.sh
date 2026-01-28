#!/bin/bash

################################################################################
# 🔒 SSL Certificate Generator for Docker Staging
# 
# Genera certificados SSL locales usando mkcert para el dominio 
# local.resumecoach.com
#
# Requisitos:
#   - mkcert instalado (https://github.com/FiloSottile/mkcert)
#
# Uso:
#   ./scripts/generate-certs.sh
#
# Tech Story: RC-31268
# Parte de: Custom Domain Docker Staging (Part 1/2)
################################################################################

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Constantes
DOMAIN="local.resumecoach.com"
WILDCARD_DOMAIN="*.local.resumecoach.com"
CERTS_DIR="nginx/certs"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

################################################################################
# Funciones de Output
################################################################################

print_header() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  $1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_step() {
    echo -e "${BLUE}🔹 $1${NC}"
}

################################################################################
# Verificaciones de Prerequisitos
################################################################################

check_mkcert() {
    print_step "Verificando mkcert..."
    
    if ! command -v mkcert &> /dev/null; then
        print_error "mkcert no está instalado"
        echo ""
        echo "Por favor, instala mkcert:"
        echo ""
        echo "  macOS (Homebrew):"
        echo "    brew install mkcert"
        echo ""
        echo "  Linux (Debian/Ubuntu):"
        echo "    sudo apt install libnss3-tools"
        echo "    curl -JLO 'https://dl.filippo.io/mkcert/latest?for=linux/amd64'"
        echo "    chmod +x mkcert-v*-linux-amd64"
        echo "    sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert"
        echo ""
        echo "  Linux (Arch):"
        echo "    sudo pacman -S mkcert"
        echo ""
        echo "📖 Docs: https://github.com/FiloSottile/mkcert"
        echo ""
        exit 1
    fi
    
    local MKCERT_VERSION=$(mkcert -version | head -n 1)
    print_success "mkcert instalado: $MKCERT_VERSION"
}

check_certs_dir() {
    print_step "Verificando directorio de certificados..."
    
    cd "$PROJECT_ROOT"
    
    if [ ! -d "$CERTS_DIR" ]; then
        print_info "Creando directorio $CERTS_DIR"
        mkdir -p "$CERTS_DIR"
        print_success "Directorio creado"
    else
        print_success "Directorio existe"
    fi
}

check_existing_certs() {
    print_step "Verificando certificados existentes..."
    
    cd "$PROJECT_ROOT"
    
    if [ -f "$CERTS_DIR/$DOMAIN+1.pem" ] && [ -f "$CERTS_DIR/$DOMAIN+1-key.pem" ]; then
        print_warning "Certificados ya existen"
        echo ""
        read -p "¿Quieres regenerarlos? [y/N] " -n 1 -r
        echo ""
        
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Manteniendo certificados existentes"
            echo ""
            print_success "Certificados SSL ya configurados"
            echo ""
            print_info "Ubicación: $CERTS_DIR/"
            ls -lh "$CERTS_DIR"/*.pem 2>/dev/null || true
            echo ""
            exit 0
        fi
        
        print_info "Eliminando certificados antiguos..."
        rm -f "$CERTS_DIR"/*.pem "$CERTS_DIR"/*.key
        print_success "Certificados antiguos eliminados"
    else
        print_success "No hay certificados existentes"
    fi
}

################################################################################
# Instalación CA y Generación de Certificados
################################################################################

install_ca() {
    print_step "Instalando CA raíz local de mkcert..."
    
    # mkcert -install instala el CA en el sistema
    if mkcert -install; then
        print_success "CA raíz instalado correctamente"
        echo ""
        print_info "El navegador ahora confiará en certificados generados con mkcert"
    else
        print_error "Error al instalar CA raíz"
        exit 1
    fi
}

generate_certificates() {
    print_step "Generando certificados SSL para $DOMAIN..."
    
    cd "$PROJECT_ROOT/$CERTS_DIR"
    
    # Generar certificados para dominio y wildcard
    if mkcert "$DOMAIN" "$WILDCARD_DOMAIN"; then
        print_success "Certificados generados exitosamente"
    else
        print_error "Error al generar certificados"
        exit 1
    fi
    
    cd "$PROJECT_ROOT"
}

validate_certificates() {
    print_step "Validando certificados generados..."
    
    local CERT_FILE="$CERTS_DIR/$DOMAIN+1.pem"
    local KEY_FILE="$CERTS_DIR/$DOMAIN+1-key.pem"
    
    if [ ! -f "$CERT_FILE" ]; then
        print_error "Certificado no encontrado: $CERT_FILE"
        exit 1
    fi
    
    if [ ! -f "$KEY_FILE" ]; then
        print_error "Llave privada no encontrada: $KEY_FILE"
        exit 1
    fi
    
    # Verificar que los archivos no estén vacíos
    if [ ! -s "$CERT_FILE" ]; then
        print_error "Certificado está vacío: $CERT_FILE"
        exit 1
    fi
    
    if [ ! -s "$KEY_FILE" ]; then
        print_error "Llave privada está vacía: $KEY_FILE"
        exit 1
    fi
    
    print_success "Certificados válidos"
    
    # Mostrar información de los certificados
    echo ""
    print_info "Archivos generados:"
    ls -lh "$CERTS_DIR"/*.pem "$CERTS_DIR"/*.key 2>/dev/null || true
}

################################################################################
# Next Steps
################################################################################

print_next_steps() {
    echo ""
    print_header "✅ Certificados SSL Configurados"
    
    print_success "Certificados generados para:"
    echo "  • $DOMAIN"
    echo "  • $WILDCARD_DOMAIN"
    echo ""
    
    print_info "Ubicación:"
    echo "  $PROJECT_ROOT/$CERTS_DIR/"
    echo ""
    
    print_info "Próximos pasos:"
    echo ""
    echo "  1️⃣  Configurar /etc/hosts:"
    echo "     ${BLUE}sudo ./scripts/setup-hosts.sh${NC}"
    echo ""
    echo "  2️⃣  Levantar Docker Staging:"
    echo "     ${BLUE}make docker-setup${NC}"
    echo ""
    echo "  3️⃣  Abrir navegador:"
    echo "     ${BLUE}https://$DOMAIN${NC}"
    echo ""
    echo "  ✅  Verificar candado SSL verde en navegador"
    echo ""
    
    print_info "Troubleshooting:"
    echo "  • Si el navegador no confía en certificados:"
    echo "    ${BLUE}mkcert -uninstall && mkcert -install${NC}"
    echo ""
    echo "  • Logs del script:"
    echo "    ${BLUE}./scripts/generate-certs.sh 2>&1 | tee certs.log${NC}"
    echo ""
    
    print_info "Documentación:"
    echo "  • 📖 docs/jira/fase1/rc-31268-ssl-setup-part1.md"
    echo "  • 📖 docs/propuesta-custom-domain-docker-staging.md"
    echo ""
}

################################################################################
# Main
################################################################################

main() {
    print_header "🔒 Generador de Certificados SSL (mkcert)"
    
    # Verificaciones
    check_mkcert
    check_certs_dir
    check_existing_certs
    
    # Instalación y generación
    echo ""
    print_header "Generando Certificados"
    install_ca
    echo ""
    generate_certificates
    echo ""
    
    # Validación
    validate_certificates
    
    # Next steps
    print_next_steps
}

# Ejecutar main
main
