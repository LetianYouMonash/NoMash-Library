
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

setGlobalOptions({maxInstances: 10});

// Week 9.1: Count books
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore()
          .collection("books")
          .get();

      const count = snapshot.size;

      res.status(200).json({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.uppercaseBook = onDocumentCreated("books/{bookId}", async (event) => {
  const snapshot = event.data;

  if (!snapshot) {
    return;
  }

  const book = snapshot.data();
  const updates = {};

  for (const [key, value] of Object.entries(book)) {
    if (typeof value === "string") {
      const uppercaseValue = value.toUpperCase();

      if (uppercaseValue !== value) {
        updates[key] = uppercaseValue;
      }
    }
  }

  if (Object.keys(updates).length === 0) {
    return;
  }

  await snapshot.ref.update(updates);
});

// Week 10.2: Get all books
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore()
          .collection("books")
          .get();

      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});
