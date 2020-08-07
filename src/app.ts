import * as express from "express";

import { actors } from "./routes/actors";
import { countries } from "./routes/countries";
import { directors } from "./routes/directors";
import { movies } from "./routes/movies";
import { users } from "./routes/users";

// create and setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routes
app.use("/actors", actors);
app.use("/countries", countries);
app.use("/directors", directors);
app.use("/movies", movies);
app.use("/users", users);


app.use(express.static('./build'))

// start express server
app.listen(3000);