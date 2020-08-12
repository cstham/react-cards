import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { Row } from 'reactstrap';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
});

class ResultsTable extends React.Component {

  render() {

    const { results } = this.props;

    return (
      <Row className="no-gutters h-100 justify-content-center">
        <div className="material-table-container">
          <MaterialTable
            columns={[
              {
                title: 'Player', field: 'player', width: '5%',
                cellStyle: {
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }
              },
              { title: 'Cards', field: 'cards' },

            ]}
            data={results}
            title="Output"
            options={{
              padding: "dense",
              paging: false,
              search: false,
              headerStyle: { textAlign: 'center', fontWeight: 'bold' },
            }}
          />
        </div>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
