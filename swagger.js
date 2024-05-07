export const swagger_api={
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "Sample API",
      "description": "A sample API with Swagger documentation"
    },
    "basePath": "/",
    "tags": [
      {
        "name": "users",
        "description": "Operations related to users"
      },
      {
        "name": "posts",
        "description": "Operations related to posts"
      }
    ],
    // "paths": {
    //   "/users": {
    //     "get": {
    //       "tags": ["users"],
    //       "summary": "Get all users",
    //       "responses": {
    //         "200": {
    //           "description": "Successful operation",
    //           "schema": {
    //             "type": "array",
    //             "items": {
    //               "$ref": "#/definitions/User"
    //             }
    //           }
    //         }
    //       }
    //     }
    //   },
    //   "/users/{id}": {
    //     "get": {
    //       "tags": ["users"],
    //       "summary": "Get user by ID",
    //       "parameters": [
    //         {
    //           "name": "id",
    //           "in": "path",
    //           "required": true,
    //           "type": "integer"
    //         }
    //       ],
    //       "responses": {
    //         "200": {
    //           "description": "Successful operation",
    //           "schema": {
    //             "$ref": "#/definitions/User"
    //           }
    //         }
    //       }
    //     }
    //   },
    //   "/posts": {
    //     "get": {
    //       "tags": ["posts"],
    //       "summary": "Get all posts",
    //       "responses": {
    //         "200": {
    //           "description": "Successful operation",
    //           "schema": {
    //             "type": "array",
    //             "items": {
    //               "$ref": "#/definitions/Post"
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    
    "paths": {
      "/auth/login": {
        "post": {
          "summary": "User login",
          "description": "Endpoint to authenticate user",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "description": "Login credentials",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "email",
                  "password"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful login",
              "schema": {
                "type": "object",
                "properties": {
                  "access_token": {
                    "type": "string"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      
          "/auth/register": {
            "post": {
              "summary": "User registration",
              "description": "Endpoint to register a new user",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [
                {
                  "name": "body",
                  "in": "body",
                  "description": "User registration details",
                  "required": true,
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string",
                        "format": "email"
                      },
                      "password": {
                        "type": "string"
                      }
                    },
                    "required": ["name", "email", "password"]
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "User registered successfully"
                },
                "400": {
                  "description": "Invalid request"
                }
              }
            }
          }
        
      
      
    },
    "definitions": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "username": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          }
        }
      },
      "Post": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "title": {
            "type": "string"
          },
          "content": {
            "type": "string"
          }
        }
      }
    }
  }


  