Building backend with NestJS Framework
Setup default port: 3001
Setup default prefix to the app: /api/*
Setup the resource: transitions
Add 3 test suite for testing service, controller, api of the transitions resource

API has 3 route:
/GET /api/transitions 
/PUT /api/transitions/:color
/POST /api/transitions

Start the server:
npm run start:dev

Run all the test suite:
npm run test