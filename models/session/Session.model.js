import  SchemaSession  from './Session.Schema.js'


export const storeAccessJwt = async (newSession) =>{
   
        try {
        const result = await SchemaSession(newSession).save();
        return result;
            
        } catch (error) {
           console.log(error);  
        }
    
}