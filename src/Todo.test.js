import renderer from "react-test-renderer";
import {Todo} from "./components/Todo";

describe("Testing components", () => {
    test("Testing app render", () => {
        const component = renderer.create(<Todo />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("handles form submit", () => {
        const component = renderer.create(<Todo />);
        let instance = component.root;

        const input = instance.findByType("input");
        input.props.onChange({ target: { value: "Todo example" } });

        const form = instance.findByProps({ id: "adding-form" });
        form.props.onSubmit({ preventDefault: jest.fn() });

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("marks todo as done", () => {
        const component = renderer.create(<Todo />);
        let instance = component.root;

        const input = instance.findByType("input");
        input.props.onChange({ target: { value: "Todo example two" } });

        const form = instance.findByProps({ id: "adding-form" });
        form.props.onSubmit({ preventDefault: jest.fn() });

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const checkbox = instance.findAllByType("input")[1];
        checkbox.props.onChange();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("marks done todo as not done", () => {
        const component = renderer.create(<Todo />);
        let instance = component.root;

        const input = instance.findByType("input");
        input.props.onChange({ target: { value: "Test todo" } });

        const form = instance.findByProps({ id: "adding-form" });
        form.props.onSubmit({ preventDefault: jest.fn() });

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const checkbox = instance.findAllByType("input")[1];
        checkbox.props.onChange();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const checkbox2 = instance.findByProps({defaultChecked: 'true'});
        checkbox2.props.onChange();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
