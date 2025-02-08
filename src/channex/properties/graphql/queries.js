export const getPropertiesQuery = `
query {
  getProperties {
    status
    data {
      id
      type
      attributes {
        id
        title
        isActive
        email
        phone
        currency
        country
        state
        city
        address
        zipCode
        latitude
        longitude
        timezone
        propertyType
        content {
          description
          photos {
            author
            description
            id
            kind
            position
            propertyId
            roomTypeId
            url
          }
          importantInformation
        }
        logoUrl
        website
      }
    }
    message
  }
}

`;

export const getPropertiesOptionsQuery = `
query {
  getPropertiesOptions {
    status
    data {
      id
      type
      attributes {
        title
        currency
        minStayType
        propertyType
        groupIds
      }
    }
    message
  }
}
`;

export const createPropertyMutation = `
mutation CreateProperty($input: PropertyInput) {
  createProperty(input: $input) {
    status
    data {
      id
      type
      attributes {
        id
        title
        isActive
        email
        phone
        currency
        country
        state
        city
        address
        zipCode
        latitude
        longitude
        timezone
        propertyType
        content {
          description
          photos {
            author
            description
            id
            kind
            position
            propertyId
            roomTypeId
            url
          }
          importantInformation
        }
        logoUrl
        website
        groupId
      }
    }
    message
  }
}
`;

export const updatePropertyMutation = `
mutation UpdateProperty($id: String!, $input: PropertyInput) {
  updateProperty(id: $id, input: $input) {
    status
    data {
      id
      type
      attributes {
        id
        title
        isActive
        email
        phone
        currency
        country
        state
        city
        address
        zipCode
        latitude
        longitude
        timezone
        propertyType
        content {
          description
          photos {
            author
            description
            id
            kind
            position
            propertyId
            roomTypeId
            url
          }
          importantInformation
        }
        logoUrl
        website
        groupId
      }
    }
    message
  }
}
`;

export const deletePropertyMutation = `
mutation DeleteProperty($id: String!) {
  deleteProperty(id: $id) {
    status
    message
  }
}
`;