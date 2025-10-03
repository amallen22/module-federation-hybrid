# Shell Webpack - Module Federation Host

This is the **Shell Application** for the CV Apps Module Federation architecture. It acts as the **host** that loads and orchestrates all remote applications.

## 🎯 Purpose

- **Module Federation Host**: Loads all 17 remote apps
- **Global State Management**: Zustand store shared across all apps
- **Router Orchestration**: Manages navigation between microfrontends
- **Authentication**: Controls access to protected routes

## 🏗️ Architecture

```
Shell (localhost:3000)
├── Zustand Global Store
├── React Router
└── Remote Apps:
    ├── Login (localhost:3001)
    ├── Editor (localhost:3002)
    ├── User (localhost:3003)
    ├── Payment (localhost:3004)
    ├── Shop (localhost:3005)
    └── ... (12 more)
```

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
# Start dev server on port 3000
npm run dev
```

Then open http://localhost:3000

## 🔨 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Shell loads at localhost:3000
- [ ] Mock login works (Zustand store updates)
- [ ] User info appears in header after login
- [ ] Navigation menu appears after login
- [ ] Logout works
- [ ] State persists in localStorage
- [ ] Responsive design works on mobile

### Testing Zustand Store

Open Redux DevTools in browser to inspect:
- User state
- Session data
- Shared data between apps
- Notifications

## 📝 Current Status (Phase 1)

### ✅ Completed (Tasks 1.1 - 1.3)
- [x] Project setup
- [x] Webpack 5 + Module Federation configuration
- [x] Zustand global store
- [x] Layout and Navigation components
- [x] Routing setup
- [x] Basic styling

### 🔄 Next Steps (Tasks 1.4 - 1.8)
- [ ] Task 1.4: Upgrade 8 apps from Webpack 4 → 5
- [ ] Task 1.5: Configure Module Federation in all 17 apps
- [ ] Task 1.6: Connect remotes to shell
- [ ] Task 1.7: Migrate from cookies to Zustand
- [ ] Task 1.8: Integration testing

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `webpack.config.js` | Module Federation + Webpack config |
| `src/stores/globalStore.ts` | Zustand global state management |
| `src/components/Layout.tsx` | Main layout wrapper |
| `src/components/Navigation.tsx` | Navigation menu |
| `src/App.tsx` | Routing configuration |

## 🌐 Shared Dependencies

The shell shares these dependencies as singletons:
- `react` (^18.2.0)
- `react-dom` (^18.2.0)
- `react-router-dom` (^6.20.0)
- `zustand` (^4.5.0)

Remote apps must use compatible versions.

## 🔌 Adding a New Remote App

1. Add remote to `webpack.config.js`:
```javascript
remotes: {
  newApp: 'newApp@http://localhost:3XXX/remoteEntry.js',
}
```

2. Add route to `src/App.tsx`:
```typescript
const NewApp = lazy(() => import('newApp/App'));
// ...
<Route path="newapp/*" element={<NewApp />} />
```

3. Add nav link to `src/components/Navigation.tsx`:
```typescript
{ path: '/newapp', name: 'New App', icon: '🆕' }
```

## 📚 Documentation

See [logsV3.md](../../logsV3.md) for full Phase 1 roadmap and detailed tasks.

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module not found errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear webpack cache
rm -rf dist .webpack_cache
npm run build
```

## 📞 Support

For questions or issues, refer to:
- Phase 1 documentation: `logsV3.md`
- Webpack Module Federation docs: https://webpack.js.org/concepts/module-federation/
- Zustand docs: https://zustand-demo.pmnd.rs/

---

**Version:** 1.0.0  
**Phase:** 1 (Webpack Module Federation)  
**Status:** 🟢 Development
