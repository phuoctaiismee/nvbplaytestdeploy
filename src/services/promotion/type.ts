export interface Promotion {
    id:                 string;
    code:               string;
    is_automatic:       boolean;
    type:               string;
    campaign_id:        null;
    campaign:           null;
    application_method: ApplicationMethod;
    created_at:         Date;
    updated_at:         Date;
    deleted_at:         null;
    rules:              Rule[];
}

export interface ApplicationMethod {
    id:                     string;
    currency_code:          string;
    max_quantity:           null;
    apply_to_quantity:      null;
    buy_rules_min_quantity: null;
    type:                   string;
    target_type:            string;
    allocation:             null;
    raw_value:              RawValue;
    created_at:             Date;
    updated_at:             Date;
    deleted_at:             null;
    promotion_id:           string;
    target_rules:           Rule[];
    value:                  number;
}

export interface RawValue {
    value:     string;
    precision: number;
}

export interface Rule {
    id:          string;
    description: null;
    attribute:   string;
    operator:    string;
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
    values:      Value[];
}

export interface Value {
    id:                string;
    value:             string;
    promotion_rule_id: string;
    created_at:        Date;
    updated_at:        Date;
    deleted_at:        null;
}
