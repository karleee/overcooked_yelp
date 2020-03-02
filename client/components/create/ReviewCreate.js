import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_REVIEW } = Mutations;

class ReviewCreate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Mutation
                mutation={NEW_REVIEW}
                update={(cache, data) => this.updateCache(cache, data)}
            >
                {(newGod, {data}) => (
                    <div>
                        
                    </div>
                )}
            </Mutation>
        )
    }
}

export default ReviewCreate;