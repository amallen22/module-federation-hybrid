# ============================================
# CV-Hibrid Makefile
# ============================================

.PHONY: help dev build test clean install docker-setup docker-start docker-stop docker-logs docker-clean

# Default target
.DEFAULT_GOAL := help

# Colors
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# ============================================
# Help
# ============================================
help: ## Mostrar esta ayuda
	@echo "$(BLUE)CV-Hibrid - Comandos disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

# ============================================
# Development (sin Docker)
# ============================================
dev: ## Iniciar todos los servicios en modo desarrollo
	@echo "$(BLUE)🚀 Iniciando desarrollo...$(NC)"
	pnpm dev

dev-minimal: ## Iniciar servicios mínimos (shell + product + ui + login)
	@echo "$(BLUE)🚀 Iniciando desarrollo mínimo...$(NC)"
	pnpm dev:minimal

# ============================================
# Build
# ============================================
build: ## Construir todas las aplicaciones
	@echo "$(BLUE)🔨 Construyendo todas las aplicaciones...$(NC)"
	pnpm build:all

build-ui: ## Construir solo UI package
	pnpm --filter ui build

build-shell: ## Construir solo Shell
	pnpm --filter shell build

build-login: ## Construir solo Login
	pnpm --filter login build

build-product: ## Construir solo Product
	pnpm --filter product build

build-user: ## Construir solo User
	pnpm --filter user build

# ============================================
# Testing
# ============================================
test: ## Ejecutar todos los tests
	pnpm test

test-watch: ## Ejecutar tests en modo watch
	pnpm test:watch

test-unit: ## Ejecutar tests unitarios
	pnpm test:unit

test-e2e: ## Ejecutar tests E2E
	pnpm test:e2e

test-e2e-ui: ## Ejecutar tests E2E con UI
	pnpm test:e2e:ui

test-coverage: ## Ejecutar tests con coverage
	pnpm test:coverage

# ============================================
# Docker Staging
# ============================================
docker-setup: ## Setup completo del entorno Docker staging (build + start)
	@echo "$(BLUE)🐳 Setup completo de Docker staging...$(NC)"
	./scripts/docker-staging.sh setup

docker-setup-ssl: docker-certs docker-hosts docker-setup ## Setup completo con SSL (certificados + DNS + Docker)
	@echo "$(GREEN)✅ Docker Staging con SSL configurado$(NC)"
	@echo ""
	@echo "$(BLUE)🌐 Abrir: https://local.resumecoach.com$(NC)"
	@echo ""

docker-certs: ## Generar certificados SSL (mkcert)
	@echo "$(BLUE)🔐 Generando certificados SSL...$(NC)"
	@./scripts/generate-certs.sh

docker-hosts: ## Configurar /etc/hosts
	@echo "$(BLUE)🌐 Configurando /etc/hosts...$(NC)"
	@sudo ./scripts/setup-hosts.sh

docker-verify-ssl: ## Verificar configuración SSL
	@echo "$(BLUE)🔍 Verificando configuración SSL...$(NC)"
	@./scripts/verify-docker-setup.sh --ssl

docker-build: ## Build de todas las apps para Docker
	@echo "$(BLUE)🔨 Building apps para Docker...$(NC)"
	./scripts/docker-staging.sh build

docker-start: ## Iniciar entorno Docker staging
	@echo "$(BLUE)🐳 Iniciando Docker staging...$(NC)"
	./scripts/docker-staging.sh start

docker-stop: ## Detener entorno Docker staging
	@echo "$(YELLOW)🛑 Deteniendo Docker staging...$(NC)"
	./scripts/docker-staging.sh stop

docker-restart: ## Reiniciar entorno Docker staging
	@echo "$(BLUE)🔄 Reiniciando Docker staging...$(NC)"
	./scripts/docker-staging.sh restart

docker-rebuild: ## Rebuild y reiniciar Docker staging
	@echo "$(BLUE)🔨 Rebuilding Docker staging...$(NC)"
	./scripts/docker-staging.sh rebuild

docker-logs: ## Ver logs de Docker staging
	./scripts/docker-staging.sh logs

docker-logs-nginx: ## Ver logs de Nginx
	./scripts/docker-staging.sh logs nginx

docker-status: ## Ver estado de contenedores Docker
	./scripts/docker-staging.sh status

docker-health: ## Health check de Docker staging
	./scripts/docker-staging.sh health

