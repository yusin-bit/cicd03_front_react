import React, { memo } from 'react';
import "./Header.css";
const Header = () => {
    console.log("Header call...")
    return (
        <div className="Header">
            <h3>오늘의 Plan🌼</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};
//props가 변경되지 않으면 Header의 리랜더링을 막기 위해 React.memo로 Header를 감싼다.
export default memo(Header);