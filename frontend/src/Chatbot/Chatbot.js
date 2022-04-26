import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../redux/actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";
import ngrokUrl from "../ngrokconfig.json";

function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
    const messagesEndRef = useRef(null)
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {

        eventQuery('welcomeToMyWebsite')

    }, [])

    const textQuery = async (text) => {
  
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))

        const textQueryVariables = {
            text
        }
        try {
            const response = await Axios.post(`${ngrokUrl.domain}/api/dialogflow/textQuery`, textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'Cb bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }


    const eventQuery = async (event) => {

        const eventQueryVariables = {
            event: 'welcomeToMyWebsite'
        }
        try {
            const response = await Axios.post(`${ngrokUrl.domain}/api/dialogflow/eventQuery`, eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'Cb bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'Cb bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    const renderCards = (cards) => {
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
    }


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } else if (message.content && message.content.payload.fields.card) {

            const AvatarSrc = message.who === 'Cb bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <div>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        }


    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }
    useEffect(() => {
        scrollToBottom()
    }, [renderMessage]);

    return (
        <div  className="chatbot_box">
            <div className="chatbot_inter" >
                {renderMessage(messagesFromRedux)}
                <div ref={messagesEndRef} />
            </div>
          
            <input className="message"
                
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="text"
            />
            
        </div>
    )
}

export default Chatbot;
