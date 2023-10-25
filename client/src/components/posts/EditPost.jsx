import React from "react";
const EditPost = () => {
  return (
    <div>

        <form>
            <label htmlFor="content">Your post:</label>
            <input type='textarea' id="content"></input>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default EditPost
