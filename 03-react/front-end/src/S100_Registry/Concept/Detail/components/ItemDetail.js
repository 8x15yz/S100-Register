import React, {useState, useEffect, useContext} from 'react';
import Toast from '../../../Toast';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from '../../../../context/ItemContext';
import { USER_SERIAL } from '../../../../userSerial';   
import TableContents from './tags/TableContens';
import { DDR_DETAIL } from '../../../../Common/PageLinks';
const tableFields = [
    { name: 'Item Type', key: 'itemType' },
    { name: 'Name', key: 'name' },
    { name: 'Definition', key: 'definition' },
    { name: 'Remarks', key: 'remarks' },
    { name: 'Item Status', key: 'itemStatus' },
    { name: 'Alias', key: 'alias', isAlias: true },
    { name: 'Camel Case', key: 'camelCase' },
    { name: 'Definition Source', key: 'definitionSource' },
    { name: 'Reference', key: 'reference' },
    { name: 'Similarity to Source', key: 'similarityToSource' },
    { name: 'Justification', key: 'justification' },
    { name: 'Proposed Change', key: 'proposedChange' },
];

function ItemDetail({ itemList, handleUpdateButtonClick, handleKeyIdx }) {
    const navigate = useNavigate();
    const { itemDetails, setItemDetails } = useContext(ItemContext);

    // useEffect(() => {
        
    // }, [itemList]);
    const gotoDDR = () => {
        setItemDetails({
            ...itemDetails,
            view_item_type: itemList.item.itemType,
            item_id: itemList.item._id.encrypted_data,
            item_iv: itemList.item._id.iv,
        });
        setTimeout(() => {
            navigate(DDR_DETAIL);
        }, 0);
    }


    const handleClick = () => handleUpdateButtonClick(1);
    const handleDelete = (idx) => {
        handleUpdateButtonClick(8);
        handleKeyIdx(idx);
    };

    return (
        <div className='mt-1 mb-3 p-3' style={{ backgroundColor: '#F8F8F8' }}>
            <div className="mt-3 mb-3 card p-3">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th colSpan="2" className='text-center table-dark' scope="col" style={{ width: '25%' }}>
                                Register Data Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList.item.itemType === 'ConceptItem' ? (<></>) : (
                            <tr>
                                <th className='text-center' scope="row" style={{ width: '25%' }}>Go to Detail Page</th>
                                <td>
                                    <button onClick={gotoDDR}>Detail</button>
                                </td>
                            </tr>
                        )}
                        {tableFields.map(({ name, key, isAlias }) => (
                            <TableContents
                                key={key}
                                name={name}
                                itemValue={isAlias
                                    ? Object.values(itemList.item[key]).map((item, index) => (<span key={index}>{item}; </span>))
                                    : itemList.item[key]
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='text-end'>
                <button className='btn btn-secondary btn-sm' onClick={handleClick}>Update</button>
                <button className='btn btn-sm btn-danger m-1' onClick={() => handleDelete(itemList.item._id)}>Delete</button>
            </div>
        </div>
    );
}

export default ItemDetail;
