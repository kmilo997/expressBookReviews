const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //res.send(JSON.stringify(books,null,4));
    res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let currentBooks = [];
  Object.keys(books).forEach((isbnBook) => {
    if (books[isbnBook].author === author) {
        currentBooks.push(books[isbnBook]);
    }
  })
  res.send(currentBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let currentBooks = [];
    Object.keys(books).forEach((isbnBook) => {
      if (books[isbnBook].title === title) {
          currentBooks.push(books[isbnBook]);
      }
    })
    res.send(currentBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const currentBook = books[isbn];
    res.send(JSON.stringify(currentBook.reviews,null,4));
});

/************************************************************ */
let getAllBooks = new Promise((resolve,reject) => {
    fetch('https://juank0397-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/').then((res) => {
        resolve(res.json());
    }).catch((err) => {
        reject(err);
    })
});

getAllBooks.then((response) => {
   // console.log('response - getAllBooks', response);
})

/******************************************************************************/
let getAllBooksByIsbn = new Promise((resolve,reject) => {
    fetch('https://juank0397-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/5').then((res) => {
        resolve(res.json());
    }).catch((err) => {
        reject(err);
    })
});

getAllBooksByIsbn.then((response) => {
   // console.log('response - getAllBooksByIsbn', response);
})
/*********************************************************************************/
let getAllBooksByAuthor = new Promise((resolve,reject) => {
    fetch('https://juank0397-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai//author/Unknown').then((res) => {
        resolve(res.json());
    }).catch((err) => {
        reject(err);
    })
});

getAllBooksByAuthor.then((response) => {
   // console.log('response - getAllBooksByAuthor', response);
})
/**********************************************************************************/
let getAllBooksByTitle = new Promise((resolve,reject) => {
    fetch('https://juank0397-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai//title/The Book Of Job').then((res) => {
        resolve(res.json());
    }).catch((err) => {
        reject(err);
    })
});

getAllBooksByTitle.then((response) => {
   console.log('response - getAllBooksByTitle', response);
})
module.exports.general = public_users;
