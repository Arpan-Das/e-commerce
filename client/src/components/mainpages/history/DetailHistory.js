import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function DetailHistory() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history
    const [orderDetail, setOrderDetail] = useState([])

    const params = useParams();

    useEffect(() =>{
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetail(item)
            })
        }
    },[params.id, history])

    if(orderDetail.length === 0) return null;

    return (
        <div className="history-page">
        <h2>Order Detail</h2>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>District, State</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Mobile No.</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{orderDetail.address.Name}</td>
                    <td>{orderDetail.address.Address_Line_1+", "+ orderDetail.address.Address_Line_2 +", "+orderDetail.address.Address_Line_3 }</td>
                    <td>{orderDetail.address.District+", "+orderDetail.address.State}</td>
                    <td>{orderDetail.address.Country}</td>
                    <td>{orderDetail.address.PIN}</td>
                    <td>{orderDetail.address.Mobile_No}</td>
                </tr>
            </tbody>
        </table>
        <table style={{margin: "30px 0px"}}>
            <thead>
            <tr>
                <th></th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                orderDetail.cart.map(item =>(
                    <tr key={item._id}>
                        <td><img src={item.images.url} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    )
}

export default DetailHistory
