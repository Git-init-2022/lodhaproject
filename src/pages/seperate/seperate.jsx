import React from "react";
import { Web3Storage } from 'web3.storage';


const uploadFiles = async () => {
  const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });
  const files = document.getElementsByName("Files").item(0).files;
  
  const cid = await client.put(files);
  console.log(cid);
  const result = await client.get(cid);
  const files1 = await result.files();
  console.log(files1);
  
}

const upload = (e) => {
  e.preventDefault();
  alert("hello");
  uploadFiles();
}

function seperate() {
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <form>
          <input type="file" name="Files" multiple></input>
          <button onClick={(e) => upload(e)}>upload button</button>
        </form>
       <a href="https://bafybeigqf3rujqhsootgeowsrzvpmggr3ny7bccgxfyht7tivqx6lld7zm.ipfs.w3s.link/camera.png" target="blank">Camera.png</a>

      </div>
    </>
  )
}

export default seperate;