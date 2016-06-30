// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by heart.js.
import { name as packageName } from "meteor/heart";

// Write your tests here!
// Here is an example.
Tinytest.add('heart - example', function (test) {
  test.equal(packageName, "heart");
});
