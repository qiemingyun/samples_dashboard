This is a [Sample Dashboard] built with [`next.js`].

## Declaration

The postcode ranges for each state in Australia is obtained from Wikipedia.
Please see the reference link for details:
https://en.wikipedia.org/wiki/Postcodes_in_Australia

The GeoJson data used in displaying the Australian map is obtained from a github user, whose account name is 'tonywr71'.
Please see the reference link for details:
https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json

## Main Structure

```
├── __test__
│   └── parseData.test.ts
├── assets
│   └── Australia.json
├── components
│   ├── AustraliaMap.tsx
│   ├── SampleBar.tsx
│   ├── SamplePie.tsx
│   └── SelectOption.tsx
├── pages
│   ├── _app.js
│   └── index.tsx
├── styles
│   ├── Home.module.css
│   └── globals.css
├── types
│   ├── Enums.ts
│   └── Sample.ts
├── utils
    ├── charts.ts
    ├── parseData.ts
    └── useFetch.ts
 ```

## Environment Required

npm or yarn

node v14.17.0 or above

IDE: Visual Studio Code


## Getting Started

First, install modules with the command:

```bash
npm i
# or
yarn
```
After that, you can run test with the command:

```bash
npm run test
# or
yarn test
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, find the url after the server ready tips (normally the url will be 'http://localhost:3000' if port 3000 isn't occupied by other programs).

Finally, open the url with your browser to see the result.


## Deploy

Build with the command:

```bash
npm run build
# or
yarn build
```

Then, start the server with the command:

```bash
npm run start
# or
yarn start
```
