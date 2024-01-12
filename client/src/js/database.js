import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic for a method that accepts some content and adds it to the database
// TODO: confirm whether we need to pass in an id
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create connection to db and version (openDB)
  const jateDb = await openDB("jate", 1);
  // Create new transaction (tx) and specify db and privleges -  readwrite as editing data
  const tx = jateDb.transaction("jate", "readwrite");
  // Open desired object store within db
  const store = tx.objectStore("jate");
  // make request with desired method on store - put to edit - hardcode id to ensure only one entry
  const request = store.put({ id: 1, content: content }); // TODO: confirm key/value pair
  // Get confirmation of request and log - don't need to return
  const response = await request;
  console.log("data saved:", response); // remove at later data
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  // Create connection to db and version (openDB)
  const jateDb = await openDB("jate", 1);
  // Create new transaction (tx) and specify db and privleges - readonly as not manipulating data
  const tx = jateDb.transaction("jate", "readonly");
  // Open desired object store within db
  const store = tx.objectStore("jate");
  // make request with desired method on store - get to return data
  const request = store.get(1); // Use the constant key to get only one entry - the one that get's updated above.
  // Get confirmation of request and return
  const response = await request;
  console.log("response.value:", response); // remove at later data
  return response;
};

initdb();
