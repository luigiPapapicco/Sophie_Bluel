import { generateBtn } from "./dynamics-elements.js"
import { adminStructure } from "./admin-mode.js"

// function verification si quelque chose est stocké dans mon sessionStorage
function isTokenSored() {
    const token = sessionStorage.getItem('authToken')
    return token !== null 
}

// condition testant si une clef est entré si ces le cas on passe en config admin sinon en config users
if (isTokenSored()) {
    adminStructure()
    console.log("mode admin")
} else {
    generateBtn()
    console.log("mode visiteur")
}
