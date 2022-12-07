pragma solidity >=0.4.22 <0.9.0;

contract imageUpload {
  struct image{
    string id;
    string imageHash;
  }
  
  mapping(string => image ) images;


  function uploadImage(string memory id,string memory hash) public returns (bool) {
    images[id] = image(id,hash);
    return true;
  }


  function retrieveHash(string memory id) public view returns (string memory) {
    return (images[id].imageHash);
  }
}