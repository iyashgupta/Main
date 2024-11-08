const { Router } = require("express");
const { UserSignUpModel } = require("../../ModelSchema/AuthSchema/UserSignUp");

const UniqueUserName = Router();

UniqueUserName.post("/", async (req, res) => {
  try {
    const { userName } = req.body;
   
    if (!userName) {
      res
        .status(400)
        .send({ message: "UserName Field is Required!", status: false });
    }

    const isUserNameExist = await UserSignUpModel.findOne({ userName });

    if(isUserNameExist){
        res
         .status(400)
         .send({ message: "UserName Already Exist!", status: false })
    }else{
        res.status(200).send({ message: "Valid UserName!", status: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error", status: false });
  }
});

module.exports = {
  UniqueUserName,
};
