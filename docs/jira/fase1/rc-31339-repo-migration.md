# 🔄 Migración Repositorio GitHub → Bitbucket (cv-micro) - Tech Story

## 📋 Información de la Tarea

**Key**: [RC-31339](https://leadtech.atlassian.net/browse/RC-31339)  
**Tipo**: Tech Story (Historia Técnica)  
**Epic**: [RC-31191] Fase 1: Desbloqueo del Stack Tecnológico  
**Sprint**: 2026 Q1 S2 - Team Migration (26 Ene - 6 Feb)  
**Story Points**: 3 SP  
**Labels**: `bitbucket`, `github`, `git`, `migration`, `infrastructure`, `tech-story`, `Team1`  
**Estado**: ⏳ Pendiente  
**Fecha Creación**: 2 Febrero 2026

---

## 🎯 Hipótesis

**Como equipo CV**, necesitamos migrar el repositorio `module-federation-hybrid` desde GitHub a Bitbucket del grupo Blidoo, **para poder**:

- ✅ Centralizar todo el código del ecosistema CV en una sola plataforma (Bitbucket)
- ✅ Aprovechar las integraciones CI/CD existentes en Bitbucket Pipelines
- ✅ Tener control total sobre permisos y gestión de código corporativo
- ✅ Desbloquear el desarrollo de las siguientes tareas de integración

### 💡 Hipótesis Central

> Clonar el repositorio completo con historial (commits, tags, branches) garantizará que no perdemos contexto histórico y permitirá al equipo empezar a trabajar en Bitbucket con 0 fricción.

### 🤔 Problema a Resolver

El repositorio base está actualmente en GitHub (`amallen22/module-federation-hybrid`), pero el ecosistema CV (cv-app-user, cv-app-login, etc.) reside en Bitbucket. 

**Gap identificado**:
- ❌ Dispersión de código entre GitHub y Bitbucket
- ❌ Pipelines CI/CD están en Bitbucket (no podemos usarlas en GitHub)
- ❌ Gestión de permisos corporativos en Bitbucket
- ❌ Riesgo de perder historial si no se migra correctamente

---

## 📋 Descripción de la Implementación

Clonar el repositorio completo de GitHub (https://github.com/amallen22/module-federation-hybrid) a Bitbucket del grupo Blidoo, manteniendo todo el historial de commits, tags, y branches.

**Contexto**:
- Repo origen: `https://github.com/amallen22/module-federation-hybrid`
- Repo destino: Bitbucket `grupoblidoo/cv-micro` (nuevo)
- Objetivo: Migración **completa** con historial preservado

**Incluye**:
- Crear repositorio `cv-micro` en Bitbucket (grupo `grupoblidoo`)
- Clonar repo GitHub con `--mirror`
- Push completo a Bitbucket (todas las branches, tags, commits)
- Verificar integridad del historial
- Configurar branch protection rules en Bitbucket
- Documentar nuevo remote para el equipo

---

## ✅ Acceptance Criteria

### AC1: Repositorio Creado en Bitbucket
- [ ] Repo `cv-micro` existe en `https://bitbucket.org/grupoblidoo/cv-micro`
- [ ] Permisos configurados (equipo CV tiene acceso write)
- [ ] README inicial con descripción del proyecto

### AC2: Historial Completo Migrado
- [ ] Todos los commits del repo GitHub están en Bitbucket
- [ ] Todos los tags migrados correctamente
- [ ] Todas las branches migradas (main, dev, features, etc.)
- [ ] Verificación: `git log` tiene mismo SHA en ambos repos

### AC3: Branch Protection Configurada
- [ ] Branch `main` protegida (requiere PR + aprobación)
- [ ] Branch `develop` protegida
- [ ] Pipeline CI/CD básico configurado (lint + build)

### AC4: Documentación Actualizada
- [ ] README del repo con instrucciones de clonado
- [ ] Archivo `MIGRATION.md` con detalles de la migración
- [ ] Update en `plan_migracion.md` con nuevo remote

### AC5: Equipo Notificado
- [ ] Mensaje en Slack/Teams con nuevo repo URL
- [ ] Guía rápida para actualizar remotes locales
- [ ] Verificar que todos tienen acceso

---

## 🧪 Testing

### Tests Manuales

#### 1. Verificar Clonado Completo
```bash
# Clonar ambos repos
git clone https://github.com/amallen22/module-federation-hybrid github-repo
git clone https://bitbucket.org/grupoblidoo/cv-micro bitbucket-repo

# Comparar commits
cd github-repo && git log --oneline > ../github-commits.txt
cd ../bitbucket-repo && git log --oneline > ../bitbucket-commits.txt
diff ../github-commits.txt ../bitbucket-commits.txt  # Debe estar vacío
```

#### 2. Verificar Tags
```bash
cd bitbucket-repo
git tag -l  # Debe listar todos los tags del repo original
```

#### 3. Verificar Branches
```bash
cd bitbucket-repo
git branch -r  # Debe mostrar todas las branches remotas
```

#### 4. Probar Push desde Local
```bash
git clone https://bitbucket.org/grupoblidoo/cv-micro test-push
cd test-push
git checkout -b test/migration-verification
echo "test" > test.txt
git add test.txt && git commit -m "test: Verificar push"
git push origin test/migration-verification
# Debe funcionar sin errores
```

### Checklist de Validación

- [ ] Repo `cv-micro` visible en Bitbucket
- [ ] Historial Git idéntico (SHA commits)
- [ ] Tags migrados correctamente
- [ ] Todas las branches disponibles
- [ ] Branch protection activa
- [ ] Pipeline CI/CD básico funciona
- [ ] Equipo tiene acceso
- [ ] Documentación actualizada

---

## 📈 Conclusiones y Aprendizajes

### ✅ Resultados Esperados

1. **✅ Centralización del código**: Todo en Bitbucket
2. **✅ 0 pérdida de historial**: Git history preservado al 100%
3. **✅ Desbloqueo del equipo**: Puede empezar RC-31340, RC-31341, RC-31342

### 🎓 Aprendizajes Técnicos

#### 1. Mirror Clone es Crítico
```bash
# ❌ INCORRECTO (solo copia commits de la branch actual)
git clone https://github.com/amallen22/module-federation-hybrid

# ✅ CORRECTO (copia TODO: branches, tags, refs)
git clone --mirror https://github.com/amallen22/module-federation-hybrid
cd module-federation-hybrid.git
git push --mirror https://bitbucket.org/grupoblidoo/cv-micro.git
```

#### 2. Verificar Integridad con SHA
```bash
# Comparar último commit en ambos repos
git rev-parse HEAD  # Debe ser idéntico
```

#### 3. Branch Protection ASAP
Configurar protección de branches **inmediatamente** después de crear el repo para evitar pushes directos a `main`.

---

## 🔄 Mejoras Futuras

### Prioridad Media 🟡
- [ ] Sincronización periódica con GitHub (por si hay updates)
- [ ] Migrar Issues/PRs si existen en GitHub

---

## 🔗 Referencias

### Documentación Interna
- 📝 [Plan de Migración](../../../plan_migracion.md)
- 🎯 **Epic**: [RC-31191 - Fase 1](https://leadtech.atlassian.net/browse/RC-31191)

### Documentación Externa
- 🔧 [Git Mirror Clone](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---mirror)
- 🔧 [Bitbucket Branch Permissions](https://support.atlassian.com/bitbucket-cloud/docs/use-branch-permissions/)

### Repos
- **GitHub Origen**: https://github.com/amallen22/module-federation-hybrid
- **Bitbucket Destino**: https://bitbucket.org/grupoblidoo/cv-micro

---

## ⏱️ Story Points: 3 SP

### Justificación (Northstar Framework)
- **Complejidad**: Baja-Media (proceso estándar de Git)
- **Incertidumbre**: Baja (proceso bien documentado)
- **Esfuerzo**: ~2-3 horas
- **Riesgo**: Medio (si no se hace mirror, se pierde historial)

### Desglose de Esfuerzo

| Tarea | Story Points | Tiempo Estimado |
|-------|--------------|-----------------|
| Crear repo en Bitbucket | 0.5 SP | ~15 min |
| Mirror clone + push | 1 SP | ~30 min |
| Configurar branch protection + CI | 1 SP | ~1 hora |
| Documentación + notificación equipo | 0.5 SP | ~30 min |
| **TOTAL** | **3 SP** | **~2-3 horas** |

---

## 🔄 Dependencias

### Bloquea
- **RC-31340**: User Integration (necesita repo cv-micro)
- **RC-31341**: Figma Tokens (necesita repo cv-micro)
- **RC-31342**: Login Real (necesita repo cv-micro)

### Puede ejecutarse en paralelo con
- Ninguna (es el primer paso obligatorio)

---

## 🎉 Estado Final

| Aspecto | Estado |
|---------|--------|
| **Repo Creado** | ⏳ Pendiente |
| **Historial Migrado** | ⏳ Pendiente |
| **Branch Protection** | ⏳ Pendiente |
| **Documentación** | ⏳ Pendiente |
| **Equipo Notificado** | ⏳ Pendiente |

---

**Creado por**: Cursor AI + Alex Mallen  
**Fecha**: 2 Febrero 2026  
**Sprint**: 2026 Q1 S2 - Team Migration  
**Epic**: RC-31191 - Fase 1: Desbloqueo Stack

**🔗 Jira**: https://leadtech.atlassian.net/browse/RC-31339
