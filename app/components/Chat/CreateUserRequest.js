import React, {Component} from 'react'
// import { connect } from 'dva'
import {View, Text} from 'react-native'
import {List, InputItem, Button, Toast} from 'antd-mobile'
import {WebChatId} from './WebChat'
import { connect } from 'react-redux'

import {createNewUserRequest} from "../../services/userRequest"

@connect(({ app }) => ({ ...app }))
export default class CreateUserRequest extends Component {
  constructor(props){
    super(props)
    this.state = {
      requestTitle: null,
      requestDescription: null,

      submitSuccess: false
      // requestDataset: values['requestDataset'],
      // requestInput: values['requestInput'],
      // requestOutput: values['requestOutput'],
      // requestTags: values['requestTags'],
      // requestCategory: values['requestCategory'],

    }
  }

  submit = () => {

    // 不能使用dispatch 直接调用service
    createNewUserRequest({
      requestTitle: this.state['requestTitle'],
      requestDescription: this.state['requestDescription'],
      user_ID: this.props.username,
      onSuccess: (res)=>{
        console.log("res", res)
        this.setState({
          submitSuccess: true
        })

      },
      onError: (res)=>{
        console.log("res1", res)
        Toast.fail("提交失败")
      }


    })


    // this.props.dispatch({
    //   type: 'allRequest/makeNewRequest',
    //   payload: {
    //     requestTitle: this.state['requestTitle'],
    //     requestDescription: this.state['requestDescription'],
    //     // requestDataset: this.state['requestDataset'],
    //     // requestInput: this.state['requestInput'],
    //     // requestOutput: this.state['requestOutput'],
    //     // requestTags: this.state['requestTags'],
    //     // requestCategory: this.state['requestCategory'],
    //   }
    // })
  }


  render() {
    return (
      <View>
        {
          this.state.submitSuccess?<Text>
            提交成功
          </Text>:
            <View>
              <List>
                <InputItem
                  clear
                  placeholder="填写标题"
                  onChangeText={text => this.setState({ requestTitle: text })}
                >需求标题</InputItem>

                <InputItem
                  // type={type}
                  placeholder="需求描述"
                  onChangeText={text => this.setState({ requestDescription: text })}
                >需求描述</InputItem>
              </List>
              <Button onClick={this.submit}>
                提交
              </Button>
            </View>
        }

      </View>
    )

  }

}