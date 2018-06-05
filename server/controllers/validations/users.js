const Joi = require('joi');
const CONSTANTS = require("../../constants/common");

module.exports = {
    // POST /users
    // post: {
    //     body: {
    //         // admin can create a user.
    //         Email: Joi.string().email().required(),
    //         UserName: Joi.string().required(),
    //         Password: Joi.string().required()
    //     }
    // },

    // GET /users
    get: {
        params: {
            // admin can get all users or single user.
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).optional()
        }
    },

    // PUT /users
    put: {
        // admin can modify user email, username, password
        params: {
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).required()
        },
        body: {
            UserName: Joi.string().required(),
            Role: Joi.string().required()
        }
    },

    _delete: {
        // admin can remove user
        params: {
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).required()
        }
    }
};