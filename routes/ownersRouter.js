const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


if (process.env.NODE_ENV === "development") {
  router.post('/create',async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(409)
        .send("We Can't create more than one owner");
    }
    let { fullname, email, password } = req.body;
    console.log(fullname);
    console.log(email);
    console.log(password);

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password
    });
    console.log(createdOwner);
    res.status(201).send(createdOwner);
})
}

module.exports = router;
