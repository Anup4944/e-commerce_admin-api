import  SessionSchema  from './Session.Schema.js'
import './SessionSchema.js'

const storeAccessJwt = (newSession) =>{
    return new Promise(async(resolve, reject) => {
        try {
            const result = await SessionSchema(newSession).save()

            resolve(result)
            
        } catch (error) {
            reject(error)
            
        }
    })
}