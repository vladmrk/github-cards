'use strict';

const Title = (props) => {
  return (
    <h1>GitHub Cards</h1>
  );
};

const Card = (props) => {
  return (
      <div className="card">
        <img width="75" className="avatar" src={ props.avatar_url } />
        <div className="description">
          <div className="name">{ props.name }</div>
          <div className="type">{ props.type }</div>
        </div>
      </div>
    );
}

const CardList = (props) => {
  return (
    <div>
      { props.cards.map((card) => <Card key={ card.id } { ...card }/>) }
    </div>
  );
}

class Form extends React.Component {

    state = {
      username: ''
    }

    handleSubmit = (event) => {
      event.preventDefault();
      axios.get(`https://api.github.com/users/${this.state.username}`)
        .then(res => this.props.onSubmit(res.data))
    }

    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input
            className="username-field"
            type="text" value={this.state.username}
            onChange={(event) => this.setState({ username: event.target.value })}
            placeholder="GitHub username" required />
          <button className="submit-btn" type="submit">Add card</button>
        </form>
      );
    }
}

class App extends React.Component {

  state = {
    cards: []
  }

  addCard = (card) => {
    this.setState(prevState => prevState.cards.push(card))
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <Form onSubmit={ this.addCard }/>
        <CardList cards={ this.state.cards }/>
      </React.Fragment>
    );
  }
}

const container = document.querySelector('#container');
ReactDOM.render(<App />, container);
