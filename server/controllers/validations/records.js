const Joi = require('joi');

module.exports = {
    // POST /records
    post: {
        body: {
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().example('116fa1c6-82aa-4288-afea-c1d9477fb05d') ,
            DistanceInMiles: Joi.number().positive().required(),
            TimeDurationInMinutes: Joi.number().positive().required()
        },
        params: {
            // required for REGULAR_USER role.
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().example('116fa1c6-82aa-4288-afea-c1d9477fb05d') 
        }
    },

    // GET /records
    get: {
        query: {
            // ADMIN/USER_MANAGER can fetch all records
            // ADMIN/USER_MANAGER/REGULAR_USER can fetch all records of a user by UserId
            // ADMIN/USER_MANAGER/REGULAR_USER can fetch a record by UserId and CreatedTimeStamp
            UserId: Joi.string().guid().optional().example('19715c05-f82c-437a-971f-60dfe00806a9'),
            CreatedTimeStamp: Joi.date().iso().when('CreatedTimeStampFrom', {
                is: Joi.required(),                         // if exists
                then: Joi.empty()                           // then empty
            }).example('2018-01-19T19:28:10.947Z'),
            CreatedTimeStampFrom: Joi.date().iso().example('2018-01-19T19:28:10.947Z'),
            CreatedTimeStampTo: Joi.date().iso().when('CreatedTimeStampFrom', {
                is: Joi.required(),                         // if exists
                then: Joi.required()                        // then it is also required.
            }).example('2018-01-19T19:28:10.947Z')
        },
        params: {
            // REGULAR_USER required to sent UserId in params
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().example('116fa1c6-82aa-4288-afea-c1d9477fb05d')
        }
    },

    // PUT /records
    put: {
        body: {
            // fields to update
            DistanceInMiles: Joi.number().positive().required(),
            TimeDurationInMinutes: Joi.number().positive().required()
        },
        query: {
            // to identify the record to modify.
            UserId: Joi.string().guid().required().example('19715c05-f82c-437a-971f-60dfe00806a9'),
            CreatedTimeStamp: Joi.date().iso().required().example('2018-01-19T19:28:10.947Z')            
        },
        params: {
            // REGULAR_USER required to sent UserId in params
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().example('116fa1c6-82aa-4288-afea-c1d9477fb05d')
        }
    },

    _delete: {
        query: {
            // to identify the record to modify.
            UserId: Joi.string().guid().required().example('19715c05-f82c-437a-971f-60dfe00806a9'),
            CreatedTimeStamp: Joi.date().iso().required().example('2018-01-19T19:28:10.947Z')            
        },
        params: {
            // REGULAR_USER required to sent UserId in params
            UserId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional().example('116fa1c6-82aa-4288-afea-c1d9477fb05d')
        }
    }
};