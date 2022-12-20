# Fenarkein

## Project Setup

- install dependency => `npm i`
- run project in development mode on port 8080 => `npm start`
- build production files => `npm run prod`


## Tech

- [Webpack](https://webpack.js.org/guides/development/)
- [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Installation)

## Animation
- first fold => uncomment first line 20 in index.ts and comment line 21
```sh
    sphereController();
```
- second fold => uncomment first line 21 in index.ts and comment line 20
```sh
    WireframeController(false);
```
- third fold => uncomment first line 21 in index.ts and comment line 20, pass true in paramenter
```sh
    WireframeController(true);
```