# Jogger App
Basic Jogger App

## Contents
1. [How to run locally](#how-to-run-locally)
2. [Deployment](#deployment)

## How to run locally
`DEBUG=monish-gupta:* npm run dev`
Open http://localhost:3000 to test changes.

## Running optimised version
`npm run build && npm start`
Open http://localhost:3001 to test changes.

## Demo

## APIs
Route | HTTP Verb | Description|Policy|Rules
--- | --- | ---| ---| ---
/api/users | GET | Get all the users.|crud user|admin|
/api/users | POST | Create a user.|crud user|admin|
/api/users/:userId | GET | Get a single user.|crud user|admin|
/api/users/:userId | PUT | Update a user with new info.|crud user|admin|
/api/users/:userId | DELETE | Delete a user.|crud user|admin|
/api/records | GET | Get all the records.|crud all records|admin, user manager|
/api/records | POST | Create a record.|crud all records|admin, user manager|
/api/records/:recordId | GET | Get a single record.|crud all records|admin, user manager|
/api/records/:recordId | PUT | Update a record with new info.|crud all records|admin, user manager|
/api/records/:recordId | DELETE | Delete a record.|crud all records|admin, user manager|
/api/:userId/records | POST | Create a record of user userId.|crud records by self|regular user|
/api/:userId/records/:recordId | GET | Get a single record of user userId.|crud records by self|regular user|
/api/:userId/records/:recordId | PUT | Update a record with new info of user userId.|crud records by self|regular user|
/api/:userId/records/:recordId | DELETE | Delete a record of user userId.|crud records by self|regular user|

## DB Schema
### Table JoggerAppRecord
Column Name|Data Type|Key Type
---|---|---
UserId | String | Primary partition key
DistanceInMiles | Number | 
TimeDurationInMinutes | Number | 
LastModifiedTimeStamp | Number | 
CreatedTimeStamp | Number | Primary sort key

### Table JoggerAppUser
Column Name|Data Type|Key Type|Comments
---|---|---|---
Id | String |Primary partition key|
Role | String. Any of Admin/Manager/User||
UserName|String||
Password | String || Encrypted string
LastModifiedTimeStamp | Number || 
CreatedTimeStamp | Number || 

## Todo
### add authN api & UI routes to the list 
### UI
### Understand authN token flow and any improvements.
### Server side validations