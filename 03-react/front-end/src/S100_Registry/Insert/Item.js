import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CREATE_ITEM_URL, CREATE_MANAGEMENT_INFO_URL, CREATE_REFERENCE_SOURCE_URL, CREATE_REFERENCE_URL } from '../Concept/api';
import { POST_ENUMERATED_VALUE, POST_SIMPLE_ATTRIBUTE, POST_COMPLEX_ATTRIBUTE, POST_FEATURE, POST_INFORMATION } from '../DataDictionary/api.js';
import ManagementInfoInput from './components/ManagementInfoInput';
import ReferenceSourceInput from './components/ReferenceSourceInput';
import ReferenceInput from './components/ReferenceInput';
import ChooseType from './ChooseType';
import SimpleAttribute from './components/dataDictionary/SimpleAttribute';
import ComplexAttribute from './components/dataDictionary/ComplexAttribute';
import Feature from './components/dataDictionary/Feature';
import Information from './components/dataDictionary/Information';
import EnumeratedValue from './components/dataDictionary/EnumeratedValue';
import { USER_SERIAL } from '../../userSerial.js';
function Item() {
    const [item, setItem] = useState('');
    const [managementInfos, setManagementInfos] = useState(['']); // 관리 정보 입력 창 배열
    const [referenceSource, setReferenceSource] = useState(null);
    const [references, setReferences] = useState(null);
    const { register_id } = useParams();
    const [selectedApiUrl, setSelectedApiUrl] = useState(POST_ENUMERATED_VALUE);
    const [apiType, setApiType] = useState('Enumerated Value');

    const handleSubmitItem = async () => {
        console.log(' 여기는?:', selectedApiUrl)
        try {
            // const itemData = JSON.parse(item);
            const itemResponse = await axios.post(selectedApiUrl, item);
            console.log('Item data successfully posted ~:', itemResponse.data);

            // Item 데이터를 selectedApiUrl로 POST 후 Item의 ID 가져오기
            const itemId = itemResponse.data._id;

            // 모든 MI에 대해 작업하는 for 문
            for (const managementInfo of managementInfos) {
                // if (managementInfo.trim() === '') continue; // 빈 데이터는 무시

                // Management Info를 저장할 URL 생성 후 POST
                const miUrl = CREATE_MANAGEMENT_INFO_URL(itemId);
                await axios.post(miUrl, managementInfo);
            }

            // RS에 대해 작업
            if (referenceSource) {
                const rsUrl = CREATE_REFERENCE_SOURCE_URL(itemId);
                await axios.post(rsUrl, referenceSource);
            }

            // 모든 R에 대해 작업
            if (references != null) {
                for(const reference of references) {
                    if (reference) {
                        const rUrl = CREATE_REFERENCE_URL(itemId);
                        await axios.post(rUrl, reference);
                    }
                }
            }
            window.location.href = `/concept/detail/`;
        } catch (error) {
            console.error('Error posting data:', error);
            console.log(item)
        }
    };


    const ItemChange = (formData) => {setItem(formData);};
    const MIChange = (formData) => {setManagementInfos(formData);};
    const RSChange = (formData) => {setReferenceSource(formData);};
    const RChange = (formData) => {setReferences(formData);};

    const getSelestedApi = (type) => {
        console.log(type);
        switch (type) {
            case 'Enumerated value':
                setSelectedApiUrl(POST_ENUMERATED_VALUE);
                setApiType('Enumerated Value');
                break;
            case 'Simple Attribute':
                setSelectedApiUrl(POST_SIMPLE_ATTRIBUTE);
                setApiType('Simple Attribute');
                break;
            case 'Complex Attribute':
                setSelectedApiUrl(POST_COMPLEX_ATTRIBUTE);
                setApiType('Complex Attribute');
                break;
            case 'Feature':
                setSelectedApiUrl(POST_FEATURE);
                setApiType('Feature');
                break;
            case 'Information':
                setSelectedApiUrl(POST_INFORMATION);
                setApiType('Information');
                break;
            default:
                break;
        }
    };

    return (
        <div className="container p-5">
            <ChooseType getSelestedApi={getSelestedApi} />
            <div style={{display: "flex"}}>
                <h1>Create Data</h1>
                <button onClick={() => window.location='/concept'}>back</button>
            </div>
            <div className='mt-5'>
                {apiType === 'Enumerated Value' && <EnumeratedValue item={item} onFormSubmit={ItemChange} registerId={register_id} selectedApiUrl={selectedApiUrl}/>}
                {apiType === 'Simple Attribute' && <SimpleAttribute item={item} onFormSubmit={ItemChange} registerId={register_id} selectedApiUrl={selectedApiUrl}/>}
                {apiType === 'Complex Attribute' && <ComplexAttribute item={item} onFormSubmit={ItemChange} registerId={register_id} selectedApiUrl={selectedApiUrl}/>}
                {apiType === 'Feature' && <Feature item={item} onFormSubmit={ItemChange} registerId={register_id} selectedApiUrl={selectedApiUrl}/>}
                {apiType === 'Information' && <Information item={item} onFormSubmit={ItemChange} registerId={register_id} selectedApiUrl={selectedApiUrl}/>}
                <ManagementInfoInput onFormSubmit={MIChange} />
                <ReferenceSourceInput onFormSubmit={RSChange} />
                <ReferenceInput onFormSubmit={RChange} />
            </div>
            <div className='text-end'>
                <button className='mt-3 btn btn-sm btn-primary' onClick={handleSubmitItem}>Submit</button>
            </div>
            <div style={{height: '200px'}}></div>
        </div>
    );
}

export default Item;
