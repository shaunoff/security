import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'



export default class SearchPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false, results: [], value: '' };
		this.resetComponent = this.resetComponent.bind(this);
		this.handleResultSelect = this.handleResultSelect.bind(this)
		this.handleSearchChange = this.handleSearchChange.bind(this)
	}
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent(){
		this.setState({ isLoading: false, results: [], value: '' })
	}

  handleResultSelect(e, { result }){
		this.props.addEvidence({controlId: this.props.id, policyId: result.id})
		this.setState({ value: "" })
	}

  handleSearchChange(e, { value }){
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.policies, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
						resultRenderer= {(result) => <div key={result.id}>{result.name}</div>}
            value={value}
            {...this.props}
          />
        </Grid.Column>

      </Grid>
    )
  }
}
