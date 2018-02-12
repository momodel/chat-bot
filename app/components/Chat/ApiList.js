import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { Button, Toast } from 'antd-mobile'

import CustomCard from '../../components/Card'
import { WebChatId } from './WebChat'

import { getApiList } from '../../services/chat'
import { NavigationActions } from '../../utils'

// import ChatBot, {Loading} from 'react-simple-chatbot';

@connect(({ app }) => ({ ...app }))
class Search extends Component {
  constructor(props) {
    super(props)
    this.pageNo = 1
    this.keyWord = ''
    this.state = {
      apiList: null,
      displayText: null,

      // result: false
    }
  }

  temp() {
    fetch(`http://localhost:5000/chat/get_matched_apis?content=${keyWord}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(({ response }) => {
        console.log('response', response)
        if (response.status) {
          // 匹配成功
          this.setState({
            apiList: response['api_list'],
            // displayText: "匹配成功"
          })
        } else {
          // 匹配失败
          this.setState(
            {
              displayText: '对不起，你的需求未匹配到任何服务',
            },
            () =>
              this.props.triggerNextStep({
                trigger: WebChatId.failed.requirement_failed_select,
              })
          )
        }
      })
      .catch(() => {
        console.log('error')
        // 网络出错，重新输入
        this.setState(
          {
            displayText: '请求出错了，请重新尝试输入',
          },
          () =>
            this.props.triggerNextStep({ trigger: WebChatId.requirement.input })
        )
      })
  }

  componentWillMount() {
    console.log('search')
    // const { steps } = this.props
    // const keyWord = steps[WebChatId.requirement.input].value
    const keyWord = 'aaaa'
    this.keyWord = keyWord
    const result = this.getApiList()
    // 方式2, 接收promise
    // getApiList({keyword: keyWord})
    //   .then((res)=>console.log("res",res))
    //   .catch((error)=>console.log("error", error))
  }

  getApiList() {
    console.log('this.pageNo', this.pageNo)
    const result = getApiList(
      { keyword: this.keyWord, pageNo: this.pageNo },
      res => {
        console.log('res', res)
      },
      res => {
        if (res.length !== 0) {
          this.setState(
            {
              apiList: res,
              // displayText: "匹配成功"
            },
            () => (this.pageNo += 1)
          )
        } else {
          Toast.fail('没有更多了')
        }
      },
      res => {
        this.setState(
          {
            displayText: '对不起，你的需求未匹配到任何服务',
          },
          () =>
            this.props.triggerNextStep({
              trigger: WebChatId.failed.requirement_failed_select,
            })
        )
      }
    )
  }

  render() {
    const { apiList, displayText } = this.state
    return apiList ? (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {apiList.map(api => (
            <CustomCard
              key={api._id}
              title={api.name}
              description={api.description}
              score={api.score}
              favor={0}
              onPress={() =>
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'ApiDetail',
                    params: { api },
                  })
                )
              }
            />
          ))}
        </ScrollView>
        <Button
          style={{ width: 100, margin: 10, borderRadius: 20 }}
          onClick={() => {
            this.getApiList()
          }}
        >
          换一批
        </Button>
      </View>
    ) : (
      <Text> {displayText} </Text>
    )
    // return (
    //   <View style={{width: 300, height: 500}}>
    //     {apiList ? (
    //       apiList.map(api => (
    //         <Card key={api._id}>
    //           <Card.Header title={api.name}/>
    //           <Card.Body>
    //             <TouchableOpacity
    //               onPress={() =>
    //                 this.props.triggerNextStep({
    //                   value: api,
    //                   trigger: WebChatId.requirement.api_detail,
    //                 })
    //               }
    //             >
    //               <Text>{api.score}</Text>
    //               <Text>{api.description}</Text>
    //               <Text>{api.keyword}</Text>
    //             </TouchableOpacity>
    //           </Card.Body>
    //           {/*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*/}
    //         </Card>
    //       ))
    //     ) : (
    //       <Text> {displayText} </Text>
    //     )}
    //   </View>
    // )
  }
}

class UISearch extends Component {
  render() {
    const apiList = [
      {
        _id: '5a61abeb81a4431145fffb29',
        description: '预测航班延误信息',
        domain: 'http://192.168.31.6:5000',
        fake_response: '晴天',
        http_req: 'GET',
        input: {
          body: {
            date_time: {
              type: 'datetime',
              value: null,
            },
            flight_no: {
              type: 'str',
              value: null,
            },
          },
        },
        keyword: '预测 天气',
        name: '预测天气',
        output: {},
        score: 0.329,
        status: 0,
        url: '/predict_weather',
      },
      {
        _id: '5a60942dd845c07dfc8b7259',
        description: '预测航班延误信息',
        domain: 'http://192.168.31.6:5000',
        fake_response: '预计延迟3小时',
        http_req: 'GET',
        input: {
          body: {
            date_time: {
              type: 'datetime',
              value: null,
            },
            flight_no: {
              type: 'str',
              value: null,
            },
          },
        },
        keyword: '预测 航班 延误',
        name: '预测航班延误',
        output: {},
        score: 0.196,
        status: 0,
        url: '/predict_flight_delay',
      },

      {
        _id: '5a60942dd845c07dfc8b72591',
        description: '预测航班延误信息',
        domain: 'http://192.168.31.6:5000',
        fake_response: '预计延迟3小时',
        http_req: 'GET',
        input: {
          body: {
            date_time: {
              type: 'datetime',
              value: null,
            },
            flight_no: {
              type: 'str',
              value: null,
            },
          },
        },
        keyword: '预测 航班 延误',
        name: '预测航班延误',
        output: {},
        score: 0.196,
        status: 0,
        url: '/predict_flight_delay',
      },
      {
        _id: '5a60942dd845c07dfc8b72592',
        description: '预测航班延误信息',
        domain: 'http://192.168.31.6:5000',
        fake_response: '预计延迟3小时',
        http_req: 'GET',
        input: {
          body: {
            date_time: {
              type: 'datetime',
              value: null,
            },
            flight_no: {
              type: 'str',
              value: null,
            },
          },
        },
        keyword: '预测 航班 延误',
        name: '预测航班延误',
        output: {},
        score: 0.196,
        status: 0,
        url: '/predict_flight_delay',
      },
    ]

    return apiList ? (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {apiList.map(api => (
            <CustomCard
              key={api._id}
              title={api.name}
              description={api.description}
              score={api.score}
              favor={0}
              onPress={() => console.log('api', api)}
            />
          ))}
        </ScrollView>
        <Button style={{ width: 100, margin: 10, borderRadius: 20 }}>
          换一批
        </Button>
      </View>
    ) : (
      <Text> {displayText} </Text>
    )
  }
}

export { UISearch }
export default Search
//  <View style={{display: "flex", flexDirection:"row", overflowX: "scroll",}}>