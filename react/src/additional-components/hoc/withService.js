import React from "react";
import { AppConsumer } from "../app-context";

const withService = (mapMethodsToProps) => (Wrapped) => {

    return (props) => {
        return (
            <AppConsumer>
                {
                    (controllers) => {
                        let serviceProps = null;

                        if (mapMethodsToProps) serviceProps = mapMethodsToProps(controllers);

                        return (
                            <Wrapped {...props} {...serviceProps} controllers={controllers}/>
                        );
                    }
                }
            </AppConsumer>
        );
    }
};

export default withService;