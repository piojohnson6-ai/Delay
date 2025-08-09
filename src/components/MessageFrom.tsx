import  { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'
const MessageFrom = () => {
    const [message, setMessage] = useState<string>("");
    const [delay, setdelay] = useState<number>(10);
    const [issending, setissending] = useState<boolean>(false);
    const [timeid, settimeid] = useState<NodeJS.Timeout | null>(null);
    const [sendMessage, setsendmessage] = useState<string>("");
    const hadlesend = () => {
        setissending(true)
        const id = setTimeout(() => {
            setsendmessage(message);
            setMessage('');
            setissending(false);

        }, delay * 1000)
        settimeid(id)
    }

    const hadlecancel = () => {
        if (timeid) clearTimeout(timeid);
        setissending(false);
    }


    return (
        <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-white space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>dm delay button</h2>
            <Textarea
                placeholder='Type your message'
                value={message}
                onChange={(e) => setMessage(e.target.value)} />
            <Input type='number'
                placeholder='Delay in seconds'
                value={delay}
                onChange={(e) => setdelay(Number(e.target.value))}
                disabled={issending} />
            {!issending ? (
                <Button className='w-full' onClick={hadlesend} >Sent with delay</Button>
            ) :
                <Button className='w-full' variant='destructive' onClick={hadlecancel}>Cancel sending</Button>}
            {sendMessage && (
                <div className='bg-green-100 border rounded p-3 text-green-900'>
                    <p className='font-semibold'>Message sent:</p>
                    <p>{sendMessage}</p>
                </div>
            )}


        </div>

    )
}

export default MessageFrom
