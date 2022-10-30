interface IProductResponse {
    msg_id:                 number;
    msg:                    string;
    product_details:        IProductDetails[];
    subscription_details:   ISubscriptionDetails[] | null;
}

interface IProductDetails {
    product_id:             string;
    product_name:           string;
    product_description:    string;
    product_price:          number;
    product_is_active:      boolean;
    product_frequency:      string;
}

interface ISubscriptionDetails {

}

export { IProductResponse }