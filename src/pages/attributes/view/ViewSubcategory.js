import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../elemenents/Paginations";
import AppConfig from "../../../app.json";
const ViewSubcategory = () => {
    let navigate = useNavigate();

    const [apiData, setApiData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (newPageNumber) => {

        setCurrentPage(newPageNumber);

    };
    const navigateId = (id) => {
        let path = '/edit-attributes/subcategory/' + id;
        navigate(path)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(AppConfig.host + "/api/v1/db.do/subcategory/read", {
                    params: {
                        page: currentPage - 1,
                        limit: 25
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response)
                console.log(response.data['subcategory.list'])
                setApiData(response.data['subcategory.list']);
                setTotalPages(Math.ceil(response.data["subcategory.list.totalLength"] / 25))
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [currentPage]);

    return (
        <div className="table-container pt-5 pb-5" style={{ width: '100%' }}>
            {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" style={{ width: '100%' }} >
                <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>_Id</th>
                        <th>Name GR</th>
                        <th>Name EN</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>_Id</th>
                        <th>Name GR</th>
                        <th>Name EN</th>
                    </tr>
                </tfoot>
                <tbody>
                    {apiData?.map((i, key) => {
                        return <tr>
                            <th>{key}</th>
                            <td><Link to={`/edit-attributes/subcategory/${i._id}`} >{i._id.toString()}</Link></td>
                            <td>{i.name.gr}</td>
                            <td>{i.name.en}</td>

                        </tr>
                    })
                    }
                </tbody>
            </table>
            {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}
        </div>
    );
}

export default ViewSubcategory;