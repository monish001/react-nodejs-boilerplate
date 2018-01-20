const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const post = (tableName, document) => {
  const promise1 = new Promise(function(resolve, reject) {
    console.log("Adding a new item...");
    document.CreatedTimeStamp = document.LastModifiedTimeStamp = Date.now();
    const params = {
      TableName: tableName,
      Item: document
    };
    docClient.put(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        resolve(JSON.stringify(data, null, 2));
      }
    });
  });
  return promise1;
};

const getByAttribute = (tableName, indexName, partitionKey, partitionValue, sortKey, sortValue) => {
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
    docClient.query(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
  return promise1;  
}

const get = (tableName, partitionKey, partitionValue, sortKey, sortValue) => {
  const promise1 = new Promise(function(resolve, reject) {
    const params = {
      TableName: tableName,
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
    docClient.query(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
  return promise1;
};

const getAll = tableName => {
  const promise1 = new Promise(function(resolve, reject) {
    console.log("Get items...");
    const params = {
      TableName: tableName
    };
    docClient.scan(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.log("Scan succeeded.");
        //   // continue scanning if we have more movies, because
        //   // scan can retrieve a maximum of 1MB of data
        //   if (typeof data.LastEvaluatedKey != "undefined") {
        //     console.log("Scanning for more...");
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
    ":LastModifiedTimeStamp": Date.now()
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
  const promise1 = new Promise(function(resolve, reject) {
    console.log("Updating the item...");
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
    docClient.update(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to update item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
  return promise1;
};

const remove = (tableName, partitionKey, partitionValue, sortKey, sortValue) => {
  const promise1 = new Promise(function(resolve, reject) {
    console.log("Delete an item...");
    const keys = {};
    keys[partitionKey] = partitionValue;
    keys[sortKey] = sortValue;
    const params = {
      TableName: tableName,
      Key: keys,
    };
    docClient.delete(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to delete item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
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
