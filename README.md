# kraken-flex-tt

This is a simple node program that interacts with Kraken Flex's Mock API to:

1. Retrieve all outages from the `GET /outages` endpoint
2. Retrieve information from the `GET /site-info/{siteId}` endpoint for the site with the ID `norwich-pear-tree`
3. Filter out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of devices in the site information
4. For the remaining outages, attach the display name of the device in the site information to each appropriate outage
5. Send this list of outages to `POST /site-outages/{siteId}` for the site with the ID `norwich-pear-tree`

The API's documentation can be viewed by going to [swagger.io](https://editor.swagger.io/) and pasting the contents of the `api.yml` found in the root folder of this project into the panel on the left hand side of the page.

## Requirements

In order to get this project running on your local machine, you must follow the below steps:

### Install nvm

In order to download Node v16 a Node package manager is required and the most commonly used is `nvm`. An instructional guide can be found [here](https://github.com/nvm-sh/nvm)

### Install Node v16

This project uses node v16 and this can be installed directly from your terminal using `nvm` when in the root of the project as follows:

```
nvm install 16
nvm use 16
node -v
```

### Install dependencies

While remaining in the root of the project, install all project dependencies from the command line with:

```
npm i
```

## Running the program

The program is run by executing the below command from the terminal while in the root of the project:

```
npm run handler
```

You will see logs in your terminal providing live feedback on the progress of the program. Any errors will be logged here too.

## Testing the code

This program uses Jest as the testing framework and the following command will trigger a run of all the unit tests: 

```
npm test
```

The best and most convenient way to run individual unit tests is by adding the `Jest Runner` extension to your chosen IDE, if available.

## Notes:

- I was hoping to containerise this using Docker to remove any issues of differing environments but the Docker Desktop app was not playing ball on my laptop
- This would work well as an AWS Lambda function
- I wouldn't normally add comments to my code but have done in this case just to explain some of my decisions
