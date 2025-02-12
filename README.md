# MongoDB Queries Documentation

A comprehensive guide to MongoDB query operations, syntax, and examples.

## Table of Contents
- [Basic Operations](#basic-operations)
- [Query Operators](#query-operators)
- [Update Operations](#update-operations)
- [Aggregation Pipeline](#aggregation-pipeline)
- [Indexing](#indexing)
- [Advanced Queries](#advanced-queries)

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

## Query Operators

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

// Push to array
db.collection.updateOne(
    { name: "John Doe" },
    { $push: { hobbies: "reading" } }
);

// Pull from array
db.collection.updateOne(
    { name: "John Doe" },
    { $pull: { hobbies: "reading" } }
);
```

## Aggregation Pipeline

```javascript
db.collection.aggregate([
    // Match stage
    {
        $match: {
            age: { $gt: 25 }
        }
    },
    // Group stage
    {
        $group: {
            _id: "$status",
            avgAge: { $avg: "$age" },
            count: { $sum: 1 }
        }
    },
    // Sort stage
    {
        $sort: {
            avgAge: -1
        }
    }
]);
```

## Indexing

```javascript
// Create single field index
db.collection.createIndex({ name: 1 });

// Create compound index
db.collection.createIndex({ name: 1, age: -1 });

// Create unique index
db.collection.createIndex({ email: 1 }, { unique: true });

// List all indexes
db.collection.getIndexes();

// Drop index
db.collection.dropIndex("index_name");
```

## Advanced Queries

### Text Search

```javascript
// Create text index
db.collection.createIndex({ description: "text" });

// Perform text search
db.collection.find({
    $text: {
        $search: "mongodb database"
    }
});
```

### Geospatial Queries

```javascript
// Create 2dsphere index
db.collection.createIndex({ location: "2dsphere" });

// Find locations near a point
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

### Array Queries

```javascript
// Match array element
db.collection.find({
    tags: "mongodb"
});

// Match array element with condition
db.collection.find({
    scores: { $elemMatch: { $gt: 80, $lt: 90 } }
});
```

## Best Practices

1. Always use appropriate indexes for your queries
2. Limit the number of documents returned using `.limit()`
3. Use projection to return only necessary fields
4. Use aggregation pipeline for complex data transformations
5. Monitor query performance using `.explain()`
6. Use appropriate data types for fields
7. Consider document size limits (16MB per document)

## Common Query Patterns

### Pagination

```javascript
db.collection.find()
    .skip(20)
    .limit(10)
    .sort({ _id: 1 });
```

### Distinct Values

```javascript
db.collection.distinct("status");
```

### Count Documents

```javascript
db.collection.countDocuments({ age: { $gt: 25 } });
```

## Error Handling

Always wrap MongoDB operations in try-catch blocks:

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




# MongoDB Aggregation Framework Documentation

A comprehensive guide to MongoDB's aggregation framework, stages, operators, and best practices.

## Table of Contents
- [Introduction](#introduction)
- [Basic Syntax](#basic-syntax)
- [Common Aggregation Stages](#common-aggregation-stages)
- [Group Operations](#group-operations)
- [Array Operations](#array-operations)
- [Conditional Operations](#conditional-operations)
- [Window Operations](#window-operations)
- [Complex Examples](#complex-examples)
- [Best Practices](#best-practices)
- [Performance Optimization](#performance-optimization)

## Introduction

The MongoDB Aggregation Framework is a powerful tool for data processing and analysis that allows you to:
- Transform and analyze data
- Perform complex calculations
- Reshape document structures
- Create statistical reports

## Basic Syntax

```javascript
db.collection.aggregate([
    { stage1 },
    { stage2 },
    { stage3 }
    // ... more stages
]);
```

## Common Aggregation Stages

### $match Stage
Filters documents (similar to find operation)
```javascript
{
    $match: {
        age: { $gt: 25 },
        status: "active"
    }
}
```

### $project Stage
Reshapes documents and includes/excludes fields
```javascript
{
    $project: {
        fullName: { $concat: ["$firstName", " ", "$lastName"] },
        age: 1,
        _id: 0
    }
}
```

### $sort Stage
Sorts documents
```javascript
{
    $sort: {
        age: -1,    // descending
        name: 1     // ascending
    }
}
```

### $limit and $skip Stages
Pagination and document limiting
```javascript
{
    $skip: 10   // Skip first 10 documents
},
{
    $limit: 5   // Return only 5 documents
}
```

### $lookup Stage
Performs left outer join with another collection
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

## Group Operations

### Basic Grouping
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

### Complex Grouping
```javascript
{
    $group: {
        _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
        },
        totalSales: { $sum: "$amount" },
        avgOrderValue: { $avg: "$amount" },
        uniqueCustomers: { $addToSet: "$customerId" },
        maxOrder: { $max: "$amount" },
        minOrder: { $min: "$amount" }
    }
}
```

### Accumulator Operators
```javascript
{
    $group: {
        _id: "$category",
        // Sum
        total: { $sum: "$amount" },
        // Average
        average: { $avg: "$price" },
        // First value
        firstItem: { $first: "$name" },
        // Last value
        lastItem: { $last: "$name" },
        // Unique values
        uniqueValues: { $addToSet: "$tag" },
        // Push all values
        allValues: { $push: "$value" }
    }
}
```

## Array Operations

### $unwind Stage
Deconstructs array fields
```javascript
{
    $unwind: {
        path: "$tags",
        preserveNullAndEmptyArrays: true
    }
}
```

### Array Manipulation
```javascript
{
    $project: {
        // Filter array
        activeTags: {
            $filter: {
                input: "$tags",
                as: "tag",
                cond: { $eq: ["$$tag.status", "active"] }
            }
        },
        // Map array
        upperTags: {
            $map: {
                input: "$tags",
                as: "tag",
                in: { $toUpper: "$$tag" }
            }
        },
        // Array size
        tagCount: { $size: "$tags" }
    }
}
```

## Conditional Operations

### $switch
```javascript
{
    $project: {
        category: 1,
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

### $cond
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

## Window Operations

### Moving Average
```javascript
{
    $setWindowFields: {
        partitionBy: "$category",
        sortBy: { date: 1 },
        output: {
            movingAvg: {
                $avg: "$amount",
                window: {
                    range: [-2, 0],
                    unit: "day"
                }
            }
        }
    }
}
```

### Running Total
```javascript
{
    $setWindowFields: {
        partitionBy: "$userId",
        sortBy: { date: 1 },
        output: {
            runningTotal: {
                $sum: "$amount",
                window: {
                    documents: ["unbounded", "current"]
                }
            }
        }
    }
}
```

## Complex Examples

### Sales Analysis Pipeline
```javascript
db.orders.aggregate([
    // Match relevant documents
    {
        $match: {
            date: {
                $gte: ISODate("2024-01-01"),
                $lt: ISODate("2025-01-01")
            }
        }
    },
    // Lookup customer information
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customerInfo"
        }
    },
    // Unwind customer array
    {
        $unwind: "$customerInfo"
    },
    // Group by customer category
    {
        $group: {
            _id: "$customerInfo.category",
            totalSales: { $sum: "$amount" },
            averageOrder: { $avg: "$amount" },
            orderCount: { $sum: 1 },
            uniqueCustomers: { $addToSet: "$customerId" }
        }
    },
    // Add calculated fields
    {
        $project: {
            category: "$_id",
            totalSales: 1,
            averageOrder: 1,
            orderCount: 1,
            customerCount: { $size: "$uniqueCustomers" },
            averageCustomerValue: {
                $divide: ["$totalSales", { $size: "$uniqueCustomers" }]
            }
        }
    },
    // Sort by total sales
    {
        $sort: {
            totalSales: -1
        }
    }
]);
```

### Customer Segmentation Pipeline
```javascript
db.customers.aggregate([
    // Calculate customer metrics
    {
        $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders"
        }
    },
    {
        $project: {
            name: 1,
            totalSpent: { $sum: "$orders.amount" },
            orderCount: { $size: "$orders" },
            averageOrder: { $avg: "$orders.amount" },
            lastOrder: { $max: "$orders.date" }
        }
    },
    // Add customer segments
    {
        $addFields: {
            segment: {
                $switch: {
                    branches: [
                        { case: { $gt: ["$totalSpent", 10000] }, then: "VIP" },
                        { case: { $gt: ["$totalSpent", 5000] }, then: "Premium" },
                        { case: { $gt: ["$totalSpent", 1000] }, then: "Regular" }
                    ],
                    default: "New"
                }
            }
        }
    }
]);
```

## Best Practices

1. **Pipeline Optimization**
   - Place `$match` and `$limit` stages early in the pipeline
   - Use indexes to support your `$match` and `$sort` operations
   - Avoid unnecessary stages and transformations

2. **Memory Considerations**
   - Be cautious with `$group` and `$sort` stages as they can consume significant memory
   - Use `allowDiskUse: true` for large datasets
   - Break down complex pipelines into smaller steps

3. **Performance Tips**
   - Index fields used in `$match`, `$sort`, and `$lookup` stages
   - Use `$project` to reduce document size early in the pipeline
   - Avoid unnecessary `$unwind` operations on large arrays

## Performance Optimization

### Using Indexes
```javascript
// Create indexes for frequently used fields
db.collection.createIndex({ "date": 1 });
db.collection.createIndex({ "customerId": 1 });
```

### Explain Plan
```javascript
db.collection.aggregate([
    // Your pipeline stages
], {
    explain: true
});
```

### Memory Management
```javascript
db.collection.aggregate([
    // Your pipeline stages
], {
    allowDiskUse: true,
    maxTimeMS: 60000
});
```

## Common Aggregation Patterns

### Date Grouping
```javascript
{
    $group: {
        _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
        },
        count: { $sum: 1 }
    }
}
```

### Faceted Search
```javascript
{
    $facet: {
        categoryCounts: [
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ],
        priceRanges: [
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 50, 100, 200, 500],
                    default: "500+",
                    output: { count: { $sum: 1 } }
                }
            }
        ]
    }
}
```