# Groups API Documentation

Based on the following API documentation: [Groups Collection](https://docs.channex.io/api-v.1-documentation/groups-collection)

## Groups List
Check this: [Groups List](https://docs.channex.io/api-v.1-documentation/groups-collection#groups-list)

Retrieve list of Groups associated with user.

```shell
GET http://localhost:4000/api/v1/channex/groups
```

## Get Group by ID
Check this: [Get Group by ID](https://docs.channex.io/api-v.1-documentation/groups-collection#get-group-by-id)

Retrieve specific Group associated with User by ID.
```shell
GET http://localhost:4000/api/v1/channex/groups/:id
```

## Create Group
Check this: [Create Group](https://docs.channex.io/api-v.1-documentation/groups-collection#create-group)

Create a new Group.
```shell
POST http://localhost:4000/api/v1/channex/groups
```

## Update Group
Check this: [Update Group](https://docs.channex.io/api-v.1-documentation/groups-collection#update-group)

Update Group.
```shell
PUT http://localhost:4000/api/v1/channex/groups/:id
```

## Remove Group (Not Implemented)
Check this: [Remove Group](https://docs.channex.io/api-v.1-documentation/groups-collection#remove-group)

Remove Group.
```shell
DELETE http://localhost:4000/api/v1/channex/groups/:id
```

## Associate Property with Group
Check this: [Associate Property with Group](https://docs.channex.io/api-v.1-documentation/groups-collection#associate-property-with-group)

Associate Property with Group.
```shell
POST http://localhost:4000/api/v1/channex/groups/:group_id/properties/:property_id
```

## Remove Property from Group
Check this: [Remove Property from Group](https://docs.channex.io/api-v.1-documentation/groups-collection#remove-property-from-group)

Remove Property from a Group.
```shell
DELETE http://localhost:4000/api/v1/channex/groups/:group_id/properties/:property_id
```