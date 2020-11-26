export const highScoresTable = {
    TableName: "moonshot-high-scores",
    KeySchema: [
        {AttributeName: "level", KeyType: "HASH"},
    ],
    AttributeDefinitions: [
        {AttributeName: "level", AttributeType: "S"},
    ],
    BillingMode: "PAY_PER_REQUEST",
};
