import React from "react";
import axios from "axios";


function Delete({onClose, selectedForm, keyIdx}){
    console.log(selectedForm)

    const handleDelete = async () => {
        try {
            const response = await axios.delete(selectedForm);
            console.log('Item data successfully deleted:', response.data);
            onClose()
            if (keyIdx == 8) {
                window.location.href = "/";
            }
            else {
                window.location.reload();
            }
            
            
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    return (
        <div style={{height: "200px"}} className="p-2">
            <div className='text-end' style={{height: "10%"}}>
                <button onClick={onClose} type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <h3>Delete {}</h3>
            <div style={{height: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>Are you sure you want to delete?</div>
            </div>
            <div className='text-end' style={{height: "10%"}}>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}
export default Delete;