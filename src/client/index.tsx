import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssDemo from './components/cssDemo';
import users from '../data/index'
import StackedLineChart from './components/echarts/line/Stacked Line Chart'
import Doughnut from './components/echarts/pie/Doughnut Chart'
// import BarRace from './components/echarts/bar/Bar Race'

class Index extends Component {
  render () {
    const usersElements: any[]= [] // 保存每个用户渲染以后 JSX 的数组
    for (let user of users) {
      usersElements.push( // 循环每个用户，构建 JSX，push 到数组中
        <div>
          <div>姓名：{user.username}</div>
          <div>年龄：{user.age}</div>
          <div>性别：{user.gender}</div>
          <hr />
        </div>
      )
    }

    return (
      <div>
        <div>{usersElements}</div>
      </div>
      
    )
  }
}

class Title extends Component {
    render () {
      return (
        <h1>pageTitle</h1>
      )
    }
  }
  class Header extends Component {
    render () {
      return (
      <div>
        <Title />
        <h2>This is Header</h2>
      </div>
      )
    }
  }
  class Main extends Component {
    render () {
      return (
      <div>
        <h2>This is main content</h2>
        <CssDemo />
        <StackedLineChart />
        <Doughnut />
        {/* <BarRace /> */}
      </div>
      )
    }
  }

  
class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
        <div>
        <Index />
        <Header />
        <Main />        
        </div>
        )
        
    }
}

ReactDOM.render(<Demo />,document.querySelector('#app'));
