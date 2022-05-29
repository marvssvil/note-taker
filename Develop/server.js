//require fs
const fs = require('fs');
//require path
const path = require('path');
//port
const PORT = 3001;
//require express and naming it app
const express = require('express');
const app = express();
//naming notes folder
const notesFolder = require('./db/db.json')
