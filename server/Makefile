ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

build-dev:
	docker-compose up --build --remove-orphans

build-prod:
	docker-compose -f ../docker-compose.prod.yml up --build --remove-orphans

up:
	docker-compose up

down:
	docker-compose down

down-V:
	docker-compose down -v

volume:
	docker volume inspect mern-library-nginx_mongodb-data

logs-A:
	docker-compose logs --tail=0 --follow