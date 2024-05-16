# Weather and Traffic

A simple web application that shows traffic cam and weather information on a particular location.

## Description

Requirements: the team wants to create a simple application utilizing the open source data from
https://guide.data.gov.sg/developers/api-v2. You will be using the following APIs:

1. Traffic Images ([link]("https://beta.data.gov.sg/datasets/d_6cdb6b405b25aaaacbaf7689bcc6fae0/view"))
2. Weather
   Forecast ([link]("https://beta.data.gov.sg/collections/1456/datasets/d_91ffc58263cff535910c16a4166ccbc3/view"))

Features:

1. Allow the user to choose a date and time, then show a list of locations with traffic cam photos for the specified
   date and time. (API 1: Traffic Images)
2. Show the list of locations from API 1 (Traffic Images) only has lat/long without name, use a reverse geocoding
   service (API 2: Weather Forecast) to display more user friendly location names
3. When the user selects a location from the list, show the traffic cam photo, and also the weather info for that
   location from API 2 (Weather Forecast) (or the nearest available weather info depending on what API 2 can return)
4. Using browser cache or other methods, recommend to the user 1) his/her most recent searches and 2) the most recent
   searches of other people.
5. Report generation:
   a. Create an api to retrieve the most recent 10 date time + location searched by all
   users consolidated.
   b. Create an api to retrieve the top 10 date time + location searched within a period. c. Create an api to retrieve
   the period of which there are most searches performed.

Incomplete Features:


## Assumptions and Interpretations


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
git clone https://github.com/your-username/your-repo-name.git
cd weather-and-traffic
``` 

2. Set up environment

```shell

```

3. Install Dependencies

```shell
yarn
```

### Configuration

Create and populate `.env` file at the project folder root level based on the example provided in `.env-example`.

### Running the application

Create dummy records to test the Report APIs. Running this command will create a set of record in the database to simulate a search history of locations by users in the past. 

```shell
yarn db-migration:migrate
```

Run the application. The frontend application will be running at local host port 3000, API application will be running on port 9001.

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