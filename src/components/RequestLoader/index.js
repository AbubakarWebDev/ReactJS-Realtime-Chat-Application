import React from 'react';
import { ClipLoader } from "react-spinners";

import styles from "./style.module.scss";

function RequestLoader() {

    const { loader } = styles;

    return (
        <div className={loader}>
            <ClipLoader
                size={50}
                color="#000000"
                loading={true}
                cssOverride={{ borderWidth: "5px" }}
            />
        </div>
    );
}

export default RequestLoader;