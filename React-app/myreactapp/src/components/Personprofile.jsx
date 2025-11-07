const person ={
    name:'vk',theme:{backgroundColor:'azure',color:'pink'}
};

const Personprofile=()=>{
    return (
<div  style={person.theme}>
        <h1>{person.name}'s Todo</h1>
        <ul>
            <li>
                study react first
            </li>
            <li>
                Dance bhi karna hai
            </li>
        </ul>
        
</div>
    );
}

export default Personprofile;