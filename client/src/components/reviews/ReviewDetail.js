import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ReviewCreate from "./ReviewCreate";


const { FETCH_REVIEW } = Queries;

class ReviewDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            body: this.props.body || "",
            rating: this.props.rating || 0
        }
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState({ editing: true });
    }

    render() {
        return (
            <div>

            </div>
        )
        // if (this.state.editing) {
        //     return (
        //       <Mutation mutation={UPDATE_GOD_NAME}>
        //         {(updateGodName, data) => (
        //           <div>
        //             <form
        //               onSubmit={e => {
        //                 e.preventDefault();
        //                 updateGodName({
        //                   variables: { id: this.props.id, name: this.state.name }
        //                 }).then(() => this.setState({ editing: false }));
        //               }}
        //             >
        //               <input
        //                 value={this.state.name}
        //                 onChange={this.fieldUpdate("name")}
        //               />
        //               <button type="submit">Update Name</button>
        //             </form>
        //           </div>
        //         )}
        //       </Mutation>
        //     );
        //   } else {
        //     return (
        //       <div>
        //         <div
        //           onClick={this.handleEdit}
        //           style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        //         >
        //           <IconContext.Provider value={{ className: "custom-icon" }}>
        //             <FaPencilAlt />
        //           </IconContext.Provider>
        //         </div>
        //         <h2>{this.state.name}</h2>
        //       </div>
        //     );
        //   }
    }
}

export default ReviewDetail;