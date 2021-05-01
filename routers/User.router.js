import express from "express";
const router = express.Router();

import { hashPassword } from "../helpers/bcrypt.helper.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { newUserValidation } from "../middlewares/formValidation.middleware.js";
import { createUser, deleteRefreshJwtByUserId, getUserByEmail, getUserById } from "../models/user/User.model.js";

router.all("*", (req, res, next) => {
	next();
});

router.get("/", userAuthorization, async (req, res) => {
	try {
		const { _id } = req.body;

		if (!_id) {
			return res.send({
				status: "error",
				message: "Invalid request!",
			});
		}

		const user = await getUserById(_id);

		if (user) user.password = undefined;

		user._id
			? res.send({
					status: "success",
					message: "Welcome to your profile",
					user,
			  })
			: res.send({
					status: "error",
					message: "Invalid request",
			  });
	} catch (err) {
		// const error = new Error(err.message);
		// error.statusCode = 400;
		// throw error;
		res.send({
			status: "error",
			message: "Invalid request",
		});
	}
});

router.post("/", newUserValidation, async (req, res) => {
	try {
		const { password } = req.body;

		const hashPass = await hashPassword(password);
		console.log(hashPass);

		const newUser = {
			...req.body,
			password: hashPass,
		};

		const result = await createUser(newUser);

		console.log(result);
		if (result?._id) {
			return res.json({ status: "success", message: "login success", result });
		}

		res.json({ status: "error", message: "Invalid login details" });
	} catch (error) {
		console.log(error.message);

		if (error.message.includes("duplicate key error collection")) {
			return res.json({ status: "error", message: "This email already exist" });
		}

		throw new Error(error.message);
	}
});


router.post("/logout", async (req, res) => {
	try {
		const {_id} = req.body;
		// const { accessJWT , refreshJWT } = req.body;
		// delete accessJWT from session db
		deleteAccessJwtByUserId(_id);

		// delete refreshJWt from user table
		deleteRefreshJwtByUserId(_id);
		res.send({
			status: "success",
			message: "You are logged out now "

		})

	} catch (error) {
		console.log(error);
		res.send({
			status: "error",
			message: "Oops something went wrong!!!",
		})
	}
});

router.post("/otp", async (req, res) => {
	try {
		const {_id} = req.body;
		// get user based on the email
		const admin = await getUserByEmail(email);
		
		
		
		/////////////////////////////////////////////////////////

		console.log(adminUser);
		res.send({
			status: "success",
			message: "If your email is found, we will send you the email. It may take up to 5 minutes, please check your junk email "

		})

	} catch (error) {
		console.log(error);
		res.send({
			status: "error",
			message: "Error! There is some problem in our system, please try again later.",
		})
	}
});

export default router;
