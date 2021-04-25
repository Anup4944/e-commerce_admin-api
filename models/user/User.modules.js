
import UserSchema from "./User.schema.js";


export const createUser = (userObj) => {
    return new Promise((resolve, reject) =>{    
    try {
        UserSchema(userObj).save()
        .then(data => resolve(data))
        .catch(error => reject(error));
    
    } catch (error) {
        reject(error)
    }
})
}


export const getUserByEmail = (email) => {
    return new Promise((resolve, reject) =>{    
    try {
        UserSchema.findOne({email})
        
        .then(data => resolve(data))
        .catch(error => reject(error));
    
    } catch (error) {
        reject(error)
        
    }
})
}



export const storeRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) =>{    
    try {
        UserSchema
        .findOneAndUpdate({_id},{
            $set: {token}
        },{new:true})
        .then(data => resolve(data))
        .catch(error => reject(error));
    
    } catch (error) {
        reject(error)
    }
})
}