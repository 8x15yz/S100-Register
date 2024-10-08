from mongo_driver import db
from bson.objectid import ObjectId

from regiSystem.serializers.CD import (
        AttributeUsageSerializer
)

S100_Concept_Register = db['S100_Concept_Register']

S100_Concept_ManagementInfo = db['S100_Concept_ManagementInfo']
S100_Concept_ReferenceSource = db['S100_Concept_ReferenceSource']
S100_Concept_Reference = db['S100_Concept_Reference']
S100_Concept_Item = db['S100_Concept_Item']
S100_CD_AttributeConstraints = db['S100_CD_AttributeConstraints']
S100_CD_AttributeUsage = db['S100_CD_AttributeUsage']

S100_Portrayal_Item = db['S100_Portrayal_Item']

S100_DD_associatedAttribute = db['S100_DD_associatedAttribute']
S100_DD_distinction = db['S100_DD_distinction']


import datetime
class RegiModel:
    @staticmethod
    def update_date(registry_id):
        date = datetime.datetime.now().strftime("%Y-%m-%d")
        S100_Concept_Register.update_one({"_id": registry_id}, {"$set": {"dateOfLastChange": date}})

    @classmethod
    def get_registry(cls, registry_uri):
        return S100_Concept_Register.find_one({"uniformResourceIdentifier": registry_uri})
    

class ListedValue:
    @staticmethod
    def get_listed_value(parent_id):
        c_item = S100_DD_associatedAttribute.find({"parent_id": ObjectId(parent_id)})
        return c_item

    def get_parent_id(child_id):
        c_item = S100_DD_associatedAttribute.find_one({"child_id": ObjectId(child_id)})
        return c_item['parent_id']
    
    def insert_listed_value(parent_id, child_id):
        S100_DD_associatedAttribute.insert_one({"parent_id": ObjectId(parent_id), "child_id": ObjectId(child_id)})

class AttributeUsage:
    @staticmethod
    def get_attribute_usage(parent_id):
        pass
    
    def get_parent_id(child_id):
        c_item = S100_CD_AttributeUsage.find_one({"child_id": ObjectId(child_id)})
        return c_item['parent_id']
    
    def get_sub_attributes(parent_id):
        c_item = S100_CD_AttributeUsage.find({"parent_id": ObjectId(parent_id)})
        return c_item
    
    def make_attribute_usage(source, target):
        usageData = {
            "lower": 0,
            "upper": 0,
            "sequential": False
        }
        serializer = AttributeUsageSerializer(data=usageData)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            validated_data['parent_id'] = ObjectId(source)
            validated_data['child_id'] = ObjectId(target)
            S100_CD_AttributeUsage.insert_one(validated_data)

class Distinction:
    @staticmethod
    def get_distincted_item(parent_id):
        c_item = S100_DD_distinction.find({"parent_id": ObjectId(parent_id)})
        return c_item

    def get_parent_id(child_id):
        c_item = S100_DD_distinction.find_one({"child_id": ObjectId(child_id)})
        return c_item['parent_id']
    
    def insert_distinction(parent_id, child_id):
        S100_DD_distinction.insert_one({"parent_id": ObjectId(parent_id), "child_id": ObjectId(child_id)})