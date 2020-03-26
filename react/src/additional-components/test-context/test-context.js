import React from "react";
import withService from "../hoc/withService";

const TestContext = ({testF}) => {

    testF()
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });

    return (
        <div>
            Test context
        </div>
    );
};

const mapStateToProps = (Service) => ({
    testF: Service.test
});

export default withService(mapStateToProps)(TestContext);