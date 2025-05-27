# Build and serve three apps in parallel
dev:
	@echo 'Starting all services...'
	pnpm run dev

build:
	@echo 'Building all packages...'
	pnpm run build

clean:
	@echo 'Cleaning builds...'
	rm -rf apps/*/dist packages/*/dist
