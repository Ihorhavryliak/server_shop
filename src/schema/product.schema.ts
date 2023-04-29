export const ProductResponseSchema = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: '232',
      },
      name: {
        type: 'string',
        example: 'Product 1',
      },
      title: {
        type: 'string | null',
        example: 'null',
      },
      description: {
        type: 'string | null',
        example: 'null',
      },
      price: {
        type: 'number',
        example: '1',
      },
      count: {
        type: 'number',
        example: '1',
      },
      image: {
        type: 'array',
        example: '[]',
      },
      cart_id: {
        type: 'string | null',
        example: 'null',
      },
      orders_id: {
        type: 'string | null',
        example: 'null',
      },
      createdAt: {
        type: 'string',
        example: '2023-04-24T11:19:43.198Z',
      },
      updatedAt: {
        type: 'string',
        example: '2023-04-24T11:19:43.198Z',
      },
      categories: {
        type: 'array',
        example: '[]',
      },
    },
    required: ['name'],
  },
};

export const GetProductResponseSchema = {
  status: 200,
  schema: {
    type: 'array',
    items: {
      properties: {
        id: {
          type: 'number',
          example: '232',
        },
        name: {
          type: 'string',
          example: 'Product 1',
        },
        title: {
          type: 'string | null',
          example: 'null',
        },
        description: {
          type: 'string | null',
          example: 'null',
        },
        price: {
          type: 'number',
          example: '1',
        },
        count: {
          type: 'number',
          example: '1',
        },
        image: {
          type: 'array',
          example: '[]',
        },
        cart_id: {
          type: 'string | null',
          example: 'null',
        },
        orders_id: {
          type: 'string | null',
          example: 'null',
        },
        createdAt: {
          type: 'string',
          example: '2023-04-24T11:19:43.198Z',
        },
        updatedAt: {
          type: 'string',
          example: '2023-04-24T11:19:43.198Z',
        },
        categories: {
          type: 'array',
          example: '[]',
        },
      },
    },
  },
};

export const DeleteProductResponseSchema = {
  status: 201,
  schema: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: 'true',
      },
    },
  },
};

export const UpdateProductResponseSchema = {
  status: 200,
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: '19',
      },
      name: {
        type: 'string',
        example: 'Product 1',
      },
      title: {
        type: 'string | null',
        example: 'null',
      },
      description: {
        type: 'string | null',
        example: 'null',
      },
      price: {
        type: 'number',
        example: '1',
      },
      count: {
        type: 'number',
        example: '1',
      },
      image: {
        type: 'array',
        example: '[]',
      },
      cart_id: {
        type: 'string | null',
        example: 'null',
      },
      orders_id: {
        type: 'string | null',
        example: 'null',
      },
    },
  },
};
