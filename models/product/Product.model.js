import  ProductSchema  from "./Product.schema.js";


export const insertProduct = prodObj  =>{
return new Promise(async(resolve, reject) => {
    try {
       const result =  await ProductSchema(prodObj).save()
       resolve(result)
        
    } catch (error) {
        reject(error)
        
    }
})}

// export const getCategory = ()  =>{
//     return new Promise(async(resolve, reject) => {
//         try {
//            const result =  await CategorySchema.find()
//            resolve(result)
            
//         } catch (error) {
//             reject(error)
            
//         }
//     })
// }

// export const deleteCategory = catArg  =>{
//     return new Promise(async(resolve, reject) => {
//         try {
//            const result =  await CategorySchema.deleteMany({
//             $in:$catArg
//            })
         
//         resolve(result);    
//         } catch (error) {
//             reject(error);
            
//         }
//     })
// }
