import { useEffect, useState } from 'react';

const Info = ({ next }) => {
    const [timeLeft, setTimeLeft] = useState(15)

    useEffect(() => {
        timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }, [timeLeft])

    if (timeLeft === -1) {
        setTimeout(() => {
            next()
        }, 5000);
    }

    return (
        <>
            <div>This wll show the same thing as the screen on stage</div>
            <h2>Dog or cat?</h2>
            {timeLeft > -1 ?
                <h1>{timeLeft}</h1> :
                <h1>Dog</h1>
            }
        </>
    )
}

export default Info