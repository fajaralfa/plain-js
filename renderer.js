async function renderList(data, container, template, templateFillMethod) {
    template.hidden = true
    container.replaceChildren(template) // reset container content
    let i = 0
    for (let item of data) {
        item.index = i++
        const postElement = template.cloneNode(true)
        templateFillMethod(item, postElement)
        container.append(postElement)
    }
}

async function renderPostList(posts, users) {
    const usersMap = new Map(users.map((u) => [u.id, u]))
    const postsContainerEl = document.querySelector('ul[posts]')
    const postTemplateEl = document.querySelector('li[post]')
    renderList(posts, postsContainerEl, postTemplateEl, function (data, el) {
        el.querySelector('[title]').textContent = data.title
        el.querySelector('[body]').textContent = data.body
        el.querySelector('[user]').textContent = `${
            usersMap.get(data.userId).username
        } | ${usersMap.get(data.userId).name}`
        el.querySelector('button').setAttribute('index', data.index)
        el.hidden = false
    })
}

async function renderPostModal(data, el) {
    el.open = true
    el.querySelector('[title]').textContent = data.title
    el.querySelector('[body]').textContent = data.body
}

async function renderUserList(users) {
    const userListContainer = document.querySelector('ul[user-list]')
    const userTemplateElement = document.querySelector('ul[user-list] li')
    renderList(
        users,
        userListContainer,
        userTemplateElement,
        function (data, el) {
            el.querySelector('button').setAttribute('user-id', data.id)
            el.querySelector('button').textContent = data.name
            el.hidden = false
        }
    )
}

async function renderCommentList(comments) {
    const commentListContainer = document.querySelector('[comments]')
    const commentTemplateElement = document.querySelector(
        '[comments] [comment]'
    )
    renderList(
        comments,
        commentListContainer,
        commentTemplateElement,
        function (data, el) {
            el.querySelector('[name]').textContent = data.name
            el.querySelector('[email]').textContent = data.email
            el.querySelector('[body]').textContent = data.body
            el.hidden = false
        }
    )
}

function renderPageTitle(text) {
    const pageTitle = document.querySelector('[page-title]')
    pageTitle.hidden = false
    pageTitle.textContent = text
    document.title = text
}

export {
    renderList,
    renderUserList,
    renderPostList,
    renderPageTitle,
    renderPostModal,
    renderCommentList,
}
