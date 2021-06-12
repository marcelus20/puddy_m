import fs from "fs"
import validateString from "./validations/validateString"


/**
 * Reads a file and resolves the content of the file. 
 * It throws if the fileLocation parameter isn't a string. 
 * It also throws if the file doesn't exist.
 * @param {String} fileLocation 
 * @returns {Promise}
 * @throws {TypeError}
 */
export default function readFile(fileLocation){
    
    
    return new Promise((resolve, reject)=>{
        // Checks if fileLocation is a string. 
        validateString(fileLocation)
        .then(fileLocation=>{
            fs.readFile(fileLocation, "utf8", (err, data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data) // resolves file content
                }
            })
        })
        .catch(err=>reject(err))
    })
}