# ActivityZones

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

This project features a simple canvas onto which the user can draw rectangles which represent activity zones of the canvas.
The user can add new zones using the provided form below the canvas.
Using the X icon on the top right of an activity zone, the user can remove a zone from the canvas.

## Get started

### Clone the repo

```shell
git clone https://github.com/YouFaceJaraxxus/activity-zones
cd activity-zones
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `3000`.

Shut it down manually with `Ctrl-C`.


### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm run start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
* `npm run test` - runs tests.
* `npm run deploy` - builds the application and deploys the application to Firebase.

## Architecture

### Activity zones

Each activity zone is represented by a rectangle.
In order to render these shapes, [Fabric.js](http://fabricjs.com/) was used.

Each rectangle has the x and y coordinates (distance from the left and top edges of the canvas respectively), as well as the width and height, and lastly, a unique id (generated as a timestamp of the moment of creation);

These dimensions are scaled according to screen width. The main canvas maintains the 16/9 ratio. When assigning the coordinates and dimensions to shapes, the base width and height of the canvas element that are used are 1280 and 720, respectively. This means that if the screen width is larger (so is the canvas), and the canvas width extends more than 1280, the width and x coordinate of a shape is larger, and vice versa. Same works for the canvas height and the y coordinate/height of the element.

### State management

To manage the state of the application, [RxJS](https://rxjs.dev/) was used.
The reason for this is to have a centralized state which keeps track of the activity zones, accessible from all parts of the application.
The state is comprised of the array of activity zones and the current x and y scaling.
The actions feature:

- addActivityZone: action for adding a new activity zone to the canvas, used by the activity zone form.
- updateActivityZone: action for updating an activity zone; also saves the current activity zone state into local storage
- removeActivityZone: action for removing an activity zone from the list of activity zones
- loadActivityZones: action for loading the activity zone state from the local storage
- updateActivityZonesScale: action for updating the activity zone x and y scaling
