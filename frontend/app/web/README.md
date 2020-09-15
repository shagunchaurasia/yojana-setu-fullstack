#build is the location of your final, production-ready build. This directory won’t exist until you run npm build or yarn build. The contents of this folder should be ready-to-ship without any interaction on your part.

#node_modules is where packages installed by NPM or Yarn will reside

#public is where your static files reside. If the file is not imported by your JavaScript application and must maintain its file name, put it here. Files in the public directory will maintain the same file name in production, which typically means that they will be cached by your client and never downloaded again. If your file does not have a filename that matters — such as index.html, manifest.json, or robots.txt — you should put it in src instead.

#src is where your dynamic files reside. If the file is imported by your JavaScript application or changes contents, put it here. In order to make sure the client downloads the most up-to-date version of your file instead of relying on a cached copy, Webpack will give changed files a unique file name in the production build. This allows you to use simple, intuitive file names during development, such as banner.png instead of banner-2019-03-01-final.png. You never have to worry about your client using the outdated cached copy, because Webpack will automatically rename banner.png to banner.unique-hash.png, where the unique hash changes only when banner.png changes.

Component folder structure

my-app
└── src
└── components
├── component-name
│ ├── component-name.scss //Scss styles go here
│ ├── component-name-container.js // Api and redux logics go here
│ ├── component-name-component.js //Dumb component View resides here // No state resides here
│ ├── component-name-styles.js //Styled components to be made here if any
│ └── index.js //Export everything from here so the component can be called using the default index
└── index.js

Redux folder structure
-- component-name
|--component.action.js
|--component.selector.js
|--component.type.js
|--component.reducer.js
