/**
 * Validates the argument to be not null.
 * Resolves if the variable isn't null. 
 * Rejects if null.
 * @param {*} supposedNotNullArg 
 */
export default function validateNotNull(supposedNotNullArg){
    return new Promise((resolve, reject)=>{
        if(supposedNotNullArg == null){
            reject(TypeError("The passed argument can't be null."))
        }else{
            resolve(supposedNotNullArg)
        }
    })
}