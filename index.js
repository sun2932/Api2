const express = require("express");
const axios = require("axios");
const bodyparser = require("body-parser");
const cors = require("cors");
const DBdata = require("./data");
const app = express();
const useSchema = require("./config");
const { default: mongoose } = require("mongoose");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
DBdata();

const User = mongoose.model("yoga-data", useSchema);

app.post("/post", async (req, res) => {
  const data = new User(req.body);
  const email1 = req.body.email;
  const mobile1 = req.body.mobile;
  try {
    await User.findOne({ $or: [{ email: email1 }, { mobile: mobile1 }] }).then(
      async (result) => {
        console.log("No updation", result);

        if (!result) {
          let result1 = await data.save();
          return res.send({ message: "data successfully saved", userdata:result});
        } else {
          res.send({ message: "User already exist" ,userdata:result});
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.post("/payment", async (req, res) => {
  return res.send({ message: "Payment Successful" });
});

app.get("/sunny", async (req, res) => {
   res.send("Api is live");
});

app.put("/post", async (req, res) => {
  const { email, slot, password } = req.body;
  try {
    const filter = { email: email, password: password };
    const update = { slot: slot };
    await User.findOneAndUpdate(filter, update)
      .then((result) => {
        if (!result) {
          res.send({ message: "User not found or Password Does not Matched",userdata:result });
        }
        res.send({ message: " Plan Updated Successfull" ,userdata:result });
      })
      .catch((e) => {
        console.log("err-->", e);
      });
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
