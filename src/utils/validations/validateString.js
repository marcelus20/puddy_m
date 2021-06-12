import validatesNotNull from "./validateNotNull"

/**
 * Resolves the same string if it is type of string.
 * If not type of string, then it rejects 
 * @param {String?} supposedString 
 */
export default function validateString(supposedString){
    return new Promise((resolve, reject)=>{
        validatesNotNull(supposedString)
        .then(supposedString=>{
            if(typeof supposedString == "string"){
                resolve(supposedString)
            }else{
                reject(new TypeError("The passed argument isn't a string."))
            }
        })
        .catch(err=>reject(err))
    })
}