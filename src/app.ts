require('dotenv').config()

import * as express from "express";
import * as cors from 'cors';

import { actors } from "./routes/actors";
import { countries } from "./routes/countries";
import { directors } from "./routes/directors";
import { movies } from "./routes/movies";
import { users } from "./routes/users";

// create and setup express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// register routes
app.use("/api/actors", actors);
app.use("/api/countries", countries);
app.use("/api/directors", directors);
app.use("/api/movies", movies);
app.use("/api/users", users);


app.use(express.static('./build'))

// start express server
app.listen(process.env.PORT);