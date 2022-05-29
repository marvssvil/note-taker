//require util
const util = require('util')
//require fs
const fs = require('fs');
//require path
const path = require('path');
//require express and naming it app
const express = require('express');
const app = express();
//port
const PORT = 3001;
//naming notes folder
const notesFolder = require('./db/db.json')


