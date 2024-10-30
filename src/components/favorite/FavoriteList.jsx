import { useContext } from 'react';
import { ShopContext } from '../../context';
import '../css/favorite.css';
import { FavoriteItem } from "./FavoriteItem";

function FavoriteList() {
    const { favorite } = useContext(ShopContext);


    return <div className="modal fade star-modal" id="modalStar" tabIndex="-1" aria-labelledby="modalStarLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalStarLabel">Favorites</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <ul>
                        {
                            favorite.length ? (favorite.map(item => (
                                <FavoriteItem key={item.id} {...item} />))
                            ) : (<li className="collection-item">Empty</li>)
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

}

export { FavoriteList }