docker-clean: ## Limpiar entorno Docker y builds
	@echo "$(YELLOW)🧹 Limpiando Docker staging...$(NC)"
	./scripts/docker-staging.sh clean

# ============================================
# Install & Clean
# ============================================
install: ## Instalar dependencias
	@echo "$(BLUE)📦 Instalando dependencias...$(NC)"
	pnpm install

clean: ## Limpiar node_modules y builds
	@echo "$(YELLOW)🧹 Limpiando...$(NC)"
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	@echo "$(GREEN)✅ Limpieza completada$(NC)"

clean-builds: ## Limpiar solo builds (mantener node_modules)
	@echo "$(YELLOW)🧹 Limpiando builds...$(NC)"
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	@echo "$(GREEN)✅ Builds limpiados$(NC)"

# ============================================
# Linting & Formatting
# ============================================
lint: ## Ejecutar linter
	@echo "$(BLUE)🔍 Ejecutando linter...$(NC)"
	pnpm run lint || true

format: ## Formatear código
	@echo "$(BLUE)✨ Formateando código...$(NC)"
	pnpm run format || true

# ============================================
# CI
# ============================================
ci: ## Ejecutar pipeline CI completo
	@echo "$(BLUE)🤖 Ejecutando CI pipeline...$(NC)"
	pnpm ci

# ============================================
# Información
# ============================================
info: ## Mostrar información del proyecto
	@echo "$(BLUE)📊 Información del proyecto:$(NC)"
	@echo ""
	@echo "$(GREEN)Node version:$(NC)"
	@node --version
	@echo ""
	@echo "$(GREEN)pnpm version:$(NC)"
	@pnpm --version
	@echo ""
	@echo "$(GREEN)Workspaces:$(NC)"
	@pnpm list --depth 0 -r
	@echo ""

urls: ## Mostrar URLs disponibles
	@echo "$(BLUE)🌐 URLs disponibles:$(NC)"
	@echo ""
	@echo "$(GREEN)Desarrollo (pnpm dev):$(NC)"
	@echo "  • Shell:          http://localhost:5000"
	@echo "  • Product:        http://localhost:5001"
	@echo "  • UI:             http://localhost:5002"
	@echo "  • Login:          http://localhost:5003"
	@echo "  • User:           http://localhost:5004"
	@echo "  • Migration Plan: http://localhost:5006"
	@echo ""
	@echo "$(GREEN)Docker Staging - Custom Domain (SSL):$(NC)"
	@echo "  • Shell:          https://local.resumecoach.com/"
	@echo "  • Login:          https://local.resumecoach.com/login"
	@echo "  • Product:        https://local.resumecoach.com/product"
	@echo "  • User:           https://local.resumecoach.com/user"
	@echo "  • UI:             https://local.resumecoach.com/ui"
	@echo "  • Migration Plan: https://local.resumecoach.com/migration-plan"
	@echo ""
	@echo "$(YELLOW)Docker Staging - Legacy (sin SSL):$(NC)"
	@echo "  • Shell:          http://localhost:8080/"
	@echo "  • Login:          http://localhost:8080/login"
	@echo "  • Product:        http://localhost:8080/product"
	@echo "  • User:           http://localhost:8080/user"
	@echo "  • UI:             http://localhost:8080/ui"
	@echo "  • Migration Plan: http://localhost:8080/migration-plan"
	@echo ""
	@echo "$(BLUE)Para usar custom domain SSL:$(NC)"
	@echo "  make docker-setup-ssl"
	@echo ""

# ============================================
# Quick Commands
# ============================================
quick-dev: install dev ## Install + Dev (quick start)

quick-staging: build docker-start ## Build + Docker Start (quick staging)

quick-test: build test-e2e ## Build + E2E Tests

# ============================================
# Debug
# ============================================
debug-deps: ## Debug de dependencias
	@echo "$(BLUE)🔍 Verificando dependencias...$(NC)"
	pnpm list --depth 0

debug-ports: ## Verificar puertos en uso
	@echo "$(BLUE)🔍 Puertos en uso:$(NC)"
	@lsof -i :5000 || echo "Puerto 5000 libre"
	@lsof -i :5001 || echo "Puerto 5001 libre"
	@lsof -i :5002 || echo "Puerto 5002 libre"
	@lsof -i :5003 || echo "Puerto 5003 libre"
	@lsof -i :5004 || echo "Puerto 5004 libre"
	@lsof -i :8080 || echo "Puerto 8080 libre"
