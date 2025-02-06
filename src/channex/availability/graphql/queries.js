export const updateAvailabilityMutation = `
mutation updateAvailability($input: DateAvailabilityInput!) {
    updateAvailability(input: $input) {
        status
        message
        data
    }
}
`;
