module.exports = {
    EmailInvalid: {
        type: "EmailInvalid",
        message: "Email must be a valid string",
    },
    PasswordInvalid: {
        type: "PasswordInvalid",
        message: "Password must be a valid string"
    },
    ResourceNotFound: (resource) => ({
        type: "ResourceNotFound",
        message: `Resource of type ${resource} not found`
    }),
    WrongPassword: {
        type: "WrongPassword",
        message: "Password is incorrect"
    }
};