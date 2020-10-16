import React, { Component } from "react"
import Select from 'react-select'


class Dog extends Component {
    constructor() {
        super()
        this.state = {
            dogType: [],
            dogImg: ""
        }
    }

    componentDidMount() {
        fetch("https://dog.ceo/api/breeds/list/all")
          .then(response => response.json())
          .then(data => {
            data.status === "success" && this.setState({ dogType : Object.keys(data.message) })
          })
      }


    handleChange = (event) => {
        fetch("https://dog.ceo/api/breed/" + event.value + "/images/random")
            .then(response => response.json())
            .then(data => {
                data.status === "success" && this.setState({ dogImg : data.message })
            })
    }

      render() {
        const options = []
            this.state.dogType.map(type => 
                options.push({
                    value: type,
                    label: type
                })
            )
          return(
              <div>
                  <Select options={options} onChange={this.handleChange}/>
                  <br/>
                  <img src={this.state.dogImg} />
              </div>
          )
      }
}

export default Dog