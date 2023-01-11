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