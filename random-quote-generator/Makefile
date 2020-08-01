.PHONY: dev-build prod-build dev-api dev-client dev-run sh start stop clean

dev-build:
	docker build -t api .

prod-build:
	docker build -f Dockerfile.prod -t api .

dev-api:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 api denon

dev-client:
	pnpx live-server client

dev-run:
	make -j dev-api dev-client

sh:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 --entrypoint=/bin/sh api

start:
	docker run --rm -it -v "${PWD}/.":/opt/deno_app -p 3000:3000 api

stop:
	docker ps -aq | xargs docker stop

clean:
	docker ps -aq | xargs docker rm
