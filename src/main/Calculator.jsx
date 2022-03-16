import React, { Component } from 'react'

import './Calculator.css'
import Button from '../components/Button/Button'
import Display from '../components/Display/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

const typeOperations = {
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b
}

export default class Calculator extends Component {
    constructor(props) {
        super(props)
        this.setDigit = this.setDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.state = { ...initialState }
    }
    
    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const isEqual = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            values[0] = typeOperations[currentOperation](...values)
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: isEqual ? null : operation,
                current: isEqual ? 0 : 1,
                clearDisplay: !isEqual,
                values
            })
        }
    }

    setDigit(n) {
        //se n é estritamente igual a '.' e não existir incidência do '.' no displayValue
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
        
    }
    render() {
        return (
            <div className='calculator'>
               <Display value={this.state.displayValue} /> 
               <Button label='AC' click={() => this.clearMemory()} triple/>
               <Button label='/' click={this.setOperation} operation/>
               <Button label='7' click={this.setDigit}/>
               <Button label='8' click={this.setDigit} />
               <Button label='9' click={this.setDigit} />
               <Button label='*' click={this.setOperation} operation/>
               <Button label='4' click={this.setDigit} />
               <Button label='5' click={this.setDigit} />
               <Button label='6' click={this.setDigit} />
               <Button label='-' click={this.setOperation} operation/>
               <Button label='1' click={this.setDigit} />
               <Button label='2' click={this.setDigit} />
               <Button label='3' click={this.setDigit} />
               <Button label='+' click={this.setOperation} operation/>
               <Button label='0' click={this.setDigit} double/>
               <Button label='.' click={this.setDigit} />
               <Button label='=' click={this.setOperation} operation/>
            </div>
        )
    }
}