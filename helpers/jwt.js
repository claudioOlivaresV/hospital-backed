
const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
        }
        console.log('aqioJWT');
        jwt.sign( payload, 
                  process.env.JWT_SECRET, 
                  {expiresIn: '12h'},
                  (err, token) => {
                    if(err) {
                        console.log('erroroooor');
                        reject('error JWT')
                    } else {
                        console.log(token);
                        resolve(token)

                    }
                  }
        )
    })


}
module.exports = {
    generarJWT
}