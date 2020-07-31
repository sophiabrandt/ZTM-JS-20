.PHONY: build-dev build-prod dev-api dev-client run-dev sh start test stop clean

build-dev:
	docker build -t api .

prod-prod:
	docker build -f Dockerfile.prod -t api .

dev-api:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 api denon

dev-client:
	pnpx live-server client

run-dev:
	make -j dev-api dev-client

sh:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 --entrypoint=/bin/sh api

start:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 api

test:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 api test

stop:
	docker stop (docker ps -aq)

clean:
	docker rm (docker ps -aq)
