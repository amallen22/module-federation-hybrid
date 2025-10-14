# Changelog - User App

All notable changes to the user app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-10-02

### Added
- **Mock Data System for Local Development**
  - Created centralized mock data file (`src/app/mocks/mockData.ts`)
  - Mock profile data with realistic user information
  - Mock languages data (English, Español, Français, Deutsch, Português)
  - Automatic environment detection (Vite-compatible)
  - Debug logs for development mode identification
  - Simulated network delays for realistic experience

### Changed
- **useProfile hook** - Now uses mock data in development mode
- **useLanguages hook** - Now uses mock data in development mode
- **App.tsx** - Uncommented profile logging for debugging

### Fixed
- Environment detection now works correctly with Vite (`import.meta.env`)
- App no longer gets stuck in InitialLoading state during local development
- Eliminated blocking CORS errors for profile and language endpoints

### Technical Details
- Detection uses `import.meta.env.MODE` for Vite compatibility
- Falls back to `process.env.NODE_ENV` for backwards compatibility
- Mock data only activates in 'local' or 'development' modes
- Production code path remains unchanged

### Benefits
- ✅ App loads without external API dependencies
- ✅ Faster development iteration
- ✅ No CORS blocking during local development
- ✅ Realistic data for UI development
- ✅ Easy to customize mock data per developer needs

---

## [2.0.0] - Previous

Initial Vite migration version.
