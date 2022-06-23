import React from "react";
import ElbowTracker from "../ElbowTracker/ElbowTracker";
import Facts from "../Facts/Facts";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Instructions from "../Instructions/Instructions";

class Content extends React.Component
{
    render()
    {
        return (
            <div className="container-fluid">
                <Header />
                <div className="row">
                    <div className="col-sm-5 p-5">
                        <Instructions />
                        <Facts />
                    </div>
                    <div className="col-sm-7 p-4">
                        <ElbowTracker />
                    </div>
                </div>
            </div>
        )
    }
}
export default Content;
