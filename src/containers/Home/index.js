import React from 'react';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from '../../constants/actionTypes';
import { Row } from 'reactstrap';
import ResultsTable from '../../components/ResultsTable';

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {

  state = {
    results: '',
    number: '',
    numberError: '',
  };

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {

    const { results, number, numberError } = this.state;

    return (
      <div className="home-page">

        <div className="container page">
          <Row className="no-gutters h-100 justify-content-center">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Programming Test</h1>

              <form onSubmit={this.submitForm(Number(number))}>
                <fieldset>

                  <fieldset className="form-group">
                    <label>Number of people (numerical value)</label>
                    <input
                      className="form-control form-control-lg"
                      type="number"
                      placeholder="Please enter a number"
                      value={number}
                      onChange={this.handleChangeNumberValue} />
                  </fieldset>

                  {numberError && <div className="error-msg">{numberError}</div>}

                  <button
                    className="btn btn-lg btn-primary btn-deal"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Deal
                  </button>

                </fieldset>
              </form>
            </div>
          </Row>

          {results ? <ResultsTable results={results} /> : null}

        </div>

      </div>
    );
  }

  handleChangeNumberValue = (ev) => {
    this.setState({
      number: ev.target.value,
    });
  };

  submitForm = (n) => ev => {
    ev.preventDefault();

    // Input validation to ensure that entered value is numerical value
    if (n <= 0) {
      this.setState({
        numberError: 'Input value does not exist or value is invalid.',
        results: ''
      });
      return;  //process is terminated
    }
    else {
      this.setState({
        numberError: '',
      });
    }

    const deck = [];

    // Spade = S, Heart = H, Diamond = D, Club = C
    const suits = ["S", "H", "D", "C"];

    // Card 2 to 9 are, as it is,1=A,10=X,11=J,12=Q,13=K
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];

    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < values.length; x++) {
        const card = suits[i] + '-' + values[x];
        deck.push(card);
      }
    }

    const noOfCards = deck.length;

    if (noOfCards !== 52) {
      this.setState({
        numberError: 'Irregularity occured.',
        results: ''
      });
      return;  //process is terminated
    }

    // Shuffle deck by switching the values of two random cards for 1000 turns        
    for (var z = 0; z < 1000; z++) {
      const location1 = Math.floor((Math.random() * deck.length));
      const location2 = Math.floor((Math.random() * deck.length));
      const tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }

    // Distribution algorithm
    const arr = [];
    let cardPos = 0;
    let playerCounter = 0;

    for (var q = 0; q < n; q++) {
      const playerlist = [];
      let distFreq = Math.floor(noOfCards / n);
      cardPos = playerCounter;

      if (q < noOfCards % n) {
        distFreq++;
      }

      if (distFreq > 0) {
        for (var p = 0; p < distFreq; p++) {
          playerlist.push(deck[cardPos]);
          cardPos += n;
        }
        playerCounter++;
        arr.push(playerlist);
      }
    }

    // Results of distribution to n people
    const randomDeck = [];

    for (var count = 0; count < arr.length; count++) {
      const results = { player: count + 1, cards: arr[count].toString() };
      randomDeck.push(results);
    }

    this.setState({ results: randomDeck })
  };


}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
