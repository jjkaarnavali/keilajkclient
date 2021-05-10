import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";

const ProductTypeDetails = () => {
    // get the router params from hook
    const {id} = useParams() as IRouteId; 

    return (
        <div>ProductTypeDetails Id: {id}</div>
    );
}

export default ProductTypeDetails;
