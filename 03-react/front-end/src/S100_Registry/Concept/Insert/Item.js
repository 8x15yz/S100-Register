import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CREATE_ITEM_URL } from '../api';
import ItemInput from './components/ItemInput';
import ManagementInfoInput from './components/ManagementInfoInput';
import ReferenceSourceInput from './components/ReferenceSourceInput';
import ReferenceInput from './components/ReferenceInput';
import {CREATE_MANAGEMENT_INFO_URL, CREATE_REFERENCE_SOURCE_URL, CREATE_REFERENCE_URL } from '../api';

function Item() {
    const [item, setItem] = useState('');
    const [managementInfos, setManagementInfos] = useState(['']); // 관리 정보 입력 창 배열
    const [referenceSource, setReferenceSource] = useState(null);
    const [references, setReferences] = useState(null);
    const { register_id } = useParams();
    

    const handleSubmitItem = async () => {
        try {
            // const itemData = JSON.parse(item);
            const itemResponse = await axios.post(CREATE_ITEM_URL, item);
            console.log('Item data successfully posted ~:', itemResponse.data);

            // Item 데이터를 CREATE_ITEM_URL로 POST 후 Item의 ID 가져오기
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
            window.location.href = `/concept/detail/${itemId}`;
        } catch (error) {
            console.error('Error posting data:', error);
            console.log(managementInfos)
        }
    };


    // Item 관련 함수
    const ItemChange = (formData) => {setItem(formData);};
    
    // Management Info 관련 함수
    const MIChange = (formData) => {setManagementInfos(formData);};

    // Reference Source 관련 함수
    const RSChange = (formData) => {setReferenceSource(formData);};

    // Reference 관련 함수
    const RChange = (formData) => {setReferences(formData);};

    return (
        <div className="container p-5">
            {/* <div style={{height: '70px'}}></div> */}
            <div style={{display: "flex"}}>
                <h1>Create Concept Data</h1>
                <button onClick={() => window.location='/concept'}>back</button>
            </div>
            <div className='mt-5'>
                <ItemInput item={item} onFormSubmit={ItemChange} registerId={register_id}/>
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