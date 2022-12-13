import { Button, message } from "antd"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { useState, useRef, useEffect } from "react"

const Show = () => {
    const [connection, setConnection] = useState(null)
    const [question, setQuestion] = useState({})
    const latestQuestion = useRef(null)

    latestQuestion.current = question

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://tricapptest.azurewebsites.net/hubs/show')
            .withAutomaticReconnect()
            .build()

        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log("Connected");

                    connection.on('ReceiveMessage', message => {
                        setQuestion(message)
                    })
                })
                .catch(e => console.log("Connection failed: ", e))
        }
    }, [connection])

    const sendMessage = async (user, message) => {
        try {
            await fetch('https://tricapptest.azurewebsites.net/show/messages', {
                method: 'POST',
                body: { user, message },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <>

        </>
    )
}

export default Show