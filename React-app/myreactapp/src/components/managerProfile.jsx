import React from 'react';

const baseUrl='https://i.imgur.com/';
const person={
    name: 'kk',
    imageId:'7vQD0fP',
    imageSize:'s',
    theme:{
        backgroundColor:'yellow',
        color:'black'
    }
};

export default function MangerProfile(){
    return(
        <div style={person.theme}>
            <h1>
                {person.name}'s Todo
            </h1>
            <img
            className='profilepic'
            src={`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
            alt={person.name}
            />
            <ul>
                <li>dance for c#</li>
            </ul>
        </div>

    );
}