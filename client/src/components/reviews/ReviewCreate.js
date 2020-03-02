import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_REVIEW } = Mutations;

class ReviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            body: "",
            // ratingdiff: 5
        }
    }

    updateRating(rating) {
        return e=> {
            this.setState({ rating: rating })
        }
    }
    updateBody() {
        return e=> {
            this.setState({ body: e.target.value })
        }
    }

    renderHearts() {
        //not dry, make dry
        if(this.state.rating === 0) {
            return (
                <div>
                    <i className="far fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        } else if (this.state.rating === 1) {
            return (
                <div>
                    <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        } else if (this.state.rating === 2) {
            return (
                <div>
                    <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        } else if (this.state.rating === 3) {
            return (
                <div>
                    <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        } else if (this.state.rating === 4) {
            return (
                <div>
                    <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="far fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        } else if (this.state.rating === 5) {
            return (
                <div>
                    <i className="fas fa-heart" onClick={this.updateRating(1)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(2)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(3)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(4)}></i>
                    <i className="fas fa-heart" onClick={this.updateRating(5)}></i>
                </div>
            )
        }
    }

    renderHeartstwo(){
        
    }

    render() {
        return (
            <Mutation
                mutation={NEW_REVIEW}
                update={(cache, data) => this.updateCache(cache, data)}
            >
                {(newReview, {data}) => (
                    <div>
                        {this.renderHearts()}
                        <form onSubmit={e=> this.handleSubmit(e, newReview)}>
                            <textarea
                                onChange={this.updateBody()} 
                                value={this.state.body}                               
                                placeholder="Body of Review"
                            />
                            <button type="submit">Publish Review</button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default ReviewCreate;