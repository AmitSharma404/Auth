import { useEffect } from "react";


export const Lights = () => {

    const createDiv = () => {
        const div = document.createElement('div');
        for(let i = 0; i < 10; i++) {
            const light = document.createElement('div');
            light.classList.add('light');
            div.appendChild(light);
        }
        return div;
    }

    useEffect(() => {
        createDiv().classList.add('lights');
        document.body.appendChild(createDiv());
    },[])

    return (
        <div>
            
        </div>
    )
}