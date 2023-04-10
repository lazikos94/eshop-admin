import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AppConfig from '../../app.json';
import Modal from '../../elemenents/Modal';

const EditOrder = () => {
    const params = useParams()
    const [apiData,setApiData] = useState();
    const [status,setStatus] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancelModalOpen,setCancelModalOpen] = useState(false);
    useEffect(()=>{
        async function fetchData(){
            const response =  await axios.get(AppConfig.host+`/api/v1/db.do/order/read_one?_id=${params.id}`, { headers: { "Content-Type": "application/json" }})
            console.log(response.data)
            setApiData(response.data['order'])
            setStatus(response.data['order'].status)
        }   
        fetchData()
    },[])
  
    const handleModalClick = () => {
        setIsModalOpen(true);
    };
    const handleModalCancelClick = () => {
        setCancelModalOpen(true);
    };

    const handleModalConfirm = (string) => {
        setStatus(string)
        handleStatus(string);
        setIsModalOpen(false);
    };

    const handleCancelModalConfirm = (string) => {
        setStatus(string)
        handleStatus(string);
        setCancelModalOpen(false);
    };
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    const handleModalCancelCancel = () => {
        setCancelModalOpen(false);
    };

    const handleStatus = async (string)=>{
        try {
            const response =  await axios.put(AppConfig.host+'/api/v1/db.do/order/update',{"status":string} ,{params:{_id:params.id},headers: { "Content-Type": "application/json" }})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
     
    }
    return (<div className="columns mt-5 mb-5 is-multiline">
    {apiData ? (
      <>
      <div className="column is-full">
  <div className="box">
    <div className="is-flex is-justify-content-space-between is-align-items-center py-3">
      <h1 className=" is-size-4 is-align-self-center has-text-weight-semibold">Status: {status.toUpperCase()}</h1>
      <div>
        {status === 'pending' && (
          <>
            <button className="button is-danger is-outlined is-large mr-3" onClick={handleModalCancelClick}>Cancel Order</button>
            <button className="button is-primary is-outlined is-large" onClick={handleModalClick}>
              Confirm Order
            </button>
            {isModalOpen && (
                <Modal title='Update' handleModalCancel={handleModalCancel} handleModalConfirm={()=>handleModalConfirm('confirmed')} />
            )}
            {cancelModalOpen &&  (
                <Modal title='Cancel' handleModalCancel={handleModalCancelCancel} handleModalConfirm={()=>handleCancelModalConfirm('canceled')} />
            )}
          </>
        )}
        {status === 'confirmed' && (<>
            <button className="button is-primary is-outlined is-large" onClick={handleModalClick}>
                Shipped
            </button>
            {isModalOpen && (
                    <Modal title='Update' handleModalCancel={handleModalCancel} handleModalConfirm={()=>handleModalConfirm('shipped')} />
                )}
            </>
        )}
        {status === 'shipped' && (<>          
            <button className="button is-primary is-outlined is-large" onClick={handleModalClick}>
                Delivered
            </button>
            {isModalOpen && (
                    <Modal title='Update' handleModalCancel={handleModalCancel} handleModalConfirm={()=>handleModalConfirm('delivered')} />
                )}
            </>

        )}
        {status === 'delivered' && null}
        {status === 'canceled' && null}
      </div>
    </div>
  </div>
</div>

        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-5 has-text-grey-darker mb-3">Shipping Address</h2>
            <hr />
            <address className="is-size-6 has-text-weight-semibold mb-3">
              {apiData.address.address}, {apiData.address.city}, {apiData.address.zipCode}
            </address>
            <p className="is-size-6">{apiData.address.description}</p>
          </div>
        </div>
  
        <div className="column is-one-third">
          <div className="box">
            <h2 className="title is-5 has-text-grey-darker mb-3">Billing Information</h2>
            <hr />
            <p className="is-size-6 has-text-weight-semibold mb-2">
              {apiData.user.firstName} {apiData.user.lastName}
            </p>
            <p className="is-size-6 has-text-weight-semibold mb-2">{apiData.user.email}</p>
            <p className="is-size-6 has-text-weight-semibold mb-2">{apiData.billing_type}</p>
            <p className="is-size-6 has-text-weight-semibold mb-2">{apiData.priceSnapshot} €</p>
          </div>
        </div>
        <div className="column is-one-third">
            <div className="box" style={{ maxHeight: "69vh", overflowY:"auto" }}>
                <h2 className="title is-5 has-text-grey-darker mb-3">Ordered Products</h2>
                <hr className="mb-4" />
                {apiData.products.map((product, index) => (
                <div key={index} className="mb-4 product-item">
                    <h3 className="unique-code has-text-weight-semibold">{product.product.uniqueCode}</h3>
                    <h3 className="product-name is-size-6 mb-2">
                    <span className="product-name-en has-text-weight-semibold">Name (EN):</span> {product.product.name.en}<br/>
                    <span className="product-name-gr has-text-weight-semibold">Name (GR):</span> {product.product.name.gr}
                    </h3>
                    <div className="quantity is-size-6 mb-2">
                    <span className="has-text-weight-semibold">Quantity:</span> {product.quantity}
                    </div>
                    {product.size && (
                        <div className="size is-size-6 mb-2">
                        <span className="has-text-weight-semibold">Size:</span> {product.size?.name.en} / {product.size?.name.gr}
                        </div>
                    )}
                </div>
                ))}
            </div>
        </div>

        <style jsx>{`
        .product-item {
            background-color: #f8f8f8;
            border-radius: 5px;
            padding: 15px;
        }
        
        .unique-code {
            margin-bottom: 10px;
            font-size: 1.2rem;
            color: #666;
        }
        
        .product-name {
            margin-bottom: 10px;
            margin-left: 20px;
            font-size: 0.9rem;
        }
        
        .product-name-en {
            display: inline-block;

            margin-right: 10px;
            color: #444;
        }
        
        .product-name-gr {
            display: inline-block;
            margin-right: 10px;

            color: #444;
        }
        
        .quantity, .size {
            margin-left: 20px;
            font-size: 0.9rem;
        }
        
        .has-text-weight-semibold {
            font-weight: 600;
        }
        `}</style>
        </>
        ) : (
        <></>
        )}
    </div>
    );
}

export default EditOrder;