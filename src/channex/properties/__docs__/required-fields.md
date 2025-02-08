## Properties - Required Fields
### Example JSON Payload

```json
{
    "property": {
        "title": "Hotel California",
        "currency": "CRC"
    }
}
```

### Required Fields

#### `title` [required]

- **Type**: `String`
- **Max Length**: 255 characters
- **Description**: The title of the property. This will be used to represent the property in the system.

#### `currency` [required]

- **Type**: `String`
- **Length**: 3 characters
- **Description**: The currency code for the property, based on [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). This will be the default currency for nested property entities and will be provided to third-party services.

### Example JSON Payload with All Fields
```json
{
    "property": {
        "title": "Hotel California",
        "currency": "CRC",
        "email": "contact@hotelcalifornia.com",
        "phone": "+506 1234 5678",
        "zip_code": "12345",
        "country": "CR",
        "state": "San Jose",
        "city": "San Jose",
        "address": "123 Main St",
        "longitude": "-84.0833",
        "latitude": "9.9333",
        "timezone": "America/Costa_Rica",
        "facilities": [1, 2, 3],
        "property_type": "hotel",
        "group_id": "550e8400-e29b-41d4-a716-446655440000",
        "settings": {
            "allow_availability_autoupdate_on_confirmation": true,
            "allow_availability_autoupdate_on_modification": true,
            "allow_availability_autoupdate_on_cancellation": true,
            "min_stay_type": "both",
            "min_price": "100.00",
            "max_price": "500.00",
            "state_length": 365,
            "cut_off_time": "18:00",
            "cut_off_days": 1
        },
        "content": {
            "description": "A lovely place with a lovely face.",
            "important_information": "Check-in starts at 3 PM.",
            "photos": [
                {
                    "url": "http://example.com/photo1.jpg",
                    "position": 0,
                    "description": "Front view",
                    "author": "John Doe",
                    "kind": "photo"
                }
            ]
        },
        "logo_url": "http://example.com/logo.jpg",
        "website": "http://hotelcalifornia.com"
    }
}
```