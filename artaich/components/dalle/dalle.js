import { useState } from "react";



export default function Dalle(){
    const [prompt, setPrompt] = useState('')
    const [imageSrc, setImageSrc] = useState('');
    const strapiToken = process.env.API_TOKEN;
    const FetchData = async () => {
        // Realiza la llamada a la API
        //console.log(prompt);
        const res = await fetch("http://localhost:1337/api/openai/dalle",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${strapiToken}`
            },
            //body: JSON.stringify({prompt})
            body:JSON.stringify({"prompt":prompt})
        });
        const data = await res.json();
        setImageSrc(data.data);
        //console.log(JSON.stringify(data));

    }

    
    return(
        <div>
            <h3>Generate an Image using Open AI API</h3>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setPrompt(e.target.value)}/>
            <button onClick={FetchData} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate an Image</button>
            {imageSrc ? <img src={imageSrc} /> : null}        
        </div>
    )
}
