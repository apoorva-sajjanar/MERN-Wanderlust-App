import React, { Component } from 'react'

export class store extends Component {
  constructor(props) {
    super(props)
    
}
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    data:state.reducer.data,
    error:state.reducer.error,
    loading:state.reducer.loading
  }
}
export default connect(mapStateToProps)(store)
