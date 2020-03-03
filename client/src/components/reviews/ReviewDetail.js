import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import ReviewCreate from "./ReviewCreate";
import { Redirect } from "react-router-dom";

const { FETCH_REVIEW, CURRENT_USER } = Queries;

const currentUserId = () => (
    <Query query={CURRENT_USER}>
    {({ data }) => { 
        return (data.currentUserId) ? (data.currentUserId) : null 
    }}
    </Query>
);

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
          <Query query={CURRENT_USER}>
          {({ data }) => { 
            if (data.currentUserId) {
              return (
              <Query query={FETCH_REVIEW} variables={{userId: currentUserId, restaurantId: this.props.restaurantId}}>
                {({ loading, error, data }) => {
                  if(error) { 
                    debugger;
                    return (
                      <Redirect to={{ 
                        pathname: 'reviews/create', 
                        state: {userId: currentUserId, restaurantId: this.props.restaurantId}
                        }} 
                      />
                    )
                  }
                  return (
                    <div>
                      <p>Rating: {data.review.rating} </p>
                      <p>Created By: {data.review.user.firstName} </p>
                      <p>Body: {data.review.body} </p>
                    </div>
                  )

                }}
              </Query>
              )
            } else {
              
            } 
          }}
          </Query>
        </div>
      )
        // if (this.state.editing) {
        //     return (
        //       <Mutation mutation={UPDATE_REVIEW}>
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