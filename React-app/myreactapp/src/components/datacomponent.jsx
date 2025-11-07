const Datacomponenet=(props)=>{
    //console.log(props.list);
    const count= props.list.length;
    const manager = props.list.filter((x)=>x.role==='Manager')
    return (
        <div>
        <h2> Count is : {count}</h2>
        {manager.map((item) => 
          (
         <p key={item.id}>Name of the manager is: {item.name}</p>
          ))}
        {props.list.map((item)=>(            
            <h3 Key={item.id}>                
             Name :{item.name} 
             role :{item.role}
             location :{item.role}
            </h3>            
            ))}          
        </div>
        
    )
}
export default Datacomponenet;