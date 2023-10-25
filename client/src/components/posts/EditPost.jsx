import React from 'react'

const EditPost = () => {
  return (
    <div>
        <form>
            <label for="content"></label>
            <input type='textarea' id="content" name="content"></input>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default EditPost