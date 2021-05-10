import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ProductTypeEdit = () => {
    const {id} = useParams() as IRouteId; 
    return (
        <div>ProductTypeEdit {id}</div>
    );
}

export default ProductTypeEdit;
