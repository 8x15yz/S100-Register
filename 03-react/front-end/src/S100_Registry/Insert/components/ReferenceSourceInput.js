import React, { useState } from 'react';

function ReferenceSourceInput({onFormSubmit}) {
    const [toggleOpened, setToggleOpened] = useState(false);

    const [referenceSource, setReferenceSource] = useState();
    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedReferenceSource = {
            ...referenceSource,
            [name]: value
        };
        setReferenceSource(updatedReferenceSource);
        onFormSubmit(updatedReferenceSource);
    };

    const addRSInput = () => {
        setReferenceSource({
            "referenceIdentifier": '',
            "sourceDocument": '',
            "similarity": ''
        })
    }
    const popRSInput = () => {
        setReferenceSource(null)
        onFormSubmit(null);
    }

    const toggleOpen = () => {
        setToggleOpened(!toggleOpened);
    }

    return (
        <div style={{ backgroundColor: '#F8F8F8' }} className='p-3 mt-4'>
            {toggleOpened ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <h3>Reference Source</h3>
                            <button className='btn' onClick={toggleOpen}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div className='text-center'>
                            {
                                !referenceSource ? (
                                    <div>
                                        <button className='btn btn-outline-secondary btn-sm' onClick={addRSInput} style={{ display: 'flex', alignItems: 'center' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                            </svg>
                                            <div style={{ marginLeft: '8px' }}>
                                                Add Reference Source
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <button className='btn btn-sm btn-outline-danger' onClick={popRSInput}>Remove</button>
                                )
                            }
                        </div>
                    </div>
                    {referenceSource ? (
                            <div className='p-3 mt-2' >
                                <div className='input-group input-group-sm'>
                                    <span className="input-group-text" id="basic-addon1" style={{width:"20%"}}>*referenceIdentifier</span>
                                    <input type="text" className="form-control" placeholder="referenceIdentifier" name="referenceIdentifier" onChange={handleChange} />
                                </div>
                                <div className='input-group input-group-sm mt-2'>
                                    <span className="input-group-text" id="basic-addon1" style={{width:"20%"}}>*sourceDocument</span>
                                    <input type="text" className="form-control" placeholder="sourceDocument" name="sourceDocument" onChange={handleChange} />
                                </div>
                                <div className='col'>
                                    <div class="input-group input-group-sm mt-2">
                                        <label class="input-group-text" for="similarity">*similarity</label>
                                        <select class="form-select" id="similarity" name="similarity" onChange={handleChange}>
                                            <option selected>Choose</option>
                                            <option value="identical">identical</option>
                                            <option value="restyled">restyled</option>
                                            <option value="contextAdded">contextAdded</option>
                                            <option value="generalization">generalization</option>
                                            <option value="specialization">specialization</option>
                                            <option value="unspecified">unspecified</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='size-block-inner' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <div className='text-center'>
                                    <div>No data</div>
                                    <div>Please click the 'Add' button to submit the information</div>
                                </div>
                            </div>
                        )}
                </div>
                
            ) : (
                <div className='' style={{ display: 'flex', alignItems: 'center'}}>
                    <h3>Reference Source</h3>
                    <button className='btn' onClick={toggleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16" >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReferenceSourceInput;