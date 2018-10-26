const reduceAction = (
  state = {
    text: 'hey whats up',
    list: [],
    highestRated: [
      { title: 'game1', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Secret_of_Mana_Box.jpg/220px-Secret_of_Mana_Box.jpg', rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
      { title: 'game1', image: null, rating: 100 },
    ]
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
      return Object.assign({}, state, { text: action.text })
    default: return state;
  }
};

export default reduceAction;
