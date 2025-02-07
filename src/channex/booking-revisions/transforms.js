export const transformToGraphQL = (apiPayload) => {
  const transform = (attributes) => ({
    attributes: {
      id: attributes.id,
      propertyId: attributes.property_id || null,
      bookingId: attributes.booking_id,
      acknowledgeStatus: attributes.acknowledge_status,
      uniqueId: attributes.unique_id,
      otaReservationCode: attributes.ota_reservation_code,
      otaName: attributes.ota_name,
      status: attributes.status,
      rooms: attributes.rooms.map((room) => ({
        amount: room.amount,
        checkinDate: room.checkin_date,
        checkoutDate: room.checkout_date,
        ratePlanId: room.rate_plan_id,
        roomTypeId: room.room_type_id,
        otaUniqueId: room.ota_unique_id,
        days: Array.isArray(room.days)
          ? room.days.map((day) => ({
              date: day.date,
              amount: day.amount,
            }))
          : Object.entries(room.days).map(([date, amount]) => ({
              date,
              amount,
            })),

        occupancy: room.occupancy,
      })),
      services: attributes.services.map((service) => ({
        type: service.type,
        totalPrice: service.total_price,
        pricePerUnit: service.price_per_unit,
        priceMode: service.price_mode,
        persons: service.persons,
        nights: service.nights,
        name: service.name,
      })),
      guarantee: attributes.guarantee
        ? {
            expirationDate: attributes.guarantee.expiration_date,
            cvv: attributes.guarantee.cvv,
            cardholderName: attributes.guarantee.cardholder_name,
            cardType: attributes.guarantee.card_type,
            cardNumber: attributes.guarantee.card_number,
          }
        : null,
      customer: {
        zip: attributes.customer.zip,
        surname: attributes.customer.surname,
        phone: attributes.customer.phone,
        name: attributes.customer.name,
        mail: attributes.customer.mail,
        language: attributes.customer.language,
        country: attributes.customer.country,
        city: attributes.customer.city,
        address: attributes.customer.address,
        company: attributes.customer.company,
      },
      occupancy: attributes.occupancy,
      arrivalDate: attributes.arrival_date,
      departureDate: attributes.departure_date,
      arrivalHour: attributes.arrival_hour,
      amount: attributes.amount,
      otaCommission: attributes.ota_commission,
      currency: attributes.currency,
      notes: attributes.notes,
      insertedAt: attributes.inserted_at,
    },
  });

  if (Array.isArray(apiPayload)) {
    return apiPayload.map((payload) => transform(payload.attributes));
  } else {
    return transform(apiPayload.attributes);
  }
};
