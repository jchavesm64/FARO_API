## Availability - Required Fields

### Example JSON Payload
```json
{
    "values": [
        {
            "property_id": "123e4567-e89b-12d3-a456-426614174000",
            "room_type_id": "123e4567-e89b-12d3-a456-426614174001",
            "date": "2023-10-01",
            "availability": 5
        },
        {
            "property_id": "123e4567-e89b-12d3-a456-426614174002",
            "room_type_id": "123e4567-e89b-12d3-a456-426614174003",
            "date_from": "2023-10-01",
            "date_to": "2023-10-10",
            "availability": 10
        }
    ]
}
```

### Required Fields

**`property_id` [required]**

String with valid UUID of Property object.

**`room_type_id` [required]**

String with valid UUID of Room Type object.

**`date` [required if `date_from` is not present]**

String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD.

**`date_from` [required if `date` is not present]**

String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD. Start of applicable date range.

**`date_to` [required if `date` is not present]**

String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD. End of applicable date range.

**`availability` [required]**

Non-negative Integer value.