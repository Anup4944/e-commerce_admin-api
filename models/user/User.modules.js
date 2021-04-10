
import AdminUsersSchema from "./User.schema.js";


export const createUser = (userObj) => {
    return new Promise((resolve, reject) =>{    
    try {
        AdminUsersSchema(userObj).save()
        .then(data => resolve(data))
        .catch(error => reject(error));
    
    } catch (error) {
        reject(error)
    }
})
}


export const getUserEmailByPassword = ({email,password}) => {
    return new Promise((resolve, reject) =>{    
    try {
        AdminUsersSchema.findOne({email,password})
        
        .then(data => resolve(data))
        .catch(error => reject(error));
    
    } catch (error) {
        reject(error)
        
    }
})
}