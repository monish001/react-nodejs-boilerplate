const AWS = require("aws-sdk");
const debug = require('debug')('monish-gupta:server:crud.js');

AWS.config.update({
  region: "us-west-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const post = (tableName, document) => {
  debug('post params', tableName, document);
  const promise1 = new Promise(function(resolve, reject) {
    document.CreatedTimeStamp = document.LastModifiedTimeStamp = new Date().toISOString();
    const params = {
      TableName: tableName,
      Item: document
    };
    debug("Adding a new item...", params);
    docClient.put(params, function(err, data) {
      if (err) {
        debug("ERROR", 
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        debug("Added item:", JSON.stringify(data, null, 2));
        resolve(JSON.stringify(data, null, 2));
      }
    });
  });
  return promise1;
};

const getByAttribute = (tableName, indexName, partitionKey, partitionValue, sortKey, sortValue) => {
  debug('getByAttribute', tableName, indexName, partitionKey, partitionValue, sortKey, sortValue);
  const promise1 = new Promise(function(resolve, reject) {
    const params = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "#id = :id" + (sortKey ? " and #id2 = :id2" : ""),
      ExpressionAttributeNames: {
        "#id": partitionKey,
        "#id2": sortKey,
      },
      ExpressionAttributeValues: {
        ":id": partitionValue,
        ":id2": sortValue,
      }
    };
    debug('getByAttribute...', params);
    docClient.query(params, function(err, data) {
      if (err) {
        debug("ERROR", "Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        debug("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
  return promise1;  
}

/**
 * 
 * @param {string} tableName 
 * @param {*} partitionKey 
 * @param {*} partitionValue 
 * @param {string} sortKey. optional.
 * @param {*} sortValue. optional.
 * @param {*} sortValue2. optional.
 * @param {*} sortOperator. optional.
 */
const get = (tableName, partitionKey, partitionValue, sortKey, sortValue, sortValue2, sortOperator) => {
  debug('get params: ', tableName, partitionKey, partitionValue, sortKey, sortValue, sortValue2, sortOperator);
  const promise1 = new Promise(function(resolve, reject) {
    debug('get: in promise');
    let keyConditionExpression = "#id = :id";
    if(sortKey) {
      if(sortOperator === 'BETWEEN') {
        keyConditionExpression += " and #id2 BETWEEN :id2 AND :id3"
      } else {
        keyConditionExpression += " and #id2 = :id2";
      }
    }
    let params = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeNames: {
        "#id": partitionKey,
        "#id2": sortKey,
      },
      ExpressionAttributeValues: {
        ":id": partitionValue,
        ":id2": sortValue
      }
    };
    if(sortOperator === 'BETWEEN') {
      params.ExpressionAttributeValues[":id3"] = sortValue2;
    }
    debug('get: query params', params);
    params = JSON.parse(JSON.stringify(params));
    debug('get: query params', params);
    docClient.query(params, function(err, data) {
      if (err) {
        debug("ERROR ", "Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        debug("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
  return promise1;
};

const getAll = tableName => {
  debug('getAll params', tableName);
  const promise1 = new Promise(function(resolve, reject) {
    const params = {
      TableName: tableName
    };
    debug("Get items...", params);
    docClient.scan(params, function(err, data) {
      if (err) {
        debug("ERROR ", 
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        debug("Scan succeeded.");
        //   // continue scanning if we have more movies, because
        //   // scan can retrieve a maximum of 1MB of data
        //   if (typeof data.LastEvaluatedKey != "undefined") {
        //     debug("Scanning for more...");
        //     params.ExclusiveStartKey = data.LastEvaluatedKey;
        //     docClient.scan(params, onScan);
        // }

        resolve(data.Items);
      }
    });
  });
  return promise1;
};

const getUpdateExpression = document => {
  let UpdateExpression = "set LastModifiedTimeStamp = :LastModifiedTimeStamp";
  let ExpressionAttributeValues = {
    ":LastModifiedTimeStamp": new Date().toISOString()
  };
  const ignore = ["Id", "LastModifiedTimeStamp", "CreatedTimeStamp"];
  for (key in document) {
    if (!ignore.find(elem => elem === key) && typeof(document[key]) !== 'undefined') {
      UpdateExpression += ", " + key + " = :" + key + "";
      ExpressionAttributeValues[":" + key] = document[key];
    }
  }
  return { UpdateExpression, ExpressionAttributeValues };
};

const put = (tableName, document, partitionKey, partitionValue, sortKey, sortValue) => {
  debug('put params', tableName, document, partitionKey, partitionValue, sortKey, sortValue);
  const promise1 = new Promise(function(resolve, reject) {
    const keys = {};
    keys[partitionKey] = partitionValue;
    keys[sortKey] = sortValue;

    const updateExpression = getUpdateExpression(document);
    const params = {
      TableName: tableName,
      Key: keys,
      UpdateExpression: updateExpression.UpdateExpression,
      ExpressionAttributeValues: updateExpression.ExpressionAttributeValues,
      ReturnValues: "UPDATED_NEW"
    };
    debug("Updating the item...", params);
    docClient.update(params, function(err, data) {
      if (err) {
        debug("ERROR ", 
          "Unable to update item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        debug("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
  return promise1;
};

const remove = (tableName, partitionKey, partitionValue, sortKey, sortValue) => {
  debug('remove params', tableName, partitionKey, partitionValue, sortKey, sortValue);
  const promise1 = new Promise(function(resolve, reject) {
    const keys = {};
    keys[partitionKey] = partitionValue;
    keys[sortKey] = sortValue;
    const params = {
      TableName: tableName,
      Key: keys,
    };
    debug("Delete an item...", params);    
    docClient.delete(params, function(err, data) {
      if (err) {
        debug("ERROR ", 
          "Unable to delete item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        debug("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        resolve();
      }
    });
  });
  return promise1;
};

module.exports = {
  post: post,
  getAll: getAll,
  get: get,
  getByAttribute: getByAttribute,
  put: put,
  remove: remove
};
