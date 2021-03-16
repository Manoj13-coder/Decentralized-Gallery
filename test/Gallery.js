const Gallery = artifacts.require("./Gallery.sol");
require("chai").use(require("chai-as-promised")).should()

contract("Gallery",([deployer,author]) =>{
	let gallery
	before(async () => {
    	gallery = await Gallery.deployed()
  	})
	describe('Deployement',async()=>{
		it('Deployed Successfully',async()=>{
			const address = await gallery.address
      		assert.notEqual(address, 0x0)
      		assert.notEqual(address, '')
      		assert.notEqual(address, null)
      		assert.notEqual(address, undefined)
		})
		it('has a count',async()=>{
			let count = await gallery.count();
			count = count.toNumber();
			assert.equal(count,0);
		})
	})
	describe('Pics',async()=>{
		let count,result
		before(async()=>{
			result = await gallery.Add('This is my first post','QmTwPbfmZu8iiZS3GM4Ys4ioXfgqim4AjEGkt7NVvL9FAQ', { from: author })
			count = await gallery.count();
			count = count.toNumber();
		})
		it('Add Photo',async()=>{
			assert.equal(count, 1)
      		const event = result.logs[0].args
      		assert.equal(event.id.toNumber(), count, 'id is correct')
      		assert.equal(event.Hash, 'QmTwPbfmZu8iiZS3GM4Ys4ioXfgqim4AjEGkt7NVvL9FAQ', 'Hash is correct')
      		assert.equal(event.name, 'This is my first post', 'Name is correct')
      		assert.equal(event.author, author, 'author is correct')
		})
		it('lists posts', async () => {
      		const post = await gallery.photos(count)
      		const event = result.logs[0].args
      		assert.equal(post.id.toNumber(), count, 'id is correct')
      		assert.equal(event.Hash, 'QmTwPbfmZu8iiZS3GM4Ys4ioXfgqim4AjEGkt7NVvL9FAQ', 'Hash is correct')
      		assert.equal(event.name, 'This is my first post', 'Name is correct')
      		assert.equal(event.author, author, 'author is correct')
    	})
	})
})