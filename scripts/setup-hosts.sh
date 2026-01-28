#!/bin/bash

################################################################################
# 🌐 /etc/hosts Configuration for Docker Staging
# 
# Configura DNS local añadiendo entrada para local.resumecoach.com
#
# Requisitos:
#   - Permisos sudo (modificar /etc/hosts)
#
# Uso:
#   sudo ./scripts/setup-hosts.sh
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
IP="127.0.0.1"
HOSTS_FILE="/etc/hosts"
BACKUP_SUFFIX=".backup.$(date +%Y%m%d_%H%M%S)"

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
# Verificación de Permisos
################################################################################

check_sudo() {
    print_step "Verificando permisos..."
    
    # Si no somos root, reejecutar con sudo
    if [ "$EUID" -ne 0 ]; then
        print_warning "Este script requiere permisos sudo"
        print_info "Reejecutando con sudo..."
        echo ""
        
        # Reejecutar el script con sudo
        exec sudo "$0" "$@"
        exit $?
    fi
    
    print_success "Permisos sudo: OK"
}

################################################################################
# Backup y Verificación
################################################################################

backup_hosts_file() {
    print_step "Creando backup de $HOSTS_FILE..."
    
    if [ -f "$HOSTS_FILE" ]; then
        cp "$HOSTS_FILE" "${HOSTS_FILE}${BACKUP_SUFFIX}"
        print_success "Backup creado: ${HOSTS_FILE}${BACKUP_SUFFIX}"
    else
        print_error "$HOSTS_FILE no existe"
        exit 1
    fi
}

check_existing_entry() {
    print_step "Verificando entrada existente..."
    
    # Buscar entrada exacta para el dominio
    if grep -q "^${IP}[[:space:]]*${DOMAIN}" "$HOSTS_FILE"; then
        print_success "Entrada ya existe en $HOSTS_FILE"
        echo ""
        print_info "Entrada actual:"
        grep "^${IP}[[:space:]]*${DOMAIN}" "$HOSTS_FILE"
        echo ""
        
        read -p "¿Quieres mantenerla? [Y/n] " -n 1 -r
        echo ""
        
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            print_info "Manteniendo entrada existente"
            verify_dns_resolution
            print_next_steps
            exit 0
        fi
        
        print_info "Eliminando entrada antigua..."
        # Eliminar entrada antigua
        sed -i "${BACKUP_SUFFIX}" "/^${IP}[[:space:]]*${DOMAIN}/d" "$HOSTS_FILE"
        print_success "Entrada antigua eliminada"
    else
        print_success "No hay entrada existente"
    fi
}

################################################################################
# Añadir Entrada DNS
################################################################################

add_hosts_entry() {
    print_step "Añadiendo entrada DNS..."
    
    # Añadir nueva entrada al final del archivo
    echo "" >> "$HOSTS_FILE"
    echo "# Docker Staging - Custom Domain (RC-31268)" >> "$HOSTS_FILE"
    echo "${IP} ${DOMAIN}" >> "$HOSTS_FILE"
    
    print_success "Entrada añadida a $HOSTS_FILE"
    
    # Mostrar entrada añadida
    echo ""
    print_info "Nueva entrada:"
    grep -A 1 "Docker Staging" "$HOSTS_FILE"
}

################################################################################
# Validación
################################################################################

verify_hosts_file() {
    print_step "Verificando $HOSTS_FILE..."
    
    if grep -q "^${IP}[[:space:]]*${DOMAIN}" "$HOSTS_FILE"; then
        print_success "Entrada verificada en $HOSTS_FILE"
    else
        print_error "Entrada no encontrada en $HOSTS_FILE"
        exit 1
    fi
}

verify_dns_resolution() {
    print_step "Verificando resolución DNS..."
    
    # Usar ping para verificar resolución
    if ping -c 1 "$DOMAIN" &> /dev/null; then
        print_success "DNS resuelve correctamente"
        
        # Mostrar IP resuelta
        local RESOLVED_IP=$(ping -c 1 "$DOMAIN" | head -n 1 | grep -oP '\(\K[^\)]+')
        print_info "Resuelve a: $RESOLVED_IP"
        
        if [ "$RESOLVED_IP" != "$IP" ]; then
            print_warning "La IP resuelta ($RESOLVED_IP) no coincide con la esperada ($IP)"
            print_info "Puede ser necesario limpiar cache DNS:"
            echo "  • macOS: ${BLUE}sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder${NC}"
            echo "  • Linux: ${BLUE}sudo systemd-resolve --flush-caches${NC}"
            echo ""
        fi
    else
        print_warning "No se pudo verificar DNS con ping"
        print_info "Esto es normal si ping está bloqueado"
    fi
}

################################################################################
# Next Steps
################################################################################

print_next_steps() {
    echo ""
    print_header "✅ DNS Local Configurado"
    
    print_success "Dominio configurado:"
    echo "  • $DOMAIN → $IP"
    echo ""
    
    print_info "Próximos pasos:"
    echo ""
    echo "  1️⃣  Verificar resolución:"
    echo "     ${BLUE}ping $DOMAIN${NC}"
    echo "     Debería resolver a $IP"
    echo ""
    echo "  2️⃣  Levantar Docker Staging:"
    echo "     ${BLUE}make docker-setup${NC}"
    echo ""
    echo "  3️⃣  Abrir navegador:"
    echo "     ${BLUE}https://$DOMAIN${NC}"
    echo ""
    
    print_info "Troubleshooting:"
    echo "  • Si DNS no resuelve, limpiar cache:"
    echo "    macOS: ${BLUE}sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder${NC}"
    echo "    Linux: ${BLUE}sudo systemd-resolve --flush-caches${NC}"
    echo ""
    echo "  • Si necesitas revertir:"
    echo "    ${BLUE}sudo cp ${HOSTS_FILE}${BACKUP_SUFFIX} ${HOSTS_FILE}${NC}"
    echo ""
    
    print_info "Backups disponibles:"
    ls -lht "${HOSTS_FILE}.backup."* 2>/dev/null | head -n 3 || echo "  (ninguno)"
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
    print_header "🌐 Configuración DNS Local (/etc/hosts)"
    
    # Verificaciones
    check_sudo
    echo ""
    
    # Backup
    print_header "Backup de Seguridad"
    backup_hosts_file
    echo ""
    
    # Verificar y añadir entrada
    print_header "Configuración DNS"
    check_existing_entry
    add_hosts_entry
    echo ""
    
    # Validación
    print_header "Verificación"
    verify_hosts_file
    echo ""
    verify_dns_resolution
    
    # Next steps
    print_next_steps
}

# Ejecutar main
main
