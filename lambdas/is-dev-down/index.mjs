import AWS from "aws-sdk";
const { DynamoDB } = AWS;

const dynamoDB = new DynamoDB.DocumentClient();

export const handler = async event => {
  const params = {
    TableName: "VisitCount",
    Key: { id: "visitCount" },
    UpdateExpression: "SET #count = #count + :inc",
    ExpressionAttributeNames: { "#count": "count" },
    ExpressionAttributeValues: { ":inc": 1 },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes.count),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
