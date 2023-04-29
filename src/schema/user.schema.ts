export const UserResponseSchema = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      access_token: {
        type: 'string',
        example: '234324234',
      },
    },
  },
  headers: {
    Cookie: {
      description: 'Jwt cookie',
      schema: {
        type: 'string',
        example: 'jwt=1234; HttpOnly; Secure',
      },
    },
  },
};

export const UserResponseTokenSchema = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      access_token: {
        type: 'string',
        example: '234324234',
      },
    },
  },
};

export const UserResponseLogOutSchema = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Cookie cleared',
      },
    },
  },
};
