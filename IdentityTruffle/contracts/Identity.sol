// SPDX-License-Identifier: GPL-3.0

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
    modifier ownerOnly(){
      require(msg.sender == owner);
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

    function identityExist(address id_add) public   returns(bool isIndeed) 
    {
        if(identitiesAddresses.length == 0) return false;
         return (identitiesAddresses[identities[id_add].index] == id_add);
     }

    function setIdentity(string memory _firstname, string memory _lastname, string memory _nickname, string memory _ipfsAvatarHash)  public  returns (bool success) {
          
        require(!identityExist(owner));
        identitiesAddresses.push(owner);
        identities[ owner].firstname= _firstname;
        identities[ owner].lastname= _lastname;
        identities[ owner].nickname= _nickname;
        identities[ owner].ipfsAvatarHash= _ipfsAvatarHash;
        identities[ owner].index= identitiesAddresses.length-1;
        emit LogID(owner,
            identities[ owner].firstname,
            identities[ owner].lastname,
            identities[ owner].nickname,
            identities[ owner].ipfsAvatarHash,
            identities[ owner].index );
         return true;

        
    }
   
     function getIdentity()  public onlyIfIdExists(owner)  returns (string memory _firstname, string memory _lastname, string memory _nickname, string memory _ipfsAvatarHash, uint _index ){
        _firstname = identities[ owner].firstname ;
        _lastname = identities[ owner].lastname;
        _nickname =   identities[ owner].nickname;
        _ipfsAvatarHash =   identities[ owner].ipfsAvatarHash ;
        _index=identities[owner].index;

    }
    function getfirstname() public onlyIfIdExists(owner)   returns (string memory) {
        return identities[owner].firstname;
    }
    
    function getlastname() public onlyIfIdExists(owner)   returns (string memory) {
        return identities[owner].lastname;
    }
    
    function getnickname() public onlyIfIdExists(owner)   returns (string memory) {
        return identities[owner].nickname;
    }
    
    function getIpfsAvatarHash() public onlyIfIdExists(owner)   returns (string memory) {
        return identities[owner].ipfsAvatarHash;
    }
    function getIndex() public onlyIfIdExists(owner)   returns (uint ) {
        return identities[owner].index;
    }
    
    function addSocialLink ( string memory _url, string memory _name)   public ownerOnly  onlyIfIdExists (owner) socialLinkDoNotExist  (owner, _name) {
        
         identities[ owner].socialLinks[_name] =  socialLink (_name,_url,true );
                emit LogSocialLink(owner, _name, _url);

    }
    
    function getSocialLinkByName(string  memory _name) public  socialLinkExist(owner, _name) returns (string memory, string memory) {
        
       return( identities[ owner].socialLinks[_name].name, identities[ owner].socialLinks[_name].url);
       
    }
        
    function removeSocialLink( string memory _name)  socialLinkExist(owner, _name) public {
       identities[ owner].socialLinks[_name] = socialLink(_name, "", false);
    }
    function updateSocialLink( string memory _name, string memory _url)  socialLinkExist(owner, _name) public {
       identities[ owner].socialLinks[_name] = socialLink(_name, _url, true);
       emit LogSocialLink(owner, _name, _url);
    }
}