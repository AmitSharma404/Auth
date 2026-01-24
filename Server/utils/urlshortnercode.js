

const character = 'ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz';


export function generatecode(){
    let code = '';
    for(let i = 1;i <= 8;i++){
        let index = Math.floor(Math.random() * character.length);
        code += character[index];
    }

    return code;
}
// generatecode();
