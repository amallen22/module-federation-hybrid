import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/product/vite.config.ts",
  "./apps/shell/vite.config.ts",
  "./apps/login/vite.config.ts",
  "./packages/ui-kit/vite.config.ts",
])
