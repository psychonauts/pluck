# Pluck

> P l u c k  is a produce sharing, food waste
prevention app that hinges around
neighborhood + community.

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

- npm start: starts the development server and compiles client files
- npm build: compiles the current state of the client files (typically used when starting the production server)
- node server/index.js: starts the production server (typically used to connect to database and complete http requests)


## Requirements

- Node 8.15.0
- mySql 2.16.0


## Development

Client Files:
- index.jsx - main app component
- CreatePlantProfile - component responsible for creating the plant's profile
- MapView - component with the map and mapbox api
- myProfile - component responsible for viewing current user's profile
- Nav - components with the navigation bar
- PlantList - component for rendering the list of plants in the area
- UserLogin - component for logging in the user
- UserProfile - component creates a new user profile
- ViewPlantProfile - component responsible for seeing all the plants profile
- Zip-code - component renders the zip code input box 

Back-end Files:
- database/index.js - the database configuration
- database/sensitive-data.js - the database credentials 
- server/index.js - the server


### Installing Dependencies

From within the root directory:

```
npm install
```

### Roadmap

View the project roadmap [here](https://github.com/la-z/pluck/issues)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
