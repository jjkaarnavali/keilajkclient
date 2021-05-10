import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ProductTypeDelete = () => {
    const {id} = useParams() as IRouteId; 
    
    return (
        <div>ProductTypeDelete {id}</div>
    );
}

export default ProductTypeDelete;
