import { json } from "@remix-run/node";
import { RestResources } from "@shopify/shopify-api/rest/admin/2024-04"
import { AdminApiContext } from "@shopify/shopify-app-remix/server"


export const CreateProductApi = async (admin, data) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, descriptionHtml, productType, category, price, cost, status, tags, vendor, availableQuantity, customProductType } = data

  try {

    //         const mutation = `mutation CreateProduct($input: ProductInput!) {
    //                                 productCreate(input: $input) {
    //                                 product {
    //                                     id
    //                                 }
    //                                 userErrors{
    //                                     field
    //                                     message
    //                                 }     
    //                                 }                                
    //                             }
    // `;

    //         const variables = {
    //             input: {
    //                 title,
    //                 productType,
    //                 vendor,
    //                 descriptionHtml,
    //                 tags,
    //                 // status: 'sdff'
    //                 // category

    //             }
    //         };

    let response = await admin.graphql(
      `#graphql
            mutation CreateProduct($input: ProductInput!) {
                productCreate(input: $input) {
                product {
                  id
                  title
                  variants(first:10){
                    edges{
                        node{
                            id
                        }
                    }
                  }
                }
                
                userErrors {
                  field
                  message
                }
              }
            }`,
      {
        variables: {
          "input": {
            title,
            productType,
            vendor,
            descriptionHtml,
            tags,
            // status: 'sdff'
            // category

          }
        },
      },
    );


    // let response: any = await admin.graphql(mutation, { variables });
    response = await response.json()

    if (response) {
      console.log('!response?.data?.productCreate?.product?.id', response?.data);
      if (!response?.data?.productCreate?.product?.id) { return json({ data: response, success: false, message: 'Invalid Product Data' }) }
      if (price || cost) {
        return await updateProductVariantData(admin, {
          variantId: response?.data?.productCreate?.product?.variants?.edges?.[0]?.node?.id,
          price,
          cost,
        })
        return json({ data: response, message: "Product Created Successfully to be variant", success: true })

      }

      return json({ data: response, message: "Product Created Successfully", success: true })

      console.log('response:====>', response);
    }


    console.log('response', response);






  } catch (error) {
    console.log('product err: ', error);


    return json({ data: error, message: "Product Insertion error", success: false })

  }


}

const updateProductVariantData = async (admin, data) => {

  const { variantId, price, cost, availableQuantity } = data

  try {

    let response = await admin.graphql(
      `#graphql
            mutation updateProductVariantMetafields($input: ProductVariantInput!) {
                productVariantUpdate(input: $input) {
                product {
                  id
                  title

                }
                productVariant {
                  createdAt
                  displayName
                  id
                  inventoryItem {
                    unitCost {
                      amount
                    }
                    tracked
                  }
                  inventoryPolicy
                  inventoryQuantity
                  price
                  product {
                    id
                  }
                  title
                }
                userErrors {
                  field
                  message
                }
              }
            }`,
      {
        variables: {
          "input": {
            "inventoryItem": {
              "cost": cost,
              // "tracked": true
            },
            "inventoryPolicy": "DENY",
            // "inventoryQuantities": {
            //   "availableQuantity": 25,
            //   "locationId": "gid://shopify/Location/346779380"
            // },
            "price": price,
            "id": variantId,
            "requiresShipping": true,
            //   "options": "Holographic"
          }
        },
      },
    );

    response = await response.json()

    console.log('product Variant', response);
    if (response?.data?.productVariantCreate?.userErrors) {

      return json({ data: response?.data?.productVariantCreate?.userErrors, message: "Product variant Insertion error", success: false })

    }

    return json({ data: response, message: "Product Created Successfully with variant", success: true })


  } catch (error) {
    console.log('product Variant error', error);

    return json({ data: error, message: "Product variant Insertion error", success: false })

  }

}