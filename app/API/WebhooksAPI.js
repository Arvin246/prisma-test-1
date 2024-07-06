


export const registerWebhooksTopic = async (admin, topic, callbackUrl) => {

    try {
        const res = await admin.graphql(`
        #graphql
        mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
  webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
    webhookSubscription {
      id
      topic
      format
      endpoint {
        __typename
        ... on WebhookHttpEndpoint {
          callbackUrl
        }
      }
    }
    userErrors{
        field
        message
    }
  }
}
            
            `, {
            variables: {
                "topic": topic,
                "webhookSubscription": {
                    "callbackUrl": callbackUrl,
                    "format": "JSON"
                }
            }
        })

        const result=await res.json()

        // console.log('response webhooks', result);
        return result
    } catch (error) {
        console.log('error webhooks register', error);
        return false
    }




}