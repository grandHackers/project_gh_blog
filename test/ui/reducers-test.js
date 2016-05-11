import * as reducers from '../../src/reducers'
import * as actions from '../../src/actions'
import { expect } from 'chai'

// TODO write test for the root reducer
// just checking that it combines all other reducers

describe("Post Reducers", () => {
    const reducer = reducers.posts
    
    it('should return initial state', () => {
        const expectedState = []
        expect(reducer(undefined, {})).to.deep.equal(expectedState)
    })
    
    it('should handle RECEIVE_POSTS', () => {
        const owner = 'owner'
        const posts = [
            { owner, title: "Post1", content: 'Post1' }, 
            { owner, title: "Post2", content: 'Post2' } 
        ]
        const action = {
            type: actions.RECEIVE_POSTS,
            owner,
            posts: posts,
            receivedAt: Date.now()                    
        }    
        const currentState = [ 
            { owner, title: 'oldPost', content: 'oldPost' }
        ]
        const expectedState = posts
        expect(
            reducer(currentState, action)
        ).to.deep.equal(expectedState)
    })
    
    it('should handle RECEIVE_CREATED_POST', () => {
        const owner = 'owner'
        const posts = [
            { owner, title: "Post1", content: 'Post1' }, 
            { owner, title: "Post2", content: 'Post2' } 
        ]
        const currentState = posts
        
        const newPost = {
            owner,
            title: 'newPost', 
            content: 'newPost', 
        }
        const action = {
            type: actions.RECEIVE_CREATED_POST,
            post: newPost,
            receivedAt: Date.now()
        }
        const expectedState = [newPost].concat(posts)
        expect(
            reducer(currentState, action)
        ).to.deep.equal(expectedState)
    })

})

describe("User Reducer", () => {
    const reducer = reducers.currentUser
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.equal('')
    })
    it("should handle SIGN_IN_USER", () => {
        const currentState = ''
        const username = 'user'
        const action = {
            type: actions.SIGN_IN_USER,
            username    
        }
        const expectedState = username
        expect(reducer(currentState, action)).to.deep.equal(expectedState)
    })
})

