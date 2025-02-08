## Room Type - Required Fields
### Example JSON Payload 

```json
{
  "room_type": {
    "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
    "title": "Standard Room",
    "count_of_rooms": 20,
    "occ_adults": 3,
    "occ_children": 0,
    "occ_infants": 0,
    "default_occupancy": 2,
  }
}
```

### Required Fields

**`property_id` [required]**

- **Type:** `String` (UUID)
- **Description:** Valid UUID of the Property to associate with the created Room Type.

**`title` [required]**

- **Type:** `String` (max 255 characters)
- **Description:** Non-empty string representing the Room Type title in the system.

**`count_of_rooms` [required]**

- **Type:** `Positive Integer`
- **Description:** Number of Units to sell of this type. Affects billing if the property is a Vacation Rental.

**`occ_adults` [required]**

- **Type:** `Positive Integer`
- **Description:** Number of Adult bed spaces in this Room Type.

**`occ_children` [required]**

- **Type:** `Positive Integer`
- **Description:** Number of Child-only bed spaces in this Room Type. Set to 0 if no Child-only beds.

**`occ_infants` [required]**

- **Type:** `Positive Integer`
- **Description:** Number of Infant cots available in this Room Type.

**`default_occupancy` [required]**

- **Type:** `Positive Integer` (<= `occ_adults`)
- **Description:** Default number of guests that can stay in the room without extra spaces. Cannot exceed `occ_adults` value.


### Example JSON Payload with All Fields
```json
{
    "room_type": {
        "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
        "title": "Standard Room",
        "count_of_rooms": 20,
        "occ_adults": 3,
        "occ_children": 1,
        "occ_infants": 1,
        "default_occupancy": 2,
        "facilities": ["facility1", "facility2"],
        "room_kind": "room",
        "capacity": 4,
        "content": {
            "description": "A cozy standard room with all amenities.",
            "photos": [
                {
                    "url": "http://example.com/photo1.jpg",
                    "position": 0,
                    "description": "Main view of the room",
                    "author": "John Doe",
                    "kind": "photo"
                },
                {
                    "url": "http://example.com/photo2.jpg",
                    "position": 1,
                    "description": "Bathroom view",
                    "author": "Jane Smith",
                    "kind": "photo"
                }
            ]
        }
    }
}
```