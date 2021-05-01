
import SessionSchema from "./Session.schema.js";

export const storeAccessJwt = async newSession => {
	try {
		const result = await SessionSchema(newSession).save();
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const getAccessJwtByToken = async accessJWT => {
	try {
		const result = await SessionSchema.findOne({ accessJWT });
		return Promise.resolve(result);
	} catch (error) {
		console.log(error);
		return Promise.resolve(false);
	}
};


export const deleteAccessJwtByUserId= _id  => {
	try {
		const result =  SessionSchema.findOneAndDelete(_id);		
	} catch (error) {
		console.log(error);
		
	}
};




