import { renderCommentList, renderPageTitle, renderPostList, renderPostModal, renderUserList } from "./renderer.js"

async function main() {
    let posts, users
    renderPageTitle(`All Posts`)

    posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
    users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()

    renderPostList(posts, users)
    renderUserList(users)

    document.querySelector('[all-posts]').addEventListener('click', async function (e) {
        renderPageTitle(`All Posts`)
        posts = await (await fetch(`https://jsonplaceholder.typicode.com/posts`)).json()
        renderPostList(posts, users)
    })

    document.querySelector('[user-list]').addEventListener('click', async function (e) {
        if (e.target.nodeName !== 'BUTTON') {
            return
        } else {
            const usersMap = new Map(users.map(u => [u.id, u]))
            let userId = parseInt(e.target.getAttribute('user-id'))
            renderPageTitle(`${usersMap.get(userId).name}'s Posts`)

            posts = await (await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)).json()
            renderPostList(posts, users)
        }
    })

    document.querySelector('main').addEventListener('click', async function (e) {
        if (e.target.nodeName !== 'BUTTON') {
            return
        } else {
            const post = posts[e.target.getAttribute('index')]
            renderPostModal(
                post,
                document.querySelector('[post-dialog]')
            )
            const comments = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)).json()
            renderCommentList(comments)
        }
    })

    document.querySelector('[post-dialog] [close]').addEventListener('click', function (e) {
        document.querySelector('[post-dialog]').open = false
    })
}

main()