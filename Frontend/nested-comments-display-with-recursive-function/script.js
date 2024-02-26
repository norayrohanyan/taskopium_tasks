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
  const section = document.createElement('section');
  section.classList.add('comment');
  section.style.marginLeft = intend + 'px';

  const p = document.createElement('p');
  p.textContent = comment.text;
  section.appendChild(p);

  if (comment.replies.length > 0) {
      const ul = document.createElement('ul');
      comment.replies.forEach(reply => {
          const li = document.createElement('li');
          li.appendChild(generateComments(reply, lvl + 1));
          ul.appendChild(li);
      });
      section.appendChild(ul);
  }

  return section;
}

function displayComments(comments, lvl) {
  const container = document.getElementById('container');
  comments.forEach(comment => {
      container.appendChild(generateComments(comment, lvl));
  });
}

displayComments(comments, 0);
