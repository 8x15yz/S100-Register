from bson.objectid import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

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
        AttributeConstraintsSerializer,
)

from regiSystem.serializers.RE import (
        ConceptItemSerializer,
)

import json
from regiSystem.InfoSec.encryption import (get_encrypted_id, decrypt)

@api_view(['POST'])
def concept_item(request):
    C_id = request.GET.get('user_serial')
    serializer = ConceptItemSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)

        S100_Concept_Item.insert_one(validated_data)
        encrypted_id = get_encrypted_id(serializer.data['_id'])
        return Response(encrypted_id, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def enumerated_value(request):
    C_id = request.GET.get('user_serial')

    serializer = EnumeratedValueSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)
        saved_ = S100_Concept_Item.insert_one(validated_data)
        enumeration_value_id = str(saved_.inserted_id)
        attributeId = validated_data['attributeId']

        if attributeId:
            simple_attribute_obj = S100_Concept_Item.find_one({"_id": ObjectId(attributeId)})
            listedValue = simple_attribute_obj['listedValue']
            if enumeration_value_id not in listedValue:
                listedValue.append(enumeration_value_id)
                S100_Concept_Item.update_one({"_id": ObjectId(attributeId)}, {"$set": {"listedValue": listedValue}})

        encrypted_id = get_encrypted_id(serializer.data['_id'])        
        return Response(encrypted_id, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def simple_attribute(request):
    C_id = request.GET.get('user_serial')

    serializer = SimpleAttributeSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)
        
        S100_Concept_Item.insert_one(validated_data)
        encrypted_id = get_encrypted_id(serializer.data['_id']) 
        return Response(encrypted_id, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def complex_attribute(request):
    C_id = request.GET.get('user_serial')
    
    serializer = ComplexAttributeSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)
        
        S100_Concept_Item.insert_one(validated_data)
        encrypted_id = get_encrypted_id(serializer.data['_id'])
        return Response(encrypted_id, status=HTTP_201_CREATED)

@api_view(['POST'])
def feature(request):
    C_id = request.GET.get('user_serial')
    serializer = FeatureSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)
        
        saved_ = S100_Concept_Item.insert_one(validated_data)
        new_feature_id = str(saved_.inserted_id)
        distincted_list = validated_data['distinctedFeature']
        for f_id in distincted_list:
            d_f_obj = S100_Concept_Item.find_one({"_id": ObjectId(f_id)})
            d_f_obj['distinctedFeature'].append(new_feature_id)
            S100_Concept_Item.update_one({"_id": ObjectId(f_id)}, {"$set": d_f_obj})
        
        encrypted_id = get_encrypted_id(serializer.data['_id']) 
        return Response(encrypted_id, status=HTTP_201_CREATED)
    
@api_view(['POST'])
def information(request):
    C_id = request.GET.get('user_serial')
    serializer = InformationSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['concept_id'] = ObjectId(C_id)
        
        saved_ = S100_Concept_Item.insert_one(validated_data)
        new_info_id = str(saved_.inserted_id)
        distincted_list = validated_data['distinctedInformation']
        for f_id in distincted_list:
            d_i_obj = S100_Concept_Item.find_one({"_id": ObjectId(f_id)})
            d_i_obj['distinctedInformation'].append(new_info_id)
            S100_Concept_Item.update_one({"_id": ObjectId(f_id)}, {"$set": d_i_obj})
        encrypted_id = get_encrypted_id(serializer.data['_id'])
        return Response(encrypted_id, status=HTTP_201_CREATED)
    
@api_view(['POST'])
def attribute_constraints(request):
    item_iv = request.GET.get('item_iv')
    I_id = decrypt(request.GET.get('item_id'), item_iv)

    serializer = AttributeConstraintsSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        validated_data['simpleAttribute'] = ObjectId(I_id)
        
        S100_CD_AttributeConstraints.insert_one(validated_data)
        encrypted_id = get_encrypted_id(serializer.data['_id'])
        return Response(encrypted_id, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)