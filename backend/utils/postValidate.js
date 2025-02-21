const validator = require('validator')
const validateSignUpData = (req) => {
    const { skills, emailId, password, photoUrl, about, name } = req.body
    if (name.length < 4 || name.length > 50) {
        throw new Error("Name should be between 4 to 50 chars")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid email id")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong Password")
    }
    if (skills && skills.length > 10) {
        throw new Error("Skills can't be more than 10")
    }
    if (!about) {
        throw new Error("About is required!")
    }
    if (about.length > 150) {
        throw new Error("About cannot exceed 150 characters!")
    }
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Enter valid Url for image")
    }
}

module.exports = validateSignUpData

