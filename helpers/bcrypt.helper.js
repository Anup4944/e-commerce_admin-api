import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = plainPassword => {
    return new Promise((resolve, reject) =>{
        try {
            resolve (bcrypt.hashSync(plainPassword,saltRounds))
        } catch (error) {
            reject (error);
            
        }
    })
}

export const comparePassword = (plainPassword, hashedPassFromDt) => {
    return new Promise((resolve, reject) =>{
        try {
            bcrypt.compare(plainPassword, hashedPassFromDt, function(err, result) {
                if(err) resolve(err)
                resolve(result);
            });
            
        } catch (error) {
            reject(error);
        }
    })
}
