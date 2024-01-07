
interface ComponentProps {
    name: string;
}
const BasicFunctionalComponent = (props: ComponentProps) => {
    return(
        <div>
            <p>This is basic functional component</p>
            <p>Name of this component is {props.name}</p>
        </div>
    )
}
export default BasicFunctionalComponent;