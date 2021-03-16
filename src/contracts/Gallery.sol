pragma solidity ^0.5.0;

contract Gallery{
	struct Pic{
		uint id;
		string Hash;
		string name;
		address author;
	}
	event Details(
		uint id,
		string Hash,
		string name,
		address author
	);
	mapping(uint => Pic) public photos;
	uint public count=0;
	function increment() internal{
		count++;
	} 
	function Add(string memory Name,string memory Hash) public{
		require(bytes(Name).length > 0);
		increment();
		photos[count] = Pic(count,Hash,Name,msg.sender);
		emit Details(count,Hash,Name,msg.sender);
	}
}