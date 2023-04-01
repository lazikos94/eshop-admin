import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../elemenents/Paginations";
import AppConfig from "../../../app.json";
const ViewCategory = () => {

    let navigate = useNavigate();
    const [apiData, setApiData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalLength, setTotalLength] = useState(0);
    const handlePageChange = (newPageNumber) => {
        setCurrentPage(newPageNumber);

    };
    const navigateId = (id) => {
        let path = '/edit-attributes/category/' + id;
        navigate(path)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(AppConfig.host + "/api/v1/db.do/category/read", {
                    params: {
                        page: currentPage - 1,
                        limit: 25
                    },
                    headers: {
                        "Content-Type": "application/json",

                    }
                });

                console.log(response.data['category.list'])
                setApiData(response.data['category.list']);
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
                        <th>Subcategories</th>
                        <th>Brands</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>_Id</th>
                        <th>Name GR</th>
                        <th>Name EN</th>
                        <th>Subcategories</th>
                        <th>Brands</th>
                    </tr>
                </tfoot>
                <tbody>
                    {apiData?.map((i, key) => {
                        const subcategoryIds = i.subcategories.map(subcategory => subcategory._id);
                        const brandIds = i.brands.map(brand => brand._id);

                        return (
                            <tr key={key}>
                                <th>{key}</th>
                                <td onClick={() => navigateId(i._id)}><a>{i._id.toString()}</a></td>
                                <td>{i.name.gr}</td>
                                <td>{i.name.en}</td>
                                <th>{JSON.stringify(subcategoryIds)}</th>
                                <th>{JSON.stringify(brandIds)}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {totalPages > 1 ? <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> : <></>}

        </div>
    );
}

export default ViewCategory;