## Rate Plan - Required Fields
### Example JSON Payload

```json
{
    "rate_plan": {
        "title": "Standard Rate",
        "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
        "room_type_id": "219375c4-561a-4561-a237-7f5b8aeb592f",
        "tax_set_id": "default",
        "options": [
            {
                "occupancy": 1,
                "is_primary": true,
                "rate": 0
            },
            {
                "occupancy": 2,
                "is_primary": false,
                "derived_option": { "rate": [["increase_by_percent", "10"]] },
                "rate": 0
            },
            {
                "occupancy": 3,
                "is_primary": false,
                "derived_option": { "rate": [["increase_by_percent", "20"]] },
                "rate": 0
            }
        ]
    }
}
```

### Required Fields

**`title` [required]**

Any non-empty string with a maximum length of 255 symbols. Should be unique per Property.
Note: The Rate Plan will be represented in the system under that title.

**`property_id` [required]**

String with valid UUID of the Property ID that you would like to associate with the created Rate Plan.

**`room_type_id` [required]**

String with valid UUID of Room Type ID that you would like to associate with the created Rate Plan.

**`tax_set_id` [optional]**

String with valid UUID of Tax Set ID that you would like to associate with the created Rate Plan. If not provided, default Tax Set associated with Property will be used.

**`options` [required]**

Array of Occupancy Option objects.


### Example JSON Payload with All Fields
```json
{
    "rate_plan": {
        "title": "Standard Rate",
        "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
        "room_type_id": "219375c4-561a-4561-a237-7f5b8aeb592f",
        "tax_set_id": "default",
        "parent_rate_plan_id": "a16305c4-561a-4561-a187-7f5b8aeb5921",
        "currency": "USD",
        "sell_mode": "per_room",
        "rate_mode": "manual",
        "meal_type": "breakfast",
        "auto_rate_settings": {
            "increase_by_percent": 10
        },
        "inherit_rate": true,
        "inherit_closed_to_arrival": false,
        "inherit_closed_to_departure": false,
        "inherit_stop_sell": true,
        "inherit_min_stay_arrival": false,
        "inherit_min_stay_through": false,
        "inherit_max_stay": true,
        "inherit_max_sell": false,
        "inherit_max_availability": true,
        "inherit_availability_offset": false,
        "children_fee": 10,
        "infant_fee": 5,
        "max_stay": [7, 7, 7, 7, 7, 7, 7],
        "min_stay_arrival": [1, 1, 1, 1, 1, 1, 1],
        "min_stay_through": [2, 2, 2, 2, 2, 2, 2],
        "closed_to_arrival": [false, false, false, false, false, false, false],
        "closed_to_departure": [false, false, false, false, false, false, false],
        "stop_sell": [false, false, false, false, false, false, false],
        "options": [
            {
                "occupancy": 1,
                "is_primary": true,
                "rate": 100
            },
            {
                "occupancy": 2,
                "is_primary": false,
                "derived_option": { "rate": [["increase_by_percent", "10"]] },
                "rate": 110
            },
            {
                "occupancy": 3,
                "is_primary": false,
                "derived_option": { "rate": [["increase_by_percent", "20"]] },
                "rate": 120
            }
        ]
    }
}
```