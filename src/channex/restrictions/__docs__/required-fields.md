## Restrictions - Required Fields

### Example JSON Payload
```json
{
    "values": [
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date": "2023-11-01"
        },
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date_from": "2023-11-01",
            "date_to": "2023-11-30"
        },
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date_from": "2023-12-01",
            "date_to": "2023-12-31"
        }
    ]
}
```
### Required Fields

**`property_id` [required]**

String with valid UUID of Property object.

**`rate_plan_id` [required]**

String with valid UUID of Rate Plan object.

**`date` [required]**
String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD.  
Past dates are not allowed.

**`date_from` [required if date is not present]**

String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD.  
Start of applicable date range.  
Past dates are not allowed.

**`date_to` [required if date is not present]**

String with date in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format by mask YYYY-MM-DD.  
End of applicable date range.  
Past dates are not allowed.

### Example JSON Payload with All Fields
```json
{
    "values": [
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date": "2023-11-01",
            "rate": "200.00",
            "min_stay_arrival": 2,
            "max_stay": 10,
            "closed_to_arrival": true
        },
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date_from": "2023-11-01",
            "date_to": "2023-11-30",
            "days": ["mo", "we", "fr"],
            "rate": 25000,
            "min_stay_through": 3,
            "closed_to_departure": false
        },
        {
            "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
            "rate_plan_id": "bab451e7-9ab1-4cc4-aa16-107bf7bbabb2",
            "date_from": "2023-12-01",
            "date_to": "2023-12-31",
            "rate": 30000,
            "stop_sell": 1
        }
    ]
}
```