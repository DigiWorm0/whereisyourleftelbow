import React, { ReactNode } from 'react';
import './Footer.css';

class Footer extends React.Component
{
    render(): ReactNode
    {
        return (
            <div className="row footer text-white text-center">
                <div className="col-sm-12 pt-3">
                    Made with &#10084; by <a href="https://github.com/DigiWorm0/APHG">DigiWorm</a>
                </div>
            </div>
        );
    }
}
export default Footer;
