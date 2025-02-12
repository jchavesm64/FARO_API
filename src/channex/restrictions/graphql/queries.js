export const getRatePlansRestrictions = `
query getRatePlansRestrictions($filters: RatePlanFilter) {
  getRatePlansRestrictions(filters: $filters) {
    status
   	data
    message
  }
}
`;

export const updateRestrictions = `
mutation updateRestrictions($input: [RestrictionInput]) {
  updateRestrictions(input: $input) {
    status
    data
    message
  }
}
`;
