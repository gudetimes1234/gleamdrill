.PHONY: dev build deploy

dev:
	gleam run -m lustre/dev start

build:
	gleam run -m lustre/dev build

deploy: build
	vercel deploy --prod
