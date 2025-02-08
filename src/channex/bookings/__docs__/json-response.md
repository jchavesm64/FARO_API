## Bookings - JSON Example Payload

### JSON Example Payload
```json
{
    "meta": {
        "total": 1,
        "page": 1,
        "limit": 10
    },
    "data": [
        {
            "type": "booking",
            "id": "603e8e9e-cc67-4ca7-bd13-3c407c6c3bbd",
            "attributes": {
                "id": "603e8e9e-cc67-4ca7-bd13-3c407c6c3bbd",
                "property_id": "716305c4-561a-4561-a187-7f5b8aeb5920",
                "revision_id": "03dd7198-c5b7-493c-a889-74d0c2211de7",
                "unique_id": "BDC-1556013801",
                "ota_reservation_code": "1556013801",
                "ota_name": "Booking.com",
                "status": "new",
                "rooms": [
                    {
                        "amount": "200.00",
                        "checkin_date": "2019-04-26",
                        "checkout_date": "2019-04-27",
                        "rate_plan_id": "445835fb-7956-42ac-9efc-3e6f331f0808",
                        "room_type_id": "994d1375-dbbd-4072-8724-b2ab32ce781b",
                        "ota_unique_id": "49",
                        "days": {
                            "2019-04-26": "200.00"
                        },
                        "occupancy": {
                            "adults": 2,
                            "children": 0,
                            "infants": 0
                        }
                    }
                ],
                "services": [
                    {
                        "type": "Breakfast",
                        "total_price": "20.00",
                        "price_per_unit": "10.00",
                        "price_mode": "Per person per night",
                        "persons": 2,
                        "nights": 1,
                        "name": "Breakfast"
                    }
                ],
                "guarantee": {
                    "expiration_date": "10/2020",
                    "cvv": "***",
                    "cardholder_name": "Channex User",
                    "card_type": "visa",
                    "card_number": "411111******1111"
                },
                "customer": {
                    "zip": "2031 BE",
                    "surname": "Channex",
                    "phone": "1234567890",
                    "name": "User",
                    "mail": "user@channex.io",
                    "language": "en",
                    "country": "NL",
                    "city": "Haarlem",
                    "address": "JW Lucasweg 35",
                    "company": {
                        "title": "Company Name",
                        "number": "1123331",
                        "number_type": "VAT",
                        "type": "Registration Number"
                    }
                },
                "occupancy": {
                    "adults": 2,
                    "children": 0,
                    "infants": 0
                },
                "arrival_date": "2019-04-26",
                "departure_date": "2019-04-27",
                "arrival_hour": "10:00",
                "amount": "220.00",
                "ota_commission": "10.00",
                "currency": "GBP",
                "notes": "You have a booker that would like free parking. (based on availability)\nYou have a booker that would prefer a quiet room. (based on availability)",
                "inserted_at": "2019-04-23T10:03:29.335485"
            }
        }
    ],
    "meta": {
        "page": 1,
        "total": 1,
        "limit": 10
    }
}
```