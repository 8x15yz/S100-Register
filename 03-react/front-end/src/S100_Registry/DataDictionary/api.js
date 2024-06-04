import {DEPLOY_URL} from '../index.js'
import {USER_SERIAL} from '../../userSerial.js'

// DataDictionary/DDR_List.js
export const GET_ENUMERATED_VALUE_LIST = `${DEPLOY_URL}/api/v1/enumerated_value_list/get/`;

export const GET_SIMPLE_ATTRIBUTE_LIST = `${DEPLOY_URL}/api/v1/simple_attribute_list/get/`;

export const GET_COMPLEX_ATTRIBUTE_LIST = `${DEPLOY_URL}/api/v1/complex_attribute_list/get/`;

export const GET_FEATURE_LIST = `${DEPLOY_URL}/api/v1/feature_list/get/`;

export const GET_INFORMATION_LIST = `${DEPLOY_URL}/api/v1/information_list/get/`;

export const POST_ENUMERATED_VALUE = `${DEPLOY_URL}/api/v1/enumerated_value/post/${USER_SERIAL}/`;

export const POST_SIMPLE_ATTRIBUTE = `${DEPLOY_URL}/api/v1/simple_attribute/post/${USER_SERIAL}/`;  

export const POST_COMPLEX_ATTRIBUTE = `${DEPLOY_URL}/api/v1/complex_attribute/post/${USER_SERIAL}/`;

export const POST_FEATURE = `${DEPLOY_URL}/api/v1/feature/post/${USER_SERIAL}/`;

export const POST_INFORMATION = `${DEPLOY_URL}/api/v1/information/post/${USER_SERIAL}/`;

// DataDictionary/DDR_Detail.js
export const GET_DDR_VALUE_ONE = (view_item_type) => {
    return `${DEPLOY_URL}/api/v1/${view_item_type}/get/`;
} 

// 
export const GET_NOT_RELATED_ENUM_LIST_SEARCH = `${DEPLOY_URL}/api/v1/not_related_enum_list_search/get/`;

export const SUB_ATT_LIST_SEARCH = `${DEPLOY_URL}/api/v1/sub_att_list_search/get/`;