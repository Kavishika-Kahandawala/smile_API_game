const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/users-route");
const { checkAuth, checkUser } = require("./controllers/auth-con");
const gameRoute = require("./routes/ingame-route");
const moment = require("moment");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const tt = {
  characters: [
    { code: "45", col: "", rem: "" },
    { code: "", col: "", rem: "" },
    { code: "", col: "", rem: "" },
    { code: "", col: "", rem: "" },
  ],
};

console.log(tt.characters[0].code);


// routes
app.use("/users", userRoute);
app.use("/game/ingame", gameRoute);

// app.get("*", checkAuth);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
// app.use(authRoutes);

// init server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
