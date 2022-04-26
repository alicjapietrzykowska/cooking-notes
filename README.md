# Cooking Notes
> A small app designed to collect recipes in one place and add your own notes to them. Created using Vue 3 and Firebase.

## Demo
https://alicjalukaszewska.github.io/cooking-notes/

## Features
- Save custom recipes and ingredients to your account or the local browser storage
- Write down where you got the recipe from - internet, book or other source
- Rate the recipe on a 5-point scale
- Record when you last used the recipe
- Add your own notes to the recipe
- Search for a recipe by the name
- Sort saved recipes by the name, rating, and the date of use. 
- Filter recipes by ingredients and source
- View and edit recipes wherever you are using mobile device. 

## Technologies Used
- Vue 3
- Firebase Authentication
- Firebase Realtime Database
- LocalStorage
- PrimeVue 3
- Typescript
- SCSS

## How To Use With NPM

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/alicjalukaszewska/cooking-notes.git
# Go into the repository
$ cd cooking-notes
# Install dependencies
$ npm install
# Run the app
$ npm run serve
```
You will then be able to access the app at localhost:8080

## How To Use With Docker

To run this application with Docker, you'll need [Docker](https://docs.docker.com/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/alicjalukaszewska/cooking-notes.git
# Go into the repository
$ cd cooking-notes
# Run Dockerfile
$ docker compose up -d
```
You will then be able to access the app at localhost:8080

## Room for Improvement
- Storing the quantity of ingredients for each recipe
- Dark mode
- Support for various languages

## License
MIT
