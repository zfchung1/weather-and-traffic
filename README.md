# Weather and Traffic

A simple web application that shows traffic cam and weather information on a particular location.

## Description

Requirements: the team wants to create a simple application utilizing the open source data from
https://guide.data.gov.sg/developers/api-v2. We will be using the following APIs:

1. Traffic Images ([link]("https://beta.data.gov.sg/datasets/d_6cdb6b405b25aaaacbaf7689bcc6fae0/view"))
2. Weather
   Forecast ([link]("https://beta.data.gov.sg/collections/1456/datasets/d_91ffc58263cff535910c16a4166ccbc3/view"))

Features Completed:

1. Allow the user to choose a date and time, then show a list of locations with traffic cam photos for the specified
   date and time. (API 1: Traffic Images)
2. Show the list of locations from API 1 (Traffic Images) only has lat/long without name, use a reverse geocoding
   service (API 2: Weather Forecast) to display more user friendly location names
3. When the user selects a location from the list, show the traffic cam photo, and also the weather info for that
   location from API 2 (Weather Forecast) (or the nearest available weather info depending on what API 2 can return)
   * Demonstrated how we can cache data of 3rd party API using traffic cam API in "./packages/api/data/src/trafficImages/index.ts"
   * Not able to finish for other APIs due to time constraint
   * Possible to create a Redis Client instead for production scalability implementation instead of Memory Client. 
4. Using browser cache or other methods, recommend to the user 1) his/her most recent searches and 2) the most recent
   searches of other people.
   * Currently, the app is showing the most recent search of other people by artificially creating dummy records to demonstrate the feature. 
   * Any database management should be handled by DB Migration tool. In this project, it is using KnexJS Migration as a demonstration.


Incomplete Features:
1. Upon a user's interaction, send telemetry back to backend to update the search records using a POST API. 
2. Report generation:
   a. Create an api to retrieve the most recent 10 date time + location searched by all
   users consolidated.
   b. Create an api to retrieve the top 10 date time + location searched within a period. c. Create an api to retrieve
   the period of which there are most searches performed.

## Assumptions and Interpretations
* Assuming that we should not store user's details; the search record table is designed with such assumption. 
* While the project is requested to be built in NestJS, the application is intentionally built to decouple HTTP (server) concerns from business and data concerns. Segregating as such helps to decouple framework from business and data logic, and aids in the future in case we need to migrate framework. 
* 

## Improvements desired
1. Error Handling
   * Ideally we should have Error Objects created at data layer and business layer such that controller / request handler layer can receive and recognize the types of error. 
   * If business layer knows how to handle specific data error (e.g. not found), then business layer can catch it and return values accordingly. Else, business layer should throw the error to the higher level to manage it.
   * Avoid console log only at catch() to avoid error hiding. 
   * At the highest level, controller / request handler could manage by sending relevant HTTP Status Code to explain behaviours / errors. 
2. Automated Test 
   * Unit Test ideally should be >80% to give us a good enough level of confidence to release software. Although, at the end of the day test coverage just means "THE CODE HAS RUN", it does not guarantee the quality of tests.
   * Follow test automation pyramid, and have good amount of E2E tests (could be API test or GUI test) to test scenarios. Most test should be managed and handled at unit level, due to the cost and feedback time of the tests.
3. UI Interface
   * The application UI is built with the bare minimum effort, enough to demonstrate certain level of responsiveness. 
   * When there is waiting time from dependencies (e.g. API loads data), it'd be good to provide user some feedback by having a skeleton / loading animation to avoid confusion for users. 
   * Ideally, we should also measure the frontend using LightHouse or Web Vitals as a benchmark. 
4. Eslint 
5. Hosting demonstration
   * If time permitted, would love to demonstrate how to setup CI/CD using Github Actions, Terraform. We could consider Serverless architecture / K8s based on the demand of the traffic, and if we need to consider to lift and shift the application from different cloud hosting providers. 


## Getting Started

### Prerequisites

[List software and tools needed to run the project, such as programming languages, libraries, frameworks, etc.]
Example: Python 3.8+
Example: Node.js 14+
Example: Docker

* Node.js 20+
* Yarn 1.22.22 +
* PostgresQL 16.1

### Installation

1. Clone the repository:

```shell
git clone https://github.com/zfchung1/weather-and-traffic
cd weather-and-traffic
``` 

2. Install Dependencies

`yarn` to install dependencies, while `yarn build` to build dependencies to be used between packages in monorepo (yarn
workspaces).

```shell
yarn
yarn build
```

### Configuration

Create and populate `.env` file at the project folder root level based on the example provided in `.env-example`. 

### Running the application

Create dummy records to test the Report APIs. Running this command will create a set of record in the database to
simulate a search history of locations by users in the past.

```shell
yarn db-migration:migrate
```

Run the application. The frontend application will be running at local host port 3000, API application will be running
on port 9001.

```shell
yarn start 
```

### Running Test

```shell
yarn test 
```

## Contact

* Chung Zhan Foong (Zack)
* zfchung1@gmail.com
* https://github.com/zfchung1