function Welcome(props) {
 return (
    <>
    <h1>Hello Hi, {props.name}, {props.age} </h1>
    <h1>Hello Hi, {props.name}, {props.age} </h1>
    </>
);
}

Welcome.defaultProps ={
    name: 'Guest'
}
export default Welcome;
