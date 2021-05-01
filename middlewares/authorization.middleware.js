import { verifyAccessJwt } from "../helpers/jwt.helper.js";
import { getAccessJwtByToken } from "../models/session/Session.model.js";

import  getUserById  from "../models/user/User.model.js";

const getUserSession = accessJWT => {
	return new Promise(async (resolve, reject) => {
		const sessionInfo = await getAccessJwtByToken(accessJWT);
		resolve(sessionInfo);
	});
};

export const userAuthorization = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const verifyToken = await verifyAccessJwt(authorization);
		console.log(">>>", verifyToken);

		if (!verifyToken?.email) {
			return res.status(403).json({
				status: "error",
				message: "Unauthorized",
			});
		}

		//check if token is exist in database
		const info = await getUserSession(authorization);
		console.log(info);

		if (info.userId) {
			req.body._id = info.userId;
			// check and make sure the role is admin
			//lets get user from db
			const user = await getUserById(info.userId)
			if(user.role == "Admin"){
				return next();
			}






			next();
		}
	} catch (error) {
		console.log(error);
		res.status(403).json({
			status: "error",
			message: "Unauthorized",
		});
	}
};
