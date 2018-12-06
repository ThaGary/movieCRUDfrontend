import React from 'react';

const Movies = (props) => {
    return (
        <div className="movies">
            {props.movies.map(item => {
                return (
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td id={item.id} onClick={props.handleClick}>{item.title}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>   
                )
            })}
        </div>
    )
}

export default Movies;