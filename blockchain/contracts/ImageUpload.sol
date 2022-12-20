pragma solidity >=0.4.22 <0.9.0;

contract imageUpload {

  uint public count = 0; 

  struct image{
    uint id;
    string imageHash;
  }

  
  mapping(uint => image ) public images;

  event sendHash(
    string imageHash
  );
   
   event getHash(
    uint id
   );

  function uploadImage(string memory hash) public  {
    count++;
    images[count] = image(count,hash);
    emit getHash(count);
  }


  function retrieveHash(uint id) public {
    image memory v1 = images[id];
    emit sendHash(v1.imageHash);
  }
}