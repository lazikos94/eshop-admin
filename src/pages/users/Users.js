import axios from "axios";
import { useState, useEffect } from "react";
import AppConfig from '../../app.json';
import Pagination from "../../elemenents/Paginations";
import { useNavigate } from "react-router-dom";


const Users = () => {
    let navigate = useNavigate();

    const [apiData, setApiData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (newPageNumber) => {
        setCurrentPage(newPageNumber);
    }

    const navigateId = (id) => {
        let path = '/edit-users/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(AppConfig.host + "/api/v1/db.do/user/read", {
                    params: {
                        page: currentPage - 1,
                        limit: 25
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response)
                console.log(response.data['user.list'])
                setApiData(response.data['user.list']);
                setTotalPages(Math.ceil(response.data["user.list.totalLength"] / 25))
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>

                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>_Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </tr>
            </tfoot>
            <tbody>
                {apiData?.map((i, key) => {
                    return <tr>
                        <th>{key}</th>
                        <td onClick={() => navigateId(i._id)}><a>{i._id.toString()}</a></td>
                        <td>{i.firstName}</td>
                        <td>{i.lastName}</td>
                        <td>{i.email}</td>
                        <td>{i.phone}</td>

                    </tr>
                })
                }
            </tbody>
        </table>
        {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}
    </div>);
}

export default Users;