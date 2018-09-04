# toodoo
toodoo is an app with a mission to assist individuals with making concious workload planning decisions based on estimated vs. actual time of tasks completion.

# Development setup
  - Clone the repository.
  - Execute `npm install` in the project root directory.
  - Execute `npm start` to start a development server on port 3000.
  - Navigate to http://localhost:3000.
  - NOTE: In order to connect to MongoDB, it is required to have mongopwd.js file in the root directory of the project, storing password to MongoDB cluster. If you wish to use your own DB, changes in code are necessary.

# Known issues
  - It is not possible to click exactly on the status circle, it only recognizes a click right above it.
  - When application/json was enabled, the application crashed due to a JSON parsing error. Should be investigated and done properly.
  - The new method of handling events (event listener on the whole document) created a problematic situation where clicking on an icon that is inside a desired button does not trigger a click on that button and hence - does not result in expected action to be taken. To be fixed.
