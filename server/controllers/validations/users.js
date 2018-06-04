const Joi = require('joi');
const CONSTANTS = require("../../constants/common");

module.exports = {
    // POST /records
    post: {
        body: {
            // admin can create a user.
            Email: Joi.string().email().required(),
            UserName: Joi.string().required(),
            Password: Joi.string().required()
        }
    },

    // GET /records
    get: {
        params: {
            // admin can get all users or single user.
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).optional()
        }
    },

    // PUT /records
    put: {
        // admin can modify user email, username, password
        params: {
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).required()
        },
        body: {
            Email: Joi.string().email().required(),
            UserName: Joi.string().required(),
            Password: Joi.string().required()
        }
    },

    _delete: {
        // admin can remove user
        params: {
            userId: Joi.string().regex(CONSTANTS.GUID_REGEX).required()
        }
    }
};