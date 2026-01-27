#!/bin/bash

# ==============================================
# CV-Hibrid - Cheat Sheet de Comandos
# ==============================================

cat << 'EOF'

╔══════════════════════════════════════════════════════════════════╗
║                 CV-HIBRID - COMANDOS RÁPIDOS                     ║
╚══════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────┐
│  🚀 DESARROLLO DIARIO (Sin Docker)                               │
└──────────────────────────────────────────────────────────────────┘

  Iniciar desarrollo:
    pnpm dev              # Todos los servicios
    make dev              # Alternativa con Makefile
    
  Puertos:
    Shell:   http://localhost:5000
    Product: http://localhost:5001
    UI:      http://localhost:5002
    Login:   http://localhost:5003
    User:    http://localhost:5004

┌──────────────────────────────────────────────────────────────────┐
│  🐳 DOCKER STAGING (Testing Pre-Deploy)                          │
└──────────────────────────────────────────────────────────────────┘

  Setup inicial:
    make docker-setup     # Build + Start (primera vez)
    
  Control diario:
    make docker-start     # Iniciar
    make docker-stop      # Detener
    make docker-restart   # Reiniciar
    
  Rebuild (después de cambios):
    make build            # Build de apps
    make docker-rebuild   # Rebuild + restart
    
  Debugging:
    make docker-logs          # Todos los logs
    make docker-logs-nginx    # Solo Nginx
    make docker-health        # Health check
    make docker-status        # Estado
    
  URL:
    http://localhost:8080     # Todos los servicios

┌──────────────────────────────────────────────────────────────────┐
│  🧪 TESTING                                                       │
└──────────────────────────────────────────────────────────────────┘

  Tests unitarios:
    pnpm test             # Ejecutar una vez
    pnpm test:watch       # Watch mode (TDD)
    pnpm test:coverage    # Con coverage
    
  Tests E2E:
    pnpm test:e2e         # Headless
    pnpm test:e2e:ui      # Con UI de Playwright
    pnpm test:e2e:headed  # Con navegador visible
    
  Pipeline completo:
    pnpm ci               # Tests + Build + E2E

┌──────────────────────────────────────────────────────────────────┐
│  🔨 BUILD                                                         │
└──────────────────────────────────────────────────────────────────┘

  Build completo:
    pnpm build:all        # Todas las apps
    make build            # Alternativa
    
  Build individual:
    make build-ui         # Solo UI
    make build-shell      # Solo Shell
    make build-login      # Solo Login
    
  Preview (después de build):
    pnpm preview:all      # Previsualizar builds

┌──────────────────────────────────────────────────────────────────┐
│  🧹 LIMPIEZA                                                      │
└──────────────────────────────────────────────────────────────────┘

  Limpieza completa:
    make clean            # node_modules + builds
    
  Solo builds:
    make clean-builds     # Mantener node_modules
    
  Docker:
    make docker-clean     # Contenedores + builds

┌──────────────────────────────────────────────────────────────────┐
│  ℹ️  INFORMACIÓN Y AYUDA                                          │
└──────────────────────────────────────────────────────────────────┘

  Ayuda:
    make help                         # Ver todos los comandos
    ./scripts/docker-staging.sh help  # Ayuda Docker
    
  Información:
    make info             # Info del proyecto
    make urls             # Ver todas las URLs
    
  Verificación:
    ./scripts/verify-docker-setup.sh  # Verificar prerequisitos

┌──────────────────────────────────────────────────────────────────┐
│  📚 DOCUMENTACIÓN                                                 │
└──────────────────────────────────────────────────────────────────┘

  Guías principales:
    readme.md                          # Overview del proyecto
    plan_migracion.md                  # Plan técnico completo
    
  Docker:
    DOCKER_STAGING_README.md           # Quick start
    docs/docker-staging-guide.md       # Guía completa
    DOCKER_IMPLEMENTATION_SUMMARY.md   # Resumen implementación
    
  Jira:
    docs/jira/fase1/q1-s1-s2.md       # User stories creadas

┌──────────────────────────────────────────────────────────────────┐
│  🎯 WORKFLOW RECOMENDADO                                          │
└──────────────────────────────────────────────────────────────────┘

  1. Desarrollo diario:
     pnpm dev → hacer cambios → pnpm test
     
  2. Antes de commit:
     pnpm test → git add . → git commit
     
  3. Antes de merge a main:
     make build → make docker-setup → pnpm test:e2e
     
  4. Verificar todo OK:
     make docker-health → open http://localhost:8080
     
  5. Limpieza:
     make docker-stop

┌──────────────────────────────────────────────────────────────────┐
│  ⚡ QUICK ACTIONS                                                 │
└──────────────────────────────────────────────────────────────────┘

  Empezar rápido:
    pnpm install && pnpm dev
    
  Test rápido (staging):
    make quick-staging    # Build + Docker Start
    
  Verificar todo:
    ./scripts/verify-docker-setup.sh && make docker-health

╔══════════════════════════════════════════════════════════════════╗
║  💡 TIP: Usa "make help" para ver todos los comandos             ║
╚══════════════════════════════════════════════════════════════════╝

EOF
