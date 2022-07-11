import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  BackHandler,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
  Vibration,
} from 'react-native';
import Sendchat from './src/assets/svg/sendchat.svg';
import Camerachat from './src/assets/svg/camerachat.svg';
import HeaderBack from './src/assets/svg/headerBack.svg';
import Addplus from './src/assets/svg/addplus.svg';
import Eye from './src/assets/svg/eye.svg';
import Mic from './src/assets/svg/mic.svg';
import {SwipeRow} from 'react-native-swipe-list-view';

import {
  GiftedChat,
  Send,
  InputToolbar,
  Bubble,
  Actions,
  Composer,
  MessageText,
} from 'react-native-gifted-chat';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const App = () => {
  const [showOptions, setShowOptions] = useState(false);
  const currentUser = {
    _id: '1',
    name: 'Test',
    avatar: '',
  };
  const [liveChat, setLiveChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [customText, setCustomText] = useState('');

  const [photo, setPhoto] = useState('');
  const [attachment, setAttachment] = useState('');

  const [modal, setModal] = useState(false);

  const [replyMsg, setReplyMsg] = React.useState({
    replyId: null,
    text: '',
    user: null,
  });

  const [uploadImageLink, setUploadImageLink] = useState('');
  const [uploadVideoLink, setUploadVideoLink] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 4,
        text: 'At the end RCB needs runrate more than 0.74 to quality.',
        // createdAt: new Date(),
        user: {
          _id: 1,
          name: '',
          avatar: 'https://placeimg.com/140/140/any',
        },
        isReply: {
          text: 'if RCB wins the match what would happen for DC',
          name: 'Arun',
        },
      },
      {
        _id: 1,
        text: 'if RCB wins the match what would happen for DC',
        // createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Arun',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'CSK chasing would better in this ground.They have higher winning strike while chasing in chepauk.',
        // createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Anand',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hey everyone, Welcome to CSK vs RCB thread. tou can have your conversation in the live feed.',
        // createdAt: new Date(),
        user: {
          _id: 1,
          name: '',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        placeholder="Send your message to Live Feed"
        placeholderTextColor={'#A4A4AB'}
        containerStyle={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 5,
          borderRadius: 25,
          borderColor: '#fff',
          borderTopWidth: 0,
        }}
        textInputStyle={{color: '#000', fontSize: 12}}
        renderComposer={props1 => {
          return (
            <View style={{flex: 1}}>
              {replyMsg.replyId && <ReplyWrapper id={replyMsg.replyId} />}
              <Composer
                {...props}
                placeholder={'Send youe message to live Feed'}
                placeholderTextColor={'#A4A4AB'}
                textInputStyle={{
                  // color: 'black',
                  color: '#F1F1F1',
                  // backgroundColor: '#fff',
                  backgroundColor: '#171717',
                  marginLeft: 15,
                  fontSize: 10,
                  lineHeight: 20,
                  height: 40,

                  // marginVertical: 5,
                }}
              />
            </View>
          );
        }}
        textInputProps={{
          multiline: true,
          returnKeyType: 'go',
          onSubmitEditing: () => {
            if (props.text && props.onSend) {
              let text = props.text;
              props.onSend({text: text.trim()}, true);
            }
          },
        }}
      />
    );
  };

  const CustomMessageText = props => {
    return (
      <>
        <View style={{padding: 5}}>
          {props.currentMessage?.user?.name != '' ? (
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                paddingTop: 5,
                fontWeight: '600',
                fontSize: 14,
                lineHeight: 20,
              }}>
              {props.currentMessage?.user?.name}
            </Text>
          ) : null}
          {props.currentMessage.isReply ? (
            <View
              style={{
                backgroundColor: '#171717',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: '100%',
                    width: 5,
                    backgroundColor: '#07CF87',
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: 'white',
                      paddingHorizontal: 10,
                      paddingTop: 5,
                      fontWeight: '600',
                      fontSize: 14,
                      lineHeight: 20,
                    }}>
                    {props.currentMessage?.isReply?.name}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      paddingHorizontal: 10,
                      paddingTop: 5,
                      marginBottom: 5,
                      fontWeight: '400',
                      fontSize: 12,
                      lineHeight: 18,
                    }}>
                    {props.currentMessage?.isReply?.text}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}
          <Text
            style={{
              color: '#fff',
              marginLeft: 10,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: '400',
              fontFamily: 'ProximaNova-Regular',
            }}>
            {props.currentMessage.text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginVertical: 8,
            }}>
            <Eye width={14} height={9} />
            <Text style={[styles.textStyle, {marginLeft: 5}]}>10 k</Text>
            <Text style={[styles.textStyle, {marginLeft: 10}]}>10:00 AM</Text>
          </View>
        </View>

        {/* <MessageText {...props} /> */}
      </>
    );
  };

  const renderComposer = props => {
    {
      return (
        <View
          style={{
            width: screenWidth,
            height: '100%',
            backgroundColor: '#1C1C1E',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: screenWidth * 0.95,
              height: '90%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#464649',
              borderRadius: 18,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Composer
              {...props}
              placeholder={'Send youe message to live Feed'}
              placeholderTextColor={'#A4A4AB'}
              textInputStyle={{
                color: '#FFF',
                marginLeft: 15,
                fontSize: 10,
                lineHeight: 20,
                height: 35,
              }}
            />
            <View style={{width: 40, height: 40}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Camerachat width={20} height={17} />
              </TouchableOpacity>
            </View>
            <View style={{width: 40, height: 40}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Mic width={20} height={17} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  const renderBubble = props => {
    return (
      <>
        <BubbleComp props={props} />
      </>
    );
  };

  const BubbleComp = ({props}) => {
    const {text, system} = props.currentMessage;
    const onLeftAction = useCallback(
      ({isActivated}) => {
        if (isActivated) {
          Vibration.vibrate(50);
          setReplyMsg({
            replyId: props.currentMessage._id,
            text,
            user: props.currentMessage?.user?.name,
          });
        }
      },
      //   [id],
    );

    return (
      <SwipeRow
        useNativeDriver
        onLeftActionStatusChange={onLeftAction}
        disableLeftSwipe
        disableRightSwipe={
          system ||
          props.currentMessage.user?.name === currentUser?.nickname ||
          props.currentMessage.isReply ||
          props.currentMessage?.audio ||
          props.currentMessage?.image
        }
        leftActivationValue={90}
        leftActionValue={0}
        // swipeKey={id + ''}
      >
        <></>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {backgroundColor: '#3A3A3C', marginBottom: 10},
            right: {backgroundColor: '#3A3A3C', marginBottom: 10},
          }}
          textStyle={{
            left: {
              color: '#fff',
              fontSize: 14,
              lineHeight: 20,
              fontWeight: '400',
              fontFamily: 'ProximaNova-Regular',
            },
            right: {
              color: '#fff',
              fontSize: 14,
              lineHeight: 20,
              fontWeight: '400',
              fontFamily: 'ProximaNova-Regular',
            },
          }}
          timeTextStyle={{
            left: {
              color: '#fff',
              fontSize: 10,
              lineHeight: 12,
              fontWeight: '700',
              fontFamily: 'ProximaNova-Bold',
            },
            right: {
              color: '#fff',
              fontSize: 10,
              lineHeight: 12,
              fontWeight: '700',
              fontFamily: 'ProximaNova-Bold',
            },
          }}
          renderUsername={renderUsername}
          //   usernameStyle={{
          //     color: 'red',
          //     top: -40,
          //     left: 0,
          //     position: 'absolute',
          //   }}
          tickStyle={{
            color: props.currentMessage?.seen ? '#01A35D' : '#999',
          }}>
          <></>
        </Bubble>
      </SwipeRow>
    );
  };

  const renderUsername = () => {
    return (
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          marginTop: 10,
          //   backgroundColor: 'rgba(0,0,0,.1)',
          backgroundColor: '#1C1C1E',
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
          marginLeft: 5,
        }}>
        <View style={{height: 80, width: 5, backgroundColor: '#07CF87'}}>
          aaaaaaaaaaaaaa
        </View>
      </View>
    );
  };
  const Reply = () => {
    return (
      <View
        style={{
          height: 80,
          flexDirection: 'row',
          marginTop: 10,
          //   backgroundColor: 'rgba(0,0,0,.1)',
          backgroundColor: '#1C1C1E',
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
          marginLeft: 5,
        }}>
        <View style={{height: 80, width: 5, backgroundColor: '#07CF87'}}></View>
        <View style={{flexDirection: 'column', overflow: 'hidden'}}>
          <Text
            style={{
              color: '#FFFFFF',
              paddingLeft: 10,
              paddingTop: 5,
              fontWeight: 'bold',
            }}>
            {replyMsg?.user}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              paddingLeft: 10,
              paddingTop: 5,
              marginBottom: 2,
              fontSize: 12,
            }}>
            {replyMsg.text}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: 2,
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <TouchableOpacity
            onPress={() => setReplyMsg({replyId: null, text: '', user: null})}>
            {/* <Icon name="x" type="feather" color="#0084ff" size={20} /> */}
            <Addplus width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const ReplyWrapper = ({id}) => {
    return <Reply id={id} />;
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  };

  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      options={{
        'Choose From Library or Camera': () => {
          console.log('Choose From Library');
          // setModal(true)
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );

  const renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          width: 40,
          height: 40,
          marginRight: 0,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#171717',
          marginHorizontal: 8,
        }}>
        <Sendchat width={18} height={20} />
      </Send>
    );
  };

  const requestCamerapermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Cemera Permission given');
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          mediaType: type,
          // includeBase64: true
        };
        ImagePicker.launchCamera(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = response.assets[0].uri;
            console.log(response, 'krushit');
            setPhoto(source);
            createlinkapicall(source);
            setModal(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const launchImageLibrary = () => {
    let options = {
      mediaType: 'mixed',
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response.assets[0].uri;
        createlinkapicall(source);
        setAttachment(source);
        // setModal(false);
      }
    });
  };

  const renderMessageText = props => {
    // if (props.currentMessage.isReply) {
    return <CustomMessageText {...props} />;
    // }
    // return <MessageText {...props} />;
  };

  const renderMessageVideo = props => {
    console.log('videoprop:', messages[0].video);
    return (
      <View style={{position: 'relative', height: 150, width: 250}}>
        <VideoPlayer
          video={{uri: messages[0].video}}
          videoWidth={1600}
          videoHeight={900}
        />
      </View>
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#2C2C2E'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: '#2C2C2E',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#75757A',
          }}>
          <View
            style={{
              width: '95%',
              height: 32,
              flexDirection: 'row',
            }}>
            <View style={{width: 24, height: 32}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <HeaderBack width={24} height={24} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '60%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    fontWeight: '700',
                    color: '#FFF',
                    flexWrap: 'wrap',
                    marginLeft: 15,
                  }}>
                  CSK vs RCB
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: 24, marginRight: 15, height: 32}}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Addplus width={18.5} height={18.5} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 67,
                  height: 24,
                  borderWidth: 1,
                  borderColor: '#0080FF',
                  borderRadius: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#5CABFF',
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: '600',
                  }}>
                  Inbox
                </Text>
                <View
                  style={{
                    width: 19,
                    height: 19,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E53535',
                    marginLeft: 3,
                    borderRadius: 2,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 10,
                      lineHeight: 12,
                      fontWeight: '600',
                    }}>
                    24
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#07CF87',
              }}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                lineHeight: 22,
                fontWeight: '600',
                marginLeft: 12,
                fontFamily: 'ProximaNova-Regular',
              }}>
              Feed
            </Text>
          </View>
        </View>

        <GiftedChat
          messages={messages}
          user={{
            _id: 1,
            name: currentUser?.nickname,
            avatar: currentUser?.profileImage?.url,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          isCustomViewBottom={true}
          renderAvatar={() => null}
          shouldUpdateMessage={() => true}
          renderMessageText={renderMessageText}
          renderLoading={renderLoading}
          renderComposer={renderComposer}
          wrapInSafeArea={true}
        />

        {showOptions ? (
          <View
            style={{
              height: 70,
              alignSelf: 'flex-end',
              backgroundColor: '#fff',
              flexDirection: 'row',
              width: '100%',
              padding: 10,
              borderTopWidth: 1,
              borderColor: '#00000030',
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: 'rgba(0,1,17,0.3)',
                width: 50,
                marginLeft: 10,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Image
                source={require('./src/assets/image/ProfilePic.png')}
                resizeMode="cover"
                style={{height: 25, width: 25, marginLeft: 0}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: 'rgba(0,1,17,0.3)',
                width: 50,
                marginLeft: 20,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                // this.openCamera("photo");
              }}>
              <Image
                source={require('./src/assets/image/ProfilePic.png')}
                resizeMode="cover"
                style={{height: 25, width: 25, marginLeft: 0}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: 'rgba(0,1,17,0.3)',
                width: 50,
                marginLeft: 20,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                // this.openCamera("video");
              }}>
              <Image
                source={require('./src/assets/image/ProfilePic.png')}
                resizeMode="cover"
                style={{height: 25, width: 25, marginLeft: 0}}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View style={{flex: 1, backgroundColor: '#00000060'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                setModal(false);
              }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: 'red',
                    position: 'absolute',
                    bottom: 0,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Select Camera Mode Image or Video
                    </Text>
                  </View>
                  <View style={{height: 130}}>
                    <TouchableOpacity
                      onPress={() => {
                        requestCamerapermission('video');
                      }}
                      style={{
                        width: '100%',
                        height: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', color: '#000'}}>
                        Video
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '90%',
                        borderBottomWidth: 1,
                        borderColor: '#BBB8B460',
                        alignSelf: 'center',
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        requestCamerapermission('photo');
                      }}
                      style={{
                        width: '100%',
                        height: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', color: '#000'}}>
                        Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  navTitleStyle: {
    fontSize: 24,
    // fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
    letterSpacing: 0.02,
    paddingTop: 10,
  },
  navTitleTypeStyle: {
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 21,
    letterSpacing: 0.02,
  },
  inputStyle: {
    width: '100%',
    height: '100%',
    fontSize: 14,
    // fontFamily: 'NunitoSans-SemiBold',
    fontWeight: '600',
    color: '#000000',
    lineHeight: 19,
    letterSpacing: 0.02,
    borderColor: '#CECECE',
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
  },
  textStyle: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    fontFamily: 'ProximaNova-Regular',
  },
});

export default App;
