# TICKET JIRA - Deploy Migration Plan a S3

---

## 📋 Información del Ticket

**Tipo**: Task / Story  
**Proyecto**: DEVOPS  
**Componente**: Infrastructure / AWS  
**Prioridad**: Medium  
**Sprint**: [A definir]  
**Estimación**: 2 Story Points (1-2 horas)  

---

## 📝 Título

```
Deploy aplicación Migration Plan (documentación) a AWS S3 Static Hosting
```

---

## 📄 Descripción

### Contexto

Se requiere desplegar la aplicación web **Migration Plan** (herramienta de documentación interna del proyecto CV-Hibrid) en AWS S3 como sitio estático.

**Características de la aplicación**:
- Tipo: SPA (Single Page Application) con React + HashRouter
- Framework: Vite + React 18 + TypeScript
- Tamaño: ~700 KB (~160 KB gzipped)
- Propósito: Documentación interna (no es parte del producto final)
- Audiencia: Stakeholders, equipo de desarrollo, PMs

### Objetivo

Configurar infraestructura AWS S3 para hospedar la aplicación de forma estática, sin necesidad de servidor backend.

---

## ✅ Criterios de Aceptación

### Obligatorios

- [ ] Bucket S3 creado con nombre: `migration-plan-cv-hibrid` (o similar según convención)
- [ ] Static Website Hosting habilitado en el bucket
- [ ] Bucket Policy configurada para acceso apropiado (público o VPN)
- [ ] Index document: `index.html`
- [ ] Error document: `index.html`
- [ ] URL del sitio documentada y compartida con el equipo
- [ ] Aplicación accesible y funcional en todas las rutas
- [ ] Scripts de deploy configurados y documentados

### Opcionales (Nice to Have)

- [ ] CloudFront distribution para HTTPS y CDN (si se requiere SSL)
- [ ] S3 Versioning habilitado para rollbacks
- [ ] CloudWatch logging para monitoreo de accesos
- [ ] Custom domain (si aplica)

---

## 🔧 Tareas Técnicas

### 1. Crear y Configurar S3 Bucket

```bash
# Crear bucket
aws s3 mb s3://migration-plan-cv-hibrid --region us-east-1

# Habilitar Static Website Hosting
aws s3 website s3://migration-plan-cv-hibrid \
  --index-document index.html \
  --error-document index.html
```

**Región recomendada**: `us-east-1` (o según política de la empresa)

### 2. Configurar Bucket Policy

