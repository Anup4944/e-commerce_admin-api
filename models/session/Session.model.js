import  SchemaSession  from './Session.Schema.js'


export const storeAccessJwt = async (newSession) =>{
   
        try {
        const result = await SchemaSession(newSession).save();
        return result;
            
        } catch (error) {
           console.log(error);  
        }
    
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