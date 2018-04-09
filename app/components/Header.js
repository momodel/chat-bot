import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native'
import {showTime} from '../utils'


export const Header = ({title, create_time, onPressFavor, isFavor, isStar,starNum, favorNum, onPressStar}) => {
  return (
    <View style={{padding: 10}}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={{fontSize: 25, width: '60%'}}>
          {title}
        </Text>

        <HearderRight {...{onPressFavor, isFavor, isStar, starNum, favorNum, onPressStar}}/>
      </View>
      <Text style={{fontSize: 15, color: "grey", marginTop: 10}}>
        发布于{showTime(create_time)}
      </Text>
    </View>
  )
}


export const HearderRightV = ({onPressFavor, isFavor, isStar, starNum, favorNum}) => {
  return <View
    style={{
      // display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    }}
  >
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}
      >
        <Image
          style={{width: 15, height: 15, tintColor: isStar ? "#FFE38F" : "grey"}}
          source={require('../images/navigation/thumb_up.png')}
        />

      </View>

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5
      }}>
        {starNum}
      </Text>

    </View>

    <View style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}
        onPress={onPressFavor}
      >
        <Image
          style={{
            width: 20, height: 20,
            tintColor: isFavor ? "#FFE38F" : "grey"
          }}
          source={require('../images/navigation/star.png')}
        />

      </View>

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5
      }}>
        {favorNum}
      </Text>
    </View>
  </View>

}

export const HearderRight = ({onPressFavor, isFavor, isStar, starNum, favorNum, onPressStar}) => {
  return <View
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
      }}
      onPress={onPressStar}
    >
      <Image
        style={{width: 20, height: 20, tintColor: isStar ? "#6D9CF9" : "grey"}}
        source={require('../images/navigation/thumb_up.png')}
      />

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight:10,

      }}>
        {starNum}
      </Text>

    </TouchableOpacity>



    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
      }}
      onPress={onPressFavor}
    >
      <Image
        style={{
          width: 25, height: 25,
          tintColor: isFavor ? "#FFC923" : "grey"
        }}
        source={require('../images/navigation/star.png')}
      />

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight:10,

      }}>
        {favorNum}
      </Text>

    </TouchableOpacity>




  </View>

}
