import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

const Products = () => {
    let navigate = useNavigate();

    const navigateProduct=()=>{
        let path='/product/id';
        navigate(path)
    }
    const products=[{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10},{name:'product1',price:10}]
    return ( <div className="container is-multiline columns m-5 p-5">{products.map((i,key)=>{
        return <Card onClick={navigateProduct} className="column" name={i.name} price={i.price}/>
    })}</div> );
}
 
export default Products;