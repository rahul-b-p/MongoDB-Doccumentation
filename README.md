# MongoDB Documentation

A comprehensive guide to MongoDB operations, including queries, aggregations, best practices, and examples.

## Table of Contents
- [Basic Operations](#basic-operations)
- [Query Operations](#query-operations)
- [Update Operations](#update-operations)
- [Aggregation Framework](#aggregation-framework)
- [Indexing](#indexing)
- [Performance Optimization](#performance-optimization)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)

## Basic Operations

### Insert Documents
```javascript
// Insert a single document
db.collection.insertOne({
    name: "John Doe",
    age: 30,
    email: "john@example.com"
});

// Insert multiple documents
db.collection.insertMany([
    { name: "Jane Doe", age: 25 },
    { name: "Bob Smith", age: 35 }
]);
```

### Find Documents
```javascript
// Find all documents
db.collection.find({});

// Find with specific criteria
db.collection.find({ age: { $gt: 25 } });

// Find one document
db.collection.findOne({ name: "John Doe" });

// Project specific fields
db.collection.find({}, { name: 1, email: 1, _id: 0 });
```

## Query Operations

### Comparison Operators
```javascript
// Greater than
db.collection.find({ age: { $gt: 25 } });

// Less than
db.collection.find({ age: { $lt: 30 } });

// Greater than or equal to
db.collection.find({ age: { $gte: 25 } });

// Less than or equal to
db.collection.find({ age: { $lte: 30 } });

// Not equal to
db.collection.find({ age: { $ne: 30 } });

// In array
db.collection.find({ age: { $in: [25, 30, 35] } });

// Not in array
db.collection.find({ age: { $nin: [25, 30, 35] } });
```

### Logical Operators
```javascript
// AND
db.collection.find({
    $and: [
        { age: { $gt: 25 } },
        { name: "John Doe" }
    ]
});

// OR
db.collection.find({
    $or: [
        { age: { $lt: 25 } },
        { age: { $gt: 50 } }
    ]
});

// NOT
db.collection.find({
    age: { $not: { $gt: 25 } }
});

// NOR
db.collection.find({
    $nor: [
        { age: { $lt: 25 } },
        { name: "John Doe" }
    ]
});
```

## Update Operations

### Update Documents
```javascript
// Update one document
db.collection.updateOne(
    { name: "John Doe" },
    { $set: { age: 31 } }
);

// Update multiple documents
db.collection.updateMany(
    { age: { $lt: 25 } },
    { $set: { status: "young" } }
);

// Replace one document
db.collection.replaceOne(
    { name: "John Doe" },
    { name: "John Smith", age: 31 }
);
```

### Update Operators
```javascript
// Increment value
db.collection.updateOne(
    { name: "John Doe" },
    { $inc: { age: 1 } }
);

// Set value
db.collection.updateOne(
    { name: "John Doe" },
    { $set: { email: "john.doe@example.com" } }
);

// Unset field
db.collection.updateOne(
    { name: "John Doe" },
    { $unset: { temporary_field: "" } }
);

// Array operations
db.collection.updateOne(
    { name: "John Doe" },
    { $push: { hobbies: "reading" } }
);

db.collection.updateOne(
    { name: "John Doe" },
    { $pull: { hobbies: "reading" } }
);
```

## Aggregation Framework

### Basic Syntax
```javascript
db.collection.aggregate([
    { stage1 },
    { stage2 },
    { stage3 }
    // ... more stages
]);
```

### Common Aggregation Stages

#### $match Stage
```javascript
{
    $match: {
        age: { $gt: 25 },
        status: "active"
    }
}
```

#### $project Stage
```javascript
{
    $project: {
        fullName: { $concat: ["$firstName", " ", "$lastName"] },
        age: 1,
        _id: 0
    }
}
```

#### $group Stage
```javascript
{
    $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        avgAmount: { $avg: "$amount" },
        count: { $sum: 1 }
    }
}
```

#### $lookup Stage
```javascript
{
    $lookup: {
        from: "orders",
        localField: "userId",
        foreignField: "_id",
        as: "userOrders"
    }
}
```

### Array Operations

#### $unwind Stage
```javascript
{
    $unwind: {
        path: "$tags",
        preserveNullAndEmptyArrays: true
    }
}
```

#### Array Manipulation
```javascript
{
    $project: {
        activeTags: {
            $filter: {
                input: "$tags",
                as: "tag",
                cond: { $eq: ["$$tag.status", "active"] }
            }
        },
        upperTags: {
            $map: {
                input: "$tags",
                as: "tag",
                in: { $toUpper: "$$tag" }
            }
        }
    }
}
```

### Conditional Operations

#### $switch
```javascript
{
    $project: {
        priceRange: {
            $switch: {
                branches: [
                    { case: { $lt: ["$price", 50] }, then: "budget" },
                    { case: { $lt: ["$price", 100] }, then: "regular" },
                    { case: { $gte: ["$price", 100] }, then: "premium" }
                ],
                default: "unknown"
            }
        }
    }
}
```

#### $cond
```javascript
{
    $project: {
        status: {
            $cond: {
                if: { $gte: ["$age", 18] },
                then: "adult",
                else: "minor"
            }
        }
    }
}
```

## Indexing

### Basic Indexes
```javascript
// Create single field index
db.collection.createIndex({ name: 1 });

// Create compound index
db.collection.createIndex({ name: 1, age: -1 });

// Create unique index
db.collection.createIndex({ email: 1 }, { unique: true });

// List indexes
db.collection.getIndexes();

// Drop index
db.collection.dropIndex("index_name");
```

### Special Indexes
```javascript
// Text index
db.collection.createIndex({ description: "text" });

// Geospatial index
db.collection.createIndex({ location: "2dsphere" });
```

## Performance Optimization

### Query Optimization
1. Use appropriate indexes
2. Limit returned fields using projection
3. Use `.limit()` to restrict result size
4. Place `$match` stages early in aggregation pipelines
5. Monitor query performance using `.explain()`

### Memory Management
```javascript
// For large aggregations
db.collection.aggregate([
    // pipeline stages
], {
    allowDiskUse: true,
    maxTimeMS: 60000
});
```

## Advanced Features

### Text Search
```javascript
db.collection.find({
    $text: {
        $search: "mongodb database"
    }
});
```

### Geospatial Queries
```javascript
db.collection.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-73.9667, 40.78]
            },
            $maxDistance: 5000
        }
    }
});
```

### Complex Aggregation Example
```javascript
db.orders.aggregate([
    {
        $match: {
            date: {
                $gte: ISODate("2024-01-01"),
                $lt: ISODate("2025-01-01")
            }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $group: {
            _id: "$customerInfo.category",
            totalSales: { $sum: "$amount" },
            averageOrder: { $avg: "$amount" },
            orderCount: { $sum: 1 }
        }
    },
    {
        $sort: {
            totalSales: -1
        }
    }
]);
```

## Best Practices

1. **Query Optimization**
   - Use appropriate indexes
   - Minimize the number of documents scanned
   - Use projection to limit returned fields
   - Use limit() for pagination

2. **Data Modeling**
   - Design schemas based on application queries
   - Consider embedding vs referencing
   - Keep document size under 16MB
   - Use appropriate data types

3. **Aggregation Pipeline**
   - Place `$match` and `$limit` stages early
   - Use indexes to support stages
   - Break complex pipelines into smaller steps
   - Monitor memory usage

4. **Error Handling**
```javascript
try {
    await db.collection.insertOne({ name: "John Doe" });
} catch (error) {
    console.error("Error inserting document:", error);
}
```

## Additional Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Query Operators](https://docs.mongodb.com/manual/reference/operator/)
- [MongoDB Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
- [MongoDB Index Types](https://docs.mongodb.com/manual/indexes/)