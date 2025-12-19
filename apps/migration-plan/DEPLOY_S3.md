# Deploy a S3 - Migration Plan

Guía completa para desplegar la aplicación Migration Plan en AWS S3 como sitio estático.

## 📋 Tabla de Contenidos

- [Prerequisitos](#prerequisitos)
- [Configuración S3](#configuración-s3)
- [Build y Deploy](#build-y-deploy)
- [Verificación](#verificación)
- [Mantenimiento](#mantenimiento)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisitos

### Herramientas Necesarias

```bash
# AWS CLI instalado y configurado
aws --version
# AWS CLI/2.x o superior

# Credenciales configuradas
aws configure list
```

### Variables de Entorno

```bash
# Configurar bucket name
export S3_BUCKET=migration-plan-cv-hibrid
# O el nombre que DevOps asigne
```

---

## 🪣 Configuración S3

### 1. Crear Bucket (DevOps)

```bash
# Crear bucket
aws s3 mb s3://migration-plan-cv-hibrid --region us-east-1

# Habilitar Static Website Hosting
aws s3 website s3://migration-plan-cv-hibrid \
  --index-document index.html \
  --error-document index.html
```

### 2. Configurar Bucket Policy (Acceso Público)

**Opción A: Público (Recomendado para documentación interna)**

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

**Aplicar política**:
```bash
aws s3api put-bucket-policy \
  --bucket migration-plan-cv-hibrid \
  --policy file://bucket-policy.json
```

**Opción B: Privado con VPN (Más seguro)**

- Configurar VPC endpoint para S3
- Acceso solo desde red corporativa
- DevOps gestiona permisos IAM

### 3. Configurar CORS (si es necesario)

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

---

## 🏗️ Build y Deploy

### Build de Producción

```bash
# Navegar al directorio
cd apps/migration-plan

# Instalar dependencias (primera vez)
pnpm install

# Build optimizado para producción
pnpm build:production
```

**Salida esperada**:
```
dist/
├── index.html                    # 1-2 KB
├── assets/
│   ├── index-[hash].js          # ~250 KB (gzipped: ~60 KB)
│   ├── react-vendor-[hash].js   # ~140 KB (gzipped: ~45 KB)
│   ├── style-[hash].css         # ~17 KB (gzipped: ~4 KB)
│   └── ...
├── mf-manifest.json
└── remoteEntry.js
```

### Deploy Manual a S3

```bash
# Opción 1: Sync completo (primera vez)
aws s3 sync dist/ s3://migration-plan-cv-hibrid/ \
  --delete \
  --cache-control 'max-age=31536000,public' \
  --exclude 'index.html'

# Index.html sin cache (para updates instantáneos)
aws s3 cp dist/index.html s3://migration-plan-cv-hibrid/index.html \
  --cache-control 'max-age=0,no-cache,no-store,must-revalidate'
```

```bash
# Opción 2: Script automatizado
export S3_BUCKET=migration-plan-cv-hibrid
pnpm deploy:s3
```

### Deploy Completo (Build + Deploy)

```bash
# Todo en un comando
export S3_BUCKET=migration-plan-cv-hibrid
pnpm build:deploy
```

---

## ✅ Verificación

### 1. Verificar archivos en S3

```bash
aws s3 ls s3://migration-plan-cv-hibrid/ --recursive --human-readable

# Salida esperada:
# 2025-12-18 10:00:00    1.5 KiB index.html
# 2025-12-18 10:00:00  250.0 KiB assets/index-abc123.js
# ...
```

### 2. Obtener URL del Website

```bash
# Obtener endpoint
aws s3api get-bucket-website --bucket migration-plan-cv-hibrid

# URL resultante (ejemplo):
# http://migration-plan-cv-hibrid.s3-website-us-east-1.amazonaws.com
```

### 3. Probar en navegador

**URLs esperadas**:
```
http://[bucket-name].s3-website-[region].amazonaws.com/
http://[bucket-name].s3-website-[region].amazonaws.com/#/contexto
http://[bucket-name].s3-website-[region].amazonaws.com/#/fase1
http://[bucket-name].s3-website-[region].amazonaws.com/#/fase2
http://[bucket-name].s3-website-[region].amazonaws.com/#/fase3
http://[bucket-name].s3-website-[region].amazonaws.com/#/riesgos
http://[bucket-name].s3-website-[region].amazonaws.com/#/estimacion
http://[bucket-name].s3-website-[region].amazonaws.com/#/hitos
http://[bucket-name].s3-website-[region].amazonaws.com/#/metricas
```

### 4. Verificar funcionalidad

- [ ] ✅ Carga página principal
- [ ] ✅ Navegación entre páginas funciona
- [ ] ✅ Estilos se aplican correctamente
- [ ] ✅ No hay errores en consola
- [ ] ✅ Links externos funcionan

---

## 🔄 Mantenimiento

### Actualizar contenido

```bash
# 1. Hacer cambios en el código
# 2. Build de producción
cd apps/migration-plan
pnpm build:production

# 3. Deploy a S3
export S3_BUCKET=migration-plan-cv-hibrid
pnpm deploy:s3

# 4. Verificar cambios (puede tardar 1-2 min en propagarse)
# Refrescar navegador con Ctrl+F5 (hard refresh)
```

### Invalidar cache del navegador

Si los cambios no se ven:

```bash
# Los usuarios deben hacer hard refresh:
# - Chrome/Firefox: Ctrl + F5 / Cmd + Shift + R
# - Safari: Cmd + Option + R

# O borrar cache del navegador
```

### Rollback a versión anterior

```bash
# S3 versionado (si está habilitado)
aws s3api list-object-versions \
  --bucket migration-plan-cv-hibrid \
  --prefix index.html

# Restaurar versión específica
aws s3api copy-object \
  --copy-source migration-plan-cv-hibrid/index.html?versionId=[VERSION_ID] \
  --bucket migration-plan-cv-hibrid \
  --key index.html
```

---

## 🐛 Troubleshooting

### Error: "AccessDenied"

**Causa**: Bucket policy no permite lectura pública

**Solución**:
```bash
# Verificar política
aws s3api get-bucket-policy --bucket migration-plan-cv-hibrid

# Aplicar política pública (ver sección Configuración S3)
```

### Error: 404 en rutas

**Causa**: Esto NO debería pasar con HashRouter

**Verificación**:
```bash
# Las URLs deben tener # antes de la ruta
✅ Correcto: http://.../#/fase1
❌ Incorrecto: http://.../fase1
```

### Assets no cargan (404)

**Causa**: Base path incorrecto

**Solución**: Verificar `vite.config.ts` tiene `base: './'`

### Estilos no se aplican

**Causa**: CORS o cache

**Solución**:
```bash
# 1. Hard refresh (Ctrl+F5)
# 2. Verificar CORS configurado
# 3. Invalidar cache de assets

aws s3 rm s3://migration-plan-cv-hibrid/assets/ --recursive
pnpm deploy:s3
```

### Build muy grande (> 1 MB)

**Verificar**:
```bash
# Analizar bundle
cd apps/migration-plan
pnpm build:production

# Ver tamaño de chunks en la salida del build
# Si algún chunk > 500 KB, considerar code splitting
```

---

## 📊 Métricas y Costos

### Tamaño del Build

```
Total size: ~700 KB (uncompressed)
Gzipped: ~160 KB
Files: ~20 archivos

Distribución:
- JavaScript: ~390 KB (gzipped: ~105 KB)
- React vendor: ~140 KB (gzipped: ~45 KB)
- CSS: ~17 KB (gzipped: ~4 KB)
- HTML: ~2 KB
```

### Costos Estimados S3 (us-east-1)

```
Storage:
- 1 MB × $0.023/GB = ~$0.00002/mes

Requests (1000 visitas/mes):
- 1000 GET × $0.0004/1000 = $0.0004/mes

Data Transfer (100 visitas × 700 KB):
- 70 MB × $0.09/GB = ~$0.006/mes

TOTAL: < $0.01/mes
```

---

## 🔐 Seguridad

### Recomendaciones

1. **Usar HTTPS**: Considerar CloudFront para SSL
2. **Bucket privado**: Si es documentación sensible
3. **Versionado**: Habilitar S3 versioning para rollbacks
4. **Backup**: S3 Cross-Region Replication (opcional)
5. **Monitoring**: CloudWatch logs para accesos

### Hacer bucket privado (solo VPN)

```bash
# Remover política pública
aws s3api delete-bucket-policy --bucket migration-plan-cv-hibrid

# Configurar acceso solo desde VPC
# (Requiere configuración de VPC endpoint - contactar DevOps)
```

---

## 📚 Referencias

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)

---

## 🆘 Soporte

**Contacto DevOps**:
- Email: devops@company.com
- Slack: #devops-support
- Ticket Jira: Proyecto DEVOPS

**Documentación del proyecto**:
- README principal: `/readme.md`
- Plan de migración: `/plan_migracion.md`
- CHANGELOG: `/apps/migration-plan/CHANGELOG.md`


