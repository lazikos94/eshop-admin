import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from '../../elemenents/Paginations';
import AppConfig from '../../app.json';
const Products = () => {
    let navigate = useNavigate();
    const [apiData, setApiData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setLoading] = useState(true);
    async function fetchData() {
        try {
            const response = await axios.get(AppConfig.host + "/api/v1/db.do/product/read", {
                params: {
                    page: currentPage - 1,
                    limit: 12
                },
                headers: {
                    "Content-Type": "application/json",

                }
            });

            console.log(response.data['product.list'])
            setApiData(response.data['product.list']);
            setTotalPages(Math.ceil(response.data["product.list.totalLength"] / 12))
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPageNumber) => {

        setCurrentPage(newPageNumber);

    };
    const handleSearchInputChange = (e) => {

        setSearchQuery(e.target.value);


    };
    const handleSearchOnSubmit = async (e) => {
        e.preventDefault();

        if (searchQuery == '') {
            await fetchData();
        } else {

            try {
                const response = await axios.get(AppConfig.host + `/api/v1/db.do/product/read?serialNumber=` + searchQuery);
                setApiData(response.data['product.list']);
                setTotalPages(1)
                setCurrentPage(1)
            } catch (error) {
                console.error(error);
            }
        }


    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearchOnSubmit(e);
        }
    }

    const navigateProduct = (id) => {
        let path = '/product/' + id;
        navigate(path)
    }
    return (<div className="container m-5 p-5">
        <div className="field">
            <div className="control">
                <form onSubmit={handleSearchOnSubmit}>
                    <input className="input" type="text" placeholder="Search by serial code" name='query' onChange={handleSearchInputChange} onKeyDown={handleEnter} />
                </form>
            </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        <div className="container is-multiline columns m-5 p-5" >
            {!isLoading && apiData.map((i, key) => {
                return (<Card navigate={navigateProduct} className="column is-one-fifth" data={i} />)
            })}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>);
}

export default Products;