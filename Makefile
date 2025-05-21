setup:
	cd frontend-admin && npm install
	cd frontend-user && npm install

up:
	docker-compose up -d

down:
	docker-compose down
