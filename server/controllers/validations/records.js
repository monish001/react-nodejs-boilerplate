const Joi = require('joi');

module.exports = {
    // POST /api/tasks
    // createTask: {
    //     body: {
    //         user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    //         description: Joi.string().required(),
    //         done: Joi.boolean()
    //     }
    // },

    // GET /records
    get: {
        query: {
            UserId: Joi.string().guid().required().example('19715c05-f82c-437a-971f-60dfe00806a9'),
            CreatedTimeStamp: Joi.date().iso().when('CreatedTimeStampFrom', {
                is: Joi.required(), // if exists
                then: Joi.empty() // then empty
            }).example('2018-01-19T19:28:10.947Z'),
            CreatedTimeStampFrom: Joi.date().iso().example('2018-01-19T19:28:10.947Z'),
            CreatedTimeStampTo: Joi.date().iso().when('CreatedTimeStampFrom', {
                is: Joi.required(), // if exists
                then: Joi.date().iso().required() // then it is also required.
            }).example('2018-01-19T19:28:10.947Z')
        }
    },

    // PUT /records
    // put: {
    //     body: {
    //         user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    //         description: Joi.string(),
    //         done: Joi.boolean()
    //     }
    // }
};