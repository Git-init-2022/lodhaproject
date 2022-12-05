pragma solidity >=0.4.22 <0.9.0;

contract imageUpload {
  struct image{
    string id;
    string imageHash;
    bool isSet;
  }
  
  mapping(string => image ) images;


  function uploadImage(string memory id,string memory hash) public returns (bool) {
    images[id] = image(id,hash,true);
    return true;
  }


  function retrieveHash(string memory id) public view returns (string memory) {
    if(images[id].isSet == false) {
        return ("Images Hash does not exsists");
    }
    return (images[id].imageHash);
  }
}