import React, { ReactNode } from 'react';
import './Header.css';

class Header extends React.Component
{
    render(): ReactNode
    {
        return (
            <div className="row header bg-gray text-center">
                <div className="col-sm-12">
                    <div className="p-5">
                        <h1>Where Is Your Left Elbow?</h1>
                        <h4>A simple AI that can locate your left elbow.</h4>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
