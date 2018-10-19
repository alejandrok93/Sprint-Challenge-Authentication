import React from "react";

const Joke = props => {
  return (
    <div className="joke">
      <p>{props.joke.setup}</p>
      <p>
        <em>
          <i>{props.joke.punchline}</i>
        </em>
      </p>
    </div>
  );
};

export default Joke;
