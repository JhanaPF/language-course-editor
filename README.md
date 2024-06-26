

# Course editor

This project is a fork of [Dictionnaire_Participatif](https://github.com/JhanaPF/Dictionnaire_Participatif), a collaborative dictionary.

## Prerequisites

Before getting started, make sure you have the following software and dependencies installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://docs.mongodb.com/manual/installation/)
- Node Version Manager: [Download and install NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
## Installation

1. **Clone the repository**:

    ```bash
    git clone 
    ```

2. **Install dependencies**:
    In project directory
    ```bash
    npm install
    ```

3. **Add a .env file at root of back-end folder**: <br />
`DICTIONARIES`="learninglanguage_from_pivottongue, secondlearninglanguage_from_another" # Add your dictionaries exactly like this <br />
`NODE_ENV`= "production" or "development" <br />
`SECRET`= 32 characters secret key for jwt signature <br />
`PORT` <br />
`DATABASE`= url connection to your mongo db, required for production <br />

4. **Add a .env at the root of dashboard directory**: <br />
`REACT_APP_API_URL`="http://localhost:7006/" <br />
`FAST_REFRESH`=true <br />
`DISABLE_ESLINT_PLUGIN`=true <br />

5. **Configure the database**:

    - Create a MongoDB database and note the connection URL.
    - Start mongo service

    If you are on Linux:
    ```bash
    sudo systemctl start mongod
    ```

    Init database:
    ```bash
    node init_database.js
    ```
Mongo collections will be automatically generated by mongoose with the dictionaries you added in DICTIONARIES env variable

6. **Run the application**:

    ```bash
    npm start
    ```

## Contributing

If you'd like to contribute to this project, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b my-feature`.
3. Make your changes.
4. Commit and push your changes: `git commit -m "Add my feature"`.
5. Create a pull request.
6. Add your name in CONTRIBUTORS.md  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.