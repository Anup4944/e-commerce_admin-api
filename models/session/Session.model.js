import  SchemaSession  from './Session.Schema.js'


export const storeAccessJwt = async (newSession) =>{
   return new Promise(async (resolve, reject)=>{
        try {
                const result = await SchemaSession(newSession).save();
                resolve(result);
                    
                } catch (error) {
                   console.log(error);  
                   reject(error)
                }
   })
       
    
}


export const getAccessJwtByToken = async (accessJWT) =>{
   
        try {
        const result = await SchemaSession.findOne({accessJWT});
        return Promise.resolve( result);
            
        } catch (error) {
           console.log(error);
           return Promise.resolve(false)  
        }
    
}