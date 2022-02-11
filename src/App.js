import * as React from "react";
import { Shop } from "./components/Shop";
import {ContextProvider} from './context';


function App() {
    return (
        <div className='container-fluid g-0'>
            <ContextProvider>
                <Shop />
            </ContextProvider>
        </div>
    );
}
export default App;
