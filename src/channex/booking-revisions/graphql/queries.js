export const getBookingRevisions = `
query {
  getBookingRevisions {
    status
    data {
      attributes {
        acknowledgeStatus
        propertyId
        bookingId
        uniqueId
        otaReservationCode
        otaName
        status
        rooms {
          amount
          checkinDate
          checkoutDate
          ratePlanId
          roomTypeId
          otaUniqueId
          days {
            date
            amount
          }
          occupancy {
            adults
            children
            infants
          }
        }
        services {
          type
          totalPrice
          pricePerUnit
          priceMode
          persons
          nights
          name
        }
        guarantee {
          expirationDate
          cvv
          cardholderName
          cardType
          cardNumber
        }
        customer {
          zip
          surname
          phone
          name
          mail
          language
          country
          city
          address
          company {
            title
            number
            numberType
            type
          }
        }
        occupancy {
          adults
          children
          infants
        }
        arrivalDate
        departureDate
        arrivalHour
        amount
        otaCommission
        currency
        notes
        insertedAt
      }
    }
    message
  }
}
`;
