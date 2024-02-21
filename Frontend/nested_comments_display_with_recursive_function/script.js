const comments = [
    {
      id: 1,
      text: "This is the first comment",
      parentId: null,
      replies: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          parentId: 1,
          replies: [
            {
              id: 3,
              text: "This is a nested reply",
              parentId: 2,
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: "This is an independent comment",
      parentId: null,
      replies: []
    },
];

function generateComments(comment, lvl) {
    const intend = lvl * 30;
    const div = document.createElement('div');
    div.classList.add('comment');
    div.style.marginLeft = intend + 'px';
    const text = document.createElement('p');
    console.log(comment.text);
    text.textContent = comment.text;
    div.appendChild(text);
    document.getElementById('container').appendChild(div);
}

function displayComments(comments, lvl) {
    comments.forEach(comment => {
        generateComments(comment, lvl + 1);
        if (comment.replies.length > 0) {
            displayComments(comment.replies, lvl + 1);
        }
    });
}

displayComments(comments, 0);
