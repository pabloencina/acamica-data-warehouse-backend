# acamica-data-warehouse-backend

This project proposes the creation of a website that allows CRUD operations to be carried out on a contact database that includes their personal data, their preferences, contact data, where they work and where they live.

These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes.

## Prerequisites

* Clipboard Code Editor (Visual Studio Code or similar)

* NodeJS

* Mongo.DB Compass

* Postman

* Docker and Docker Compose

## Installation

#### Step 1

Create a local folder to host the repository

#### Step 2

Go to the created folder and clone the repository:
`git clone https://github.com/pabloencina/acamica-data-warehouse-backend.git`

Or download from Github site as .zip

With this you will have created the file structure and the content of the BackEnd of the application.

#### Step 3

Run the command `docker-compose up --build`. This will create the docker containers declared on the file docker-compose.yml.

#### Step 4

Access to the mongo database  with a client like Compass. The database has no password configured. Create in the datawarehouse database, in the collection users a document like: 

```json
{
    "name": "Santiago",
    "surname": "Cerrutti",
    "email": "santiago.cerr@gmail.com",
    "profile": "ADMIN",
    "password": "pass1234"
}
```

#### Step 5

Enter Postman and go to the menu and select FILE / IMPORT and click on the "Upload File:" button.

Navigate inside the local folder you created and select the file "acamica-data-warehouse.postman-collection.json"

This will create a collection in Postman with the name API Delilah-resto, where you can find different Requests to test the API.

#### Step 6 (optional)

If you want to modify the code and run the project locally, enter your Code editor (Visual Studio Code).

Open a terminal window and position yourself in the local folder that you created and within it in the "acamica-datawarehouse-backend" folder.

Type `npm install`. With that you will have installed all the necessary dependencies.

#### Step 7 (optional)

Run `npm start`. This will start up the server and you will be able to verify on the terminal screen that it has connected to the "datawarehouse" db.

## Running the tests

First you must execute the Login Request for the user in the DB (created on step 4), since you must obtain the JWT in the response, to paste it later in each request you use.

You can use the different Requests created in Postman, to:

Make LOGIN (necessary to execute the rest)

#### Login

* LogIn

#### Users

* List of all users

* Create a user 

* Get an user by id

* Modify a user 

* Delete a user

#### Regions

* List of all regions 

* Get a region by id

* Create a region

* Modify a region

* Delete a region

#### Countries

* List of all countries 

* Get a country by id

* Create a country

* Modify a country

* Delete a country

#### Cities

* List of all cities 

* Get a city by id

* Create a city

* Modify a city

* Delete a city

#### Companies

* List of all companies 

* Get a company by id

* Create a company

* Modify a company

* Delete a company

#### Contacts

* List of all contacts 

* Get a contact by id

* Create a contact

* Modify a contact

* Delete a contact

## Technologies

* Node.js 16.18.1

* Express 4.17.2

* Mongo 6.0.2

## Credits

* Special thanks to [santiagocerrutti](https://github.com/santiagocerrutti) for his support in all the development process.

## Author

Pablo David Encina