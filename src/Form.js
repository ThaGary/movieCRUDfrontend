import React from 'react';

const Form = (props) => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Add Movie
            </button>
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Movie</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form onSubmit={props.onSubmitMovie}>
                        <input type="text" name="Title" placeholder="Title"/>
                        <input type="text" name="Director" placeholder="Director"/>
                        <input type="text" name="Release_Year" placeholder="Release Year"/>
                        <input type="text" name="Rating" placeholder="Rating out of 5"/>
                        <input type="url" name="poster" placeholder="Poster URL"/>
                        <input onSubmit={props.onSubmitMovie} value="Submit" type="submit"/>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Form;