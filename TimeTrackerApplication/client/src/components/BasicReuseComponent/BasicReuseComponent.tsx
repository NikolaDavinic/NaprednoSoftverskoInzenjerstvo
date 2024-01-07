import BasicFunctionalComponent from "../BasicFunctionComponent/BasicFunctionalComponent";

const BasicReuseComponent = () => {
    return (
        <div>
            <BasicFunctionalComponent name="component1" />
            <BasicFunctionalComponent name="component2" />
            <BasicFunctionalComponent name="component3" />
        </div>
    )
}
export default BasicReuseComponent;