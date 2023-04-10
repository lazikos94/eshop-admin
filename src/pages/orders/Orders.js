import axios from "axios";
import { useState, useEffect } from "react";
import AppConfig from '../../app.json';
import Pagination from "../../elemenents/Paginations";
import { useNavigate,useLocation } from "react-router-dom";
const Orders = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const [apiData, setApiData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (newPageNumber) => {
        setCurrentPage(newPageNumber);
    }

    const navigateId = (id) => {
        let path = '/edit-orders/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                console.log(location.search)
                const response = await axios.get(AppConfig.host + "/api/v1/db.do/order/read"+location.search, {
                    params: {
                        page: currentPage - 1,
                        limit: 25
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response)
                console.log(response.data['order.list'])
                setApiData(response.data['order.list']);
                setTotalPages(Math.ceil(response.data["order.list.totalLength"] / 25))
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [currentPage]);

    return (<div className="table-container pt-5 pb-5" style={{ width: '100%' }}>
        {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style={{ width: '100%' }} >
            <thead>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>_Id</th>
                    <th>User</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Status</th>
                    <th>Billing</th>
                    <th>Amount</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>_Id</th>
                    <th>User</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Status</th>
                    <th>Billing</th>
                    <th>Amount</th>
                    <th>Created At</th>
                </tr>
            </tfoot>
            <tbody>
                {apiData?.map((i, key) => {
                    return <tr key={key}>
                        <th>{key}</th>
                        <td onClick={() => navigateId(i._id)}><a>{i._id.toString()}</a></td>
                        <td>{i.user.firstName+" "+i.user.lastName}</td>
                        <td>{i.address.address}</td>
                        <td>{i.address.city}</td>
                        <td>{i.address.zipCode}</td>
                        <td>{i.status}</td>
                        <td>{i.billing_type}</td>
                        <td>{i.priceSnapshot} €</td>
                        <td>{new Date(i.createdAt).toLocaleString()}</td>
                    </tr>
                })
                }
            </tbody>
        </table>
        {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}
    </div>);
}

export default Orders;