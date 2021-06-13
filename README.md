## A MERN stack app + Apollo graphQL + Docker + nginx project.

- Lotus Homestays is a simple project to view and book a homestays or hotel for vacation rentals, and tourism activities
## :building_construction: Project is under construction.
- Demo: http://thevu.me/
- My Online Resume: http://thevu.me/about
- GIF:\
  ![alt text](https://github.com/breezyltv/vnlotus-booking/blob/master/demo/demo_lotus.gif?raw=true)
## Technologies - Features:

- Written in Typescript from front end to back end.
- GraphQL for APIs
- Responsive design.

### Database:

- MongoDB Atlas

### Backend:

- Node.js + Express
- GraphQL
- Apollo server express
- Handling login Google's OAuth 2.0
- Validation: Yup
- Cookie-parser: store token in cookie for more security and avoid XSS attack
- Jwt token: sign an access token and refresh token for user authentication/ set expired time :white_check_mark:
- Generate a CSRF Token with Crypto for every requests to avoid CSRF attack :white_check_mark:
- Argon2-ffi: Encrypt password, the winner of the Password Hashing Competition :white_check_mark:

### Frontend:
- React.js framework
- Functional component
- UI framework: Ant Design
- Styled Components: help customize antd's components
- Private route: protect private components
- Context Api: store an user's identity to global state.
- Using sessionStorage to store CSRF token / set CSRF token in headers for request
- Apollo client:
  - Hooks with useQuery and useMutation
  - Apollo-Link: a link chain to customize the flow of data between Apollo clietn and graphQl server.
  - apollo-link-token-refresh: an Apollo Link middleware to call refreshToken api to handle expired access token and CSRF Token before do others authorized requests :white_check_mark:
- RxJS: handling dynamic search with debounce. (planning for practicing) :building_construction:

### DevOps:
- Github :white_check_mark:
- Docker :white_check_mark:
- Nginx :white_check_mark:
- Deploy to DigitalOcean Droplets :white_check_mark:

## Available Scripts

Clone project and in the project directories, you can run this command for each folders (client and server):

### 'yarn install'

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
- GraphQL API in Production:\
  Open [http://localhost:8080/graphql](http://localhost:8080/graphql)

## My Online Resume Screenshot
* URL: http://thevu.me/about
![alt text](https://github.com/breezyltv/vnlotus-booking/blob/master/demo/my_resume.png?raw=true)