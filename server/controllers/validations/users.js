const Joi = require('joi');

module.exports = {
    // POST /records
    post: {
        body: {
            // admin can create a user.
            Email: Joi.email().required(),
            UserName: Joi.string().required(),
            Password: Joi.string().required()
        }
    },

    // GET /records
    get: {
        params: {
            // admin can get all users or single user.
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional()
        }
    },

    // PUT /records
    put: {
        // admin can modify user email, username, password
        params: {
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        },
        body: {
            Email: Joi.email().required(),
            UserName: Joi.string().required(),
            Password: Joi.string().required()
        }
    },

    _delete: {
        // admin can remove user
        params: {
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    }
};