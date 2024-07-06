// Add new product 

import { json } from "@remix-run/node";
import { Status } from "./ProductsApi";
import { Shopify } from "@shopify/shopify-api";
import prisma from "../db.server";


/* Add Product in db */
export const AddProduct = async (product) => {
    try {

        let res = await prisma.product.create({
            data: product
        })
        // console.log('res', res)
        return json({ data: res, status: true })
    } catch (error) {
        console.log('result', error)
        return json({ error: "Something went Wrong", status: false })
    }
}

//delete a product from db
export const DeleteProduct = async (id) => {
    try {
        let result = await prisma.product.delete({ where: { id } })
        console.log('result', result)
        return json({ data: result, status: true })
    } catch (error) {
        console.log('result', error)
        return json({ error: "Something went Wrong", status: false })
    }
}

// get all products from local Database
export const GetProducts = async () => {
    try {
        let result = await prisma.product.findMany()
        console.log('ds', result)
        return json({ message: "Success", data: result, status: true })
    } catch (error) {
        return json({ error: "Db Something went Wrong", status: false })
    }
}

export const AddShopData = async (shop, session, appStatus) => {
    console.log('shop', shop);
    console.log('session', session);
    console.log('appStatus', appStatus);

    // const ShopData = {
    //     c


    // }




}


// shop ===> Shop {
//     10:01:06 │      remix │   address1: null,
//         10:01:06 │      remix │   address2: null,
//             10:01:06 │      remix │   checkout_api_supported: true,
//                 10:01:06 │      remix │   city: null,
//                     10:01:06 │      remix │   country: 'IN',
//                         10:01:06 │      remix │   country_code: 'IN',
//                             10:01:06 │      remix │   country_name: 'India',
//                                 10:01:06 │      remix │   county_taxes: true,
//                                     10:01:06 │      remix │   created_at: '2024-03-19T05:16:54-04:00',
//                                         10:01:06 │      remix │   currency: 'INR',
//                                             10:01:06 │      remix │   customer_email: 'arvind@vedaha.com',
//                                                 10:01:06 │      remix │   domain: 'bronzstoree.myshopify.com',
//                                                     10:01:06 │      remix │   eligible_for_card_reader_giveaway: undefined,
//                                                         10:01:06 │      remix │   eligible_for_payments: false,
//                                                             10:01:06 │      remix │   email: 'arvind@vedaha.com',
//                                                                 10:01:06 │      remix │   enabled_presentment_currencies: ['INR'],
//                                                                     10:01:06 │      remix │   finances: true,
//                                                                         10:01:06 │      remix │   force_ssl: undefined,
//                                                                             10:01:06 │      remix │   google_apps_domain: null,
//                                                                                 10:01:06 │      remix │   google_apps_login_enabled: null,
//                                                                                     10:01:06 │      remix │   has_discounts: false,
//                                                                                         10:01:06 │      remix │   has_gift_cards: true,
//                                                                                             10:01:06 │      remix │   has_storefront: true,
//                                                                                                 10:01:06 │      remix │   iana_timezone: 'America/New_York',
//                                                                                                     10:01:06 │      remix │   id: 64263651520,
//                                                                                                         10:01:06 │      remix │   latitude: null,
//                                                                                                             10:01:06 │      remix │   longitude: null,
//                                                                                                                 10:01:06 │      remix │   marketing_sms_consent_enabled_at_checkout: false,
//                                                                                                                     10:01:06 │      remix │   money_format: 'Rs. {{amount}}',
//                                                                                                                         10:01:06 │      remix │   money_in_emails_format: 'Rs. {{amount}}',
//                                                                                                                             10:01:06 │      remix │   money_with_currency_format: 'Rs. {{amount}}',
//                                                                                                                                 10:01:06 │      remix │   money_with_currency_in_emails_format: 'Rs. {{amount}}',
//                                                                                                                                     10:01:06 │      remix │   multi_location_enabled: true,
//                                                                                                                                         10:01:06 │      remix │   myshopify_domain: 'bronzstoree.myshopify.com',
//                                                                                                                                             10:01:06 │      remix │   name: 'BronzStoree',
//                                                                                                                                                 10:01:06 │      remix │   password_enabled: true,
//                                                                                                                                                     10:01:06 │      remix │   phone: null,
//                                                                                                                                                         10:01:06 │      remix │   plan_display_name: 'Developer Preview',
//                                                                                                                                                             10:01:06 │      remix │   plan_name: 'partner_test',
//                                                                                                                                                                 10:01:06 │      remix │   pre_launch_enabled: false,
//                                                                                                                                                                     10:01:06 │      remix │   primary_locale: 'en',
//                                                                                                                                                                         10:01:06 │      remix │   primary_location_id: 70075547840,
//                                                                                                                                                                             10:01:06 │      remix │   province: null,
//                                                                                                                                                                                 10:01:06 │      remix │   province_code: null,
//                                                                                                                                                                                     10:01:06 │      remix │   requires_extra_payments_agreement: false,
//                                                                                                                                                                                         10:01:06 │      remix │   setup_required: false,
//                                                                                                                                                                                             10:01:06 │      remix │   shop_owner: 'Arvind Maurya',
//                                                                                                                                                                                                 10:01:06 │      remix │   source: null,
//                                                                                                                                                                                                     10:01:06 │      remix │   tax_shipping: null,
//                                                                                                                                                                                                         10:01:06 │      remix │   taxes_included: false,
//                                                                                                                                                                                                             10:01:06 │      remix │   timezone: '(GMT-05:00) America/New_York',
//                                                                                                                                                                                                                 10:01:06 │      remix │   transactional_sms_disabled: true,
//                                                                                                                                                                                                                     10:01:06 │      remix │   updated_at: '2024-06-13T06:19:39-04:00',
//                                                                                                                                                                                                                         10:01:06 │      remix │   weight_unit: 'kg',
//                                                                                                                                                                                                                             10:01:06 │      remix │   zip: null,
//                                                                                                                                                                                                                                 10:01:06 │      remix │   auto_configure_tax_inclusivity: null
//     10:01:06 │      remix │
// }


