import React, {useState, useRef} from "react";
import "./imageUploader.css"

function ImageUploader (){
  const[image, setImage] = useState(null);
  const[previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef(null);

  const handleFile = file => {
    //you can carry out any file validations here...
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
  //other codes follows...

  function handleDragOver(event){
    event.preventDefault();
    console.log("handleDragOver")
  }

  function handleOnDrop(event){
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  }


  return (
      <div className="wrapper">
        <div className="drop_zone"
             // style={{ height:"100px",width:"100px",background:"#000" }}
             onDragOver = {handleDragOver}
             onDrop = {handleOnDrop}
             onClick = { () => fileInput.current.click()}
        >
          <p>Click to select or Drag and drop image here....</p>
          <input
              type="file"
              accept='image/*'
              ref={fileInput} hidden
              onChange={e => handleFile(e.target.files[0])}
          />
        </div>
        { previewUrl && <div className="image">
          <img src={previewUrl} alt='image' />
          <span> {image.name} </span>
        </div> }
      </div>
  )
}
export default ImageUploader;