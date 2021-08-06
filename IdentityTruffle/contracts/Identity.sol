//SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0;

contract Identities {
    
    address public owner;
    

    struct Identity {
        string firstname;
        string lastname; 
        string nickname; 
        string ipfsAvatarHash;
        uint index;
        mapping(string => socialLink)  socialLinks;
    }
    
    struct socialLink {
        string name;
        string url;
        bool exist;
    }
      
      
        
        
    mapping(address => Identity) internal identities;
    address[] identitiesAddresses;

    event LogID  (address indexed IdentityAdd ,string firstname,  string lastname, string nickname,  string ipfsAvatarHash , uint index);
    event LogSocialLink  (address indexed IdentityAdd ,string name,  string url);

    constructor()  public {
        owner = msg.sender;
    }
    modifier ownerOnly(address id_add){
      require(msg.sender == id_add);
       _;
    }

     modifier onlyIfIdExists(address id_add){
      require(identityExist( id_add));
       _;
    }
    modifier socialLinkExist(address id_add ,string memory name){
      require(identities[id_add].socialLinks[name].exist);
       _;
    }
        modifier socialLinkDoNotExist(address id_add ,string memory name){
      require(!identities[id_add].socialLinks[name].exist);
       _;
    }

    function identityExist(address id_add) public  view  returns(bool isIndeed) 
    {
        if(identitiesAddresses.length == 0) return false;
         return (identitiesAddresses[identities[id_add].index] == id_add);
     }

    function setIdentity( string memory _firstname, string memory _lastname, string memory _nickname, string memory _ipfsAvatarHash)  public  returns (bool success) {
          
        require(!identityExist(msg.sender));
        identitiesAddresses.push(msg.sender);
        identities[ msg.sender].firstname= _firstname;
        identities[ msg.sender].lastname= _lastname;
        identities[ msg.sender].nickname= _nickname;
        identities[ msg.sender].ipfsAvatarHash= _ipfsAvatarHash;
        identities[ msg.sender].index= identitiesAddresses.length-1;
        emit LogID(msg.sender,
            identities[ msg.sender].firstname,
            identities[ msg.sender].lastname,
            identities[ msg.sender].nickname,
            identities[ msg.sender].ipfsAvatarHash,
            identities[ msg.sender].index );
         return true;

        
    }
   
     function getIdentity(address id_add)  public view onlyIfIdExists(id_add)  returns ( string memory _firstname, string memory _lastname, string memory _nickname, string memory _ipfsAvatarHash, uint _index ){
        _firstname = identities[ id_add].firstname ;
        _lastname = identities[ id_add].lastname;
        _nickname =   identities[ id_add].nickname;
        _ipfsAvatarHash =   identities[ id_add].ipfsAvatarHash ;
        _index=identities[id_add].index;

    }
    
    function getfirstname( address id_add) public view onlyIfIdExists(  id_add)   returns (string memory) {
        return identities[ id_add].firstname;
    }
    
    
       function getmsgsender( ) public view returns (address) {
        return msg.sender;
    }
    
    function getlastname( address id_add) public view onlyIfIdExists(  id_add)   returns (string memory) {
        return identities[ id_add].lastname;
    }
    
    function getnickname( address id_add) public view onlyIfIdExists(  id_add)   returns (string memory) {
        return identities[ id_add].nickname;
    }
    
    function getIpfsAvatarHash( address id_add) public view onlyIfIdExists(  id_add)   returns (string memory) {
        return identities[ id_add].ipfsAvatarHash;
    }
    
    function getIndex( address id_add) public view onlyIfIdExists(  id_add)   returns (uint ) {
        return identities[ id_add].index;
    }
    
    function addSocialLink ( address id_add , string memory _url, string memory _name)   public ownerOnly(id_add)  onlyIfIdExists (id_add) socialLinkDoNotExist  (id_add, _name) {
        
         identities[  id_add].socialLinks[_name] =  socialLink (_name,_url,true );
                emit LogSocialLink( id_add, _name, _url);

    }
    
    function getSocialLinkByName(address id_add ,string  memory _name) public view socialLinkExist(id_add, _name) returns (string memory, string memory) {
        
       return( identities[ id_add].socialLinks[_name].name, identities[id_add].socialLinks[_name].url);
       
    }
        
    function removeSocialLink( address id_add ,string memory _name)  socialLinkExist(id_add, _name) public {
       identities[ id_add].socialLinks[_name] = socialLink(_name, "", false);
    }
    
    function updateSocialLink( address id_add, string memory _name, string memory _url)  socialLinkExist(id_add, _name) public {
       identities[ id_add].socialLinks[_name] = socialLink(_name, _url, true);
       emit LogSocialLink(id_add, _name, _url);
    }
}