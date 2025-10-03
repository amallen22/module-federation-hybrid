# 🧪 Testing Guide - Shell Webpack

## 🚀 Quick Start Testing

```bash
cd /home/amallen/www/cv-apps/cv-hibrid/apps/shell-webpack
npm run dev
```

Then open: http://localhost:3000

---

## ✅ Test Checklist

### 1. Initial Load
- [ ] Page loads without errors
- [ ] No console errors (check DevTools)
- [ ] Favicon appears in browser tab
- [ ] Title shows "CV Apps - Module Federation Shell"
- [ ] Header with gradient background visible
- [ ] Welcome page shows "Module Federation Shell" heading

### 2. Mock Login Flow
- [ ] Click "🔑 Mock Login" button
- [ ] Page content changes to show "Shell Application Running!"
- [ ] User info appears in header: "👤 Demo User" + "ADMIN"
- [ ] Navigation menu appears with 8 app links
- [ ] Logout button appears (red button at end of nav)

### 3. Navigation
- [ ] Click on "Editor" link
- [ ] URL changes to `/editor`
- [ ] Navigation link highlights (lighter background)
- [ ] Page shows "✏️ Editor App (Remote)" placeholder
- [ ] Try other links: User, Payment, Shop, etc.
- [ ] All routes work without page reload

### 4. Logout
- [ ] Click "🚪 Logout" button
- [ ] User info disappears from header
- [ ] Navigation menu disappears
- [ ] Redirects to home/login
- [ ] Only "Login" link visible

### 5. Protected Routes
- [ ] Without login, try to go to `/user` directly
- [ ] Should redirect to `/login`
- [ ] After login, can access `/user`

### 6. Zustand Store (Redux DevTools)
- [ ] Open Chrome DevTools (F12)
- [ ] Go to "Redux" tab (if extension installed)
- [ ] Click "Mock Login"
- [ ] See `setUser` action in DevTools
- [ ] Inspect state: `user`, `isAuthenticated`, `sessionData`
- [ ] Click logout
- [ ] See `logout` action
- [ ] State cleared

### 7. LocalStorage Persistence
- [ ] Login
- [ ] Open DevTools → Application → Local Storage
- [ ] Find key: `cv-global-storage`
- [ ] Should contain user data
- [ ] Refresh page (F5)
- [ ] Still logged in (state persisted!)
- [ ] Logout
- [ ] LocalStorage cleared

### 8. Responsive Design
- [ ] Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test mobile view (375px width)
- [ ] Navigation should stack vertically
- [ ] All content readable
- [ ] Test tablet view (768px)
- [ ] Test desktop view (1400px)

### 9. Module Federation
- [ ] Check Network tab in DevTools
- [ ] Should see `remoteEntry.js` files loading (when remotes added)
- [ ] Check Console for Federation logs
- [ ] No "chunk load failed" errors

### 10. Build Production
```bash
npm run build
npm run preview
```
- [ ] Build completes without errors
- [ ] Bundle sizes reasonable:
  - Main: ~168 KB
  - Vendors: ~83 KB
- [ ] Preview server starts on port 3000
- [ ] App works same as dev mode

---

## 🐛 Common Issues & Fixes

### Issue: "Shared module not available for eager consumption"
**Fix:** Already fixed! `react-router-dom` has `eager: true`

### Issue: Favicon 404
**Fix:** Already fixed! `favicon.svg` added

### Issue: Port 3000 already in use
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Issue: Module not found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Hot reload not working
- Check webpack-dev-server logs
- Try hard refresh (Ctrl+Shift+R)
- Restart dev server

---

## 📊 Performance Testing

### Lighthouse Score (Target)
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

Run Lighthouse:
1. Open DevTools → Lighthouse tab
2. Click "Generate report"
3. Review scores

### Bundle Size Check
```bash
npm run build
ls -lh dist/
```

Expected sizes:
- `main.*.js`: < 200 KB
- `*.js` (vendors): < 100 KB
- Total: < 300 KB

---

## 🧪 Advanced Testing

### Test Zustand Store Directly
Open browser console:
```javascript
// Get store instance
const store = window.__ZUSTAND_DEVTOOLS_STORE__

// Test setUser
store.setUser({
  id: '2',
  email: 'test@example.com',
  name: 'Test User',
  role: 'User'
})

// Test sessionData
store.setSessionData('token', 'abc123')
console.log(store.sessionData)

// Test notifications
store.addNotification({
  type: 'success',
  message: 'Test notification!'
})

// Test logout
store.logout()
```

### Test Routing Programmatically
```javascript
// In console
window.location.href = '/user'
window.location.href = '/payment'
```

### Stress Test (Multiple Tabs)
- Open 5+ tabs with localhost:3000
- Login in all tabs
- Verify state syncs via localStorage
- Logout in one tab
- Check if others update

---

## 📝 Test Results Template

```markdown
## Test Results - [Date]

**Tester:** [Your Name]
**Browser:** Chrome/Firefox/Safari [Version]
**OS:** Ubuntu/Windows/Mac

### Results
- Initial Load: ✅/❌
- Mock Login: ✅/❌
- Navigation: ✅/❌
- Logout: ✅/❌
- Protected Routes: ✅/❌
- Zustand Store: ✅/❌
- LocalStorage: ✅/❌
- Responsive: ✅/❌
- Production Build: ✅/❌

### Issues Found
1. [Issue description]
2. [Issue description]

### Screenshots
[Attach if needed]

### Notes
[Any additional observations]
```

---

## 🎯 Acceptance Criteria

Shell is ready for Task 1.4 when:
- ✅ All 10 test sections pass
- ✅ No console errors
- ✅ Production build succeeds
- ✅ Bundle size < 300 KB
- ✅ Lighthouse score > 80
- ✅ Works on Chrome, Firefox, Safari
- ✅ Mobile responsive
- ✅ Documentation complete

---

## 📞 Support

If tests fail:
1. Check `COMPLETED-TASKS.md` for known issues
2. Review `README.md` troubleshooting section
3. Check GitHub issues
4. Ask team for help

---

**Last Updated:** 2025-01-10  
**Version:** 1.0.0  
**Status:** Ready for Testing
