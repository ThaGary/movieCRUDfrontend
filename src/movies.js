import React from 'react';

const Movies = (props) => {
    return (
        <div className="movies">
            {props.movies.map(item => {
                const handleClick = () => {
                    console.log(item.id, item.title, item.director, item.year, item.rating);
                  }
                return (
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td onClick={handleClick}>{item.title}</td>
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