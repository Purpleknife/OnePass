import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const AddOns = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const user_id = cookies.user_id;

  const titleInput = useRef();
  const URLInput = useRef();

  const save = async(event) => {

    axios.post(`/dashboard/${user_id}`, {
      user_id: cookies.user_id,
      title: titleInput.current.value,
      url: URLInput.current.value,
      content: props.password
    })
      .then((res) => {
        console.log('Data saved!', res.data);
      })
      .catch(error => {
        console.log(error.message);
      })

  }

  return (
    <div>
      Title:
      <input
        key='title'
        id='title'
        type='text'
        ref={titleInput}
        
      />
      <br />
      URL:
      <input
        key='url'
        id='url'
        type='text'
        ref={URLInput}
        
      />
      <br />
      <button onClick={save} >Save</button>
    </div>
  );
}
 
export default AddOns;