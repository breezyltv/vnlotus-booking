## A MERN stack app + Apollo graphQL project.

- Lotus Homestays is a simple project to view and book a homestays or hotel for vacation rentals, and tourism activities

## Features:

- Written in Typescript from front end to back end.
- GraphQL for APIs
- Responsive design.

### Database:

- MongoDB Atlas

### Backend:

- Node.js
- GraphQL
- Apollo server express
- Handling login Google's OAuth 2.0
- Validation: Yup
- Cookie-parser: store token in cookie for more security and avoid XSS attack
- bcryptjs: Encrypt password (planning for local account) :spiral_calendar:
- Jwt token: sign a token for user/ set expired time (planning for local account) :spiral_calendar:
- Passport: get/check current user, protect private API (planning for local account) :spiral_calendar:

### Frontend:
- React.js framework
- Functional component
- UI framework: Ant design
- Styled Components: help customize antd's components
- Apollo client
- RxJS: handling dynamic search with debounce. (planning for practicing) :building_construction:

### DevOps:
- Github :white_check_mark:
- Docker :white_check_mark:
- Nginx :white_check_mark:
- Deploy to DigitalOcean :hammer_and_wrench:

## Available Scripts

Clone project and in the project directories, you can run this command for each folders (client and server):

### 'npm install'

## :gear: Config:
### You need to step up environment variables in .env
- Follow .env.example to fill your variables, then changes its name to .env
### Run project local without Docker
- make sure that adds proxy in package.json in client folder.\
  ` "proxy": "http://localhost:5000/"`
- run command at the root folder:\
 `make` or `cd server && yarn run dev`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- GraphQL API endpoint:\
  Open [http://localhost:5000/api](http://localhost:5000/api)
### Run project local with Docker
- run command at the root folder:\
`docker-compose --env-file server/.env up --build --remove-orphans`
- or cd to server folder, then run:\
`make build`
- other commands:\
  turn down all containers\
  `make down`\
  turn down and remove all containers\
  `make down-V`

- Then, runs the app in the development mode.\
  Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

- GraphQL API endpoint:\
  Open [http://localhost:8080/api](http://localhost:8080/api)
- GraphQL API in Production:
  Open [http://localhost:8080/playground](http://localhost:8080/playground)

# :pray: Demo:

- coming soon
