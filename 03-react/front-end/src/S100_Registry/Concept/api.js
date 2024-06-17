import {DEPLOY_URL} from '../index.js'
import {USER_SERIAL} from '../../userSerial.js'

// Concept > Test.js
export const MONGO_DB_POST  = `${DEPLOY_URL}/api/v1/sample_post/`;
export const MONGO_DB_GET_ALL  = `${DEPLOY_URL}/api/v1/get_student_list/`;

// Concept > Register.js
// export const REGISTER_ITEM_LIST_URL = `${DEPLOY_URL}/api/v1/concept_item_list/get/${USER_SERIAL}/`;
export const REGISTER_ITEM_LIST_URL = `${DEPLOY_URL}/api/v1/concept_item_list/get/`;

// Concept > Detail > Detail.js
export const CONCEPT_ITEM_ONE = `${DEPLOY_URL}/api/v1/concept_item_one/get/`;

// Concept > Insert > Item.js
export const CREATE_ITEM_URL = `${DEPLOY_URL}/api/v1/concept_item/post/`;

// Concept > Detail > modals > Add > MIAdd.js
// Concept > Insert > Item.js
export const POST_MANAGEMENT_INFO = `${DEPLOY_URL}/api/v1/concept_item/mamagement_info/post/`;

// Concept > Detail > modals > Add > RSAdd.js
// Concept > Insert > Item.js
export const POST_REFERENCE_SOURCE  = `${DEPLOY_URL}/api/v1/concept_item/reference_source/post/`;

// Concept > Detail > modals > Add >RAdd.js
// Concept > Insert > Item.js
export const POST_REFERENCE  = `${DEPLOY_URL}/api/v1/concept_item/reference/post/`;

// Concept > Detail > modals > Update > IUpdate.js
export const PUT_ITEM_URL = `${DEPLOY_URL}/api/v1/concept_item/put/`;

// Concept > Detail > modals > Update > MIUpdate.js
export const PUT_MI_URL =  `${DEPLOY_URL}/api/v1/concept_item/mamagement_info/put/`

// Concept > Detail > modals > Update > RSUpdate.js
export const PUT_RS_URL = `${DEPLOY_URL}/api/v1/concept_item/reference_source/put/`;


// Concept > Detail > modals > Update > RUpdate.js
export const PUT_R_URL = `${DEPLOY_URL}/api/v1/concept_item/reference/put/`;


// Concept > Detail > modals > Base.js
// Concept > Register.js
export const DEL_ITEM_URL  = (idx) => {
    return `${DEPLOY_URL}/api/v1/concept_item/delete/${idx}/`;
};

// Concept > Detail > modals > Base.js
export const DEL_MI_URL  = (idx) => {
    return `${DEPLOY_URL}/api/v1/concept_item/mamagement_info/delete/${idx}/`;
};
export const DEL_RS_URL  = (idx) => {
    return `${DEPLOY_URL}/api/v1/concept_item/reference_source/delete/${idx}/`;
};
export const DEL_R_URL  = (idx) => {
    return `${DEPLOY_URL}/api/v1/concept_item/reference/delete/${idx}/`;
};



export const GET_MANAGEMENT_INFO = `${DEPLOY_URL}/api/v1/concept_item/mamagement_info/get/`;
export const GET_REFERENCE_SOURCE = `${DEPLOY_URL}/api/v1/concept_item/reference_source/get/`;
export const GET_REFERENCE = `${DEPLOY_URL}/api/v1/concept_item/reference/get/`;