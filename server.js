const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

const notes = require('./db/db.json');


