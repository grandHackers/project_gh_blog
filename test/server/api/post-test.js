import sinon from 'sinon'
import sinonMongoose from 'sinon-mongoose'
import { expect } from 'chai'
import { getPostById, getPostsByOwner, createPost } from '../../../src/server/api/post'
import Post from '../../../src/server/models/post';
import util from 'util'


describe('Post API helpers', () => {
    
    it('can get post by the id - getPostById()', done => {
        const post = { 
            id: 1, 
            title: 'title', 
            content: 'content' 
        }
        
        sinon.stub(Post, 'findById', (postId, done) => {
            setTimeout(() => { done(null, post) }, 1000)
        })
        
        getPostById(post.id, (err, res) => {
            expect(err).to.equal(null)
            expect(res).to.deep.equal(post)
            expect(Post.findById.getCall(0).args[0]).to.equal(post.id)
            done()
        })
    })
    
    it('can get posts by the owner - getPostsByOwner() ', done => {
        const owner = 'owner'
        const postsByOwner = [
            { owner, title: '1', content: '1'},
            { owner, title: '2', content: '2'}
        ]
        var PostFindMock = sinon.mock(Post) 
        PostFindMock
          .expects('find').withArgs({ owner })
          .chain('sort', '-created_at')
          .chain('exec')
          .yields(null, postsByOwner)

        getPostsByOwner(owner, function(err, res) {
            PostFindMock.verify()
            PostFindMock.restore()
            expect(res).to.deep.equal(postsByOwner)
            done()
        })        
    }) 
    
    /*
    it('can create post - ', done => {
      
        const owner = 'owner'
        const title = 'title'
        const content = 'content'
        const data = { owner, title, content }
        const expectedPost = Object.assign({}, data)
        
        var PostMock = sinon.mock(Post)
        PostMock
            .expects('create').withArgs(data)
            .yields(null, expectedPost)        
       
        createPost(owner, title, content, (err, res) => {
            PostMock.verify()
            PostMock.restore()
            expect(err).to.equal('null')
            expect(res).to.deep.equal(expectedPost)
        })
    })*/
})