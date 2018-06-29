Factern Demo application CVVerify using GraphQL and Graph*i*QL
==========================================================

## What is this repository for?

This demo uses Factern for providing the GraphQL backend for an application called CVVerify which is a 
platform where job seekers can verify the claims they make on their CVs by providing public links to employers 
that are certified by credential providers (like universities, companies, etc.).

## What do you need?

- Clone and build this repo
- Sign-up for a Factern login. See http://docs.factern.net/users-guide/ for acquiring a clientId, clientSecret and loginId.

## To build:
 - npm install

## To bootstrap:

Use the clientId, clientSecret and login to generate a JWT using the instructions in the [documentation](http://docs.factern.net/users-guide/). 
Use this JWT to bootstrap the credential provider account. The bootstrap script (`bootstrap/index.js`) 
produces a `constants.json` file that you should copy to the `src/factern` directory.

## To run:

Set the clientId, clientSecret and login as environment variables CLIENT_ID, CLIENT_SECRET and LOGIN_ID 
that will be used by the GraphQL application. These values should belong to the same
account that was used to bootstrap the credential provider account.

    export CLIENT_ID='zYAKggrtvpGcP9nyIqa355c71gCTJReB'
    export CLIENT_SECRET='<client_secret>'
    export LOGIN_ID='00000000A22F0ECC0C4D9712D2F208B6CD7BD2E00D7783D5'

### Start

 - Start the GraphQL application using `npm start -s`

## To use:
 Open http://localhost:1337/graphiql
 
 - Create a subject profile
 
 ```angular2html
mutation spc($input: SubjectProfileInput!, $auth: FacternAuthDetails!) {
  subjectProfileCreate(input: $input, auth: $auth) {
    id
  } 
}
```

 The variables `$input` and `$auth` should be specified in the Query Variables section in the bottom of the
 GraphiQL console.
 
 ```angular2html
{
  "input": {
    "fullName": "John Smith",
    "mobile": "123-456-7890",
    "email": "jsmith@uwaterloo.ca",
    "address": "1 Erb St W, Waterloo, ON"
  },
  "auth": {
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqUXpORE01TWtRNFJqWkZNVEEwTnpFd01FVkRSREpHTVRSRk9UaEVPVU0xTURVeVJEZ3pPQSJ9.eyJodHRwczovL2FwaS5mYWN0ZXJuLmNvbS9hcHBfaWQiOiIwMDAwMDAwMDcyQ0MxREFBQUVDMUFEOUUyOTMyMUZDQjVGRjg2QjAxMUY4ODRBOTYiLCJpc3MiOiJodHRwczovL2ZhY3Rlcm4tdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiTWxiVzFXejZ4cHJCQTRDYjNHaHBCWFlUQVM1WG1Mc1hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLmZhY3Rlcm4uY29tIiwiaWF0IjoxNTI5MDg4MjIyLCJleHAiOjE1MjkxNzQ2MjIsImF6cCI6Ik1sYlcxV3o2eHByQkE0Q2IzR2hwQlhZVEFTNVhtTHNYIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.3dXZGa5Ul-TPJUmf9fpFYhsVB7pRjvTY78n1LNRQ4xvswsgDO-mVYwPQr7eYOK8T4ZEdvllIhKgSVTDtHzw3joXaU0ZoGQ-NzpuDF-rmovj3zEtQGXU28eWMIOcJVMPkSM6FlR2xaz17SnhKIWMKZcqTxEyAYXMeVUNBbYLDVesmHCcG-qktyeI5BTAMprr3ONztH1L2f0VplxrOD-CV5UMabNvFu6qVe8WkfblGHsKjNwZ4zOyDo4qa_4QWLEZj7BgbPfy-MgtBZyYSTmvMstRqr55hgveo0Hx9rtBOwski6J7aNGqqpHezZC66Ow1Uz6rIC3PBLgmuygGYA8XD2Q",
    "login": "00000000DA85C2A323CF162568AFD162552B9F8AD14DAAA9"    
  }
}
``` 

Execute the mutation request, and the result will be a 192 bit Factern ID that identifies the subject (job seeker). 

- The subject that was just created against login ID `00000000DA85C2A323CF162568AFD162552B9F8AD14DAAA9` can be queried using

```angular2html
query spg($auth: FacternAuthDetails!){
  subjectProfileGet(auth: $auth) {
    id
    fullName
    mobile
    email
    address
  }
}
```

For a full list of queries and mutations that are supported, opens the Docs side bar on Graph*i*QL.