**Opción A: Acceso Público** *(Recomendado para documentación interna sin datos sensibles)*

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::migration-plan-cv-hibrid/*"
    }
  ]
}
```

Aplicar:
```bash
aws s3api put-bucket-policy \
  --bucket migration-plan-cv-hibrid \
  --policy file://bucket-policy.json
```

**Opción B: Acceso Privado con VPN** *(Si se prefiere seguridad adicional)*

- Configurar VPC Endpoint para S3
- Acceso solo desde red corporativa/VPN
- Policy basada en IP whitelist o IAM roles

**Decisión requerida**: ¿Público o privado? (Recomendación: público, es documentación interna)

### 3. Configurar CORS (si aplica)

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

```bash
aws s3api put-bucket-cors \
  --bucket migration-plan-cv-hibrid \
  --cors-configuration file://cors.json
```

### 4. Habilitar S3 Versioning (Opcional pero recomendado)

```bash
aws s3api put-bucket-versioning \
  --bucket migration-plan-cv-hibrid \
  --versioning-configuration Status=Enabled
```

**Beneficio**: Permite rollback a versiones anteriores si algo falla.

### 5. Configurar Cache-Control Headers

Los assets deben tener cache largo (1 año) excepto `index.html`:

```bash
# Assets con cache (JavaScript, CSS, imágenes)
# Cache-Control: max-age=31536000, public

# index.html sin cache (para updates instantáneos)
# Cache-Control: max-age=0, no-cache, no-store, must-revalidate
```

Esto se maneja automáticamente en el deploy script del equipo de desarrollo.

### 6. (Opcional) Configurar CloudFront

Si se requiere HTTPS o CDN global:

1. Crear CloudFront distribution
2. Origin: S3 bucket endpoint
3. Custom error responses:
   - 404 → `/index.html` (200)
   - 403 → `/index.html` (200)
4. SSL certificate (ACM)
5. Custom domain (si aplica)

**Decisión requerida**: ¿Se necesita CloudFront? (Recomendación: No, para simplificar)

---

## 📦 Información para el Deploy

### Build Artifacts

El equipo de desarrollo proporcionará la carpeta `dist/` con el build optimizado:

```
dist/
├── index.html                    # ~2 KB
├── assets/
│   ├── index-[hash].js          # ~250 KB (gzipped: ~60 KB)
│   ├── react-vendor-[hash].js   # ~140 KB (gzipped: ~45 KB)
│   ├── style-[hash].css         # ~17 KB (gzipped: ~4 KB)
│   └── [otros assets]
├── mf-manifest.json
└── remoteEntry.js
```

**Total**: ~700 KB uncompressed, ~160 KB gzipped

### Comando de Deploy (Desarrollo)

El equipo de desarrollo usará:

```bash
export S3_BUCKET=migration-plan-cv-hibrid
cd apps/migration-plan
pnpm build:production
pnpm deploy:s3
```

**Nota**: Requiere AWS CLI configurado con credenciales apropiadas.

### Permisos IAM Requeridos

El usuario/role que hace deploy necesita:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::migration-plan-cv-hibrid",
        "arn:aws:s3:::migration-plan-cv-hibrid/*"
      ]
    }
  ]
}
```

---

## 🔗 URLs Esperadas

### Páginas de la Aplicación

Una vez desplegado, las URLs serán:

```
Homepage:
http://1eres.resume-coach-migration-plan.com/

Páginas internas (con HashRouter):
http://1eres.resume-coach-migration-plan.com/#/contexto
http://1eres.resume-coach-migration-plan.com/#/fase1
http://1eres.resume-coach-migration-plan.com/#/fase2
http://1eres.resume-coach-migration-plan.com/#/fase3
http://1eres.resume-coach-migration-plan.com/#/riesgos
http://1eres.resume-coach-migration-plan.com/#/estimacion
http://1eres.resume-coach-migration-plan.com/#/hitos
http://1eres.resume-coach-migration-plan.com/#/metricas
```

**Nota**: El `#` en las URLs es intencional (HashRouter) y permite que funcione sin configuración adicional.

---

## 💰 Costos Estimados

### S3 (us-east-1)

```
Storage (1 MB):
$0.023/GB × 0.001 GB = $0.00002/mes

Requests (estimado 1000 visitas/mes):
1000 GET × $0.0004/1000 = $0.0004/mes

Data Transfer (estimado 100 visitas × 700 KB):
70 MB × $0.09/GB = ~$0.006/mes

TOTAL: < $0.01/mes (despreciable)
```

### CloudFront (si se usa)

```
Requests: ~$0.01/mes
Data Transfer: ~$0.10/mes
TOTAL: ~$0.11/mes
```

**Recomendación**: Solo S3 es suficiente (costo casi cero).

---

## 📚 Documentación de Referencia

### Para DevOps

El equipo de desarrollo ha preparado documentación completa:

- **Deploy Guide**: `/apps/migration-plan/DEPLOY_S3.md`
  - Configuración paso a paso
  - Scripts de deploy
  - Troubleshooting
  - Comandos de verificación

- **README**: `/apps/migration-plan/README.md`
  - Descripción de la aplicación
  - Scripts disponibles
  - Desarrollo local

- **CHANGELOG**: `/apps/migration-plan/CHANGELOG.md`
  - Historial de cambios
  - Versiones

### Enlaces Externos

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/)

---

## 🧪 Validación y Testing

### Tests de Humo (Post-Deploy)

Una vez desplegado, validar:

1. **Acceso básico**:
   ```bash
   curl -I http://migration-plan-cv-hibrid.s3-website-us-east-1.amazonaws.com/
   # Esperado: HTTP 200 OK
   ```

2. **Assets cargan correctamente**:
   - Abrir en navegador
   - Verificar que no hay errores 404 en DevTools
   - Verificar que estilos se aplican

3. **Navegación funciona**:
   - Click en todas las páginas del menú
   - Verificar que las rutas cambian (`#/fase1`, `#/fase2`, etc.)
   - Verificar que el contenido se muestra correctamente

4. **Performance**:
   - PageSpeed Insights (opcional)
   - Tiempo de carga < 2 segundos

### Checklist de Validación

- [ ] ✅ Homepage carga sin errores
- [ ] ✅ Todas las rutas funcionan (#/contexto, #/fase1, etc.)
- [ ] ✅ Estilos se aplican correctamente
- [ ] ✅ No hay errores en consola del navegador
- [ ] ✅ Assets (JS, CSS) cargan desde S3
- [ ] ✅ Navegación entre páginas funciona
- [ ] ✅ Hard refresh (Ctrl+F5) funciona en cualquier ruta

---

## 🚨 Riesgos y Consideraciones

### Riesgos Identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Bucket name ya existe | Baja | Bajo | Usar nombre alternativo con timestamp |
| Políticas de red bloquean S3 | Media | Alto | Validar con equipo de seguridad |
| Cache de navegador causa problemas | Media | Bajo | Cache-Control configurado correctamente |
| Costos inesperados | Muy baja | Bajo | Monitoreo con AWS Cost Explorer |

### Seguridad

- ✅ No contiene datos sensibles (solo documentación)
- ✅ No hay formularios ni backend
- ✅ No procesa datos de usuarios
- ✅ Solo contenido estático (HTML, JS, CSS)

**Recomendación**: Acceso público es seguro para este caso de uso.

---

## 📞 Contactos

### Equipo de Desarrollo

- **Tech Lead**: [Nombre]
- **Developer**: [Nombre]
- **Email**: dev-team@company.com
- **Slack**: #cv-hibrid-dev

### Información Adicional

- **Repositorio**: `github.com:amallen22/module-federation-hybrid.git`
- **Rama**: `migration-plan`
- **Path del proyecto**: `/apps/migration-plan`

---

## 📅 Timeline Estimado

```
Total: 1-2 horas

Fase 1 - Setup (30 min):
  - Crear bucket S3
  - Configurar static hosting
  - Configurar bucket policy

Fase 2 - Deploy Inicial (15 min):
  - Recibir build artifacts del equipo dev
  - Subir archivos a S3
  - Verificar acceso

Fase 3 - Testing (15 min):
  - Tests de humo
  - Validación de rutas
  - Performance check

Fase 4 - Documentación (15 min):
  - Documentar URLs
  - Compartir con equipo
  - Actualizar wiki/confluence
```

---

## ✅ Definición de Done

- [ ] Bucket S3 creado y configurado
- [ ] Static Website Hosting habilitado
- [ ] Aplicación desplegada y accesible
- [ ] Todas las rutas funcionan correctamente
- [ ] URL compartida con stakeholders
- [ ] Scripts de deploy documentados
- [ ] Permisos IAM configurados para equipo dev
- [ ] Validación completa realizada
- [ ] Documentación actualizada en wiki/confluence
- [ ] Ticket cerrado y comunicado a equipo dev

---

## 📎 Attachments

### Archivos Adjuntos

1. **bucket-policy.json** - Política de bucket S3
2. **cors.json** - Configuración CORS (si aplica)
3. **iam-policy.json** - Permisos IAM para deploy

### Enlaces

- [Deploy Guide Completo](../apps/migration-plan/DEPLOY_S3.md)
- [README Migration Plan](../apps/migration-plan/README.md)
- [Plan de Migración General](../plan_migracion.md)

---

## 💬 Comentarios / Notas

### Para DevOps

- Esta es una aplicación de **documentación interna**, no parte del producto CV
- **No requiere backend** ni base de datos
- **No procesa datos sensibles**
- Cambios frecuentes esperados durante fase de migración (cada 1-2 semanas)
- HashRouter (#) en URLs es intencional para simplificar hosting

### Preguntas Abiertas

- [ ] ¿Preferencia de región AWS? (Recomendación: us-east-1)
- [ ] ¿Bucket público o privado? (Recomendación: público)
- [ ] ¿Se necesita CloudFront? (Recomendación: No)
- [ ] ¿Custom domain requerido? (Recomendación: No, usar S3 endpoint)
- [ ] ¿Alertas de CloudWatch? (Opcional)

**Responder estas preguntas facilitará el setup inicial.**

---

## 🏷️ Labels / Tags

`aws`, `s3`, `static-hosting`, `infrastructure`, `deploy`, `documentation`, `frontend`, `react`, `cv-hibrid`, `migration-plan`

---

**Fin del Ticket**


