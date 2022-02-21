const User = require("../user.mts");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

{
  const loginUser = async (request, reply) => {
    const user = await User.find({ name: request.body.username });
    if (user == null) {
      return reply.status(400).send("Cannot find user");
    }

    console.log(user[0].password);
    try {
      if (await bcrypt.compare(request.body.password, user[0].password)) {
        const token = require("../server.mts").jwt.sign({
          username: request.body.name,
        });
        reply
          .code(200)
          .setCookie("token", token, {
            domain: "localhost",
            path: "/",
          })
          .send({
            message: "Login succesful!",
            successful: false,
            username: request.body.username,
            token: { token },
          });
      } else {
        reply.code(200).send({ message: "Wrong password!", successful: false });
      }
    } catch (e) {
      reply.status(500).send(e);
    }
  };

  const registerUser = async (request, reply) => {
    console.log(request.body);
    const data = await request.body;
    let taken = false;
    const users = await User.find({ name: data.username });
    if (users.length > 0) {
      taken = true;
    }

    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");

    if (!taken) {
      try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = User({
          name: data.username,
          password: hashedPassword,
        });
        user.save();
        reply.code(201).send({
          message: "User created",
          successful: true,
          username: data.username,
        });
      } catch {
        reply.code(500).send();
      }
    }

    reply.code(200).send({ message: "Username taken!", succesful: false });
  };

  module.exports = { registerUser, loginUser };
}
