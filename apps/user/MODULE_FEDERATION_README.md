# CV App User - Module Federation Setup

## 📋 Status: ✅ Ready for Module Federation

**Version:** 2.0.0  
**Webpack:** 5.90.3  
**Port:** 3003  
**Remote Name:** `userApp`

---

## 🎯 Module Federation Configuration

### Exposed Modules
- `./App` → `/src/app/index.tsx` (Main entry point)

### Shared Dependencies
- `react` (^18.2.0) - singleton, eager
- `react-dom` (^18.2.0) - singleton, eager
- `react-router-dom` - singleton, eager
- `zustand` - singleton, eager

### Remote Entry URL
```
http://localhost:3003/dist/remoteEntry.js
```

---

## 🚀 Running as Remote

### Development Server
```bash
npm run serve
```

This will:
- Run webpack-dev-server on port 3003
- Enable hot reload
- Expose remoteEntry.js
- Enable CORS for shell consumption

### Build for Production
```bash
npm run master-build
```

---

## 🔧 Configuration Files

### `webpack.config.js`
- ✅ ModuleFederationPlugin configured
- ✅ TerserPlugin for minification
- ✅ devServer with CORS headers
- ✅ Port 3003
- ✅ TypeScript support (ts-loader)

### `package.json`
- ✅ webpack-dev-server@^4.15.2
- ✅ `serve` script added

---

## 🔗 Integration with Shell

The shell app loads this remote at:
```javascript
// shell-webpack/webpack.config.js
remotes: {
  userApp: 'userApp@http://localhost:3003/dist/remoteEntry.js',
}
```

Used in shell via:
```typescript
// shell-webpack/src/App.tsx
const UserApp = lazy(() => import('userApp/App'));

<Route path="user/*" element={
  <Suspense fallback={<RemoteLoading />}>
    <UserApp />
  </Suspense>
} />
```

---

## ✅ Checklist

- [x] Webpack 5 already using
- [x] Module Federation Plugin added
- [x] Remote name configured (`userApp`)
- [x] App exposed (`./App`)
- [x] Shared dependencies configured
- [x] webpack-dev-server installed
- [x] Dev server configured (port 3003)
- [x] CORS headers enabled
- [x] `serve` script added
- [ ] Tested standalone
- [ ] Tested with shell integration

---

## 📝 Next Steps

1. **Test Standalone:**
   ```bash
   npm run serve
   # Visit http://localhost:3003
   ```

2. **Test with Shell:**
   ```bash
   # Terminal 1: Run this app
   npm run serve
   
   # Terminal 2: Run login (required for auth)
   cd ../login
   npm run serve
   
   # Terminal 3: Run shell
   cd ../shell-webpack
   npm run dev
   
   # Visit http://localhost:3000
   # Login first, then navigate to /user
   ```

3. **Verify:**
   - User app loads in shell (after login)
   - No console errors
   - Shared dependencies work (React, React-DOM, MUI)
   - Navigation works
   - Hot reload works

---

## 🐛 Troubleshooting

### Remote not loading in shell
- Verify app is running on port 3003
- Check console for CORS errors
- Verify remoteEntry.js is accessible: http://localhost:3003/dist/remoteEntry.js
- Ensure you're logged in (User app requires authentication)

### MUI/Material-UI issues
- This app uses MUI v5 extensively
- Shared MUI dependencies should be configured in Module Federation
- May need to add MUI to shared config if there are version conflicts

### Version conflicts
- Ensure React 18.3.1 is used
- Check shared dependencies in webpack config
- Use `--legacy-peer-deps` when installing

### Build errors
- Clear cache: `rm -rf node_modules/.cache`
- Clear webpack cache: `rm -rf node_modules/.cache/webpack`
- Reinstall: `npm install --legacy-peer-deps`

---

## 📚 Tech Stack

- React 18.3.1
- TypeScript 5.3.3
- Material-UI (MUI) 5.13.4
- Redux Toolkit 1.9.7
- React Router DOM 6.3.0
- Internal CV libraries (@npm_leadtech/*)

---

## 📚 References

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Phase 1 Roadmap](/logsV3.md)
- [Shell Setup](/apps/shell-webpack/README.md)
- [Login App](/apps/login/MODULE_FEDERATION_README.md)

---

**Created:** 2025-10-06  
**Task:** 1.4-1.5 (Webpack 5 + Module Federation)  
**Branch:** feature/phase1-webpack-mf  
**Priority:** HIGH (User & Login first)
