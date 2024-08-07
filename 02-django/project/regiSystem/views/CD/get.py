from bson.objectid import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from regiSystem.models import (
    S100_Concept_Item,
    S100_CD_AttributeConstraints
)
from regiSystem.serializers.CD import (
        SimpleAttributeSerializer,
        EnumeratedValueSerializer,
        ComplexAttributeSerializer,
        FeatureSerializer,
        InformationSerializer,
        AttributeConstraintsSerializer
)
itemTypeSet = {
        "EnumeratedValue": EnumeratedValueSerializer,
        "SimpleAttribute": SimpleAttributeSerializer,
        "ComplexAttribute": ComplexAttributeSerializer,
        "FeatureType": FeatureSerializer,
        "InformationType": InformationSerializer
}

from regiSystem.info_sec.encryption import (get_encrypted_id, decrypt)
itemIncryption = {
        "EnumeratedValue": "attributeId",
        "SimpleAttribute": "listedValue",
        "ComplexAttribute": "subAttribute",
        "FeatureType": "distinctedFeature",
        "InformationType": "distinctedInformation"
}


def getItemType(itemType, C_id):
    c_item_list = list(S100_Concept_Item.find({"concept_id": ObjectId(C_id), "itemType": itemType}).sort("_id", -1))
    serializer = itemTypeSet[itemType](c_item_list, many=True)
    return serializer

def make_response_data(serializer):
    response_data = {
        'register': "",
        'register_items': serializer.data
    }
    return response_data

def offer_item_nameNtype(id):
    c_item = S100_Concept_Item.find_one({"_id": ObjectId(id)})
    return c_item["name"], c_item["itemType"]
    
from regiSystem.info_sec.getByURI import uri_to_serial
@api_view(['GET'])
def ddr_item_list(request):
    C_id = uri_to_serial(request.GET.get('regi_uri'))
    item_type = request.GET.get('item_type')
    search_term = request.GET.get('search_term', '')
    status = request.GET.get('status', '')
    category = request.GET.get('category', '')
    enumType = request.GET.get('enum_type', '')
    valueType = request.GET.get('value_type', '')


    if request.method == 'GET':
        query = {"concept_id": ObjectId(C_id), "itemType": item_type}
        if status:
            query["itemStatus"] = status
        if search_term:
            if category == "name":
                query["name"] = {"$regex": search_term, "$options": "i"}
            elif category == "camelCase":
                query["camelCase"] = {"$regex": search_term, "$options": "i"}
            elif category == "definition":
                query["definition"] = {"$regex": search_term, "$options": "i"}
        if item_type == "EnumeratedValue" and enumType != "":
            query["enumType"] = enumType
        elif item_type == "SimpleAttribute" and valueType != "":
            query["valueType"] = valueType

        c_item_list = list(S100_Concept_Item.find(query).sort("_id", -1))
        serializer = itemTypeSet[item_type](c_item_list, many=True)

        for item in serializer.data:
            item["_id"] = get_encrypted_id([item["_id"]])

        response_data = make_response_data(serializer)
        return Response(response_data)
    return Response(status=400, data={"error": "Invalid request method"})


def one_encrypt_process(id_attribute_set):
    if type(id_attribute_set) == list:
        for i in range(len(id_attribute_set)):
            id_attribute_set[i] = get_encrypted_id([str(id_attribute_set[i]), *offer_item_nameNtype(id_attribute_set[i])])
        return id_attribute_set
    elif type(id_attribute_set) == str:
        res = get_encrypted_id([str(id_attribute_set), *offer_item_nameNtype(id_attribute_set)])
        print(res)
        return res

@api_view(['GET'])
def ddr_item_one(request):
    item_type = request.GET.get('item_type')
    item_iv = request.GET.get('item_iv')
    I_id = decrypt(request.GET.get('item_id'), item_iv)

    if request.method == 'GET':
        try:
            c_item = S100_Concept_Item.find_one({"_id": ObjectId(I_id)})
            if c_item is None:
                return Response(status=404, data={"error": "Item not found"})
            c_item["_id"] = get_encrypted_id([c_item["_id"]])
            serializer = itemTypeSet[item_type](c_item)
            serializer.data[itemIncryption[item_type]] = one_encrypt_process(serializer.data[itemIncryption[item_type]])
            
            return Response(serializer.data)
        
        except Exception as e:
            return Response(status=500, data={"error": str(e)})
    return Response(status=400, data={"error": "Invalid request method"})


@api_view(['GET'])
def attribute_constraints(request):
    item_iv = request.GET.get('item_iv')
    I_id = decrypt(request.GET.get('item_id'), item_iv)

    if request.method == 'GET':
        try:
            c_item = S100_CD_AttributeConstraints.find({'simpleAttribute': ObjectId(I_id)})
            if not c_item:
                Response({"attribute_constraint" : []})
            serializer = AttributeConstraintsSerializer(c_item, many=True)
            for item in serializer.data:
                item["_id"] = get_encrypted_id([item["_id"]])
            return Response({"attribute_constraint" : serializer.data})
        except Exception as e:
            return Response(status=400, data={"error": str(e)})
        
         


