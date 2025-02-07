export const getGroupsQuery = `
query {
  getGroups {
    status
    data {
      id
      type
      attributes {
        id
        title
      }
      relationships
    }
    message
  }
}
`;

export const createGroupMutation = `
mutation createGroup($input: GroupInput) {
  createGroup(input: $input) {
    status
    data {
      id
      attributes {
        title
      }
    }
    message
  }
}
`;

export const updateGroupMutation = `
mutation updateGroup($id: String!, $input: GroupInput) {
  updateGroup(id: $id, input: $input) {
    status
    data {
      id
      attributes {
        title
      }
    }
    message
  }
}
`;

export const addPropertyToGroupMutation = `
mutation addPropertyToGroup($groupId: String!, $propertyId: String!) {
  addPropertyToGroup(groupId: $groupId, propertyId: $propertyId) {
    status
    data {
      id
    }
    message
  }
}
`;

export const deletePropertyFromGroupMutation = `
mutation deletePropertyFromGroup($groupId: String!, $propertyId: String!) {
  deletePropertyFromGroup(groupId: $groupId, propertyId: $propertyId) {
    status
    data {
      id
    }
    message
  }
}
`;
