/*

   - The 'PRODUCT_QUERY' const variable refers to the data from the 'collection type' called 'Product' created in 'Strapi'. 

   - The query object assigned to the const variable 'PRODUCT_QUERY' was created using 'GraphQl' playground at 'http://localhost:1337/graphql'

*/

export const PRODUCT_QUERY = `
  query{
    products{
      data{
        attributes{
          title
          description
          price
          slug
          image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`


/*

   - fetches a specific product that was created in strapi

   - a slug is passed to the 'getProduct' query

   - query getProduct($slug: String!): the slug has to be a string and it is required by using the ! (exclamation) mark

   - the slug is then passed to products and the filters is used to compare the slug that was passed down to a slug that matched a product in strapi
      
   - if the slug that was passed down matches a slug for a product created in strapi, graphql will get the data (title, slug, description, price, etc...) associated with that product as shown beloe 
   
    products(filters: {slug: {eq: $slug}}){
      data {
        attributes {
          title,
          slug,
          description,
          price,
          image {
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }

*/

export const GET_PRODUCT_QUERY = `

  query getProduct($slug: String!){
    products(filters: {slug: {eq: $slug}}){
      data {
        attributes {
          title,
          slug,
          description,
          price,
          image {
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }

`