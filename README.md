# Ad API
A RESTful API for maanging adverts on an ad website.

# Project Description
The Ad API is a Node.js and Express.js project that provides a simple and intuitive way to manage adverts on an ad website. The API allows vendors to create, read, update, and delete ads. Users are only allowed to read ads.

# Installation
Clone the repository: git clone https://github.com/Binary-05/ad-api.git
Install dependencies: npm install
Start the server: node app.js

# Environment variables
Create a .env file with the following variable:
MONGO_URI: the URI of your MongoDB instance

# Running the API
Start the server: node app.js
Access the API at http://localhost:8000

# Endpoints
Ads:
POST /adverts: Create a new ad
GET /adverts: Retrieve a list of all adverts
GET /adverts/:id: Retrieve a single advert by ID
PATCH /adverts/:id: Update a single advert by ID
DELETE /adverts/:id: Delete a single advert by ID

Users:


# Guidelines
Follow the Node.js coding standards
Write unit tests for new features and bug fixes
Submit pull requests with clear descriptions and relevant changes

# Reporting Issues
Open an issue on the GitHub repository with a clear description of the problem
Provide steps to reproduce the issue and any relevant error messages

# Credits
Developers & Maintainers:
Francis Amekeh (franciskojoamekeh@gmail.com)
Scherazade Loise Dzama Odoi (scherazadeodoi366@gmail.com)
Henrrike Quarshie (henrrikequarshie@gmail.com)
Jessica Akosua (jessica.a.adika@gmail.com)
Rodney Hinson (rodneyhinson22@gmail.com)

# Troubleshooting
Common Issues
Error: "Bad request" - Check that the right data is sent to the database

# Getting Help
Open an issue on the GitHub repository