export interface Order {
    id:                  string;
    status:              string;
    created_at:          Date;
    total:               number;
    metadata?:           any; 
    shipping_total:      number;
    discount_total:      number;
    customer_id:         string;
    sales_channel_id:    string;
    items:               Item[];
    summary:             Summary;
    shipping_address:    ShippingAddress;
    customer:            Customer;
    sales_channel:       SalesChannel;
    payment_transaction: PaymentTransaction;
}

export interface Customer {
    id:           string;
    company_name: string;
    first_name:   string;
    last_name:    string;
    email:        string;
    phone:        string;
    has_account:  boolean;
    metadata:     CustomerMetadata;
    created_by:   null;
    created_at:   Date;
    updated_at:   Date;
    deleted_at:   null;
}

export interface CustomerMetadata {
    dob:         Date;
    avatar:      string;
    gender:      string;
    username:    string;
    is_verified: boolean;
}

export interface Item {
    id:                            string;
    title:                         string;
    subtitle:                      string;
    thumbnail:                     string;
    variant_id:                    string;
    product_id:                    string;
    product_title:                 string;
    product_description:           string;
    product_subtitle:              string;
    product_type:                  string;
    product_type_id:               string;
    product_collection:            string;
    product_handle:                string;
    variant_sku:                   string;
    variant_barcode:               null;
    variant_title:                 string;
    variant_option_values:         null;
    requires_shipping:             boolean;
    is_discountable:               boolean;
    is_tax_inclusive:              boolean;
    raw_compare_at_unit_price:     Raw;
    raw_unit_price:                Raw;
    is_custom_price:               boolean;
    metadata:                      ItemMetadata;
    created_at:                    Date;
    updated_at:                    Date;
    deleted_at:                    null;
    tax_lines:                     any[];
    adjustments:                   any[];
    compare_at_unit_price:         number;
    unit_price:                    number;
    quantity:                      number;
    raw_quantity:                  Raw;
    detail:                        Detail;
    subtotal:                      number;
    total:                         number;
    original_total:                number;
    discount_total:                number;
    discount_subtotal:             number;
    discount_tax_total:            number;
    tax_total:                     number;
    original_tax_total:            number;
    refundable_total_per_unit:     number;
    refundable_total:              number;
    fulfilled_total:               number;
    shipped_total:                 number;
    return_requested_total:        number;
    return_received_total:         number;
    return_dismissed_total:        number;
    write_off_total:               number;
    raw_subtotal:                  Raw;
    raw_total:                     Raw;
    raw_original_total:            Raw;
    raw_discount_total:            Raw;
    raw_discount_subtotal:         Raw;
    raw_discount_tax_total:        Raw;
    raw_tax_total:                 Raw;
    raw_original_tax_total:        Raw;
    raw_refundable_total_per_unit: Raw;
    raw_refundable_total:          Raw;
    raw_fulfilled_total:           Raw;
    raw_shipped_total:             Raw;
    raw_return_requested_total:    Raw;
    raw_return_received_total:     Raw;
    raw_return_dismissed_total:    Raw;
    raw_write_off_total:           Raw;
}

export interface Detail {
    id:                            string;
    order_id:                      string;
    version:                       number;
    item_id:                       string;
    raw_unit_price:                null;
    raw_compare_at_unit_price:     null;
    raw_quantity:                  Raw;
    raw_fulfilled_quantity:        Raw;
    raw_delivered_quantity:        Raw;
    raw_shipped_quantity:          Raw;
    raw_return_requested_quantity: Raw;
    raw_return_received_quantity:  Raw;
    raw_return_dismissed_quantity: Raw;
    raw_written_off_quantity:      Raw;
    metadata:                      null;
    created_at:                    Date;
    updated_at:                    Date;
    deleted_at:                    null;
    unit_price:                    null;
    compare_at_unit_price:         null;
    quantity:                      number;
    fulfilled_quantity:            number;
    delivered_quantity:            number;
    shipped_quantity:              number;
    return_requested_quantity:     number;
    return_received_quantity:      number;
    return_dismissed_quantity:     number;
    written_off_quantity:          number;
}

export interface Raw {
    value:     string;
    precision: number;
}

export interface ItemMetadata {
}

export interface PaymentTransaction {
    id:           string;
    date_created: Date;
    date_updated: Date;
    order_id:     string;
    buyer_email:  string;
    currency:     string;
    amount:       number;
    payment_id:   string;
    description:  string;
    details:      null;
    channel:      string;
    meta_data:    MetaData;
    status:       string;
    payment_link: string;
    fee:          string;
    total_amount: string;
    return_url:   string;
    submit_url:   string;
    cancel_url:   string;
    provider:     Provider;
    method:       Method;
}

export interface MetaData {
    order_id:           string;
    order_total:        number;
    shipment_data:      string;
    payment_provider:   string;
    payment_session_id: string;
    queryParams:        QueryParams;
    
}

export interface QueryParams {
    redirectUrl: RedirectURL;
    submitUrl:   URL;
    cancelUrl:   URL;
}

export interface URL {
    paymentSessionId: string;
}

export interface RedirectURL {
    orderId: string;
}

export interface Method {
    id:          string;
    label:       string;
    description: string;
    icon:        string;
}

export interface Provider {
    id:          string;
    name:        string;
    description: string;
}

export interface SalesChannel {
    id:          string;
    name:        string;
    description: string;
    is_disabled: boolean;
    metadata:    SalesChannelMetadata;
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
}

export interface SalesChannelMetadata {
    is_branch_store: boolean;
}

export interface ShippingAddress {
    id:           string;
    customer_id:  string;
    company:      string;
    first_name:   string;
    last_name:    string;
    address_1:    string;
    address_2:    null;
    city:         string;
    country_code: string;
    province:     string;
    postal_code:  string;
    phone:        string;
    metadata:     null;
    created_at:   Date;
    updated_at:   Date;
}

export interface Summary {
    paid_total:               number;
    difference_sum:           number;
    raw_paid_total:           Raw;
    refunded_total:           number;
    credit_line_total:        number;
    transaction_total:        number;
    pending_difference:       number;
    raw_difference_sum:       Raw;
    raw_refunded_total:       Raw;
    current_order_total:      number;
    original_order_total:     number;
    raw_credit_line_total:    Raw;
    raw_transaction_total:    Raw;
    raw_pending_difference:   Raw;
    raw_current_order_total:  Raw;
    raw_original_order_total: Raw;
}
