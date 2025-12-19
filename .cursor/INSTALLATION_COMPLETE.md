# ✅ Comandos de Cursor AI - Instalación Completada

## 📦 Archivos Creados

```
.cursor/
├── git/
│   ├── test-and-build-all.yaml       # Comando principal: tests + build + E2E
│   ├── test-commands.yaml            # Comandos específicos de testing
│   ├── maintenance-commands.yaml     # Comandos de mantenimiento
│   └── update-changelog-and-commit.yaml  # Ya existía
├── CURSOR_COMMANDS.md                # Documentación completa
└── QUICK_REFERENCE.md                # Referencia rápida
```

## 🎯 Comandos Disponibles

### Testing y Build
- ✅ `test and build all` - Pipeline completo
- ✅ `run unit tests` - Solo tests unitarios
- ✅ `test watch` - Tests en modo watch
- ✅ `test coverage` - Tests + coverage
- ✅ `run e2e tests` - Solo tests E2E
- ✅ `build all apps` - Build de todas las apps
- ✅ `quick check` - Verificación rápida
- ✅ `run ci pipeline` - Simula CI/CD completo

### Mantenimiento
- ✅ `clean project` - Limpia node_modules y dist
- ✅ `start dev` - Inicia dev servers
- ✅ `stop all` - Detiene todos los servidores
- ✅ `update dependencies` - Actualiza deps

### Git
- ✅ `update changelog` - Actualiza changelog + commit + push

## 📝 Scripts Añadidos a package.json

```json
{
  "scripts": {
    "test": "vitest run --workspace",
    "test:watch": "vitest --workspace",
    "test:coverage": "vitest run --coverage --workspace",
    "test:unit": "vitest run --workspace",
    "test:all": "pnpm test:unit && pnpm test:e2e",
    "ci": "pnpm install --frozen-lockfile && pnpm test:unit && pnpm build:all && pnpm test:e2e"
  }
}
```

## 🚀 Cómo Usar

### En Cursor AI
1. Abre el Command Palette (Ctrl/Cmd + Shift + P)
2. Escribe el comando en lenguaje natural:
   - "test and build all"
   - "run unit tests"
   - "quick check"
3. Cursor ejecutará el comando automáticamente

### En Terminal
```bash
# Tests
pnpm test              # Tests unitarios
pnpm test:watch        # Tests en watch mode
pnpm test:coverage     # Tests + coverage
pnpm test:e2e          # Tests E2E
pnpm test:all          # Unit + E2E

# Build
pnpm build:all         # Build todas las apps

# CI
pnpm ci                # Pipeline completo
```

## 📚 Documentación

- **Guía Completa**: `.cursor/CURSOR_COMMANDS.md`
  - Explicación detallada de cada comando
  - Ejemplos de uso
  - Troubleshooting
  - Cómo crear nuevos comandos

- **Quick Reference**: `.cursor/QUICK_REFERENCE.md`
  - Referencia visual rápida
  - Flujos de trabajo recomendados
  - Tiempos estimados

## 🎯 Próximos Pasos

1. **Probar los comandos**:
   ```
   # En Cursor, ejecuta:
   quick check
   ```

2. **Ver la documentación**:
   - Abre `.cursor/CURSOR_COMMANDS.md`
   - Revisa los ejemplos

3. **Configurar tu workflow**:
   - Durante desarrollo: `test watch` en terminal separada
   - Antes de commit: `quick check`
   - Antes de push: `test and build all`

## ✨ Ventajas

- 🚀 **Automatización**: No necesitas recordar comandos complejos
- 💬 **Lenguaje Natural**: Usa frases normales en lugar de scripts
- 📊 **Feedback Visual**: Cada comando muestra progreso y resultados
- ⚡ **Productividad**: Workflows predefinidos optimizados
- 🔄 **CI/CD Local**: Simula pipeline completo antes de push

## 🎓 Ejemplos Rápidos

### Workflow Diario
```
1. pnpm dev                    # Terminal 1
2. test watch                  # Terminal 2 (Cursor)
3. [Desarrollar]
4. quick check                 # Antes de commit (Cursor)
5. git commit -m "..."
6. test and build all          # Antes de push (Cursor)
7. git push
```

### Pre-Deploy
```
1. run ci pipeline             # Cursor
2. [Verificar todo OK]
3. [Proceder con deploy]
```

## 🐛 Si Algo Falla

```
# Limpiar proyecto
clean project                  # En Cursor

# O manualmente
pnpm clean:all
pnpm install
pnpm test
```

## 📞 Soporte

- Ver troubleshooting en `.cursor/CURSOR_COMMANDS.md`
- Abrir issue en el repo si encuentras problemas
- Contactar al equipo en Slack #cv-hibrid-migration

---

**¡Todo listo para usar! 🎉**

Prueba tu primer comando:
```
quick check
```


