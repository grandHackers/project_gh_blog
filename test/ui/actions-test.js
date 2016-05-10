import { expect } from 'chai'
import * as actions from '../../src/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import sinon from 'sinon'
import config from '../../config/config.js'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
var stub = sinon.sandbox.stub(config, 'API_URL', 'http://www.apiServer.com')

describe('Post Action Creators', function() {
    
    it('requestGetPosts() should create an action to request getting of posts', () => {
        const owner = 'someOwner'
        const expectedAction = {
            type: actions.REQUEST_GET_POSTS,
            owner 
        }
        expect(actions.requestGetPosts(owner)).to.deep.equal(expectedAction)
    })
    
    it('receivePosts() should create an action to receive fetched posts', () => {
        const owner = 'someOwner'
        const data = ['post1', 'post2'] 
        const expectedAction = {
            type: actions.RECEIVE_POSTS,
            owner,
            posts: data
        }
        const actual = actions.receivePosts(owner, data) 
        expect(actual).to.include(expectedAction)
        expect(actual).to.include.keys('receivedAt')
    }) 
    
    it('requestCreatePost() should create an action to request adding a new post', () => {
        const post = "somePost"
        const expectedAction = {
            type: actions.REQUEST_CREATE_POST,
            post
        } 
        expect(actions.requestCreatePost(post)).to.deep.equal(expectedAction)
    }) 
    
    it('receiveCreatedPost() should create an action to add created post to posts list', () => {
        const post = 'somePost'
        const expectedAction = {
            type: actions.RECEIVE_CREATED_POST,
            post
        }
        const actual = actions.receiveCreatedPost(post) 
        expect(actual).to.include(expectedAction)
        expect(actual).to.include.keys('receivedAt')
    })
    
    it('fetchPosts() should create REQUEST_GET_POSTS and RECEIVE_POSTS after fetching is done', () => {
        const owner = 'owner'
        const posts = [
            'post1', 'post2'
        ]
        const expectedActions = [
            { type: actions.REQUEST_GET_POSTS, owner },
            { type: actions.RECEIVE_POSTS, owner, posts },
        ]
        nock(config.API_URL)
            .get('/posts/' + owner)
            .reply(200, posts)
        const store = mockStore({ posts: [] })
        
        return store.dispatch(actions.fetchPosts(owner))
            .then(() => { 
                const actualActions = store.getActions()
                expect(actualActions.length).to.equal(expectedActions.length)
                expect(actualActions[0]).to.deep.equal(expectedActions[0])
                
                expect(actualActions[1].owner).to.equal(expectedActions[1].owner)
                expect(actualActions[1].type).to.equal(expectedActions[1].type)
                expect(actualActions[1].posts).to.deep.equal(expectedActions[1].posts)
                expect(actualActions[1]).to.contain.any.keys('receivedAt')                                  
            }) 
    }) 
    
    it("createPost() should create REQUEST_CREATE_POST and RECEIVE_CREATED_POST", 
        () => {
            const currentUser = "user"
            const title = 'newPostTitle'
            const content = 'newPostContent'
            const post = { owner: currentUser, title, content } 
            const expectedActions = [
                { type: actions.REQUEST_CREATE_POST, post },
                { type: actions.RECEIVE_CREATED_POST, post }
            ]
            const store = mockStore({ posts: [], currentUser })
            
            nock(config.API_URL, {
                reqheaders: {
                    'Content-Type': 'application/json'
                    }
                })
                .post('/posts/' + currentUser, { 
                    owner: currentUser, 
                    title, 
                    content })
                .reply(201, {
                    owner: currentUser, 
                    title, 
                    content
                })
            
            return store.dispatch(actions.createPost(title, content))
                .then(() => {
                    const actualActions = store.getActions()
                    console.log(actualActions)
                    expect(actualActions.length).to.equal(expectedActions.length)
                    expect(actualActions[0]).to.deep.equal(expectedActions[0])
                    
                    const actualAction = actualActions[1]
                    const expectedAction = expectedActions[1]
                    expect(actualAction).to.have.all.keys(
                        Object.keys(expectedAction).concat(['receivedAt']))
                    expect(actualAction.post).to.deep.equal(expectedAction.post)
                    expect(actualAction.type).to.equal(expectedAction.type)
                })
    })   
})