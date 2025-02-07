export const getPropertiesQuery = `
query {
  getProperties {
    status
    data {
      id
      type
      attributes {
        title
        
      }
    }
    message
  }
}
`;
