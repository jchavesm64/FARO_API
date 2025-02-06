export const getRatePlanByIdQuery = `
query getRatePlanById($id: String){
  getRatePlanById(id: $id) {
    id
    title
    propertyId
    roomTypeId
    options {
      occupancy
      isPrimary
      rate
    }
    taxSetId
    parentRatePlanId
    currency
    sellMode
    rateMode
    mealType
    childrenFee
    infantFee
    maxStay
    minStayArrival
    minStayThrough
    closedToArrival
    closedToDeparture
    stopSell
  }
}
`;

export const createRatePlanMutation = `
mutation CreateRatePlan($input: RatePlanInput) {
  createRatePlan(input: $input) {
    status
    message
    data {
      id
      title
    }
  }
}
`;

export const updateRatePlanMutation = `
mutation UpdateRatePlan($id: String, $input: RatePlanInput) {
  updateRatePlan(id: $id, input: $input) {
    status
    message
    data {
      title
    }
  }
}
`;

export const deleteRatePlanMutation = `
mutation DeleteRatePlan($id: String) {
  deleteRatePlan(id: $id) {
    status
    message
  }
}
`;