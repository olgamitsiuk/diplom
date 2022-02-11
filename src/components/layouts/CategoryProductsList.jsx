import {ProductCard} from "../product/productCard/ProductCard";
import {Preloader} from "./Preloader";

export function CategoryProductsList(props) {
    const {products} = props;

    return <div className='product-list'>
        {
            !props.products.length ? (<Preloader/>) :
            products.map(product =>
            <ProductCard key={product._id} product={product}/>)
        }
    </div>
}