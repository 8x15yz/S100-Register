// src/components/DDRDetail.js

import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context/ItemContext'; // ItemContext 임포트
import axios from 'axios';
import { GET_DDR_VALUE_ONE } from './api';
import EVDetail from './components/EVDetail';
import SADetail from './components/SADetail';
import CADetail from './components/CADetail';
import FDetail from './components/FDetail';
import IDetail from './components/IDetail';



const DDR_Detail = () => {
    const { itemDetails } = useContext(ItemContext); // Context에서 itemDetails 가져오기
    const { view_item_type, item_id, item_iv, user_serial } = itemDetails;
    const [item, setItem] = useState(null);
    let dataListComponent;
    switch (view_item_type) {
        case 'EnumeratedValue':
          dataListComponent = <EVDetail item={item}/>;
          break;
        case 'SimpleAttribute':
          dataListComponent = <SADetail item={item}/>;
          break;
        case 'ComplexAttribute':
            dataListComponent = <CADetail item={item}/>;
            break;
        case 'FeatureType':
            dataListComponent = <FDetail item={item}/>;
            break;
        case 'InformationType':
            dataListComponent = <IDetail item={item}/>;
            break;

        default:
          dataListComponent = null;
      }

    useEffect(() => {
        const fetchItemList = async () => {
            try {
                const response = await axios.get(GET_DDR_VALUE_ONE, {
                    params: {
                        item_id: item_id,
                        item_type: view_item_type,
                        item_iv: item_iv
                    }
                });
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item list:', error);
            }
        };

        fetchItemList();
    }, [view_item_type, item_id, item_iv]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container p-5'>
            <h1>Data Dictionary Detail</h1>
            <div className='mt-4' style={{border: "1px solid gray", borderRadius: "10px"}}>
                {dataListComponent}
            </div>
            
            <button onClick={() => window.location = `/dataDictionary/${user_serial}`} className='btn btn-primary mt-3'>Back to List</button>
        </div>
    );
};

export default DDR_Detail;
