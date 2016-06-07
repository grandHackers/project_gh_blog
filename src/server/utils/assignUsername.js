var Promise = require('promise');
var faker = require('faker')
import { getUserByUsername } from '../api/user'

export default function getAvailableUsername(defaultUsername) {
    var username = defaultUsername
    const minLength = 4
    if (username.length < minLength) {
        username = faker.internet.userName()
    }
    var getAvailableUsernameHelper = (user) => {
        if (!!user) {
            username = faker.internet.userName()
            return getUserByUsername(username).
                then(getAvailableUsernameHelper)
        } else {
            return new Promise((resolve, reject) => {
                console.log("can use username " + username)
                resolve(username)
            })
        }
    }
    // returns a promise containing a username value    
    return getUserByUsername(username).
        then(getAvailableUsernameHelper)
}

